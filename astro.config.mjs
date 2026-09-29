import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the deploy workflow from the GitHub Pages configuration.
// The site is served over HTTPS, so canonical and hreflang URLs use https even if the origin comes back as http.
const site = (process.env.SITE_URL || 'https://gouarin.github.io').replace(/^http:\/\//, 'https://');

export default defineConfig({
  site,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // The root page only redirects to /fr/ or /en/, and cv.tex is the LaTeX source of the PDF CV.
      filter: (page) => new URL(page).pathname.split('/').filter(Boolean).length > 0 && !page.endsWith('.tex'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr', en: 'en' } },
    }),
  ],
  vite: {
    // Pin the tsconfig: otherwise Vite looks for one starting above the project root and,
    // in a worktree nested in the main checkout, picks up the main checkout's tsconfig.
    tsconfig: 'tsconfig.json',
  },
});
