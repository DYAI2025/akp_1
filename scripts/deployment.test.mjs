import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const railway = JSON.parse(readFileSync('railway.json', 'utf8'));
const workflow = readFileSync('.github/workflows/ci.yml', 'utf8');
const server = readFileSync('server.mjs', 'utf8');

test('package exposes production scripts needed by Railway', () => {
  assert.equal(pkg.scripts.build, 'vite build');
  assert.equal(pkg.scripts.start, 'node server.mjs');
  assert.ok(pkg.scripts['smoke:server']);
  assert.match(pkg.scripts.ci, /npm run lint/);
  assert.match(pkg.scripts.ci, /npm test/);
  assert.match(pkg.scripts.ci, /npm run build/);
  assert.match(pkg.scripts.ci, /npm run smoke:server/);
});

test('Node runtime is pinned for deterministic Railway builds', () => {
  assert.deepEqual(pkg.engines, {node: '>=22 <23', npm: '>=10'});
  assert.deepEqual(lock.packages[''].engines, pkg.engines);
  assert.equal(readFileSync('.node-version', 'utf8').trim(), '22');
});

test('Railway configuration has build, start, and health checks', () => {
  assert.equal(railway.build.builder, 'NIXPACKS');
  assert.match(railway.build.buildCommand, /npm ci/);
  assert.match(railway.build.buildCommand, /npm run ci/);
  assert.equal(railway.deploy.startCommand, 'npm run start');
  assert.equal(railway.deploy.healthcheckPath, '/healthz');
});

test('GitHub Actions CI protects deploy readiness', () => {
  assert.ok(existsSync('.github/workflows/ci.yml'));
  for (const command of ['npm ci', 'npm run lint', 'npm test', 'npm run build', 'npm run smoke:server']) {
    assert.match(workflow, new RegExp(command.replaceAll(' ', '\\s+')));
  }
});

test('production server is hardened for Railway static delivery', () => {
  assert.match(server, /existsSync\(indexPath\)/, 'server should fail fast when dist/index.html is missing');
  assert.match(server, /X-Content-Type-Options/);
  assert.match(server, /Referrer-Policy/);
  assert.match(server, /no-store/);
  assert.match(server, /max-age=31536000, immutable/);
  assert.match(server, /req\.accepts\('html'\)/, 'SPA fallback must not mask missing JS/CSS assets');
});
