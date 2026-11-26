import { createHash } from 'node:crypto'
import { existsSync, watch } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve, sep } from 'node:path'
import { addTemplate, addTypeTemplate, defineNuxtModule, updateTemplates } from '@nuxt/kit'
import sharp from 'sharp'
import { rgbaToThumbHash } from 'thumbhash'

// Builds one manifest { "/uploads/photo.jpg": { width, height, thumbhash } }
// from the image files, at each build. Nothing is written in the content, so
// the values can't be stale when an editor replaces an image.
// Read it with useImageMeta() or <ThumbhashImage>.

export interface ImageMeta {
  width: number
  height: number
  /** base64. Not set for SVG. */
  thumbhash?: string
}

export interface ModuleOptions {
  /** Folders to scan, relative to public/. */
  dirs: string[]
}

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'])
const TEMPLATE = 'image-meta.mjs'

async function listFiles(dir: string): Promise<string[]> {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })
  return entries
    .filter(entry => entry.isFile() && EXTENSIONS.has(extname(entry.name).toLowerCase()))
    .map(entry => join(entry.parentPath, entry.name))
    .sort()
}

async function measure(buffer: Buffer, isSvg: boolean): Promise<ImageMeta> {
  const image = sharp(buffer, { failOn: 'none' })
  const meta = await image.metadata()
  // EXIF orientation 5 to 8 means the browser shows the image turned by 90°.
  const turned = (meta.orientation ?? 1) >= 5
  const width = turned ? meta.height : meta.width
  const height = turned ? meta.width : meta.height
  if (!width || !height) throw new Error('no width or height')
  if (isSvg) return { width, height }

  // thumbhash accepts 100 x 100 at most.
  const { data, info } = await image
    .rotate()
    .resize(100, 100, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const hash = rgbaToThumbHash(info.width, info.height, data)
  return { width, height, thumbhash: Buffer.from(hash).toString('base64') }
}

export default defineNuxtModule<ModuleOptions>({
  meta: { name: 'image-meta', configKey: 'imageMeta' },
  defaults: { dirs: ['uploads'] },
  setup(options, nuxt) {
    const publicDir = resolve(nuxt.options.rootDir, nuxt.options.dir.public)
    const dirs = options.dirs.map(dir => resolve(publicDir, dir))
    // Keyed by the hash of the file: a file that did not change is not measured again.
    const cacheFile = resolve(nuxt.options.rootDir, 'node_modules/.cache/site-kit/image-meta.json')
    let cache: Record<string, ImageMeta> | undefined

    async function buildManifest(): Promise<Record<string, ImageMeta>> {
      if (!cache) {
        cache = existsSync(cacheFile) ? JSON.parse(await readFile(cacheFile, 'utf8')) : {}
      }
      const manifest: Record<string, ImageMeta> = {}
      const used: Record<string, ImageMeta> = {}
      const problems: string[] = []

      for (const dir of dirs) {
        for (const file of await listFiles(dir)) {
          const buffer = await readFile(file)
          const hash = createHash('sha1').update(buffer).digest('hex')
          try {
            const meta = cache![hash] ?? await measure(buffer, extname(file).toLowerCase() === '.svg')
            used[hash] = meta
            manifest['/' + relative(publicDir, file).split(sep).join('/')] = meta
          }
          catch (error) {
            problems.push(`${relative(nuxt.options.rootDir, file)}: ${(error as Error).message}`)
          }
        }
      }

      if (problems.length) {
        const message = `image-meta: can't read ${problems.length} image(s):\n${problems.join('\n')}`
        if (!nuxt.options.dev) throw new Error(message)
        console.warn(message)
      }

      cache = used
      await mkdir(dirname(cacheFile), { recursive: true })
      await writeFile(cacheFile, JSON.stringify(used))
      return manifest
    }

    const template = addTemplate({
      filename: TEMPLATE,
      write: true,
      getContents: async () => `export default ${JSON.stringify(await buildManifest(), null, 1)}\n`,
    })
    nuxt.options.alias['#image-meta'] = template.dst

    addTypeTemplate({
      filename: 'types/image-meta.d.ts',
      getContents: () => `declare module '#image-meta' {
  export interface ImageMeta { width: number, height: number, thumbhash?: string }
  const manifest: Record<string, ImageMeta>
  export default manifest
}
`,
    })

    // In dev, a new or changed image updates the manifest.
    if (nuxt.options.dev) {
      let timer: NodeJS.Timeout | undefined
      const watchers = dirs.filter(existsSync).map(dir =>
        watch(dir, { recursive: true }, () => {
          clearTimeout(timer)
          timer = setTimeout(() => updateTemplates({ filter: t => t.filename === TEMPLATE }), 200)
        }),
      )
      nuxt.hook('close', () => {
        clearTimeout(timer)
        watchers.forEach(watcher => watcher.close())
      })
    }
  },
})
