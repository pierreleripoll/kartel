import { createReadStream, existsSync } from 'node:fs'
import { createError, defineEventHandler, sendStream, setResponseHeader } from 'h3'
import { imageCacheFile, parseImageUrl } from '../../../kit/image-url'

// Answers the image URLs of the kit (see kit/image-url.ts): from
// .ipx-cache/ when a build already made the image, else from IPX.
// Used in dev and at prerender only: in production the images are static files.
export default defineEventHandler(async (event) => {
  const request = parseImageUrl(event.path)
  if (!request) throw createError({ statusCode: 404, message: 'Not an image URL' })

  if (request.format) {
    setResponseHeader(event, 'content-type', `image/${request.format === 'jpg' ? 'jpeg' : request.format}`)
  }

  const cached = imageCacheFile(request, process.cwd())
  if (cached && existsSync(cached)) return sendStream(event, createReadStream(cached))

  const image = await event.$fetch<ArrayBuffer>(request.ipxUrl, { responseType: 'arrayBuffer' })
  return Buffer.from(image)
})
