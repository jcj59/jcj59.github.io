# jackjansons — personal website

Static site built with [Astro](https://astro.build), served by Cloudflare Workers.
Live at https://jackjansons-dev.hf-worker.workers.dev (moving to https://jackjansons.dev).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + build to dist/
npm run preview   # serve dist/
```

## Where things live

| What | Where |
|---|---|
| Name, hero lines, nav, socials, palette, sections | `src/site.config.ts` |
| About text | `src/content/about.md` |
| Projects / research entries (one Markdown file each) | `src/content/projects/`, `src/content/research/` |
| Images (optimized at build) | `src/assets/images/` |
| Résumé PDF, fonts, looping videos | `public/` |

### Adding a project

Create `src/content/projects/<slug>.md`. The frontmatter schema is in `src/content.config.ts`:
`title`, `summary` (card), `tagline` (detail page subtitle), optional `context`, `image`,
`imageAlt`, optional `video` (path under `public/`, plays in place of the image), `links`, and
`order`. Anything written below the frontmatter becomes the write-up on the detail page. Set
`draft: true` to hide an entry.

## Motion

- Page transitions use the View Transitions API through Astro's `<ClientRouter />`; a card's image
  morphs into the detail page's hero image.
- Elements with `data-reveal` fade up when they scroll into view (`src/layouts/Base.astro`).
- Hero letters, the drifting background light, and the header's hide-on-scroll are plain CSS/TS.
- The header is transparent over any `[data-ink-hero]` section (so the hero's glow runs behind it
  seamlessly), blurs once content scrolls under it, turns white on hover, and turns white once past
  the hero (`src/components/Header.astro`); same-page and cross-page `#section` links ease-scroll
  (`src/lib/smooth-scroll.ts`).
- Everything respects `prefers-reduced-motion`.

## Deploy

The site is a Cloudflare Worker that serves `dist/` as static assets (`wrangler.jsonc`), deployed by
Cloudflare Workers Builds:

- A push to `main` builds (`npm run build`) and deploys (`npx wrangler deploy`).
- Any other branch gets a preview URL (`npx wrangler versions upload`), linked from its PR.
- Node 22 is pinned in `.node-version` so Cloudflare's build matches local.

Manual fallback: `npm run deploy` builds and deploys from your machine.
