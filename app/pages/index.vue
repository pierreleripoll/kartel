<template>
  <div />
</template>

<script setup lang="ts">
// The site has no page at "/". Online, public/_redirects sends "/" to the
// default language before this page is read. This is for `pnpm dev`.
definePageMeta({ layout: false })

await navigateTo(`/${defaultLang}`, { redirectCode: 302 })
</script>
