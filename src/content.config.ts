import { defineCollection, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { site } from './site.config';

const schema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    /** One or two sentences for the card. */
    summary: z.string(),
    /** Subtitle on the detail page. */
    tagline: z.string(),
    /** Where/why it was done, e.g. a course or an advisor. */
    context: z.string().optional(),
    image: image(),
    imageAlt: z.string(),
    /** Optional looping video (path under public/) shown in place of the still image. */
    video: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
    /** Lower sorts first. */
    order: z.number(),
    draft: z.boolean().default(false),
  });

// One collection per configured section, read from src/content/<id>/*.md.
export const collections = Object.fromEntries(
  site.sections.map((s) => [
    s.id,
    defineCollection({ loader: glob({ pattern: '**/*.md', base: `./src/content/${s.id}` }), schema }),
  ]),
);
