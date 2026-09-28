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
    en: 'CMAP, CNRS, École polytechnique',
    fr: 'CMAP, CNRS, École polytechnique',
  } as Localized,
  intro: {
    en: 'I develop open-source software for numerical simulation and high-performance computing. I co-lead the HPC@Maths team at CMAP and I am a member of the Groupe Calcul.',
    fr: 'Je développe des logiciels libres pour la simulation numérique et le calcul haute performance. Je suis co-responsable de l’équipe HPC@Maths du CMAP et membre du groupe Calcul.',
  } as Localized,
  // Names linked to their website wherever they appear in the affiliation or intro.
  linkedNames: {
    CMAP: 'https://cmap.ip-paris.fr/',
    'groupe Calcul': 'https://groupe-calcul.cnrs.fr/',
    'Groupe Calcul': 'https://groupe-calcul.cnrs.fr/',
  } as Record<string, string>,
  email: 'loic.gouarin@polytechnique.edu' as string | null,
  scholar: 'https://scholar.google.com/citations?user=FxXTrasAAAAJ&hl=en',
  links: [
    { label: 'GitHub', url: 'https://github.com/gouarin' },
    { label: 'HPC@Maths', url: 'https://github.com/hpc-maths' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=FxXTrasAAAAJ&hl=en' },
  ],
};
