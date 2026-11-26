import { defineCollection, defineContentConfig } from '@nuxt/content'
import { newsSchema, pageSchema } from './content.schemas'

// One folder per language. The path of a file is its URL:
// content/de/nachhaltigkeit.md -> /de/nachhaltigkeit
// The URLs of the two languages are listed in app/utils/i18n.ts.
export default defineContentConfig({
  collections: {
    // content/fr/index.md -> /fr, content/fr/tandem.md -> /fr/tandem
    pages: defineCollection({
      type: 'page',
      // One entry per language: Nuxt Content does not read a {fr,de} pattern well.
      source: [{ include: 'fr/*.md' }, { include: 'de/*.md' }],
      schema: pageSchema,
    }),
    // content/fr/actualites/<slug>.md -> /fr/actualites/<slug>
    // content/de/aktuelles/<slug>.md -> /de/aktuelles/<slug>
    news: defineCollection({
      type: 'page',
      source: [{ include: 'fr/actualites/*.md' }, { include: 'de/aktuelles/*.md' }],
      schema: newsSchema,
    }),
  },
})
