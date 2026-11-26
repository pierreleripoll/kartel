<template>
  <!-- An image written in the Markdown body: same placeholder and same sizes as the others. -->
  <ThumbhashImage
    :src="src"
    :alt="alt"
    sizes="md:100vw lg:800px"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  src?: string
  alt?: string
}>(), {
  src: '',
  alt: '',
})
</script>
