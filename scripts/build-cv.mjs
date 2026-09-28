#!/usr/bin/env node
// Compiles the Awesome-CV PDFs from the LaTeX sources that `astro build` writes to dist/<lang>/cv.tex
// (see src/lib/cv-tex.ts). Run after the build. The sources move to cv/build/ so the site does not publish them;
// with --pdf, the PDFs land in dist/cv/loic-gouarin-cv-<lang>.pdf.

import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, readFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const buildDir = new URL('cv/build/', root);
const dist = new URL('dist/', root);
const LANGS = ['fr', 'en'];

await mkdir(buildDir, { recursive: true });
await copyFile(new URL('cv/awesome-cv.cls', root), new URL('awesome-cv.cls', buildDir));
await copyFile(new URL('src/assets/loic_small.png', root), new URL('loic_small.png', buildDir));
for (const lang of LANGS) {
  try {
    await rename(new URL(`${lang}/cv.tex`, dist), new URL(`cv-${lang}.tex`, buildDir));
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error(`dist/${lang}/cv.tex not found: run \`npm run build\` first.`);
    throw error;
  }
}
console.log(`LaTeX sources moved to cv/build/ (${LANGS.join(', ')}).`);

if (process.argv.includes('--pdf')) {
  await mkdir(new URL('cv/', dist), { recursive: true });
  for (const lang of LANGS) {
    // Two passes so page references and the footer settle.
    for (let pass = 0; pass < 2; pass++) {
      try {
        execFileSync('xelatex', ['-interaction=nonstopmode', '-halt-on-error', `cv-${lang}.tex`], {
          cwd: buildDir,
          // The vendored Source Sans 3 and Roboto fonts live in cv/fonts, registered by cv/fonts.conf.
          env: { ...process.env, FONTCONFIG_FILE: fileURLToPath(new URL('cv/fonts.conf', root)) },
          stdio: 'ignore',
        });
      } catch {
        // XeLaTeX reports errors in its log, not on stderr: show the first one.
        const log = await readFile(new URL(`cv-${lang}.log`, buildDir), 'utf8');
        const at = log.indexOf('\n!');
        console.error(at >= 0 ? log.slice(at, at + 1200) : log.slice(-1200));
        throw new Error(`xelatex failed on cv-${lang}.tex`);
      }
    }
    await copyFile(new URL(`cv-${lang}.pdf`, buildDir), new URL(`cv/loic-gouarin-cv-${lang}.pdf`, dist));
    console.log(`dist/cv/loic-gouarin-cv-${lang}.pdf`);
  }
}
