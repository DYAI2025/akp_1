# AKP Architekten Kauschke + Partner

Single-page React/Vite portfolio for AKP Architekten Kauschke + Partner. The app is built as static assets and served by a small Express server that is ready for Railway deployments.

## Requirements

- Node.js 22+
- npm

## Local development

```bash
npm install
npm run dev
```

The Vite development server listens on `0.0.0.0:3000`.

## Quality checks

```bash
npm run lint
npm test
npm run build
npm run smoke:server
```

`npm run smoke:server` expects a built `dist/` directory and verifies the production server, the `/healthz` endpoint, and SPA fallback routing.

## Railway deployment

The repository includes `railway.json` with a Nixpacks build and a `/healthz` deployment health check.

Railway will run:

```bash
npm ci && npm run build
npm run start
```

The production server reads Railway's `PORT` environment variable automatically and falls back to `3000` locally.
