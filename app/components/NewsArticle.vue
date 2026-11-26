<template>
  <article
    v-if="article"
    class="news-article"
  >
    <p class="news-date">
      <time :datetime="article.date">{{ formatDate(article.date, lang) }}</time>
    </p>
    <h1>{{ article.title }}</h1>

    <figure v-if="article.image">
      <ThumbhashImage
        :image="article.image"
        sizes="sm:100vw md:740px"
        priority
      />
      <figcaption v-if="article.image.caption || article.image.credit">
        <span v-if="article.image.caption">{{ article.image.caption }}</span>
        <span
          v-if="article.image.credit"
          class="credit"
        >{{ article.image.credit }}</span>
      </figcaption>
    </figure>

    <ContentRenderer
      :value="article"
      class="prose"
    />

    <p class="back">
      <NuxtLink :to="newsPath(lang)">
        ← {{ labels[lang].back }}
      </NuxtLink>
    </p>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  lang: Lang
}>()

const route = useRoute()
const path = cleanPath(route.path)

const { data: article } = await useAsyncData(`news-${path}`, () =>
  queryCollection('news').path(path).first(),
)
if (!article.value) throw createError({ statusCode: 404, message: 'Page not found', fatal: true })

const siteUrl = useSiteConfig().url

useSeoMeta({
  title: `${article.value.title} · Kartel`,
  description: article.value.description,
  ogType: 'article',
  ogImage: article.value.image ? siteUrl + article.value.image.src : undefined,
})
</script>

<style scoped>
.news-article {
  max-width: var(--text-width);
  margin: 0 auto;
}

.news-date {
  color: var(--color-muted);
  margin-bottom: 10px;
}

h1 {
  margin: 0 0 30px;
}

figure {
  margin: 0 0 30px;
}

figcaption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0 1rem;
  margin-top: 8px;
  font-size: 0.8em;
  color: var(--color-muted);
}

.credit {
  margin-left: auto;
}

.back {
  margin-top: 30px;
}
</style>
