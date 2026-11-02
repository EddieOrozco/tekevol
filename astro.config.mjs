// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tekevol.com',
  // Pages build to services.html; hosts like Netlify, Cloudflare Pages and
  // Vercel (cleanUrls) serve it at /services. Links never end in a slash.
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Keep utility pages out of Google's sitemap
      filter: (page) => !/\/(thank-you|404)\/?$/.test(page),
    }),
  ],
});
