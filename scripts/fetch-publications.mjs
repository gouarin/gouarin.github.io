#!/usr/bin/env node
// Fetches the owner's publications from OpenAlex and writes src/data/publications.json.
// The JSON is committed, so a build still works when OpenAlex is unreachable.

import { readFile, writeFile } from 'node:fs/promises';

const OUTPUT = new URL('../src/data/publications.json', import.meta.url);

// OpenAlex author profiles that belong to the owner.
// A5071779736 holds the 2007-2008 combustion papers listed in the owner's CV.
const AUTHOR_IDS = ['A5021413912', 'A5071779736'];

// Document types that count as publications; everything else (software, datasets, event pages) is left out.
const PUBLISHED = new Set(['article', 'book', 'book-chapter', 'conference-paper', 'report', 'dissertation']);
const KEPT = new Set([...PUBLISHED, 'preprint']);

const FIELDS = 'id,doi,title,publication_year,type,primary_location,best_oa_location,locations,authorships';

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// OpenAlex occasionally answers 429, 5xx or a body that is not JSON; retry those with exponential backoff.
async function getJson(url, attempts = 5) {
  for (let i = 1; ; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': 'loic-gouarin-homepage (publication list)' } });
    const retryable = res.status === 429 || res.status >= 500;
    if (res.ok) {
      try {
        return await res.json();
      } catch {
        if (i === attempts) throw new Error(`OpenAlex sent an unreadable body for ${url}`);
      }
    } else if (!retryable || i === attempts) {
      throw new Error(`OpenAlex answered ${res.status} for ${url}`);
    }
    await pause(1000 * 2 ** (i - 1));
  }
}

async function fetchWorksOnce(authorId) {
  const works = [];
  let cursor = '*';
  while (cursor) {
    const url = new URL('https://api.openalex.org/works');
    url.searchParams.set('filter', `author.id:${authorId}`);
    url.searchParams.set('select', FIELDS);
    url.searchParams.set('per-page', '100');
    url.searchParams.set('cursor', cursor);
    const page = await getJson(url);
    works.push(...page.results);
    cursor = page.results.length ? page.meta.next_cursor : null;
  }
  return works;
}

// OpenAlex replicas are not always in sync: a single answer can miss a few works.
// Take the union of several passes so a lagging replica cannot drop a paper.
async function fetchWorks(authorId, passes = 3) {
  const byId = new Map();
  for (let i = 0; i < passes; i++) {
    if (i) await pause(1500);
    for (const w of await fetchWorksOnce(authorId)) byId.set(w.id, w);
  }
  return [...byId.values()];
}

const titleKey = (title) =>
  title
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const isArchive = (name = '') => /arxiv|hal |hal$|\(le centre|ccsd|zenodo/i.test(name);

// Open archives appear under long institutional names; show the names readers know.
function venueName(name) {
  if (!name) return null;
  if (/arxiv/i.test(name)) return 'arXiv';
  if (/ccsd|\(le centre pour la communication|^hal\b/i.test(name)) return 'HAL';
  return name;
}

const words = (title) => new Set(titleKey(title).split(' '));

// A preprint and its published version often differ by a word or two in the title.
function sameWork(a, b) {
  const x = words(a);
  const y = words(b);
  const shared = [...x].filter((w) => y.has(w)).length;
  return shared / (x.size + y.size - shared) >= 0.75;
}

// Higher is better when two records describe the same paper.
function rank(w) {
  const source = w.primary_location?.source?.display_name ?? '';
  return (PUBLISHED.has(w.type) ? 4 : 0) + (w.doi ? 2 : 0) + (source && !isArchive(source) ? 1 : 0);
}

function openAccessUrl(group) {
  for (const w of group) {
    const oa = w.best_oa_location;
    const url = oa?.pdf_url ?? oa?.landing_page_url;
    if (url) return url;
  }
  for (const w of group)
    for (const loc of w.locations ?? []) if (loc.is_oa && loc.landing_page_url) return loc.landing_page_url;
  return null;
}

function toEntry(best, group) {
  const self = new Set(AUTHOR_IDS.map((id) => `https://openalex.org/${id}`));
  const doiUrl = best.doi ?? null;
  const open = openAccessUrl(group);
  return {
    id: best.id.replace('https://openalex.org/', ''),
    title: best.title.trim(),
    year: best.publication_year,
    type: best.type,
    venue: venueName(best.primary_location?.source?.display_name),
    authors: best.authorships.map((a) => ({ name: a.author.display_name, self: self.has(a.author.id) })),
    doi: doiUrl,
    open: open && open !== doiUrl ? open : null,
  };
}

async function main() {
  const all = (await Promise.all(AUTHOR_IDS.map((id) => fetchWorks(id)))).flat();

  const groups = new Map();
  for (const w of all) {
    if (!w.title || !KEPT.has(w.type)) continue;
    // Records with neither a source nor a DOI are event and programme pages, not publications.
    if (!w.primary_location?.source && !w.doi) continue;
    const key = titleKey(w.title);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }

  // Fold preprints into the published version of the same work.
  const entries = [...groups.entries()];
  for (const [key, group] of entries) {
    if (group.some((w) => PUBLISHED.has(w.type))) continue;
    const target = entries.find(
      ([other, g]) => other !== key && groups.has(other) && g.some((w) => PUBLISHED.has(w.type)) && sameWork(key, other),
    );
    if (target) {
      target[1].push(...group);
      groups.delete(key);
    }
  }

  const publications = [...groups.values()]
    .map((group) => {
      const best = [...group].sort((a, b) => rank(b) - rank(a) || b.publication_year - a.publication_year)[0];
      return toEntry(best, group);
    })
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  if (publications.length === 0) throw new Error('OpenAlex returned no publications; keeping the saved list.');

  const previous = JSON.parse(await readFile(OUTPUT, 'utf8').catch(() => '{"publications":[]}'));
  const unchanged = JSON.stringify(previous.publications) === JSON.stringify(publications);
  const data = {
    source: 'OpenAlex',
    authorIds: AUTHOR_IDS,
    fetchedAt: unchanged && previous.fetchedAt ? previous.fetchedAt : new Date().toISOString().slice(0, 10),
    publications,
  };
  await writeFile(OUTPUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`${publications.length} publications written from ${all.length} OpenAlex records.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
