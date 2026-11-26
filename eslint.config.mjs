// The Nuxt rules are written by @nuxt/eslint when `nuxt prepare` runs.
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Plain browser scripts of the admin page, not part of the Nuxt app.
  { ignores: ['public/admin/**'] },
)
