<template>
  <div class="news-list">
    <h1>{{ labels[lang].news }}</h1>

    <p v-if="!news?.length">
      {{ labels[lang].newsEmpty }}
    </p>

    <article
      v-for="(item, index) in news"
      :key="item.path"
      class="news-item"
    >
      <NuxtLink
        v-if="item.image"
        :to="item.path"
        class="news-item__image"
        tabindex="-1"
        aria-hidden="true"
      >
        <ThumbhashImage
          :image="item.image"
          :priority="index === 0"
          sizes="sm:100vw md:580px"
        />
      </NuxtLink>
      <div>
        <p class="news-date">
          <time :datetime="item.date">{{ formatDate(item.date, lang) }}</time>
        </p>
        <h2>
          <NuxtLink :to="item.path">
            {{ item.title }}
          </NuxtLink>
        </h2>
        <p v-if="item.description">
          {{ item.description }}
        </p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  lang: Lang
}>()

// Only the news written in this language. The last one comes first.
const { data: news } = await useAsyncData(`news-${props.lang}`, () =>
  queryCollection('news')
    .where('path', 'LIKE', `${newsPath(props.lang)}/%`)
    .order('date', 'DESC')
    .select('path', 'title', 'date', 'description', 'image')
    .all(),
)

useSeoMeta({
  title: `${labels[props.lang].news} · Kartel`,
  // An empty list has nothing for Google.
  robots: news.value?.length ? undefined : 'noindex',
})
</script>

<style scoped>
h1 {
  margin: 0 0 30px;
}

.news-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap);
  margin-bottom: var(--gap);
}

.news-item__image {
  display: block;
}

.news-date {
  color: var(--color-muted);
  margin-bottom: 10px;
}

h2 {
  margin: 0 0 10px;
}

p {
  line-height: 1.4;
}

@media (max-width: 768px) {
  .news-item {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
