<template>
  <div class="kartel-container">
    <div class="logo-container">
      <a href="mailto:info@kartel.ch" target="_blank">
        <img src="/Klogo.svg" alt="Kartel Logo" class="logo" />
      </a>
    </div>

    <div class="nav-links">
      <NuxtLink to="/" class="active">Accueil / Startseite</NuxtLink>
      <NuxtLink to="/tandem">Tandem</NuxtLink>
    </div>

    <hr class="divider" />

    <div class="content-grid">
      <div class="content-column french">
        <p>
          Faisant face à la crise covid et à ses conséquences pour les artistes
          et acteur-ices culturel-les, les responsables de faîtières culturelles
          ont été amené-e-s à se rencontrer régulièrement entre 2020 et 2022.
          Peu à peu, il est devenu clair que de nombreuses problématiques se
          recoupent entre les différents milieux artistiques et culturels. Nous
          avons ainsi décidé de mettre nos connaissances et capacités en commun,
          afin de travailler de concert à une meilleure reconnaissance de nos
          métiers.
        </p>
        <p>C'est ainsi qu'est né <a href="mailto:info@kartel.ch">Kartel</a>.</p>
        <p>
          Notre collectif informel, mi-syndicat, mi-groupe d'intérêt, rassemble
          à la même table les associations d'acteur-ices culturel-les
          professionnel-les, tant des domaines artistiques (théâtre, danse,
          cirque, musique, arts visuels, audiovisuel, littérature) que des
          domaines patrimoniaux et scientifiques (sciences humaines,
          bibliothèques, musées).
        </p>
      </div>

      <div class="content-column german">
        <p>
          Angesichts der Covid-Krise und ihrer Auswirkungen auf Künstler/innen
          und Kulturschaffende haben sich die Leiter/innen der kulturellen
          Dachverbände zwischen 2020 und 2022 regelmäßig getroffen. Nach und
          nach wurde klar, dass sich viele Probleme zwischen den verschiedenen
          Kunst- und Kulturkreisen überschneiden. Wir beschlossen daher, unser
          Wissen und unsere Fähigkeiten zusammenzulegen, um gemeinsam auf eine
          bessere Anerkennung unserer Berufe hinzuarbeiten.
        </p>
        <p>
          Das war die Geburtsstunde von
          <a href="mailto:info@kartel.ch">Kartel</a>.
        </p>
        <p>
          Unser informelles Kollektiv, halb Gewerkschaft, halb Interessengruppe,
          bringt Verbände von professionellen Kulturschaffenden an einen Tisch,
          sowohl aus dem künstlerischen Bereich (Theater, Tanz, Zirkus, Musik,
          bildende Kunst, audiovisuelle Medien, Literatur) als auch aus dem
          Bereich des Kulturerbes und der Wissenschaft (Geisteswissenschaften,
          Bibliotheken, Museen).
        </p>
      </div>
    </div>

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
          <a href="https://new.lasev.ch" target="_blank"
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
          <a href="https://new.lasev.ch" target="_blank"
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

<script setup>
// Component logic can go here if needed
</script>

<style scoped>
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

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.content-column p {
  line-height: 1.6;
  margin-bottom: 20px;
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
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .logo {
    width: 10rem;
  }
}
</style>
