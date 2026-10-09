// @ts-check
import { defineConfig } from 'astro/config';

// Hosted on GitHub Pages as a project site. If a custom domain is added later,
// set SITE to it and BASE to '/'.
const SITE = process.env.SITE ?? 'https://joshualobert.github.io';
const BASE = process.env.BASE ?? '/bvn-mens-volleyball';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
