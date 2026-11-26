import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'
import { imageCacheFile, parseImageUrl } from '../kit/image-url'

// Keeps each derived image made at prerender in .ipx-cache/. The next build
// gets it back from server/routes/_img and does not encode it again.
// In CI, keep .ipx-cache/ between the runs (actions/cache).
export default defineNuxtModule({
  meta: { name: 'ipx-cache' },
  setup(_, nuxt) {
    if (nuxt.options.dev) return

    nuxt.hook('nitro:init', (nitro) => {
      nitro.hooks.hook('prerender:generate', async (route) => {
        if (route.error || !route.data) return
        const request = parseImageUrl(route.route)
        const file = request && imageCacheFile(request, nuxt.options.rootDir)
        if (!file || existsSync(file)) return
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, new Uint8Array(route.data))
      })
    })
  },
})
