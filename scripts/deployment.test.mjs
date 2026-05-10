import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const railway = JSON.parse(readFileSync('railway.json', 'utf8'));

test('package exposes production scripts needed by Railway', () => {
  assert.equal(pkg.scripts.build, 'vite build');
  assert.equal(pkg.scripts.start, 'node server.mjs');
  assert.ok(pkg.scripts['smoke:server']);
});

test('Railway configuration has build, start, and health checks', () => {
  assert.equal(railway.build.builder, 'NIXPACKS');
  assert.match(railway.build.buildCommand, /npm ci/);
  assert.match(railway.build.buildCommand, /npm run build/);
  assert.equal(railway.deploy.startCommand, 'npm run start');
  assert.equal(railway.deploy.healthcheckPath, '/healthz');
});
