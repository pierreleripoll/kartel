import { defineNuxtModule } from '@nuxt/kit'
import { z } from 'zod'

interface CheckContext {
  /** Name of the collection. */
  collection: string
  /** Id of the file, for example "projets/projets/exemple.md". */
  file: string
  /** The parsed content, valid for the schema. */
  content: Record<string, unknown>
}

/**
 * Makes a Nuxt module that checks each content file against the Zod schema of
 * its collection. Nuxt Content alone only skips a bad file with a warning.
 * With this module `nuxt generate` fails. In dev the server stays up and the
 * error shows in the terminal.
 *
 * In the site, modules/validate-content.ts:
 *
 *   import { defineValidateContent } from '../kit/validate-content'
 *   import { schemas } from '../content.schemas'
 *   export default defineValidateContent(schemas)
 *
 * `check` is for rules that a schema can't say. It returns the problem as
 * text, or nothing.
 */
export function defineValidateContent(
  schemas: Record<string, z.ZodType>,
  check?: (context: CheckContext) => string | undefined,
) {
  return defineNuxtModule({
    meta: { name: 'validate-content' },
    setup(_, nuxt) {
      const errors = new Map<string, string>()

      // The hook comes from @nuxt/content.
      nuxt.hook('content:file:afterParse' as never, (({ file, collection, content }: {
        file: { id: string }
        collection: { name: string }
        content: Record<string, unknown>
      }) => {
        const schema = schemas[collection.name]
        if (!schema) return
        const result = schema.safeParse(content)
        const problem = result.success
          ? check?.({ collection: collection.name, file: file.id, content })
          : z.prettifyError(result.error)

        if (!problem) {
          errors.delete(file.id)
          return
        }
        const message = `${file.id}\n${problem}`
        errors.set(file.id, message)
        throw new Error(message)
      }) as never)

      nuxt.hook('build:before', () => {
        if (nuxt.options.dev || errors.size === 0) return
        throw new Error(`Invalid content (${errors.size} file(s)):\n\n${[...errors.values()].join('\n\n')}`)
      })
    },
  })
}
