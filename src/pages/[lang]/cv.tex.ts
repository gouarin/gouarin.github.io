// The LaTeX source of the PDF CV. scripts/build-cv.mjs compiles it and removes it from the published site.
import type { APIRoute, GetStaticPaths } from 'astro';
import { langs, type Lang } from '../../i18n';
import { cvTex } from '../../lib/cv-tex';

export const getStaticPaths = (() => langs.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) =>
  new Response(await cvTex(params.lang as Lang), { headers: { 'Content-Type': 'application/x-tex; charset=utf-8' } });
