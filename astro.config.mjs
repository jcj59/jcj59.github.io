// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/site.config';

export default defineConfig({
  site: site.url,
  prefetch: { prefetchAll: true },
  // Write /research as research.html rather than research/index.html, so Cloudflare serves
  // the slash-less URLs the site links to without a redirect.
  build: { format: 'file' },
});
