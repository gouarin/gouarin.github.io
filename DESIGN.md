---
name: Loïc Gouarin
description: A researcher's homepage drawn in the same ink-and-cyan hand as his portrait.
colors:
  paper: "#ffffff"
  ink: "#121314"
  ink-soft: "#50555b"
  graphite: "#34373a"
  mist: "#f3f3f3"
  rule: "#e3e5e7"
  cyan: "#67c8dd"
  cyan-wash: "rgb(103 200 221 / 0.38)"
  paper-dark: "#111315"
  ink-dark: "#eef0f1"
  ink-soft-dark: "#aab1b7"
  graphite-dark: "#d3d6d9"
  mist-dark: "#1c1f22"
  rule-dark: "#2b2f33"
  cyan-wash-dark: "rgb(103 200 221 / 0.3)"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(3.4rem, 8.6vw, 6rem)"
    fontWeight: 720
    lineHeight: 0.92
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 92"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.25rem)"
    fontWeight: 680
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 680
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title-destination:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2rem)"
    fontWeight: 680
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  role:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)"
    fontWeight: 450
    lineHeight: 1.35
  lead:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "clamp(1.12rem, 1.6vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  label-small:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.6
  label-strong:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 550
    lineHeight: 1.6
rounded:
  focus: "4px"
  plate: "28px"
  pill: "999px"
  disc: "50%"
spacing:
  gutter: "clamp(16px, 5vw, 56px)"
  wrap: "1140px"
  section: "clamp(3.5rem, 9vw, 6.5rem)"
  head-gap: "clamp(2rem, 4vw, 3rem)"
  card-row-gap: "clamp(2.5rem, 4vw, 3.5rem)"
  card-col-gap: "clamp(1.5rem, 3vw, 2.5rem)"
  intro-gap: "clamp(2rem, 6vw, 5.5rem)"
  stack: "1.6rem"
components:
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.ink}"
  software-plate:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.plate}"
  software-title:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  disc:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.disc}"
    size: "5.5rem"
  destination-card:
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "1.25rem 1.5rem"
  destination-card-hover:
    backgroundColor: "{colors.cyan-wash}"
  pending-tag:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 0.6rem"
  highlight-mark:
    backgroundColor: "{colors.cyan-wash}"
    typography: "{typography.role}"
---

# Design System: Loïc Gouarin

## Overview

**Creative North Star: "Drawn in His Own Line"**

The owner's avatar is an ink portrait with one cyan spot colour on a light grey disc, and the whole system grows from it. The page is white, the type is near-black, and the only other material is pencil: graphite line drawings with cyan coloured-pencil hatching, generated in code and framed by the same grey as the portrait's disc. Each project is shown as a small technical sketch of what the software computes, drawn in the same hand as the portrait.

Density is low. There is one reading column, generous section spacing and no chrome: the navigation is a single line of text with no bar or background. Bricolage Grotesque carries names, headings and interface labels, and Literata carries everything meant to be read. Cyan works like a highlighter or a coloured pencil and never fills a surface.

The owner rejected a skeuomorphic card-catalog world (index cards, steel cabinet, typewriter face) as old-fashioned. This system avoids retro office materials and imitation textures. The only texture comes from the pencil filter on the drawings.

**Key Characteristics:**
- White paper, near-black ink, one cyan, a light grey for discs and plates.
- Bricolage Grotesque for display and labels, Literata for reading.
- Code-generated pencil drawings: graphite strokes, grain filter, 38-degree cyan hatching, deterministic jitter.
- Drawings trace themselves once on scroll and are static under reduced motion.
- Flat surfaces with large 28px radii and one soft lift shadow on hover.

## Colors

A monochrome ink palette with a single cyan taken from the portrait, used as a spot colour.

### Primary
- **Portrait Cyan** (cyan): the portrait's spot colour, also the colour of the ring around the favicon. Used for link underlines, the pencil hatching inside drawings, the destination card border on hover, and text selection. The same value in light and dark.
- **Highlighter Wash** (cyan-wash, cyan-wash-dark): cyan at 38% alpha (30% in dark). Used for the highlighter stroke behind the role line and the hover fill of destination cards. Never as a resting background.

