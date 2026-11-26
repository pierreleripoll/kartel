import { encodeParam, encodePath, joinURL } from 'ufo'
import { createOperationsGenerator, defineProvider } from '@nuxt/image/runtime'

// The IPX provider of @nuxt/image, with URLs that Cloudflare static assets
// serves well. The format of the URL and the reasons are in kit/image-url.ts.
// The route server/routes/_img answers these URLs with IPX.
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: 'f',
    width: 'w',
    height: 'h',
    resize: 's',
    quality: 'q',
    background: 'b',
    position: 'pos',
  },
  joinWith: '~',
  formatter: (key: string, value: string | number) => encodeParam(key) + '_' + encodeParam(value.toString()),
})

export default defineProvider({
  validateDomains: true,
  supportsAlias: true,
  getImage: (src, { modifiers }, ctx) => {
    const operations = { ...modifiers } as Record<string, string | number | boolean>
    if (operations.width && operations.height) {
      operations.resize = `${operations.width}x${operations.height}`
      delete operations.width
      delete operations.height
    }
    const params = operationsGenerator(operations) || '_'
    const extension = operations.format ? `.${operations.format}` : ''
    return {
      url: joinURL(ctx.options.nuxt.baseURL, '/_img', params, encodePath(src) + extension),
    }
  },
})
