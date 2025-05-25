<script setup lang="ts">
import ListMarquee from "~/components/ListMarquee.vue";
</script>

<template>
  <div class="kartel-container">
    <div class="logo-container">
      <a href="mailto:info@kartel.ch" target="_blank">
        <img src="/Klogo.svg" alt="Kartel Logo" class="logo" />
      </a>
    </div>

    <div class="nav-links">
      <NuxtLink to="/" :class="{ active: $route.path === '/' }"
        >Accueil / Startseite</NuxtLink
      >
      <NuxtLink to="/tandem" :class="{ active: $route.path === '/tandem' }"
        >Tandem</NuxtLink
      >
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

.logo-container {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.logo {
  width: 30rem;
  height: auto;
}

.nav-links {
  display: flex;
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

.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 1);
  margin: 30px 0;
}

/* Mobile layout */
@media (max-width: 768px) {
  .logo {
    width: 10rem;
  }
}
</style>
