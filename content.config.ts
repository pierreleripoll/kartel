import { defineCollection, defineContentConfig } from '@nuxt/content'
import { newsSchema, pageSchema } from './content.schemas'

// One folder per language, with the same file names in the two: the CMS shows
// the French file and the German file of a page side by side.
// The German URLs have German words (/de/nachhaltigkeit is
// content/de/durabilite.md). app/utils/i18n.ts goes from one to the other.
export default defineContentConfig({
  collections: {
    // content/fr/index.md, content/de/tandem.md
    pages: defineCollection({
      type: 'page',
      // One entry per language: Nuxt Content does not read a {fr,de} pattern well.
      source: [{ include: 'fr/*.md' }, { include: 'de/*.md' }],
      schema: pageSchema,
    }),
    // content/fr/actualites/<slug>.md and content/de/actualites/<slug>.md:
    // the same news item in the two languages.
    news: defineCollection({
      type: 'page',
      source: [{ include: 'fr/actualites/*.md' }, { include: 'de/actualites/*.md' }],
      schema: newsSchema,
    }),
  },
})
