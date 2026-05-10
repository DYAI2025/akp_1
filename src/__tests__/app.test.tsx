import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {renderToStaticMarkup} from 'react-dom/server';
import App from '../App';
import {content} from '../data/content';
import Contact from '../components/sections/Contact';
import Navigation from '../components/Navigation';
import Portfolio from '../components/sections/Portfolio';
import Publications from '../components/sections/Publications';

function renderApp() {
  return renderToStaticMarkup(<App />);
}

test('renders the critical public sections for the AKP frontend', () => {
  const html = renderApp();

  for (const sectionId of ['buero', 'leistungen', 'projekte', 'kompetenzen', 'geschichte', 'kontakt']) {
    assert.match(html, new RegExp(`id="${sectionId}"`), `missing section #${sectionId}`);
  }

  assert.match(html, /AKP Architekten Kauschke \+ Partner/);
  assert.match(html, /Leistungen &amp; Prozess/);
  assert.match(html, /Archiv \/ Projekte/);
  assert.match(html, /mailto:info@architekten-kauschke\.de/);
});

test('navigation anchors target rendered sections', () => {
  const html = renderApp();
  const hrefs = Array.from(html.matchAll(/href="#([^"]+)"/g)).map(match => match[1]);
  const ids = new Set(Array.from(html.matchAll(/id="([^"]+)"/g)).map(match => match[1]));

  for (const href of hrefs.filter(Boolean)) {
    assert.ok(ids.has(href), `navigation href #${href} has no matching section id`);
  }
});

test('project image references are deploy-safe', () => {
  for (const project of content.projects) {
    if (!('image' in project) || !project.image) {
      continue;
    }

    const image = project.image;
    if (typeof image !== 'string') {
      assert.fail(`${project.title} image path must be a string`);
    }
    assert.ok(image.startsWith('/'), `${project.title} image path must be absolute from public root`);
    const publicPath = path.join(process.cwd(), 'public', image.slice(1));
    assert.ok(existsSync(publicPath), `${project.title} references missing public asset ${image}`);
  }
});

test('contact form remains usable without a backend service', () => {
  const html = renderToStaticMarkup(<Contact />);

  assert.match(html, /action="mailto:info@architekten-kauschke\.de"/);
  for (const fieldId of ['contact-name', 'contact-email', 'contact-project', 'contact-request', 'contact-message', 'privacy-consent']) {
    assert.match(html, new RegExp(`(id|htmlFor|for)="${fieldId}"`), `missing accessible wiring for ${fieldId}`);
  }
  assert.match(html, /required=""/);
});


test('navigation is available on desktop and mobile and targets valid sections', () => {
  const html = renderToStaticMarkup(<><div id="top" /><Navigation /><App /></>);
  const hrefs = Array.from(html.matchAll(/href="#([^"]+)"/g)).map(match => match[1]);
  const ids = new Set(Array.from(html.matchAll(/id="([^"]+)"/g)).map(match => match[1]));

  assert.match(html, /aria-label="Hauptnavigation"/);
  assert.match(html, /Mobile Abschnittsnavigation/);
  assert.ok(hrefs.includes('top'), 'logo should link to the top of the page');
  for (const href of hrefs.filter(Boolean)) {
    assert.ok(ids.has(href), `navigation href #${href} has no matching section id`);
  }
});

test('portfolio controls are accessible for keyboard and assistive technology', () => {
  const html = renderToStaticMarkup(<Portfolio />);

  assert.match(html, /type="button"/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-label="Details zu Pestalozzistraße 45–46 öffnen"/);
});

test('publication call to action links to a real contact destination', () => {
  const html = renderToStaticMarkup(<><Publications /><Contact /></>);

  assert.match(html, /href="#kontakt"/);
  assert.match(html, /Publikationsliste anfragen/);
  assert.match(html, /id="kontakt"/);
});
