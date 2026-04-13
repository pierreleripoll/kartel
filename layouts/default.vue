<script setup lang="ts">
import ListMarquee from "~/components/ListMarquee.vue";

const route = useRoute();

const lang = computed(() => {
  return route.path.startsWith("/de") ? "de" : "fr";
});

const pageSuffix = computed(() => {
  return route.path.replace(/^\/(fr|de)/, "");
});

const frSuffix = computed(() => {
  return pageSuffix.value === "/nachhaltigkeit"
    ? "/durabilite"
    : pageSuffix.value;
});

const deSuffix = computed(() => {
  return pageSuffix.value === "/durabilite"
    ? "/nachhaltigkeit"
    : pageSuffix.value;
});
</script>

<template>
  <div class="kartel-container">
    <div class="logo-container">
      <a href="mailto:info@kartel.ch" target="_blank">
        <img src="/Klogo.svg" alt="Kartel Logo" class="logo" />
      </a>
    </div>

    <div class="nav-wrapper">
      <div class="lang-selector">
        <NuxtLink :to="`/fr${frSuffix}`" :class="{ active: lang === 'fr' }">
          Français </NuxtLink
        >/<NuxtLink :to="`/de${deSuffix}`" :class="{ active: lang === 'de' }">
          Deutsch
        </NuxtLink>
      </div>

      <div class="nav-links">
        <NuxtLink
          :to="`/${lang}`"
          :class="{ active: route.path === `/${lang}` }"
        >
          {{ lang === "fr" ? "Accueil" : "Startseite" }}
        </NuxtLink>
        <NuxtLink
          :to="`/${lang}/tandem`"
          :class="{ active: route.path === `/${lang}/tandem` }"
        >
          Tandem
        </NuxtLink>
        <NuxtLink
          :to="lang === 'fr' ? '/fr/durabilite' : '/de/nachhaltigkeit'"
          :class="{
            active:
              route.path === '/fr/durabilite' ||
              route.path === '/de/nachhaltigkeit',
          }"
        >
          {{ lang === "fr" ? "Durabilité" : "Nachhaltigkeit" }}
        </NuxtLink>
      </div>
    </div>

    <hr class="divider" />

    <!-- Page content will be inserted here -->
    <slot />

    <hr class="divider" />

    <ListMarquee />
  </div>
</template>

<style>
.kartel-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h3 {
  font-size: large;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.logo {
  width: 30rem;
  height: auto;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 0;
  gap: 20px;
  order: 2;
}

.nav-links a {
  padding: 5px 10px;
  text-decoration: none;
}

.nav-links a.active {
  font-weight: 600;
  text-decoration: underline;
}

.nav-wrapper {
  display: flex;
  flex-direction: column;
}

.lang-selector {
  text-align: right;
  margin-bottom: 5px;
  font-size: 0.85em;
  order: 1;
}

.lang-selector a {
  padding: 0 2px;
  text-decoration: none;
}

.lang-selector a.active {
  text-decoration: underline;
}

.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 1);
  margin: 30px 0;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 30px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 20px;
  margin-top: 20px;
}

.intro-column p {
  line-height: 1.4;
  margin-bottom: 20px;
}

.language-selection {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.detailed-content {
  margin: 0 auto;
}

.content-column p {
  line-height: 1.4;
  margin-bottom: 10px;
}

.content-column h3 {
  margin-bottom: 10px;
}

.content-column ul {
  padding-left: 20px;
}

.content-column li {
  line-height: 1.4;
}

.video-container {
  order: 2;
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  margin: 30px 0;
  height: 315px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: initial;
  border-radius: 4px;
}

.objectives-box h3 {
  margin-top: 0;
}

.youtube-link {
  text-align: center;
  margin: 30px 0;
}

.content-section {
  padding: 1rem 0px;
}

/* Mobile layout */
@media (max-width: 768px) {
  .intro-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .logo {
    width: 10rem;
  }

  .logo-container {
    margin: 2rem 0;
    margin-bottom: 1rem;
  }
  .lang-selector {
    text-align: center;
    margin-bottom: 3rem;
    margin-top: 0px;
  }
}
</style>
