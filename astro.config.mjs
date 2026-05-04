// @ts-check
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The custom domain for the portfolio
  site: 'https://nicholasheadlong.co.uk',
  // No base needed since we use a custom domain mapped to the root
  base: '/',

  integrations: [sitemap()],
})