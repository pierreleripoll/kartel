<template>
  <PageBody
    v-if="page"
    :body="page.body"
  />
</template>

<script setup lang="ts">
// /fr, /fr/tandem, /de/nachhaltigkeit: the page is a Markdown file of
// content/ (contentPathOf says which one). A URL with no file gives a 404.
const route = useRoute()
const path = contentPathOf(route.path)

const { data: page } = await useAsyncData(`page-${path}`, async () =>
  path ? await queryCollection('pages').path(path).first() : null,
)
if (!page.value) throw createError({ statusCode: 404, message: 'Page not found', fatal: true })

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>
