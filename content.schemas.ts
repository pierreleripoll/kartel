import { z } from 'zod'
import { imageSchema } from './kit/schemas'

// One schema per collection. Used by content.config.ts (types, queries) and by
// modules/validate-content.ts (the build fails on a bad file).
// Keep it the same as the fields in public/admin/config.yml.

/** content/fr/<page>.md and content/de/<page>.md. The body is the text of the page. */
export const pageSchema = z.object({
  // The title of the browser tab and of Google. It is not shown in the page.
  title: z.string().min(1),
  description: z.string().optional(),
})

/** content/fr/actualites/<slug>.md and content/de/aktuelles/<slug>.md. The body is the article. */
export const newsSchema = z.object({
  title: z.string().min(1),
  // The day of the article, "2026-11-25". The list shows the last one first.
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string().optional(),
  // `credit` is shown under the photo, for example "© Anaël Antille".
  image: imageSchema.optional(),
})

export const schemas = {
  pages: pageSchema,
  news: newsSchema,
}