### Neutral
- **Paper** (paper / paper-dark): page and body background.
- **Ink** (ink / ink-dark): headings, body text, heavy pencil strokes, focus outline.
- **Soft Ink** (ink-soft / ink-soft-dark): secondary text such as nav links at rest, affiliation, section leads, metadata, pending notes, footer.
- **Graphite** (graphite / graphite-dark): the regular pencil stroke inside drawings. It lightens in dark mode so strokes stay readable on the dark plate.
- **Mist** (mist / mist-dark): the grey of the portrait's disc. Used for software plates and the round frames of small drawings.
- **Hairline** (rule / rule-dark): 1px borders on destination cards, the pending row and the footer rule.

Dark mode follows `prefers-color-scheme` only. Every neutral is redefined, cyan stays the same, and the wash drops to 30%. The avatar raster keeps its own light disc in both schemes.

### Named Rules
**The One Pencil Rule.** Cyan is a coloured pencil, not a paint. It appears as underlines, hatching, a highlighter band, a hover border or a hover wash. It never fills a button, a panel or a section.

**The Portrait Palette Rule.** New colours are not added. Every colour on the page is either in the portrait (ink, cyan, grey) or a neutral step between paper and ink.

## Typography

**Display Font:** Bricolage Grotesque Variable (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Literata Variable (with Georgia, serif), upright and italic

**Character:** A compact, heavy grotesque with slightly narrowed width for names and headings, next to a bookish serif with optical sizing for anything read at length. Both are self-hosted through Fontsource.

### Hierarchy
- **Display** (720, clamp(3.4rem, 8.6vw, 6rem), 0.92, width axis 92): the owner's name in the intro only, given and family name on separate lines.
- **Headline** (680, clamp(2rem, 4.6vw, 3.25rem), 1.02): section headings.
- **Title** (680, 1.75rem, 1.1): software and training titles under their plates.
- **Title, destination** (680, clamp(1.5rem, 2.6vw, 2rem), 1.05): CV and publications card titles.
- **Role** (Literata 450, clamp(1.25rem, 2.2vw, 1.6rem), 1.35): the one-line job title, carried by the highlighter mark.
- **Lead** (Literata, clamp(1.12rem, 1.6vw, 1.3rem), 1.55, max 34ch): the two-sentence introduction.
- **Body** (Literata, 1.0625rem, 1.6): project descriptions (1.02rem) and running text.
- **Section lead** (Literata italic, 1.15rem, Soft Ink): the one sentence under each section heading.
- **Label** (Bricolage 400 to 560, 0.95rem to 1rem): navigation, affiliation, project metadata, project and contact links, footer.
- **Label small** (Bricolage, 0.85rem, Soft Ink): publication types and the pending pill.

Headings use `text-wrap: balance` and negative tracking between -0.03em and -0.035em. Nothing is set in uppercase.

### Named Rules
**The Two Voices Rule.** Bricolage names things and labels controls. Literata says things. A sentence meant to be read is never set in Bricolage, and a heading or link row is never set in Literata.

## Layout

A single centred column, max 1140px wide, with a fluid gutter of clamp(16px, 5vw, 56px). Sections stack vertically with clamp(3.5rem, 9vw, 6.5rem) above each, and a heading block of max 44rem followed by clamp(2rem, 4vw, 3rem) of space.

- **Intro:** a two-column grid, portrait column minmax(200px, 330px) and text column, vertically centred, gap clamp(2rem, 6vw, 5.5rem).
- **Software grid:** auto-fill columns of at least 300px (three across on desktop), row gap clamp(2.5rem, 4vw, 3.5rem), column gap clamp(1.5rem, 3vw, 2.5rem). Links sit at the bottom of each card so link rows align across the row.
- **Destination grid:** auto-fit columns of at least 320px, gap 1.25rem.
- **Training grid:** the same grid and card pattern as software, one plate drawing per course.
- **Short screens** (width over 760px, height 800px or less): intro and first section padding shrink so the first drawings reach the fold.
- **Narrow screens** (760px and below): the intro collapses to one column with the portrait at min(58vw, 240px), the section links in the nav are hidden (the name and language switch stay), and pending tags drop to their own line.

The vertical rhythm inside the intro is 1.6rem between role, lead and links, with the affiliation pulled close at 0.35rem.

## Elevation & Depth

The system is flat. Depth comes from tone (grey plates and discs on white paper) and hairlines, not shadows.

### Shadow Vocabulary
- **Plate lift** (`box-shadow: 0 18px 36px -22px rgb(18 19 20 / 0.45)`): only on hover of a software card, together with a 4px upward translate of the plate.

### Named Rules
**The Flat at Rest Rule.** No surface carries a shadow at rest. The single shadow exists only as a hover response on software plates.

## Shapes

Two forms repeat: the rounded rectangle and the circle. Software plates and destination cards use a 28px radius. Small drawings sit in full circles of mist, echoing the portrait's disc. The pending tag is a pill with a dashed 1px border. Borders, when present, are 1px hairlines. The focus ring is a 2px ink outline, offset 4px, with a 4px radius. Inside the drawings, lines are rounded at caps and joins, and circles are drawn as one loose stroke that slightly overshoots its start.

## Components

### Navigation
- **Style:** one quiet line at the top of the page, no bar, no background, 1.6rem vertical padding. The wordmark (owner's full name, Bricolage 650) sits on the left; section links and the language switch sit on the right, baseline aligned, gap clamp(1rem, 2.4vw, 2rem).
- **States:** section links rest in Soft Ink with no underline; hover turns them Ink with a cyan underline (0.2s ease-out). The language switch rests in Ink and names the other language in that language.
- **Mobile:** section links hide below 760px. A skip link appears top-left on focus as a small ink pill.

### Intro and portrait
- The avatar raster on the left, the name in Display on two lines, the role line with a highlighter mark, the affiliation in Soft Ink label type, the lead in Literata, then a row of contact links.
- **Highlighter mark:** a cyan-wash band from 58% to 92% of the line height behind the role text, cloned across line breaks.
- **Contact links:** Bricolage 550 with the standard cyan underline. On hover the underline thickens to 0.35em and rises behind the text, like a highlighter pass.

### Software card with plate
- **Plate:** a mist panel with a 28px radius and a 320:220 aspect ratio holding one large drawing. The plate is a link to the repository (for training, the course material) but hidden from assistive tech and the tab order, since the title carries the same link.
- **Record:** title (Title type, cyan underline on hover), description in Literata, metadata in Soft Ink label type joined with middle dots (language, licence, role), then a link row (repository, documentation) in Bricolage 560.
- **Hover:** the plate lifts 4px with the plate-lift shadow (0.5s ease-out). The small outbound arrow beside each link shifts 2px up and right (0.25s).
- Missing facts (no licence, no documentation) are omitted, not filled.

### Disc drawings
- A 5.5rem mist circle framing a small 120x120 drawing. Used for the CV and publications cards and for the training pending row. The same drawing grammar as the plates, at a smaller scale.

### Pending states
- **Pending row:** used when a list has no content yet (training). A disc drawing beside one italic sentence in Soft Ink, framed by hairlines above and below.
- **Pending tag:** a small Bricolage 0.8rem pill with a dashed Soft Ink border, placed after the note of a destination that has no link yet. A pending destination renders as a plain block, not a link, and gets no hover state.

### Destination cards
- **Style:** a 1px hairline border, 28px radius, 1.25rem 1.5rem padding. Disc drawing on the left, title and note in the middle, a 1.8rem stroked arrow pushed to the right.
- **Hover (linked only):** border turns cyan and the fill becomes cyan-wash (0.35s ease-out); the arrow moves 4px to the right.

### Training card with plate
- The software card pattern, reused for each course: a plate drawing of the course subject, the title as a link to the course material, a summary in Literata, the languages the material is published in as metadata, then links to the course material and the source repository.

### Publications page
- A heading block beside a large disc drawing (the paper stack), with the count, the data source and a link to the Google Scholar profile in label type.
- One row per year, separated by hairlines: the year in Title, destination type and Soft Ink on the left (sticky on desktop), the entries on the right, max 46rem wide.
- Each entry: title in Literata 560 (linked to the DOI, underline appears on hover), authors in Soft Ink with the owner's name set in Ink at weight 620 (no cyan band, which would read as a link), then the type in Label small, the venue in italic, and an "open version" link when one exists.
- On narrow screens the year sits above its entries.

### CV page
- A header with the portrait at 5.5 to 7.5rem, the name in Headline, the role with the highlighter mark, contact links in label type, and two outlined pill buttons for the PDFs (hover: cyan border and wash).
- Sections as hairline-separated rows: dates in a 9rem Soft Ink label column, then the entry (title in Bricolage 650, position and place in Soft Ink, items with cyan markers, paragraphs in Literata, max 46rem). Skills use a 13rem term column. Activities and teaching use three columns: dates, role and title, place aligned right.
- Print (the web PDF): A4 with 14mm margins, 9.5pt base size, navigation, footer and download buttons hidden, rows kept whole across pages.
- The classic PDF is a separate artefact in the owner's original Awesome-CV layout (Source Sans 3 and Roboto, accent #327C8C, header links #6CE0F1); it does not follow this design system.

### Pencil drawings (signature)
Every drawing is an inline SVG generated at build time. There are no raster illustrations.

- **Strokes:** three weights. Regular lines are 1.35 in Graphite. Heavy lines, the subject's key element (the refinement front, contact points, the lattice centre), are 2.3 in Ink. Faint lines, for construction grids, ground hatching and text lines, are 1.0 at 45% opacity. All caps and joins are round.
- **Grain filter:** one shared SVG filter applied to each drawing. A low-frequency fractal noise (base frequency 0.035, 2 octaves) displaces the strokes by 2.4 units for a slight hand wobble. A high-frequency noise (base frequency 1.35) is turned into an alpha mask that breaks strokes up like graphite on paper.
- **Hatching:** filled regions use a shared pattern of cyan lines, 2.6 wide on a 5.5-unit spacing, rotated 38 degrees. The pattern uses the literal portrait cyan in both schemes.
- **Deterministic jitter:** each subject seeds its own linear congruential generator, so every build draws the same sketch. Lines are slightly bowed quadratic curves that overshoot their ends by up to 3 units (4% of length). Circles are one polyline that sweeps a little past a full turn. Arrows are a stroke plus two short flicks.
- **Subjects:** each drawing shows what the software computes (a quadtree refined along a circular front, a pile of spheres in contact with one falling, a D2Q9 lattice node with nine velocities) or what the destination is (a board on an easel, a page with a folded corner, a stack of papers).
- **Draw-on:** when a drawing crosses 35% visibility, its strokes trace in over 1.1s with the ease-out curve, staggered by min(40ms, 1400ms / stroke count). The hatching fades in over 0.9s after a 0.9s delay, so colour follows line. Each drawing draws once.
- **Reduced motion:** the draw-on only runs when the `motion` class is set on the root, which happens only without `prefers-reduced-motion: reduce`. Otherwise, and when scripts fail, drawings render complete and static. Smooth scrolling is also turned off under reduced motion.

## Do's and Don'ts

### Do:
- **Do** draw every new project or destination as a code-generated pencil sketch with the shared filter, the three stroke weights and the 38-degree cyan hatch, seeded so it renders the same on every build.
- **Do** draw what the thing computes or is, as a technical diagram, not a logo or a pictogram.
- **Do** frame large drawings in a mist plate (28px radius, 320:220) and small ones in a 5.5rem mist disc.
- **Do** keep cyan to underlines, hatching, the highlighter band and hover states, per The One Pencil Rule.
- **Do** set reading text in Literata and names, headings and labels in Bricolage Grotesque.
- **Do** render missing facts as a pending row or a dashed pending tag, and omit missing metadata rather than inventing it.
- **Do** keep drawings complete and static under reduced motion, and animate only by adding motion on top of a finished drawing.
- **Do** use the single ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)) for every transition.

### Don't:
- **Don't** use skeuomorphic or retro office materials (index cards, cabinets, paper textures, typewriter faces). The owner rejected that world.
- **Don't** add raster illustrations, stock imagery or icon-font glyphs next to the drawings. The only raster is the owner's avatar.
- **Don't** put a shadow on a surface at rest, or use any shadow other than the plate lift.
- **Don't** fill buttons, panels or sections with cyan or add a second accent colour.
- **Don't** give the navigation a bar, a background or a sticky frame.
- **Don't** make destination cards that have no link respond to hover.
