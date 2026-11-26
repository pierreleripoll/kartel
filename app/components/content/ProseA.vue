<template>
  <!--
    The links of the Markdown text. A link to a file (PDF), a mail, a phone
    number or another site is a plain <a>: NuxtLink would look for a page of
    the site. A link to another site opens in a new tab.
  -->
  <a
    v-if="plain"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
  ><slot /></a>
  <NuxtLink
    v-else
    :to="href"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
}>(), {
  href: '',
})

const external = computed(() => /^(https?:)?\/\//.test(props.href))
const plain = computed(() =>
  external.value
  || /^(mailto|tel):/.test(props.href)
  || props.href.startsWith('#')
  // A file of public/, like /rapport.pdf.
  || /\.[a-z0-9]{2,5}$/i.test(props.href.split(/[?#]/)[0] ?? ''),
)
</script>
