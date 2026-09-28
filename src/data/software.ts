import type { Localized } from './profile';

export type Software = {
  id: string;
  name: string;
  // English is the verbatim GitHub description; French is its translation.
  description: Localized | null;
  language: string;
  license: string | null;
  role: Localized;
  repository: string;
  documentation: string | null;
};

const author: Localized = { en: 'Author', fr: 'Auteur' };

export const software: Software[] = [
  {
    id: 'samurai',
    name: 'samurai',
    description: {
      en: 'Intervals coupled with algebra of set to handle adaptive mesh refinement and operators on it.',
      fr: 'Des intervalles couplés à une algèbre d’ensembles pour gérer le raffinement de maillage adaptatif et les opérateurs qui s’y appliquent.',
    },
    language: 'C++',
    license: 'BSD-3-Clause',
    role: author,
    repository: 'https://github.com/hpc-maths/samurai',
    documentation: 'https://hpc-math-samurai.readthedocs.io',
  },
  {
    id: 'scopi',
    name: 'scopi',
    // From the project README; the repository has no GitHub description.
    description: {
      en: 'Simulation of Interacting Particle Collections: 2D and 3D particles with contacts and inter-particle forces.',
      fr: 'Simulation de collections de particules en interaction : particules 2D et 3D avec contacts et forces entre particules.',
    },
    language: 'C++',
    license: 'BSD-3-Clause',
    role: author,
    repository: 'https://github.com/hpc-maths/scopi',
    documentation: null,
  },
  {
    id: 'pylbm',
    name: 'pylbm',
    description: {
      en: 'Numerical simulations using flexible Lattice Boltzmann solvers',
      fr: 'Simulations numériques avec des solveurs de Boltzmann sur réseau flexibles',
    },
    language: 'Python',
    license: null,
    role: author,
    repository: 'https://github.com/pylbm/pylbm',
    documentation: 'https://pylbm.readthedocs.io',
  },
];
