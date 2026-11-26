#!/usr/bin/env node
// Makes the big source images smaller, in place. Safety net for images that
// did not go through the CMS (the CMS already resizes at upload).
// An image already small enough is not touched, so it is safe to run again.
//
//   site-resize-images [folder] [max edge in px]
//   defaults: public/uploads 2400
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve(process.argv[2] ?? 'public/uploads')
const maxEdge = Number(process.argv[3] ?? 2400)
const JPEG_QUALITY = 82
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const mb = bytes => `${(bytes / 1024 / 1024).toFixed(2)} MB`

async function resizeOne(file) {
  const ext = path.extname(file).toLowerCase()
  if (!EXTENSIONS.has(ext)) return 0

  const before = (await fs.stat(file)).size
  const image = sharp(file, { failOn: 'none' })
  const meta = await image.metadata()
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0)
  if (longEdge <= maxEdge) return 0

  // No auto-rotate, EXIF kept: the image shows the same as before.
  let pipeline = image.resize({ width: maxEdge, height: maxEdge, fit: 'inside' }).withMetadata()
  if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 9 })
  else if (ext === '.webp') pipeline = pipeline.webp({ quality: JPEG_QUALITY })
  else pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })

  const buffer = await pipeline.toBuffer()
  if (buffer.length >= before) return 0

  await fs.writeFile(`${file}.tmp`, buffer)
  await fs.rename(`${file}.tmp`, file)
  console.log(`${path.relative(dir, file)}: ${longEdge}px -> ${maxEdge}px, ${mb(before)} -> ${mb(buffer.length)}`)
  return before - buffer.length
}

const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true })
let saved = 0
let count = 0
let failed = 0
for (const entry of entries) {
  if (!entry.isFile()) continue
  try {
    const gain = await resizeOne(path.join(entry.parentPath, entry.name))
    if (gain > 0) {
      saved += gain
      count++
    }
  }
  catch (error) {
    failed++
    console.error(`${entry.name}: ${error.message}`)
  }
}

console.log(`Resized ${count} image(s), saved ${mb(saved)}.`)
if (failed) process.exit(1)
