<template>
  <!--
    A gallery that opens its images full screen (PhotoSwipe). Put one
    <LightboxItem> per image inside. PhotoSwipe is loaded on the first click.
  -->
  <div
    ref="el"
    class="lightbox-gallery"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type PhotoSwipeLightbox from 'photoswipe/lightbox'
import type { PhotoSwipeOptions } from 'photoswipe'
import 'photoswipe/style.css'

const props = defineProps<{
  /** Options of PhotoSwipe, they win over the defaults. */
  options?: Partial<PhotoSwipeOptions>
}>()

const el = ref<HTMLElement>()
let lightbox: PhotoSwipeLightbox | undefined

onMounted(async () => {
  const { default: Lightbox } = await import('photoswipe/lightbox')
  if (!el.value) return

  lightbox = new Lightbox({
    gallery: el.value,
    // Only the links made by <LightboxItem> for an image with a known size.
    children: 'a[data-pswp-width]',
    pswpModule: () => import('photoswipe'),
    ...props.options,
  })

  // The caption of the open image, under it.
  lightbox.on('uiRegister', () => {
    lightbox?.pswp?.ui?.registerElement({
      name: 'kit-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      onInit: (element, pswp) => {
        pswp.on('change', () => {
          const caption = pswp.currSlide?.data.element?.getAttribute('data-pswp-caption') ?? ''
          element.textContent = caption
          element.hidden = !caption
        })
      },
    })
  })

  lightbox.init()
})

onBeforeUnmount(() => {
  lightbox?.destroy()
  lightbox = undefined
})
</script>

<style>
/* Not scoped: PhotoSwipe puts its elements at the end of <body>. */
.pswp__kit-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background: rgb(0 0 0 / 0.7);
  color: #fff;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>
