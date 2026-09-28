# Modifier le contenu du site

Ce dossier contient le contenu du site en Markdown : profil, logiciels, formations et entrées du CV. Chaque élément existe en deux fichiers, un par langue : `nom.fr.md` et `nom.en.md`. Les libellés de l'interface et les titres des sections du CV sont dans `src/i18n.ts`.

| Emplacement | Contenu | Affiché dans |
| --- | --- | --- |
| `profile.*.md` | Nom, rôle, affiliation, contacts et liens. Le texte sous l'en-tête est l'introduction de l'accueil. | Accueil, en-tête du CV |
| `software/` | Un logiciel | Accueil, « Logiciels libres » |
| `training/` | Une formation | Accueil, « Formations continues » |
| `cv/experience/`, `cv/education/`, `cv/projects/` | Une entrée du CV, avec un paragraphe ou une liste à puces | CV (page et PDF) |
| `cv/skills/` | Une compétence. Le texte est la liste des savoir-faire. | CV |
| `cv/activities/` | Une ligne des activités transverses | CV |
| `cv/teaching/` | Une ligne des enseignements, avec `group: initial` ou `group: continuing` | CV |
| `cv/hobbies.*.md` | Le paragraphe « Loisirs » | CV |

Les publications viennent d'OpenAlex (`src/data/publications.json`, mis à jour chaque semaine par la CI).

## Ajouter un élément

1. Copier une paire de fichiers du même dossier sous un nouveau nom, par exemple `cv/activities/hpc-maths.fr.md` et `cv/activities/hpc-maths.en.md`.
2. Modifier l'en-tête (entre les deux `---`) et le texte en dessous, dans les deux fichiers.
3. Choisir `order`. Les éléments s'affichent du plus petit au plus grand. Les valeurs vont de 10 en 10, ce qui permet d'en glisser un entre deux (15 entre 10 et 20).
4. Lancer `npm run dev` et ouvrir l'adresse affichée. La page se met à jour à chaque enregistrement.

Par exemple, un projet du CV (`cv/projects/samurai.fr.md`) :

```markdown
---
order: 10
org: Samurai
position: Responsable projet
dates: Depuis 2015
url: https://github.com/hpc-maths/samurai
---

- Samurai est une nouvelle génération de structure de données pour les méthodes d'adaptation de maillage.
- Cette librairie est écrite en C++ et utilise activement la librairie xtensor.
```

Les champs acceptés par chaque dossier sont définis dans `src/content.config.ts`.

## Ce que le build vérifie

Le build s'arrête avec un message qui nomme le fichier en cause quand :

- un élément n'existe que dans une langue ;
- les deux fichiers d'un élément ont des valeurs différentes pour un champ qui ne dépend pas de la langue (`order`, `url`, liens, `sketch`, etc.) ;
- un champ obligatoire manque ou une URL est invalide ;
- `sketch` (logiciels et formations) ne désigne pas un dessin existant : `samurai`, `scopi`, `pylbm`, `devenv`, `packaging` ou `harness`. Un nouveau dessin se code dans `src/components/Sketch.astro`.

## Markdown accepté

Le texte sous l'en-tête accepte le Markdown courant : `**gras**`, `*italique*`, `[lien](https://...)` et les listes à puces. Le PDF du CV n'accepte que les paragraphes et les listes à puces (pas de titres, de tableaux ni d'images). Si un fichier du CV en contient, le build s'arrête et nomme le fichier.

La typographie est corrigée automatiquement : l'apostrophe droite `'` devient `’`, `...` devient `…` et `--` devient `–`.

## PDF du CV

La CI construit les PDF à chaque déploiement. En local, `npm run build` puis `npm run cv` (XeLaTeX requis) écrit `dist/cv/loic-gouarin-cv-fr.pdf` et `dist/cv/loic-gouarin-cv-en.pdf`.
