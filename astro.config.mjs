// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/site.config';

export default defineConfig({
  site: site.url,
  prefetch: { prefetchAll: true },
});
