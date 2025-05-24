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

    <div class="marquee-container">
      <div class="marquee">
        <div class="marquee-content">
          <a href="https://www.visarte-valais.ch/" target="_blank"
            >Visarte Valais</a
          >
          <a href="https://www.musees-vs.ch/" target="_blank"
            >Association Valaisanne des Musées (AVM)</a
          >
          <a href="https://theatres-vs.ch/a-propos/" target="_blank"
            >Les Théâtre de création valaisans</a
          >
          <a href="https://www.avpsh.ch/" target="_blank"
            >Association valaisanne des professionnels des sciences humaines
            (AVPSH)</a
          >
          <a href="https://m.facebook.com/tanznetzwerk.vs" target="_blank"
            >Tanznetzwerk VS</a
          >
          <a href="http://www.valaisfilms.ch" target="_blank">Valais Film</a>
          <a href="https://musikvalais.ch" target="_blank">MusikValai</a>
          <a href="https://www.bibliovalais.ch" target="_blank"
            >BiblioValais Wallis</a
          >
          <a href="https://lasev.ch" target="_blank"
            >Société des Ecrivain.e.s Valaisan.ne.s</a
          >
          <a href="https://www.forcesvives-vs.ch" target="_blank"
            >FORCES VIVES, Faîtière des arts vivants Valais</a
          >
        </div>
        <div class="marquee-content">
          <a href="https://www.visarte-valais.ch/" target="_blank"
            >Visarte Valais</a
          >
          <a href="https://www.musees-vs.ch/" target="_blank"
            >Association Valaisanne des Musées (AVM)</a
          >
          <a href="https://theatres-vs.ch/a-propos/" target="_blank"
            >Les Théâtre de création valaisans</a
          >
          <a href="https://www.avpsh.ch/" target="_blank"
            >Association valaisanne des professionnels des sciences humaines
            (AVPSH)</a
          >
          <a href="https://m.facebook.com/tanznetzwerk.vs" target="_blank"
            >Tanznetzwerk VS</a
          >
          <a href="http://www.valaisfilms.ch" target="_blank">Valais Film</a>
          <a href="https://musikvalais.ch" target="_blank">MusikValai</a>
          <a href="https://www.bibliovalais.ch" target="_blank"
            >BiblioValais Wallis</a
          >
          <a href="https://lasev.ch" target="_blank"
            >Société des Ecrivain.e.s Valaisan.ne.s</a
          >
          <a href="https://www.forcesvives-vs.ch" target="_blank"
            >FORCES VIVES, Faîtière des arts vivants Valais</a
          >
        </div>
      </div>
    </div>
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

/* Marquee animation */
.marquee-container {
  overflow: hidden;
  margin: 30px 0;
}

.marquee {
  display: flex;
  white-space: nowrap;
}

.marquee-content {
  display: flex;
  animation: marquee 90s linear infinite;
  padding-right: 50px;
}

.marquee-content a {
  margin: 0 10px;
}

/* Pause animation on hover */
.marquee-content a:hover {
  animation-play-state: paused;
  cursor: pointer;
}

.marquee:hover .marquee-content {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Mobile layout */
@media (max-width: 768px) {
  .logo {
    width: 10rem;
  }
}
</style>
