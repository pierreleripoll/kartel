<template>
  <!--
    Stable layout: the wrapper is a fixed box. The placeholder and the real
    image are two absolute layers with object-fit: contain, so the photo stays
    centered in the same box and nothing moves when it loads. The placeholder
    is sized by a transparent SVG spacer at the exact ratio of the photo, so
    the two layers cover the same rectangle.
  -->
  <!-- A span, not a div: an image of a Markdown body is inside a <p>. -->
  <span
    class="thumbhash-image"
    :style="{ aspectRatio: boxAspectRatio }"
  >
    <img
      v-if="thumbPng && !raw"
      class="thumbhash-image__placeholder"
      :src="spacerSvg"
      :style="{ backgroundImage: `url(${thumbPng})` }"
      alt=""
      aria-hidden="true"
    >
    <!--
      Raw image, without NuxtPicture: an SVG, or an image that the build never
      saw (a blob: URL in the CMS preview, an external URL). The ratio is
      measured when it loads.
    -->
    <img
      v-if="raw"
      class="thumbhash-image__img"
      :src="source"
      :alt="altText"
      :width="width"
      :height="height"
      :loading="priority ? 'eager' : 'lazy'"
      @load="onLoad"
    >
    <NuxtPicture
      v-else
      :src="source"
      :alt="altText"
      :width="width"
      :height="height"
      :sizes="sizes"
      :quality="quality"
      :densities="densities"
      format="webp"
      legacy-format="webp"
      :loading="priority ? 'eager' : 'lazy'"
      :img-attrs="imgAttrs"
    />
  </span>
</template>

<script setup lang="ts">
import { thumbHashToDataURL } from 'thumbhash'

interface ImageEntry {
  src: string
  alt?: string
  caption?: string
  // Old content has these in the frontmatter. The manifest wins over them.
  width?: number
  height?: number
  thumbhash?: string
}

const props = withDefaults(defineProps<{
  /** An image entry of the content, or give `src` alone. */
  image?: ImageEntry
  src?: string
  alt?: string
  /** Force the ratio of the box (width / height). */
  aspectRatio?: number
  quality?: number | string
  /** First image of the page (LCP): loaded at once, with a high fetch priority. */
  priority?: boolean
  /**
   * Width of the image on the page, per screen: "sm:100vw md:600px" means
   * full width under 640 px, and 600 px on bigger screens.
   * Never give a vw value without a screen ("100vw" alone): @nuxt/image then
   * makes 1 px images.
   */
  sizes?: string
  /** "x1 x2" also makes the images for high density screens. "x1" halves the build work. */
  densities?: string
}>(), {
  image: undefined,
  src: undefined,
  alt: undefined,
  aspectRatio: undefined,
  quality: 80,
  priority: false,
  sizes: 'sm:100vw md:600px',
  densities: 'x1 x2',
})

const rawSrc = computed(() => props.src ?? props.image?.src ?? '')
const local = computed(() => isLocalImage(rawSrc.value))
const source = computed(() => resolveImageSrc(rawSrc.value))
const meta = computed(() => useImageMeta(rawSrc.value))

// A local image that is not in the manifest is a missing file. In the build
// this error stops the prerender, so a broken image never goes online.
if (import.meta.server && local.value && rawSrc.value && !meta.value) {
  const message = `ThumbhashImage: image not found in public/: ${rawSrc.value} (page ${useRoute().path})`
  // Logged first: the prerender only says "[500] Server Error", without the message.
  console.error(message)
  if (!import.meta.dev) throw createError({ statusCode: 500, message })
}

const raw = computed(() => !local.value || !meta.value || /\.svg$/i.test(source.value))

const width = computed(() => meta.value?.width ?? props.image?.width)
const height = computed(() => meta.value?.height ?? props.image?.height)
const thumbhash = computed(() => meta.value?.thumbhash ?? props.image?.thumbhash)

const altText = computed(() => props.alt ?? props.image?.alt ?? props.image?.caption ?? '')

// Ratio measured on the loaded image, for an image with no known size.
const measured = ref<string>()
function onLoad(event: Event) {
  const { naturalWidth, naturalHeight } = event.target as HTMLImageElement
  if (naturalWidth && naturalHeight) measured.value = `${naturalWidth} / ${naturalHeight}`
}

// The two layers are absolute, so the box has no height of its own. When the
// parent has a fixed height, height: 100% wins. When the parent height is
// auto, this ratio gives the height.
const boxAspectRatio = computed(() => {
  if (props.aspectRatio) return String(props.aspectRatio)
  if (width.value && height.value) return `${width.value} / ${height.value}`
  return measured.value
})

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

// Small PNG made from the thumbhash. Plain JS, so it also runs on the server.
const thumbPng = computed(() =>
  thumbhash.value ? thumbHashToDataURL(base64ToBytes(thumbhash.value)) : undefined,
)

// Transparent SVG at the exact size of the photo. As the src of the
// placeholder, it gives the same rectangle as the photo, with no rounding error.
const spacerSvg = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width.value || 100}" height="${height.value || 100}"></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})

const imgAttrs = computed(() => ({
  class: 'thumbhash-image__img',
  ...(props.priority ? { fetchpriority: 'high' as const } : {}),
}))
</script>

<style scoped>
.thumbhash-image {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}

/* The real image is rendered by a child component, so :deep() is needed. */
.thumbhash-image :deep(picture),
.thumbhash-image :deep(.thumbhash-image__img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.thumbhash-image :deep(.thumbhash-image__img) {
  display: block;
  object-fit: contain;
}

/* Placeholder: the SVG spacer takes the rectangle of the photo, margin: auto
   centers it, and the thumbhash is stretched on it as a background. */
.thumbhash-image__placeholder {
  position: absolute;
  inset: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}
</style>
