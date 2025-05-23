<template>
  <NuxtLayout name="default">
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
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.content-column p {
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Mobile layout */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
