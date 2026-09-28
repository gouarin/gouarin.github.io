import type { Localized } from './profile';

export type Software = {
  id: string;
  name: string;
  // Verbatim GitHub description; null until the owner supplies one.
  description: string | null;
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
    description:
      'Intervals coupled with algebra of set to handle adaptive mesh refinement and operators on it.',
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
    description: 'Simulation of Interacting Particle Collections: 2D and 3D particles with contacts and inter-particle forces.',
    language: 'C++',
    license: 'BSD-3-Clause',
    role: author,
    repository: 'https://github.com/hpc-maths/scopi',
    documentation: null,
  },
  {
    id: 'pylbm',
    name: 'pylbm',
    description: 'Numerical simulations using flexible Lattice Boltzmann solvers',
    language: 'Python',
    license: null,
    role: author,
    repository: 'https://github.com/pylbm/pylbm',
    documentation: 'https://pylbm.readthedocs.io',
  },
];
