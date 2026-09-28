#!/usr/bin/env node
// Prints the built CV pages (dist/<lang>/cv/) to PDF with Chromium, using the page's print stylesheet.
// Run after `astro build`. Output: dist/cv/loic-gouarin-cv-web-<lang>.pdf.

import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };

// Serves dist/ under the site's base path, as GitHub Pages will.
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!path.startsWith(base)) return res.writeHead(404).end();
  path = normalize(path.slice(base.length));
  if (path.startsWith('..')) return res.writeHead(403).end();
  if (path === '.' || path.endsWith('/')) path = join(path, 'index.html');
  try {
    const body = await readFile(join(dist, path));
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}${base}`;

await mkdir(join(dist, 'cv'), { recursive: true });
const browser = await chromium.launch();
try {
  for (const lang of ['fr', 'en']) {
    const page = await browser.newPage();
    await page.goto(`${origin}${lang}/cv/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = join(dist, 'cv', `loic-gouarin-cv-web-${lang}.pdf`);
    await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(out);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
