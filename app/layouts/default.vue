<template>
  <div class="kartel-container">
    <div class="logo-container">
      <a href="mailto:info@kartel.ch">
        <img
          src="/Klogo.svg"
          alt="Kartel"
          class="logo"
        >
      </a>
    </div>

    <div class="nav-wrapper">
      <nav
        class="lang-selector"
        :aria-label="lang === 'fr' ? 'Langue' : 'Sprache'"
      >
        <template
          v-for="(item, index) in switches"
          :key="item.lang"
        >
          <span v-if="index > 0">/</span>
          <NuxtLink
            :to="item.to"
            :lang="item.lang"
            :class="{ active: item.active }"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <nav
        class="nav-links"
        aria-label="Menu"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.key"
          :to="link.to"
          :class="{ active: link.active }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>

    <hr class="divider">

    <main>
      <slot />
    </main>

    <hr class="divider">

    <ListMarquee />
  </div>
</template>

<script setup lang="ts">
const { lang, links, switches } = await useSiteNav()
const siteUrl = useSiteConfig().url

useHead({
  htmlAttrs: { lang },
  // Tells Google that the page exists in the other language.
  link: computed(() =>
    switches.value
      .filter(item => item.exact)
      .map(item => ({
        rel: 'alternate',
        hreflang: item.lang,
        href: siteUrl + item.to,
      })),
  ),
})
</script>

<style scoped>
.kartel-container {
  max-width: var(--page-width);
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.logo {
  display: block;
  width: 30rem;
  height: auto;
}

.nav-wrapper {
  display: flex;
  flex-direction: column;
}

.lang-selector {
  text-align: right;
  font-size: 0.85em;
}

.lang-selector a {
  padding: 0 2px;
  text-decoration: none;
}

.lang-selector a.active {
  text-decoration: underline;
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

@media (max-width: 768px) {
  .logo {
    width: 10rem;
  }

  .lang-selector {
    text-align: center;
    margin-bottom: 1rem;
  }
}
</style>
