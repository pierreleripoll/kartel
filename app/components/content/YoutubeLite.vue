<template>
  <!--
    A YouTube video that loads nothing from the player before the click:
    only the poster image. In Markdown: ::youtube-lite{id="aqz-KE-bpKQ"}
  -->
  <div class="youtube-lite">
    <iframe
      v-if="activated"
      :src="`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`"
      :title="title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
    <button
      v-else
      type="button"
      class="youtube-lite__play"
      :aria-label="title"
      @click="activated = true"
    >
      <img
        :src="`https://i.ytimg.com/vi/${id}/hqdefault.jpg`"
        alt=""
        loading="lazy"
      >
      <svg
        viewBox="0 0 68 48"
        width="68"
        height="48"
        aria-hidden="true"
      >
        <path
          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
          fill="#f00"
        />
        <path
          d="M 45,24 27,14 27,34"
          fill="#fff"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  /** The id of the video: the part after "v=" in its URL. */
  id: string
  title?: string
}>(), {
  title: 'Vidéo YouTube',
})

const activated = ref(false)
</script>

<style scoped>
.youtube-lite {
  position: relative;
  aspect-ratio: 16 / 9;
  max-width: 100%;
  background: #000;
  overflow: hidden;
}

.youtube-lite iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.youtube-lite__play {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.youtube-lite__play img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.youtube-lite__play svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
  filter: drop-shadow(0 2px 8px rgb(0 0 0 / 0.4));
}

.youtube-lite__play:hover svg,
.youtube-lite__play:focus-visible svg {
  transform: translate(-50%, -50%) scale(1.1);
}
</style>
