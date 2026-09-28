// The Awesome-CV LaTeX source of the CV, built from the same Markdown files as the CV page.
// src/pages/[lang]/cv.tex.ts serves it; scripts/build-cv.mjs turns it into a PDF.

import type { CollectionEntry } from 'astro:content';
import type { MdastNode } from 'satteri';
import { publications } from '../data/publications';
import { ui, type Lang } from '../i18n';
import { entries, parse, single } from './content';

// Colours measured on the owner's original PDF: section and location accent, header links.
const ACCENT = '327C8C';
const SOCIAL = '6CE0F1';

// Keep a section title with the start of its content instead of stranding it at a page bottom.
const heading = (title: string) => `\\needspace{6\\baselineskip}\n\\cvsection{${tex(title)}}\n`;

const TEX_SPECIALS: Record<string, string> = { '\\': '\\textbackslash{}', '&': '\\&', '%': '\\%', $: '\\$', '#': '\\#', _: '\\_', '{': '\\{', '}': '\\}', '~': '\\textasciitilde{}', '^': '\\textasciicircum{}' };
const tex = (s: string | number) => String(s).replace(/[\\&%$#_{}~^]/g, (c) => TEX_SPECIALS[c]);

const href = (url: string) => url.replace(/[%#]/g, (c) => `\\${c}`);

type Node = MdastNode & { children?: Node[]; value?: string; url?: string };

function inline(node: Node, file: string): string {
  const inner = () => (node.children ?? []).map((c) => inline(c, file)).join('');
  switch (node.type) {
    case 'text':
      return tex(node.value!);
    case 'strong':
      return `\\textbf{${inner()}}`;
    case 'emphasis':
      return `\\textit{${inner()}}`;
    case 'inlineCode':
      return `\\texttt{${tex(node.value!)}}`;
    case 'link':
      return `\\href{${href(node.url!)}}{${inner()}}`;
    case 'break':
      return '\\newline{}';
    default:
      throw new Error(`${file}: the PDF CV does not support Markdown "${node.type}" elements.`);
  }
}

const paragraph = (node: Node, file: string) => (node.children ?? []).map((c) => inline(c, file)).join('');

// A Markdown body as LaTeX: paragraphs, and bullet lists as cvitems.
function body(entry: CollectionEntry<'cvExperience' | 'cvEducation' | 'cvProjects' | 'cvSkills' | 'cvHobbies'>) {
  const file = entry.filePath ?? entry.id;
  const blocks = (parse(entry.body ?? '') as Node).children ?? [];
  const latex = blocks.map((block) => {
    if (block.type === 'paragraph') return paragraph(block, file);
    if (block.type === 'list') {
      const items = (block.children ?? []).map((item) => `  \\item {${(item.children ?? []).map((p) => paragraph(p, file)).join(' ')}}`);
      return `\\begin{cvitems}\n${items.join('\n')}\n\\end{cvitems}`;
    }
    throw new Error(`${file}: the PDF CV supports paragraphs and bullet lists, not "${block.type}".`);
  });
  // Consecutive paragraphs go on separate lines; a list starts its own.
  return latex.map((l, i) => (i && blocks[i - 1].type === 'paragraph' && blocks[i].type === 'paragraph' ? `\\newline\n${l}` : l)).join('\n');
}

async function cvEntries(collection: 'cvExperience' | 'cvEducation' | 'cvProjects', title: string, lang: Lang) {
  const rows = (await entries(collection, lang)).map((entry) => {
    const e = entry.data;
    const org = e.url && e.location ? `\\href{${href(e.url)}}{${tex(e.org)}}` : tex(e.org);
    // Repository URLs print without their scheme so they fit the location column.
    const place = e.location ? tex(e.location) : `\\href{${href(e.url!)}}{${tex(e.url!.replace(/^https?:\/\//, ''))}}`;
    return `\\cventry{${tex(e.position)}}{${org}}{${place}}{${tex(e.dates)}}{${body(entry)}}`;
  });
  return `${heading(title)}\n\\begin{cventries}\n${rows.join('\n\n')}\n\\end{cventries}`;
}

const honors = (list: CollectionEntry<'cvActivities' | 'cvTeaching'>[]) =>
  `\\begin{cvhonors}\n${list
    .map(({ data: h }) => `\\cvhonor{${tex(h.position)}}{${tex(h.title)}}{${tex(h.location)}}{${tex(h.dates)}}`)
    .join('\n')}\n\\end{cvhonors}`;

async function skills(title: string, lang: Lang) {
  const rows = (await entries('cvSkills', lang)).map((s) => `\\cvskill{${tex(s.data.title)}}{${body(s)}}`);
  return `${heading(title)}\n\\begin{cvskills}\n${rows.join('\n')}\n\\end{cvskills}`;
}

const TYPES: Record<Lang, Record<string, string>> = {
  fr: { preprint: 'Prépublication', report: 'Rapport', 'book-chapter': 'Chapitre', 'conference-paper': 'Communication' },
  en: { preprint: 'Preprint', report: 'Report', 'book-chapter': 'Chapter', 'conference-paper': 'Conference paper' },
};

function papers(title: string, lang: Lang) {
  const rows = publications.map((p) => {
    const authors = p.authors.map((a) => (a.self ? `\\textbf{${tex(a.name)}}` : tex(a.name))).join(', ');
    const kind = TYPES[lang][p.type];
    const venue = [kind, p.venue].filter((s): s is string => Boolean(s)).map(tex).join(', ');
    const link = p.doi ?? p.open;
    const paperTitle = link ? `\\href{${href(link)}}{${tex(p.title)}}` : tex(p.title);
    return `\\cventry{${authors}}{${paperTitle}}{${p.year}}{}{${venue}}`;
  });
  // The titles are in English, so they use English punctuation even in the French CV.
  const list = `\\begin{cventries}\n${rows.join('\n\\vspace{1.6mm}\n')}\n\\end{cventries}`;
  return `${heading(title)}\n${lang === 'fr' ? `\\begin{otherlanguage}{english}\n${list}\n\\end{otherlanguage}` : list}`;
}

// Formatted here rather than with \\today, which would follow the English publication block in the French CV.
const footerDate = (lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

export async function cvTex(lang: Lang) {
  const titles = ui[lang].cvSections;
  const h = (await single('profile', lang)).data;
  const teaching = await entries('cvTeaching', lang);
  const teachingGroups = [
    { title: titles.teachingInitial, entries: teaching.filter((e) => e.data.group === 'initial') },
    { title: titles.teachingContinuing, entries: teaching.filter((e) => e.data.group === 'continuing') },
  ]
    .map((g) => `\\cvsubsection{${tex(g.title)}}\n\n${honors(g.entries)}`)
    .join('\n');
  return `% Generated by src/lib/cv-tex.ts from the Markdown files in src/content. Do not edit.
\\documentclass[11pt, a4paper]{awesome-cv}
\\geometry{left=1.4cm, top=.8cm, right=1.4cm, bottom=1.8cm, footskip=.5cm}
\\definecolor{cvaccent}{HTML}{${ACCENT}}
\\colorlet{awesome}{cvaccent}
\\definecolor{cvsocial}{HTML}{${SOCIAL}}
\\renewcommand*{\\headersocialstyle}[1]{{\\fontsize{6.8pt}{1em}\\headerfont\\color{cvsocial} #1}}
\\renewcommand{\\acvHeaderSocialSep}{\\BeginAccSupp{ActualText={}}\\quad{\\color{lighttext}\\textbar}\\quad\\EndAccSupp{}}
\\usepackage{needspace}
% Wider date and location columns than the class default, so dates like "2017 - 2019, 2024" and places stay on one line.
\\renewenvironment{cvhonors}{%
  \\vspace{\\acvSectionContentTopSkip}\\vspace{-2mm}
  \\begin{center}\\setlength\\tabcolsep{0pt}\\setlength{\\extrarowheight}{0pt}
  \\begin{tabular*}{\\textwidth}{@{\\extracolsep{\\fill}} L{2.8cm} L{\\textwidth - 6.3cm} R{3.5cm}}
}{\\end{tabular*}\\end{center}}
% Same entry as the class, with a 5.6cm location column so repository links fit on one line.
\\renewcommand*{\\cventry}[5]{%
  \\vspace{-2.0mm}\\setlength\\tabcolsep{0pt}\\setlength{\\extrarowheight}{0pt}
  \\begin{tabular*}{\\textwidth}{@{\\extracolsep{\\fill}} L{\\textwidth - 5.6cm} R{5.6cm}}
    \\ifempty{#2#3}
      {\\entrypositionstyle{#1} & \\entrydatestyle{#4} \\\\}
      {\\entrytitlestyle{#2} & \\entrylocationstyle{#3} \\\\
      \\entrypositionstyle{#1} & \\entrydatestyle{#4} \\\\}
    \\ifstrempty{#5}{}{\\multicolumn{2}{L{\\textwidth}}{\\descriptionstyle{#5}} \\\\}
  \\end{tabular*}%
}
\\setbool{acvSectionColorHighlight}{true}
\\usepackage[english, ${lang === 'fr' ? 'main=french' : 'main=english'}]{babel}

\\photo[circle,noedge,left]{loic_small.png}
\\name{${tex(h.givenName)}}{${tex(h.familyName)}}
\\position{${tex(h.role)}}
\\email{${tex(h.email)}}
\\github{${tex(h.github)}}
\\linkedin{${tex(h.linkedin)}}
\\x{${tex(h.x)}}

\\begin{document}
\\makecvheader[R]
\\makecvfooter{${tex(footerDate(lang))}}{${tex(h.givenName)} ${tex(h.familyName)}~~~·~~~Curriculum Vitae}{\\thepage}

${await cvEntries('cvExperience', titles.experience, lang)}

${await skills(titles.skills, lang)}

${await cvEntries('cvEducation', titles.education, lang)}

${await cvEntries('cvProjects', titles.projects, lang)}

${heading(titles.activities)}
${honors(await entries('cvActivities', lang))}

${heading(titles.teaching)}
${teachingGroups}

${papers(titles.publications, lang)}

${heading(titles.hobbies)}
\\begin{cvparagraph}
${body(await single('cvHobbies', lang))}
\\end{cvparagraph}

\\end{document}
`;
}
