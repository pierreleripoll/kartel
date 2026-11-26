import { defineValidateContent } from '../kit/validate-content'
import { schemas } from '../content.schemas'

// `nuxt generate` fails when a content file does not match its schema.
export default defineValidateContent(schemas)
