# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, deployed to GitHub Pages as a static build.

## Users

Academic and research visitors: colleagues, students, collaborators, and conference organizers. They arrive to look up the owner's work, find publications or software, check the training courses he gives, or get contact details.

## Product Purpose

A professional homepage for Loïc Gouarin. It presents the CV, publications, a portfolio of the open-source software he develops, the training courses he gives, research interests, and contact information. It succeeds when a visitor finds what they came for (a paper, a code repository, a bio for an introduction, an email address) quickly and leaves with an accurate picture of the owner's work.

## Positioning

Undecided. The owner will supply a one-line statement of field, role, and what visitors should remember about the work. Do not write a tagline or research summary until it exists.

## Operating Context

Visitors typically come from a search, a paper, a talk, or an email signature, and often want one specific item. Some will copy a bio, cite a publication, or follow a link to a code repository or bibliographic profile.

## Capabilities and Constraints

- Sections: CV, publications, open-source software portfolio, training courses, research interests, contact. There is no university teaching section.
- Languages: English and French, each with its own URL.
- Software portfolio: projects the owner develops, drawn from the GitHub organizations `hpc-maths` (the HPC@Maths team) and `pylbm`. `hpc-maths` also holds talk slides, course material, and paper reproduction scripts, so the portfolio is a curated list, not the whole organization. Confirmed list, owner is author of all three: `hpc-maths/samurai` (C++, BSD-3-Clause, docs at hpc-math-samurai.readthedocs.io), `hpc-maths/scopi` (C++, BSD-3-Clause, no description on GitHub yet), `pylbm/pylbm` (Python, docs at pylbm.readthedocs.io). Use the GitHub descriptions verbatim; scopi's one-liner must come from the owner. Never invent stars, users, versions, or adoption figures.
- Training courses: adult and professional training only, not university courses. What each entry records (dates, place, audience, materials) is undecided.
- The publication list comes from the owner's bibliographic profiles (HAL, ORCID, and/or Google Scholar). Which profile is authoritative, the profile IDs, and whether the list is fetched at build time or exported once are all undecided.
- Static output only, because GitHub Pages serves no backend.
- Undecided: affiliation to display, and whether a blog or news section is in scope.

## Evidence on Hand

The owner has real bio, CV, and publication content ready, but none of it is in the repository yet. No profile IDs or source files have been recorded. Until they arrive, do not invent publications, affiliations, titles, dates, collaborators, or research claims; use clearly marked placeholders.

Public repositories exist at https://github.com/hpc-maths (52 repositories, checked 2026-09-28) and https://github.com/pylbm (5 repositories). Repository names and descriptions there are real material; everything else about a project needs the owner's confirmation.

The `impeccable/` directory is a checkout of the Impeccable design tool's source. It is not product content.

## Product Principles

1. Accuracy over polish. Every fact on the page must come from the owner, their profiles, or their repositories.
2. Find it fast. The common tasks (get a paper, open a repository, get contact details, get a bio) take one or two steps from any page.
3. Easy upkeep. Adding a publication, a project, or a training course should mean editing content, not layout.
4. The work comes first. The site presents the research, software, and training and stays out of their way.
