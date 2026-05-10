import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const distPath = path.join(__dirname, 'dist');

app.disable('x-powered-by');

app.get('/healthz', (_req, res) => {
  res.status(200).json({status: 'ok'});
});

app.use(
  express.static(distPath, {
    extensions: ['html'],
    maxAge: '1y',
    immutable: true,
    setHeaders(res, filePath) {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`AKP app listening on port ${port}`);
});
