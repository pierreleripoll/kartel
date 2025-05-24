<template>
  <NuxtLayout name="default">
    <!-- Introduction section - always visible -->
    <div class="intro-grid">
      <div class="intro-column french">
        <p>
          Un Tandem, c'est la rencontre entre deux mondes : la politique et la
          culture. Le temps de quelques rencontres, les acteur.trices
          culturel.les et politicien.nes partagent un peu de leur univers dans
          le but de mieux connaître leurs défis réciproques.
        </p>
        <p>
          Les acteur.trices culturel.les peuvent faire part de leurs intérêts
          directement aux politicien.nes et contribuer à ce que les initiatives
          de politique culturelle aient plus de poids.
        </p>
        <p>
          Les politicien.nes donnent un aperçu de leur activité et sensibilisent
          à leur tour les acteur.trice culturels aux préoccupations politiques.
        </p>
      </div>

      <div class="intro-column german">
        <p>
          Ein Tandem ist die Begegnung zweier Welten: Politik und Kultur. Bei
          einigen Treffen teilen Kulturschaffende und Politiker:innen einen Teil
          ihrer Welt, um die gegenseitigen Herausforderungen besser zu
          verstehen.
        </p>
        <p>
          Kulturschaffende können ihre Interessen direkt an Politiker:innen
          weitergeben und dazu beitragen, dass kulturpolitische Initiativen mehr
          Gewicht erhalten.
        </p>
        <p>
          Politiker:innen geben Einblick in ihre Tätigkeit und sensibilisieren
          ihrerseits die Kulturschaffenden für politische Anliegen.
        </p>
      </div>
    </div>

    <div class="nav-links">
      <a
        href="#"
        :class="{
          active: selectedLanguage === 'french',
          'language-link': true,
        }"
        @click.prevent="selectedLanguage = 'french'"
      >
        En savoir plus en français
      </a>
      <a
        href="#"
        :class="{
          active: selectedLanguage === 'german',
          'language-link': true,
        }"
        @click.prevent="selectedLanguage = 'german'"
      >
        Mehr erfahren auf Deutsch
      </a>
    </div>

    <!-- Detailed content - shown based on language selection -->
    <div v-if="selectedLanguage" class="detailed-content">
      <!-- French content -->
      <div v-if="selectedLanguage === 'french'" class="content-column">
        <div class="content-grid">
          <div class="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/TPsCd9tatRg"
              title="Tandem Presentation"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="text-container">
            <h3>Comment ça se passe concrètement ?</h3>
            <p>
              Après l'attribution d'un tandem culturel par la coordinatrice des
              tandems, voici une proposition de marche à suivre :
            </p>
            <h3>Mettre des mots</h3>
            <p>
              Afin de pouvoir discuter avec votre tandem culturel qui n'y
              connait peut-être pas grand-chose au monde politique, voici
              quelques questions que vous pouvez vous poser pour vous préparer :
            </p>
            <ul>
              <li>Comment s'organise mon travail de député ?</li>
              <li>Quel temps est-ce que j'y consacre ?</li>
              <li>
                Comment est-ce que je me renseigne sur les sujets qui vont être
                discutés ?
              </li>
            </ul>

            <h3>1er contact</h3>
            <p>
              Prenez contact avec votre Tandem et fixez un rendez-vous. Soyez
              inventif·ve pour que ce rendez-vous marque votre partenaire.
            </p>
            <ul>
              <li>Le café reste une valeur sûre et neutre mais…</li>
              <li>
                Emmenez votre tandem sur le terrain (Grand Conseil, bureau,
                etc.) afin qu'il découvre un nouvel espace, soit immergé dans
                votre monde;
              </li>
              <li>
                Proposez à votre tandem de vous rencontrer lors d'une
                manifestation ou d'un évènement culturel ou politique (tournage,
                exposition, spectacle, session parlementaire, etc.).
              </li>
            </ul>
          </div>
        </div>

        <div class="content-grid">
          <div class="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/S_5L3_Uu7Ig"
              title="Tandem Experience"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="text-container">
            <h3>Et on parle de quoi ?</h3>
            <p>
              Kartel souhaite discuter avec les politiques « sans langue de bois
              ». Aussi, l'objectif est de parler avec sincérité de votre réalité
              de politicien·ne et d'écouter, avec tout autant de sincérité, le
              quotidien de votre tandem culturel.
            </p>
            <p>
              C'est en comprenant les rouages de la politique et du monde
              culturel qu'un véritable dialogue peut débuter. Il est important
              que ces rencontres soient des temps d'échanges et non pas des
              temps de réclamation.
            </p>
            <p>
              Enfin, n'oubliez pas que Tandem n'est pas un devoir à accomplir.
              Les échanges peuvent se réaliser à différents niveaux, beaucoup de
              mots, peu, beaucoup de rencontres, peu, la qualité de l'exercice
              sera unique à chaque tandem. Et surtout : prenez du plaisir à
              rencontrer une nouvelle personne, une nouvelle fonction, une
              nouvelle façon de penser, etc.
            </p>
          </div>
        </div>

        <div class="content-grid">
          <div class="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/hvSvdK6zOC0"
              title="Tandem Insights"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="text-container">
            <h3>On se voit combien de fois ?</h3>
            <p>
              La fréquence des rencontres n'est pas fixée mais estimée à trois
              ou quatre fois par an, en sus d'une rencontre annuelle générale de
              tous les tandems.
            </p>

            <h3>On débriefe ?</h3>
            <p>
              Une fois par année, un événement est organisé par Kartel pour
              l'ensemble des Tandems. N'hésitez pas à vous y rendre !
            </p>

            <h3>Alors, intéressé.e par un Tandem ?</h3>
            <p>
              Contact Jennifer Skolovski, coordinatrice Tandem pour Kartel :
              <a href="mailto:skolovski@yahoo.de">skolovski@yahoo.de</a> ou
              <a href="tel:+41787118133">+41 78 711 81 33</a>.
            </p>
          </div>
        </div>

        <div class="objectives-box">
          <h3>Objectifs</h3>
          <ul>
            <li>
              Renforcer les liens entre l'univers de la politique et celui de la
              culture ;
            </li>
            <li>
              Donner aux deux parties les outils / arguments pour une politique
              culturelle qui soit en lien avec les besoins du terrain ;
            </li>
            <li>
              Sensibiliser les acteur.ices culturel·les aux enjeux politiques et
              les politicien·nes aux défis des divers domaines culturels ;
            </li>
            <li>
              Convaincre de l'utilité d'un travail commun et d'actions communes
              pour assurer un rayonnement de la culture valaisanne ;
            </li>
            <li>
              Favoriser une politique cantonale de la culture réfléchie et
              tenant compte des contraintes politiques et des domaines culturels
              concernés ;
            </li>
            <li>
              Assurer une présence régulière de la politique dans l'univers
              culturel et de la culture dans le monde de la politique ;
            </li>
            <li>
              Permettre une communication souple et directe entre politicien·nes
              et acteur.ices culturel·les.
            </li>
          </ul>
        </div>

        <div class="youtube-link">
          <p>
            Découvrez plus de vidéos sur notre chaîne
            <a href="https://www.youtube.com/@Kartel_VS" target="_blank"
              >YouTube</a
            >.
          </p>
        </div>
      </div>

      <!-- German content -->
      <div v-else-if="selectedLanguage === 'german'" class="content-column">
        <div class="content-grid">
          <div class="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/TPsCd9tatRg"
              title="Tandem Präsentation"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="text-container">
            <h3>Wie funktioniert es konkret?</h3>
            <p>
              Nach der Zuweisung eines kulturellen Tandems durch die
              Tandem-Koordinatorin hier ein Vorschlag für das weitere Vorgehen:
            </p>
            <h3>In Worte fassen</h3>
            <p>
              Um mit Ihrem kulturellen Tandem-Partner, der vielleicht nicht viel
              über die politische Welt weiß, diskutieren zu können, sind hier
              einige Fragen, die Sie sich zur Vorbereitung stellen können:
            </p>
            <ul>
              <li>Wie organisiere ich meine Arbeit als Abgeordneter?</li>
              <li>Wie viel Zeit widme ich dem?</li>
              <li>
                Wie informiere ich mich über Themen, die diskutiert werden
                sollen?
              </li>
            </ul>

            <h3>Erster Kontakt</h3>
            <p>
              Nehmen Sie Kontakt mit Ihrem Tandem auf und vereinbaren Sie einen
              Termin. Seien Sie kreativ, damit dieses Treffen Ihren Partner
              beeindruckt.
            </p>
            <ul>
              <li>Kaffee bleibt ein sicherer und neutraler Wert, aber...</li>
              <li>
                Nehmen Sie Ihr Tandem mit ins Feld (Grosser Rat, Büro usw.),
                damit es einen neuen Raum entdeckt und in Ihre Welt eintaucht;
              </li>
              <li>
                Schlagen Sie Ihrem Tandem vor, sich bei einer kulturellen oder
                politischen Veranstaltung zu treffen (Dreharbeiten, Ausstellung,
                Aufführung, Parlamentssitzung usw.).
              </li>
            </ul>
          </div>
        </div>

        <div class="content-grid">
          <div class="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/S_5L3_Uu7Ig"
              title="Tandem Erfahrung"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="text-container">
            <h3>Und worüber sprechen wir?</h3>
            <p>
              Kartel möchte mit den Politikern "ohne Schönfärberei" diskutieren.
              Das Ziel ist daher, aufrichtig über Ihre Realität als Politiker:in
              zu sprechen und ebenso aufrichtig den Alltag Ihres kulturellen
              Tandems zu hören.
            </p>
            <p>
              Erst wenn man die Mechanismen der Politik und der Kulturwelt
              versteht, kann ein echter Dialog beginnen. Es ist wichtig, dass
              diese Treffen Zeiten des Austauschs und nicht Zeiten der
              Beschwerde sind.
            </p>
            <p>
              Vergessen Sie schließlich nicht, dass Tandem keine Pflichtaufgabe
              ist. Der Austausch kann auf verschiedenen Ebenen stattfinden,
              viele Worte, wenige, viele Treffen, wenige, die Qualität der Übung
              wird für jedes Tandem einzigartig sein. Und vor allem: Haben Sie
              Freude daran, eine neue Person, eine neue Funktion, eine neue
              Denkweise usw. kennenzulernen.
            </p>
          </div>
        </div>

        <div class="content-grid">
          <div class="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/hvSvdK6zOC0"
              title="Tandem Einblicke"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="text-container">
            <h3>Wie oft sehen wir uns?</h3>
            <p>
              Die Häufigkeit der Treffen ist nicht festgelegt, wird aber auf
              drei oder vier Mal pro Jahr geschätzt, zusätzlich zu einem
              jährlichen allgemeinen Treffen aller Tandems.
            </p>

            <h3>Gibt es ein Debriefing?</h3>
            <p>
              Einmal im Jahr organisiert Kartel eine Veranstaltung für alle
              Tandems. Zögern Sie nicht, dabei zu sein!
            </p>

            <h3>Interesse an einem Tandem?</h3>
            <p>
              Kontakt Jennifer Skolovski, Tandem-Koordinatorin für Kartel:
              <a href="mailto:skolovski@yahoo.de">skolovski@yahoo.de</a> oder
              <a href="tel:+41787118133">+41 78 711 81 33</a>.
            </p>
          </div>
        </div>

        <div class="objectives-box">
          <h3>Ziele</h3>
          <ul>
            <li>
              Stärkung der Verbindungen zwischen der Welt der Politik und der
              Kultur;
            </li>
            <li>
              Beiden Parteien die Werkzeuge/Argumente für eine Kulturpolitik an
              die Hand geben, die mit den Bedürfnissen vor Ort in Einklang
              steht;
            </li>
            <li>
              Sensibilisierung der Kulturschaffenden für politische Themen und
              der Politiker:innen für die Herausforderungen in den verschiedenen
              Kulturbereichen;
            </li>
            <li>
              Überzeugen vom Nutzen gemeinsamer Arbeit und gemeinsamer Aktionen,
              um die Ausstrahlung der Walliser Kultur zu sichern;
            </li>
            <li>
              Förderung einer durchdachten kantonalen Kulturpolitik, die die
              politischen Zwänge und die betroffenen Kulturbereiche
              berücksichtigt;
            </li>
            <li>
              Gewährleistung einer regelmäßigen Präsenz der Politik in der
              Kulturwelt und der Kultur in der Welt der Politik;
            </li>
            <li>
              Ermöglichung einer flexiblen und direkten Kommunikation zwischen
              Politiker:innen und Kulturschaffenden.
            </li>
          </ul>
        </div>

        <div class="youtube-link">
          <p>
            Entdecken Sie mehr Videos auf unserem
            <a href="https://www.youtube.com/@Kartel_VS" target="_blank"
              >YouTube-Kanal</a
            >.
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "default",
});

const selectedLanguage = ref(null);
</script>

<style scoped>
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.intro-column p {
  line-height: 1.6;
  margin-bottom: 20px;
}

.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 1);
  margin: 30px 0;
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
  line-height: 1.6;
  margin-bottom: 20px;
}

.content-column h3 {
  margin-top: 30px;
  margin-bottom: 15px;
}

.content-column h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.content-column ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.content-column li {
  margin-bottom: 8px;
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

.objectives-box {
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
}

.objectives-box h3 {
  margin-top: 0;
}

.youtube-link {
  text-align: center;
  margin: 30px 0;
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
</style>
