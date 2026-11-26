<template>
  <NuxtLayout>
    <div class="error-page">
      <h1>{{ notFound ? labels[lang].notFound : labels[lang].error }}</h1>
      <p v-if="notFound">
        {{ labels[lang].notFoundText }}
      </p>
      <p>
        <a :href="`/${lang}`">{{ labels[lang].backHome }}</a>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

// Also the 404.html of the build: the Cloudflare worker serves it for every
// URL with no page. So the language is read in the browser, from the URL.
const props = defineProps<{
  error: NuxtError
}>()

const notFound = computed(() => props.error.statusCode === 404)
const route = useRoute()
const lang = computed(() => langOf(route.path))

useSeoMeta({
  title: () => `${labels[lang.value].notFound} · Kartel`,
  robots: 'noindex',
})
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 2rem 0;
}
</style>
