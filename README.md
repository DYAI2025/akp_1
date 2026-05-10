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
npm run ci
```

The CI command runs type-checking, unit/deployment tests, a production build, and the server smoke test. `npm run smoke:server` expects a built `dist/` directory and verifies the production server, the `/healthz` endpoint, SPA fallback routing, cache headers, security headers, and missing-asset 404 handling.

GitHub Actions runs the same deployment-readiness sequence on pushes and pull requests.

## Railway deployment

The repository includes `railway.json` with a Nixpacks build and a `/healthz` deployment health check. Node.js is pinned through `package.json` engines and `.node-version` for deterministic Railway and CI builds.

Railway will run:

```bash
npm ci && npm run ci
npm run start
```

The production server reads Railway's `PORT` environment variable automatically and falls back to `3000` locally.
