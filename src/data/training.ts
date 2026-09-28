import type { Localized } from './profile';

export type Training = {
  id: string;
  sketch: 'devenv' | 'packaging' | 'harness';
  title: Localized;
  // Summaries are condensed from each course's own README.
  summary: Localized;
  // Languages the course material is published in.
  languages: Localized;
  materials: string;
  repository: string;
};

export const training: Training[] = [
  {
    id: 'dev-env',
    sketch: 'devenv',
    title: {
      fr: 'Cadre de développement et automatisation pour l’open source',
      en: 'Development framework and automation for open source',
    },
    summary: {
      fr: 'Un atelier sur ce qui simplifie la vie des mainteneurs, développeurs et utilisateurs : tests, formatage, analyse statique, documentation, versions et packaging, automatisés avec GitHub Actions.',
      en: 'A workshop on what makes life easier for maintainers, developers and users: tests, formatting, static analysis, documentation, releases and packaging, automated with GitHub Actions.',
    },
    languages: { fr: 'En français', en: 'In French' },
    materials: 'https://gouarin.github.io/dev_env_and_automatisation/',
    repository: 'https://github.com/gouarin/dev_env_and_automatisation',
  },
  {
    id: 'python-packaging',
    sketch: 'packaging',
    title: {
      fr: 'Distribuer son application Python',
      en: 'Distributing your Python application',
    },
    summary: {
      fr: 'Ce qu’est un package Python, les outils qui le gardent stable (linter, tests), la documentation, puis la mise à disposition via pip ou conda, avec une session pratique sur une application jouet.',
      en: 'What a Python package is, the tools that keep it stable (linters, tests), documentation, then distribution through pip or conda, with a practical session on a toy application.',
    },
    languages: { fr: 'En français', en: 'In French' },
    materials: 'https://gouarin.github.io/python-packaging-2023/',
    repository: 'https://github.com/gouarin/python-packaging-2023',
  },
  {
    id: 'hands-on-harness',
    sketch: 'harness',
    title: {
      fr: 'Hands-on Harness',
      en: 'Hands-on Harness',
    },
    summary: {
      fr: 'Une formation pour découvrir les harnais d’agents LLM et les dompter : contexte, outils, exécution et permissions, pour s’en servir en développement logiciel sans perdre la maîtrise.',
      en: 'A course to discover LLM agent harnesses and tame them: context, tools, execution and permissions, to use them in software development without losing control.',
    },
    languages: { fr: 'En français, anglais et espagnol', en: 'In French, English and Spanish' },
    materials: 'https://ai-for-dev.github.io/hands-on-harness/',
    repository: 'https://github.com/AI-for-dev/hands-on-harness',
  },
];
