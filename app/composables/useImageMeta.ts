import manifest from '#image-meta'
import type { ImageMeta } from '#image-meta'

/** True for a file of the site (not a blob:, data: or http(s): URL). */
export function isLocalImage(src: string): boolean {
  return !/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(src)
}

/**
 * The path of a local image as it is in the manifest.
 * "photo.jpg" (old content, no folder) means "/uploads/photo.jpg".
 */
export function resolveImageSrc(src: string): string {
  if (!isLocalImage(src)) return src
  const path = src.split(/[?#]/)[0] ?? src
  return path.startsWith('/') ? path : `/uploads/${path}`
}

/** Width, height and thumbhash of a local image. Undefined if the file is not known. */
export function useImageMeta(src: string | undefined): ImageMeta | undefined {
  if (!src || !isLocalImage(src)) return undefined
  const path = resolveImageSrc(src)
  if (manifest[path]) return manifest[path]
  try {
    return manifest[decodeURI(path)]
  }
  catch {
    return undefined
  }
}
