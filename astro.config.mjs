import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are set by the deploy workflow from the GitHub Pages configuration.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
});
