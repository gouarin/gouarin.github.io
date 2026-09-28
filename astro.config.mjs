import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are set by the deploy workflow from the GitHub Pages configuration.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  vite: {
    // Pin the tsconfig: otherwise Vite looks for one starting above the project root and,
    // in a worktree nested in the main checkout, picks up the main checkout's tsconfig.
    tsconfig: 'tsconfig.json',
  },
});
