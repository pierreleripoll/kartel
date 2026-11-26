<template>
  <NuxtLayout name="default">
    <div class="content-grid">
      <div class="content-column french">
        <p>
          <a href="mailto:info@kartel.ch" target="_blank">Kartel</a> est un
          collectif qui regroupe les associations professionnelles artistiques,
          patrimoniales et scientifiques du domaine de la culture du Canton du
          Valais. Il défend les intérêts généraux des milieux culturels
          valaisans.
        </p>
        <p>
          Il est une force par le regroupement de ces associations
          professionnelles quelle que soit leur réalité propre.
        </p>
        <p>
          En mettant en commun leurs connaissances, leurs outils et leurs
          capacités, les associations membres font de Kartel un partenaire
          privilégié des instances politiques, publiques et des autres
          institutions culturelles.
        </p>
        <p>
          En tant que lieu d'échange, Kartel permet la coordination des
          associations professionnelles afin :
        </p>
        <ul>
          <li>
            de travailler à une reconnaissance des métiers de la culture et de
            leur réalité ;
          </li>
          <li>
            de définir des stratégies, des actions et des synergies communes ;
          </li>
          <li>
            de constituer une plate-forme d'informations, de regroupements et
            d'analyses de données.
          </li>
        </ul>
        <p>
          Ainsi structuré, Kartel dialogue notamment avec les associations
          professionnelles, le Service de la Culture, la Conférence des délégués
          culturels du Valais, Culture Valais, les lieux de diffusion et autres
          institutions culturelles cantonales et fédérales.
        </p>
      </div>

      <div class="content-column german">
        <p>
          Kartel ist ein Zusammenschluss der Berufsverbände aus den Bereichen
          Kunst, Kulturerbe und Wissenschaft im Kanton Wallis. Er vertritt die
          allgemeinen Interessen der professionellen Walliser Kunst- und
          Kulturszene.
        </p>
        <p>
          Obwohl jeder Bereich seine Besonderheiten hat, entsteht durch den
          Zusammenschluss der Berufsverbände eine einheitliche und starke
          Stimme.
        </p>
        <p>
          Verbände, die Mitglied von Kartel sind, bündeln ihr Wissen, ihre
          Instrumente ihre Kompetenzen. Dadurch wird Kartel zum bevorzugten
          Partner für politische und öffentliche Stellen sowie andere kulturelle
          Einrichtungen.
        </p>
        <p>
          Kartel schafft den nötigen Rahmen um die Koordination der
          Berufsverbände zu ermöglichen. Kartel setzt sich ein für:
        </p>
        <ul>
          <li>
            Bessere Arbeitsbedingungen und mehr Anerkennung für die Berufe im
            Kulturbereich
          </li>
          <li>Entwicklung gemeinsamer Strategien, Maßnahmen und Synergien</li>
          <li>
            Kreation einer Plattform für Informationen, Datenerfassung und
            -analyse
          </li>
        </ul>
        <p>
          Kartel steht im Austausch mit den Berufsverbänden, dem Amt für Kultur,
          den Kulturbeauftragten des Wallis, Culture Valais, den
          Veranstaltungsorten sowie weiteren kantonalen und eidgenössischen
          Kulturinstitutionen.
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

.content-column ul {
  line-height: 1.6;
  margin-bottom: 20px;
  padding-left: 20px;
}

/* Mobile layout */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
