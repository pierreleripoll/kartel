<script setup lang="ts">
import ListMarquee from "~/components/ListMarquee.vue";

const route = useRoute();

const lang = computed(() => {
  return route.path.startsWith("/de") ? "de" : "fr";
});

const otherLang = computed(() => (lang.value === "fr" ? "de" : "fr"));

const switchLangPath = computed(() => {
  const path = route.path;
  if (lang.value === "fr") {
    if (path === "/fr/durabilite") return "/de/nachhaltigkeit";
    return path.replace(/^\/fr/, "/de");
  } else {
    if (path === "/de/nachhaltigkeit") return "/fr/durabilite";
    return path.replace(/^\/de/, "/fr");
  }
});
</script>

<template>
  <div class="kartel-container">
    <div class="logo-container">
      <a href="mailto:info@kartel.ch" target="_blank">
        <img src="/Klogo.svg" alt="Kartel Logo" class="logo" />
      </a>
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

      <NuxtLink :to="switchLangPath" class="lang-switch">
        {{ otherLang.toUpperCase() }}
      </NuxtLink>
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
  max-width: 1200px;
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
  margin: 20px 0;
  gap: 20px;
}

.nav-links a {
  padding: 5px 10px;
  text-decoration: none;
}

.nav-links a.active {
  font-weight: 600;
  text-decoration: underline;
}

.nav-links .lang-switch {
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  padding: 5px 12px;
  font-size: 0.85em;
  letter-spacing: 0.05em;
}

.nav-links .lang-switch:hover {
  border-color: white;
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

  .language-selection {
    flex-direction: column;
    align-items: center;
  }

  .language-link {
    width: 150px;
  }
}

/* Mobile layout */
@media (max-width: 768px) {
  .logo {
    width: 10rem;
  }
}
</style>
