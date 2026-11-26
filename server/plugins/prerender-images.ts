import { defineNitroPlugin } from 'nitropack/runtime'

// At prerender, tells Nitro to also generate each image of the page.
// The crawler only follows links, and @nuxt/image only does this for its own
// /_ipx/ URLs, not for the /_img/ URLs of the kit (kit/image-url.ts).
export default defineNitroPlugin((nitro) => {
  if (!import.meta.prerender) return

  nitro.hooks.hook('render:response', (response) => {
    if (typeof response.body !== 'string') return
    const urls = new Set(response.body.match(/\/_img\/[^\s"'<>,)]+/g))
    if (urls.size === 0) return

    const headers = (response.headers ||= {})
    const before = headers['x-nitro-prerender']
    headers['x-nitro-prerender'] = [
      ...(before ? [String(before)] : []),
      ...[...urls].map(url => encodeURIComponent(url)),
    ].join(', ')
  })
})
