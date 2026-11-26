import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, sep } from 'node:path'

// The image URLs of the kit:
//
//   /_img/f_webp~q_80~s_800x533/uploads/photo.jpg.webp
//
// It is the IPX URL (/_ipx/f_webp&q_80&s_800x533/uploads/photo.jpg) with two
// changes, both for Cloudflare static assets:
// - "~" between the modifiers. A path with "&" or "," gets a redirect to its
//   encoded form first, so each image costs one more request.
// - the format at the end. The type of the file comes from its extension, and
//   "photo.jpg" with WebP inside is sent as image/jpeg.
//
// Written by providers/static-ipx.ts, read by server/routes/_img and by
// modules/ipx-cache.ts.

export const IMAGE_BASE = '/_img'
const SEPARATOR = '~'

export interface ImageRequest {
  /** The same request for IPX: "/_ipx/f_webp,q_80/uploads/photo.jpg". */
  ipxUrl: string
  /** Path of the source in public/, decoded: "uploads/photo.jpg". */
  source: string
  /** "webp", "jpeg"... when the URL says it. */
  format?: string
}

/** Undefined when the URL is not an image URL of the kit. */
export function parseImageUrl(url: string): ImageRequest | undefined {
  const path = url.split(/[?#]/)[0] ?? ''
  if (!path.startsWith(`${IMAGE_BASE}/`)) return undefined
  const request = path.slice(IMAGE_BASE.length + 1)
  const slash = request.indexOf('/')
  if (slash < 0) return undefined

  const modifiers = request.slice(0, slash).split(SEPARATOR)
  const format = modifiers.find(modifier => modifier.startsWith('f_'))?.slice(2)
  let encodedSource = request.slice(slash + 1)
  if (format && encodedSource.endsWith(`.${format}`)) {
    encodedSource = encodedSource.slice(0, -format.length - 1)
  }

  let source: string
  try {
    source = decodeURIComponent(encodedSource)
  }
  catch {
    return undefined
  }
  if (!source || source.split('/').includes('..')) return undefined

  return {
    ipxUrl: `/_ipx/${modifiers.join(',')}/${encodedSource}`,
    source,
    format,
  }
}

const sourceHashes = new Map<string, string | undefined>()

function sourceHash(file: string): string | undefined {
  if (!sourceHashes.has(file)) {
    sourceHashes.set(
      file,
      existsSync(file) ? createHash('sha1').update(readFileSync(file)).digest('hex') : undefined,
    )
  }
  return sourceHashes.get(file)
}

/**
 * Where a derived image is kept in .ipx-cache/. The key has the hash of the
 * source file: a replaced image under the same name gets a new key, so the
 * old derived image is never served. Undefined when the source does not exist.
 */
export function imageCacheFile(request: ImageRequest, rootDir: string): string | undefined {
  const publicDir = resolve(rootDir, 'public')
  const file = resolve(publicDir, request.source)
  if (!file.startsWith(publicDir + sep)) return undefined
  const hash = sourceHash(file)
  if (!hash) return undefined
  const key = createHash('sha1').update(request.ipxUrl).update(hash).digest('hex')
  return resolve(rootDir, '.ipx-cache', request.format ? `${key}.${request.format}` : key)
}
