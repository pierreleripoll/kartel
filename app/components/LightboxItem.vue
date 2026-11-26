<template>
  <!--
    One image of a <LightboxGallery>. The slot is what the page shows (most
    of the time a <ThumbhashImage>). A click opens a big WebP made by the
    build, never the original file.
  -->
  <a
    v-if="full"
    class="lightbox-item"
    :href="full.url"
    :data-pswp-width="full.width"
    :data-pswp-height="full.height"
    :data-pswp-caption="captionText || undefined"
    target="_blank"
    :aria-label="label"
  >
    <slot />
  </a>
  <div
    v-else
    class="lightbox-item"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface ImageEntry {
  src: string
  alt?: string
  caption?: string
  credit?: string
}

const props = withDefaults(defineProps<{
  /** An image entry of the content, or give `src` alone. */
  image?: ImageEntry
  src?: string
  /** Text under the open image. Default: the caption and the credit of the image. */
  caption?: string
  /** Label of the link for screen readers. */
  label?: string
  /** Longest width of the open image, in px. */
  maxWidth?: number
  quality?: number
}>(), {
  image: undefined,
  src: undefined,
  caption: undefined,
  label: undefined,
  maxWidth: 2000,
  quality: 80,
})

const img = useImage()

const rawSrc = computed(() => props.src ?? props.image?.src ?? '')
const source = computed(() => resolveImageSrc(rawSrc.value))
const meta = computed(() => useImageMeta(rawSrc.value))

// An image with no known size (SVG, external URL, CMS preview) has no
// lightbox: the slot is shown alone.
const full = computed(() => {
  if (!meta.value || /\.svg$/i.test(source.value)) return undefined
  const width = Math.min(meta.value.width, props.maxWidth)
  const height = Math.round(width * meta.value.height / meta.value.width)
  // The cast: a site has no direct @nuxt/image dependency, so the types of
  // the modifiers do not reach it and useImage() accepts none.
  const modifiers = { width, height, quality: props.quality, format: 'webp' }
  const url = img(source.value, modifiers as never)
  return { url, width, height }
})

const captionText = computed(() =>
  props.caption ?? [props.image?.caption, props.image?.credit].filter(Boolean).join(' · '),
)

const label = computed(() => props.label ?? props.image?.alt ?? props.image?.caption ?? '')
</script>

<style scoped>
.lightbox-item {
  display: block;
  color: inherit;
  text-decoration: none;
}

a.lightbox-item {
  cursor: zoom-in;
}
</style>
