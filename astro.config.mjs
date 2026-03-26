// @ts-check
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Uncomment `base` if deploying to a subpath like https://user.github.io/portfolio
  site: 'https://nich-mctishe.github.io',
  // base: '/portfolio',

  integrations: [sitemap()],
})