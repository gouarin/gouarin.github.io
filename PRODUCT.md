# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, deployed to GitHub Pages as a static build.

## Users

Academic and research visitors: colleagues, students, collaborators, and conference organizers. They arrive to look up the owner's work, find publications or software, check the training courses he gives, or get contact details.

## Product Purpose

A professional homepage for Loïc Gouarin. One page per language, in this order: who he is (with his avatar), a portfolio of the open-source software he develops, the training courses he gives, then links to his CV and publications. It succeeds when a visitor finds what they came for (a paper, a code repository, a bio for an introduction, an email address) quickly and leaves with an accurate picture of the owner's work.

## Positioning

Research engineer in scientific computing at CNRS, based at École polytechnique (from the owner's public GitHub profile, github.com/gouarin; to be confirmed). He develops open-source software for numerical simulation and gives training courses for adults. Do not add research claims beyond this until the owner supplies them.

## Operating Context

Visitors typically come from a search, a paper, a talk, or an email signature, and often want one specific item. Some will copy a bio, cite a publication, or follow a link to a code repository or bibliographic profile.

## Capabilities and Constraints

- Sections: introduction with avatar, open-source software, training courses, links to CV and publications. There is no university teaching section. CV and publications are links, not full sections.
- Languages: English and French, each with its own URL.
- Software portfolio: projects the owner develops, drawn from the GitHub organizations `hpc-maths` (the HPC@Maths team) and `pylbm`. `hpc-maths` also holds talk slides, course material, and paper reproduction scripts, so the portfolio is a curated list, not the whole organization. Confirmed list, owner is author of all three: `hpc-maths/samurai` (C++, BSD-3-Clause, docs at hpc-math-samurai.readthedocs.io), `hpc-maths/scopi` (C++, BSD-3-Clause, no GitHub description; its README describes it as software for the Simulation of Interacting Particle Collections, 2D and 3D, with contacts), `pylbm/pylbm` (Python, docs at pylbm.readthedocs.io). Use the GitHub descriptions verbatim; scopi's line is taken from its README. Never invent stars, users, versions, or adoption figures.
- Training courses: adult and professional training only, not university courses. Confirmed list (owner, 2026-09-28): `gouarin/dev_env_and_automatisation` ("Cadre de développement et automatisation pour l'open source", in French), `gouarin/python-packaging-2023` ("Distribuer son application Python", in French), `AI-for-dev/hands-on-harness` ("Hands-on Harness", in French, English and Spanish). Each entry carries its course-material site, repository, and a summary condensed from its README. Dates, places and audiences are not recorded.
- Publications: generated from OpenAlex (authors A5021413912 and A5071779736, the second holding the 2007-2010 combustion papers confirmed by the owner's CV) by `scripts/fetch-publications.mjs`, run before every deploy and weekly by GitHub Actions. The committed `src/data/publications.json` is the fallback when OpenAlex is unreachable. Google Scholar (user FxXTrasAAAAJ) is the owner's reference profile and is linked from the page, but it has no API and is not scraped. Event pages, software records and preprints with a published version are filtered out.
- Static output only, because GitHub Pages serves no backend.
- Contact email: loic.gouarin@polytechnique.edu (confirmed by the owner, 2026-09-28).
- CV: its content lives in `src/data/cv.yaml` (French and English), the only file to edit. It renders the CV page (`/fr/cv/`, `/en/cv/`) and two PDFs per language on each deploy: the Awesome-CV LaTeX layout of the owner's original CV (`scripts/build-cv.mjs`, XeLaTeX) and the CV page printed by Chromium (`scripts/print-cv.mjs`). Publications in the CV come from the OpenAlex list. Public CVs carry professional contact details only: no postal address, phone, age or family situation (owner's decision, 2026-09-28). The English text was translated for the owner and needs his review.
- Undecided: whether a blog or news section is in scope.

## Brand Commitments

- Avatar: `loic_small.png` (repository root; shipped from `src/assets/`), an ink portrait with one cyan spot color (#67c8dd) on a light grey disc (#f3f3f3) with a cyan ring. Keep it as the page's visual anchor and keep its two colors as the site's palette.
- The owner wants a clean, uncluttered page with a design that holds attention, beautiful typefaces for reading, and discreet navigation. Software cards carry simple pencil drawings, one per project.
- Rejected on 2026-09-28: a skeuomorphic library card-catalog world (cards, steel cabinet, typewriter face), judged ugly and old-fashioned. Avoid retro or skeuomorphic office materials.

## Evidence on Hand

The owner has real bio, CV, and publication content ready, but none of it is in the repository yet. No profile IDs or source files have been recorded. Until they arrive, do not invent publications, affiliations, titles, dates, collaborators, or research claims; use clearly marked placeholders.

Public repositories exist at https://github.com/hpc-maths (52 repositories, checked 2026-09-28) and https://github.com/pylbm (5 repositories). Repository names and descriptions there are real material; everything else about a project needs the owner's confirmation.

The `impeccable/` directory is a checkout of the Impeccable design tool's source. It is not product content.

## Product Principles

1. Accuracy over polish. Every fact on the page must come from the owner, their profiles, or their repositories.
2. Find it fast. The common tasks (get a paper, open a repository, get contact details, get a bio) take one or two steps from any page.
3. Easy upkeep. Adding a publication, a project, or a training course should mean editing content, not layout.
4. The work comes first. The site presents the research, software, and training and stays out of their way.
