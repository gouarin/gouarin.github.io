import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { plateSketches } from './lib/sketch';

// Every entry is a pair of Markdown files, <name>.fr.md and <name>.en.md; src/lib/content.ts checks the pairs.
// The id keeps the language suffix: "samurai.fr".
const files = (base: string, pattern = '*.md') =>
  glob({ base: `./src/content/${base}`, pattern, generateId: ({ entry }) => entry.replace(/\.md$/, '') });

// Position in its list, smallest first. Steps of 10 leave room to slot an entry in between.
const order = z.number().int();
const url = z.url();
// YAML reads an unquoted 2016 as a number.
const dates = z.union([z.string(), z.number()]).transform(String);

const profile = defineCollection({
  loader: files('', 'profile.*.md'),
  schema: z.object({
    givenName: z.string(),
    familyName: z.string(),
    role: z.string(),
    // Inline Markdown, so a name can link to its website.
    affiliation: z.string(),
    email: z.email(),
    github: z.string(),
    linkedin: z.string(),
    x: z.string(),
    scholar: url,
    links: z.array(z.object({ label: z.string(), url })),
  }),
});

const software = defineCollection({
  loader: files('software'),
  schema: z.object({
    order,
    name: z.string(),
    sketch: z.enum(plateSketches),
    language: z.string(),
    license: z.string().optional(),
    role: z.string(),
    repository: url,
    documentation: url.optional(),
  }),
});

const training = defineCollection({
  loader: files('training'),
  schema: z.object({
    order,
    title: z.string(),
    sketch: z.enum(plateSketches),
    // Languages the course material is published in.
    languages: z.string(),
    materials: url,
    repository: url,
  }),
});

// CV entries with a heading, a subtitle and an optional Markdown body (a paragraph or a bullet list).
const cvEntry = z
  .object({
    order,
    org: z.string(),
    position: z.string(),
    dates,
    location: z.string().optional(),
    // Links the organisation name; shown in place of a missing location.
    url: url.optional(),
  })
  .refine((e) => e.location || e.url, { message: 'Give a location, a url, or both.' });

// One-line CV entries.
const cvLine = {
  order,
  dates,
  position: z.string(),
  title: z.string(),
  location: z.string(),
  url: url.optional(),
};

export const collections = {
  profile,
  software,
  training,
  cvExperience: defineCollection({ loader: files('cv/experience'), schema: cvEntry }),
  cvEducation: defineCollection({ loader: files('cv/education'), schema: cvEntry }),
  cvProjects: defineCollection({ loader: files('cv/projects'), schema: cvEntry }),
  // The body lists the skills.
  cvSkills: defineCollection({ loader: files('cv/skills'), schema: z.object({ order, title: z.string() }) }),
  cvActivities: defineCollection({ loader: files('cv/activities'), schema: z.object(cvLine) }),
  cvTeaching: defineCollection({
    loader: files('cv/teaching'),
    schema: z.object({ ...cvLine, group: z.enum(['initial', 'continuing']) }),
  }),
  // Body only.
  cvHobbies: defineCollection({ loader: files('cv', 'hobbies.*.md'), schema: z.object({}) }),
};
