import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';

const port = 4173;
const server = spawn(process.execPath, ['server.mjs'], {
  env: {...process.env, PORT: String(port)},
  stdio: ['ignore', 'pipe', 'pipe'],
});

let output = '';
server.stdout.on('data', chunk => {
  output += chunk.toString();
});
server.stderr.on('data', chunk => {
  output += chunk.toString();
});

async function fetchWithRetry(pathname, options = {}) {
  const url = `http://127.0.0.1:${port}${pathname}`;
  let lastError;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      lastError = error;
      await delay(100);
    }
  }
  throw lastError;
}

try {
  const health = await fetchWithRetry('/healthz');
  if (!health.ok) {
    throw new Error(`/healthz returned ${health.status}`);
  }
  const healthBody = await health.json();
  if (healthBody.status !== 'ok') {
    throw new Error(`/healthz returned unexpected body: ${JSON.stringify(healthBody)}`);
  }
  if (health.headers.get('cache-control') !== 'no-store') {
    throw new Error('/healthz must not be cached by Railway or proxies');
  }

  const root = await fetchWithRetry('/');
  const html = await root.text();
  if (!root.ok || !html.includes('<div id="root"></div>')) {
    throw new Error('Root route did not serve the Vite index.html');
  }
  if (root.headers.get('cache-control') !== 'no-cache') {
    throw new Error('index.html must stay uncached so Railway deploys update cleanly');
  }
  if (root.headers.get('x-content-type-options') !== 'nosniff') {
    throw new Error('Security header X-Content-Type-Options is missing');
  }

  const fallback = await fetchWithRetry('/projekt/archiv');
  const fallbackHtml = await fallback.text();
  if (!fallback.ok || !fallbackHtml.includes('<div id="root"></div>')) {
    throw new Error('SPA fallback did not serve index.html');
  }

  const missingAsset = await fetchWithRetry('/assets/does-not-exist.js', {
    headers: {accept: 'application/javascript'},
  });
  if (missingAsset.status !== 404) {
    throw new Error(`Missing assets should return 404, got ${missingAsset.status}`);
  }
} finally {
  server.kill('SIGTERM');
}

await new Promise(resolve => server.once('exit', resolve));
console.log('Server smoke test passed');
if (output.includes('Error')) {
  console.warn(output);
}
