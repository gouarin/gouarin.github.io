export type Localized = { en: string; fr: string };

// Role and affiliation come from the owner's public GitHub profile (github.com/gouarin).
// null marks a fact the owner has not supplied yet; the page renders it as pending.
export const profile = {
  givenName: 'Loïc',
  familyName: 'Gouarin',
  role: {
    en: 'Research engineer in scientific computing',
    fr: 'Ingénieur de recherche en calcul scientifique',
  } as Localized,
  affiliation: {
    en: 'CNRS, École polytechnique',
    fr: 'CNRS, École polytechnique',
  } as Localized,
  intro: {
    en: 'I develop open-source software for numerical simulation and I teach training courses for adults.',
    fr: 'Je développe des logiciels libres pour la simulation numérique et je donne des formations pour adultes.',
  } as Localized,
  email: 'loic.gouarin@polytechnique.edu' as string | null,
  scholar: 'https://scholar.google.com/citations?user=FxXTrasAAAAJ&hl=en',
  links: [
    { label: 'GitHub', url: 'https://github.com/gouarin' },
    { label: 'HPC@Maths', url: 'https://github.com/hpc-maths' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=FxXTrasAAAAJ&hl=en' },
  ],
};
