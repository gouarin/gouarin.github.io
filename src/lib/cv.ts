import { parse } from 'yaml';
import raw from '../data/cv.yaml?raw';
import type { Lang } from '../i18n';

// Text fields are either one string for both languages or { fr, en }.
export type Text = string | { fr: string; en: string };

export type Entry = {
  org: Text;
  position: Text;
  location: Text;
  dates: Text;
  items?: Text[];
  paragraph?: Text;
};

export type Honor = { dates: Text; position: Text; title: Text; location: Text; url?: string };

export type Cv = {
  header: { firstName: string; lastName: string; position: Text; email: string; github: string; linkedin: string; x: string };
  experience: { title: Text; entries: Entry[] };
  skills: { title: Text; entries: { type: Text; set: Text }[] };
  education: { title: Text; entries: Entry[] };
  projects: { title: Text; entries: Entry[] };
  activities: { title: Text; entries: Honor[] };
  teaching: { title: Text; groups: { title: Text; entries: Honor[] }[] };
  publications: { title: Text };
  hobbies: { title: Text; text: Text };
};

export const cv = parse(raw) as Cv;

export const tr = (value: Text | undefined, lang: Lang) => (value == null ? '' : typeof value === 'string' ? value : value[lang]);
