import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { markdownToHtml, markdownToMdast, type MdastNode } from 'satteri';
import { langs, type Lang } from '../i18n';

// Fields that do not depend on the language: the two files of an entry must agree on them.
const shared: { [C in CollectionKey]: (keyof CollectionEntry<C>['data'])[] } = {
  profile: ['givenName', 'familyName', 'email', 'github', 'linkedin', 'x', 'scholar', 'links'],
  software: ['order', 'name', 'sketch', 'language', 'license', 'repository', 'documentation'],
  training: ['order', 'sketch', 'materials', 'repository'],
  cvExperience: ['order', 'url'],
  cvEducation: ['order', 'url'],
  cvProjects: ['order', 'url'],
  cvSkills: ['order'],
  cvActivities: ['order', 'url'],
  cvTeaching: ['order', 'group', 'url'],
  cvHobbies: [],
};

/** The file name without its language suffix: "samurai" for samurai.fr.md. */
export const nameOf = (entry: { id: string }) => entry.id.replace(/\.[^.]+$/, '');

const fileName = (entry: { filePath?: string; id: string }) => entry.filePath ?? entry.id;

// Groups <name>.fr.md and <name>.en.md, and fails the build when a language is missing or the pair disagrees.
async function pairs<C extends CollectionKey>(collection: C) {
  const byName = new Map<string, Partial<Record<Lang, CollectionEntry<C>>>>();
  for (const entry of await getCollection(collection)) {
    const [, name, lang] = entry.id.match(/^(.+)\.([^.]+)$/) ?? [];
    if (!name || !langs.includes(lang as Lang)) {
      throw new Error(`${fileName(entry)}: name the file <name>.${langs.join('.md or <name>.')}.md`);
    }
    byName.set(name, { ...byName.get(name), [lang]: entry });
  }
  for (const [name, pair] of byName) {
    const [first, ...others] = langs.map((lang) => pair[lang]);
    const present = first ?? others.find(Boolean)!;
    const missing = langs.filter((lang) => !pair[lang]);
    if (missing.length) {
      const path = fileName(present).replace(/[^/]+$/, '');
      throw new Error(`${missing.map((lang) => `${path}${name}.${lang}.md`).join(', ')} missing: every entry needs one file per language.`);
    }
    for (const other of others) {
      for (const field of shared[collection]) {
        const a = (first!.data as Record<PropertyKey, unknown>)[field];
        const b = (other!.data as Record<PropertyKey, unknown>)[field];
        if (JSON.stringify(a) !== JSON.stringify(b)) {
          throw new Error(`${fileName(first!)} and ${fileName(other!)} disagree on "${String(field)}": it must be the same in every language.`);
        }
      }
    }
  }
  return byName;
}

/** The entries of a collection in one language, sorted by their `order` field. */
export async function entries<C extends CollectionKey>(collection: C, lang: Lang): Promise<CollectionEntry<C>[]> {
  const list = [...(await pairs(collection)).values()].map((pair) => pair[lang]!);
  const order = (e: CollectionEntry<C>) => (e.data as { order?: number }).order ?? 0;
  return list.sort((a, b) => order(a) - order(b));
}

/** The one entry of a collection holding a single text, such as the profile. */
export async function single<C extends CollectionKey>(collection: C, lang: Lang): Promise<CollectionEntry<C>> {
  const list = await entries(collection, lang);
  if (list.length !== 1) throw new Error(`The "${collection}" collection must hold exactly one entry, found ${list.length}.`);
  return list[0];
}

// Astro's default Markdown settings (GFM, smart quotes and dashes), so a text reads the same on the page, in
// its metadata and in the LaTeX CV.
export const features = { gfm: true, smartPunctuation: true };

export const parse = (markdown: string) => markdownToMdast(markdown, { features });

const text = (node: MdastNode): string =>
  'value' in node && typeof node.value === 'string' ? node.value : 'children' in node ? node.children.map(text).join('') : '';

/** Markdown reduced to its text, for attributes and page descriptions. */
export const plain = (markdown: string) => text(parse(markdown)).trim();

/** A one-paragraph Markdown text as HTML, without the enclosing <p>. */
export function inlineHtml(markdown: string) {
  const { html } = markdownToHtml(markdown, { features });
  const inner = html.trim().match(/^<p>([\s\S]*)<\/p>$/)?.[1];
  if (inner == null || inner.includes('<p>')) throw new Error(`Expected a single line of Markdown, got: ${markdown}`);
  return inner;
}
