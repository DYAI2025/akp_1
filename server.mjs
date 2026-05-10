import express from 'express';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

function parsePort(value = '3000') {
  const port = Number.parseInt(value, 10);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT value "${value}". Expected a TCP port between 0 and 65535.`);
  }
  return port;
}

const port = parsePort(process.env.PORT);

if (!existsSync(indexPath)) {
  console.error(`Missing production build at ${indexPath}. Run "npm run build" before starting the server.`);
  process.exit(1);
}

app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.get('/healthz', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({status: 'ok'});
});

app.use(
  express.static(distPath, {
    extensions: ['html'],
    maxAge: 0,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return;
      }
      res.setHeader('Cache-Control', 'no-cache');
    },
  }),
);

app.get('*', (req, res, next) => {
  if (!req.accepts('html')) {
    next();
    return;
  }

  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(indexPath);
});

app.use((_req, res) => {
  res.status(404).json({error: 'Not found'});
});

app.listen(port, '0.0.0.0', () => {
  console.log(`AKP app listening on port ${port}`);
});
