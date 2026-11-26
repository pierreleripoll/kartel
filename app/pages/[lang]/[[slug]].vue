<template>
  <PageBody
    v-if="page"
    :body="page.body"
  />
</template>

<script setup lang="ts">
// /fr, /fr/tandem, /de/nachhaltigkeit: the page is the Markdown file with the
// same path in content/. A URL with no file gives a 404.
const route = useRoute()
const path = cleanPath(route.path)

const { data: page } = await useAsyncData(`page-${path}`, () =>
  queryCollection('pages').path(path).first(),
)
if (!page.value) throw createError({ statusCode: 404, message: 'Page not found', fatal: true })

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>
