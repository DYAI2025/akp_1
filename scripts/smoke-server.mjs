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

  const root = await fetchWithRetry('/');
  const html = await root.text();
  if (!root.ok || !html.includes('<div id="root"></div>')) {
    throw new Error('Root route did not serve the Vite index.html');
  }

  const fallback = await fetchWithRetry('/projekt/archiv');
  const fallbackHtml = await fallback.text();
  if (!fallback.ok || !fallbackHtml.includes('<div id="root"></div>')) {
    throw new Error('SPA fallback did not serve index.html');
  }
} finally {
  server.kill('SIGTERM');
}

await new Promise(resolve => server.once('exit', resolve));
console.log('Server smoke test passed');
if (output.includes('Error')) {
  console.warn(output);
}
