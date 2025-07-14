<!-- eslint-disable vue/html-self-closing -->
<template>
  <NuxtLayout name="default">
    <!-- Introduction section - always visible -->
    <div class="intro-grid">
      <div class="intro-column french">
        <p>
          Face aux défis actuels, le Service de la culture de l'Etat du Valais,
          la Conférence valaisanne des Responsables aux Affaires culturelles
          (CRAC) et Kartel ont entamé réflexion globale sur la durabilité dans
          les domaines culturels.
        </p>
        <p>
          En résulte un
          <a href="/2025_Durabilite dans les milieux culturels.pdf" download
            >rapport</a
          >
          qui regroupe des pistes d'amélioration, ainsi qu'une liste d'actions
          en cours au niveau local, cantonal et fédéral autour de cette
          thématique.
        </p>
      </div>

      <div class="intro-column german">
        <p>
          Die Dienststelle für Kultur des Kantons Wallis, die Konferenz der
          Walliser Kulturdelegierten (CRAC) und Kartel haben eine umfassende
          Analyse zum Thema Nachhaltigkeit im Kulturbereich durchgeführt.
        </p>
        <p>
          Das Ergebnis ist ein
          <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
            >Bericht</a
          >, der Verbesserungsmöglichkeiten sowie eine Liste von
          Positivbeispielen auf lokaler, kantonaler und nationaler Ebene
          liefert.
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
        <div class="content-section">
          <h3>À propos</h3>
          <p>
            Dans un monde en constante évolution, le milieu culturel est
            confronté à une série de difficultés qui affectent sa viabilité et
            sa pertinence. Parmi ces défis complexes, figurent les questions
            environnementales, sociales et économiques croissantes. Le groupe de
            travail s'est fixé comme objectif d'éditer un
            <a href="/2025_Durabilite dans les milieux culturels.pdf" download
              >rapport</a
            >
            avec des solutions concrètes aux enjeux de durabilité pour
            l'ensemble des acteurs et actrices de la culture.
          </p>
        </div>

        <div class="content-section">
          <h3>Une boîte à outils</h3>
          <p>
            Le
            <a href="/2025_Durabilite dans les milieux culturels.pdf" download
              >rapport</a
            >
            du groupe de travail peut être utilisé comme une boite à outils dans
            laquelle les acteurs et actrices culturel·le·s, du secteur privé ou
            public, des milieux indépendants ou des institutions, sont
            invité·e·s à puiser des solutions. C'est un point de départ,
            nullement un ensemble exhaustif qui propose des pistes pour mettre
            en œuvre des actions concrètes afin d'aligner l'activité culturelle
            sur les démarches en cours dans d'autres branches économiques. De
            plus, il amène des réflexions qui s'efforcent d'être innovantes pour
            affirmer son rôle inspirant au sein de la société. Le
            <a href="/2025_Durabilite dans les milieux culturels.pdf" download
              >rapport</a
            >
            s'inscrit dans le sillage des efforts collectifs déjà en œuvre tels
            que les agendas 2030 et 2050 du Canton et de la Confédération.
          </p>
        </div>

        <div class="content-section">
          <h3>Cinq objectifs</h3>
          <p>
            Le
            <a href="/2025_Durabilite dans les milieux culturels.pdf" download
              >rapport</a
            >
            se basant sur cinq objectifs, à savoir :
          </p>
          <ul>
            <li>Offrir des solutions</li>
            <li>Encourager l'adoption de comportements responsables</li>
            <li>
              Faciliter la mise en réseau avec des acteur·rice·s qui s'engagent
              dans des pratiques durables
            </li>
            <li>
              Créer une ressource continue et évolutive, servant de référence
              pour les initiatives actuelles et futures
            </li>
            <li>
              Former les travailleur·euse·s culturel·le·s aux éléments de
              durabilité
            </li>
          </ul>
        </div>

        <div class="content-section">
          <h3>Neuf secteurs de développement</h3>
          <p>
            Le
            <a href="/2025_Durabilite dans les milieux culturels.pdf" download
              >rapport</a
            >, en se basant sur ces objectifs, analyse les actions de changement
            à travers neuf secteurs de développement qui sont :
          </p>
          <ul>
            <li>La gestion des ressources humaines</li>
            <li>La mobilité et le transport</li>
            <li>Le numérique</li>
            <li>L'énergie</li>
            <li>Les achats</li>
            <li>Les bâtiments et l'architecture</li>
            <li>Les déchets</li>
            <li>Les finances</li>
            <li>La formation</li>
          </ul>
        </div>

        <div class="content-section">
          <h3>Trois temporalités</h3>
          <p>
            Le
            <a href="/2025_Durabilite dans les milieux culturels.pdf" download
              >rapport</a
            >
            se construit d'après trois temporalités d'engagement :
          </p>
          <ul>
            <li>
              Le niveau initiatique (1 à 5 ans) qui liste des actions
              relativement simples à initier, sans impact financier ou
              logistique majeur
            </li>
            <li>
              Le niveau progressif (5 à 10 ans) qui demande un engagement plus
              important et implique des actions nécessitant une planification
            </li>
            <li>
              Le niveau visionnaire (10 à 15 ans) qui exige une vision à long
              terme et une approche stratégique plus développée
            </li>
          </ul>
        </div>

        <div class="content-section">
          <h3>Les autres ressources</h3>
          <p>
            Ce document vise à être le plus complet possible, mais d'autres
            sources similaires offrent également des outils précieux pour
            promouvoir les durabilités dans les milieux culturels.
          </p>

          <h3>Labels</h3>
          <ul>
            <li>
              <a
                href="https://ecoentreprise.ch/certificats/certificats-ecoentreprise/"
                target="_blank"
                >Certificats EcoEntreprise</a
              >
            </li>
            <li>
              <a
                href="http://www.stv-fst.ch/fr/durabilite/centre-de-competences/swisstainable"
                target="_blank"
                >Label Swisstainable</a
              >
            </li>
            <li>
              Pro Infirmis:
              <a
                href="http://www.kulturinklusiv.ch/fr/bureau-specialise.html"
                target="_blank"
                >LABEL Culture inclusive</a
              >
            </li>
          </ul>

          <h3>Web</h3>
          <ul>
            <li>
              <a
                href="https://www.bak.admin.ch/bak/fr/home/themes/dialogue-culturel-national.html"
                target="_blank"
                >Dialogue culturel national</a
              >
            </li>
            <li>
              Francs Energie:
              <a href="https://www.francsenergie.ch/fr" target="_blank"
                >Programmes de subvention pour l'énergie et la mobilité</a
              >
            </li>
            <li>
              Green Shooting - Swiss Film & Media:
              <a href="https://www.green-shooting.ch/fr_FR/" target="_blank"
                >SWISS CO2-Calculator</a
              >
            </li>
            <li>
              Kompass Nachhaltigkeit:
              <a
                href="https://oeffentlichebeschaffung.kompass-nachhaltigkeit.ch/fileadmin/kundendaten/produkte-labels/Textilien/Fiche_d_information_Textiles.pdf"
                target="_blank"
                >Fiche pour des achats textiles responsables</a
              >
            </li>
            <li>
              Légumes suisses:
              <a
                href="https://www.gemuese.ch/fr/calendrier-des-saisons"
                target="_blank"
                >Calendrier de saison Suisse</a
              >
            </li>
            <li>
              myclimate:
              <a
                href="https://co2.myclimate.org/fr/event_calculators/new"
                target="_blank"
                >Calcul des émissions d'un événement</a
              >
            </li>
            <li>
              Palais des Beaux Arts de Lille:
              <a
                href="https://pba.lille.fr/Collections/POUR-UN-MUSEE-DURABLE"
                target="_blank"
                >POUR UN MUSÉE DURABLE</a
              >
            </li>
            <li>
              Petzi:
              <a
                href="https://www.petzi.ch/fr/projets-campagnes/enjoy-live-music-commit-to-a-sustainable-future/"
                target="_blank"
                >Enjoy LIVE Music - commit to a sustainable future</a
              >
            </li>
            <li>
              Plateforme de connaissances sur les achats public responsables:
              <a
                href="https://woeb.swiss/fr/documents/fiches-sur-les-groupes-de-produits-toolbox-partie-c"
                target="_blank"
                >Fiches sur les groupes de produits (Toolbox partie C)</a
              >
            </li>
            <li>
              Public Eye:
              <a
                href="https://www.publiceye.ch/fileadmin/doc/Mode/2017_PublicEye_Guide_des_labels_FR_Flyer.pdf"
                target="_blank"
                >Guide des Labels: "Comment s'orienter dans la jungle des
                labels?"</a
              >
            </li>
            <li>
              reflector:
              <a href="https://reflector.eco/fr/" target="_blank"
                >Green Guide for Cultural Organisations</a
              >
            </li>
            <li>
              reflector - White Light:
              <a
                href="https://reflector.eco/media/green-guide_white_light.pdf"
                target="_blank"
                >Green Guide for Performing Arts</a
              >
            </li>
            <li>
              <a href="https://theatregreenbook.com/about-us/" target="_blank"
                >Theatre Green Book</a
              >
            </li>
            <li>
              Toolbox Achats Responsables Suisse:
              <a
                href="https://woeb.swiss/images/dokumente/PDF/FR/Toolbox_B_outilsetmethodes_fr_2023.pdf"
                target="_blank"
                >Outils d'évaluation d'impact des fournisseurs et produits</a
              >
            </li>
            <li>
              WWF Switzerland:
              <a
                href="https://www.wwf.ch/fr/guide-labels-alimentaires"
                target="_blank"
                >Evaluation des principaux labels alimentaires</a
              >
            </li>
          </ul>

          <h3>Littérature</h3>
          <ul>
            <li>
              <em
                >Culture et créativité pour le développement durable, bonnes
                pratiques pour les collectivités publiques</em
              >, Office fédéral du développement territorial et Office fédéral
              de la culture, 2017.
            </li>
            <li><em>Décarbonons la culture !</em>, The Shift Project, 2021.</li>
            <li>
              <em
                >Economie d'énergie : recommandations de mesures dans le secteur
                culturel</em
              >, Conférence des responsables aux Affaires culturelles du Valais,
              2022.
            </li>
            <li>
              <em
                >Enquête sur les conditions de travail des artistes en
                Valais</em
              >, Hélène Mariéthoz, Visarte Valais, 2022.
            </li>
            <li>
              <em>Le palais des beaux-arts de Lille,</em> un musée en
              transition, Guide pratique d'écoconception, 2022.
            </li>
            <li>
              <em>Le système des arts de la scène en Suisse romande</em>,
              Mathias Rotha, Heg – Haute école de gestion Arc, 2022.
            </li>
            <li>
              <em>Recommandations d'économies d'énergie,</em> la Conférence des
              directeurs cantonaux de l'énergie (EnDK), 2022.
            </li>
            <li>Message culture 2025 – 2028 de la Confédération</li>
          </ul>

          <h3>Challenges pour vos équipes</h3>
          <ul>
            <li>
              APPLICATION WEFLO:
              <a href="https://www.weflo.fr/" target="_blank"
                >Centralisez les informations liées aux déplacements de vos
                collaborateurs, tout en les incitant à privilégier les mobilités
                douces.</a
              >
            </li>
            <li>
              LE CHALLENGE MA PETITE PLANÈTE:
              <a href="https://www.weflo.fr/" target="_blank"
                >Participez à un Défi écologique en entreprise durant trois
                semaine.</a
              >
            </li>
          </ul>
        </div>

        <div class="contact-section">
          <h3>Contacts</h3>
          <div class="contact-grid">
            <div class="contact-item">
              <strong>Arnaud Favre</strong><br />
              Président de la CRAC<br />
              <a href="mailto:arnaud.favre@riddes.ch">arnaud.favre@riddes.ch</a>
            </div>
            <div class="contact-item">
              <strong>Laurie Braconnier</strong><br />
              Responsable lien culturel l'Archipel<br />
              <a href="mailto:laurie.b@archipelsion.ch"
                >laurie.b@archipelsion.ch</a
              >
            </div>
            <div class="contact-item">
              <strong>Alain Dubois</strong><br />
              Chef du Service de la culture du Canton du Valais<br />
              <a href="mailto:alain.dubois@admin.vs.ch"
                >alain.dubois@admin.vs.ch</a
              >
            </div>
            <div class="contact-item">
              <strong>Christophe Burgess</strong><br />
              Représentant de Kartel<br />
              <a href="mailto:christophe.burgess@protonmail.ch"
                >christophe.burgess@protonmail.ch</a
              >
            </div>
            <div class="contact-item">
              <strong>Mathieu Bessero-Belti</strong><br />
              Président de Culture Valais et membre de la CRAC<br />
              <a href="mailto:mathieu.bessero-belti@villedemartigny.ch"
                >mathieu.bessero-belti@villedemartigny.ch</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- German content -->
      <div v-else-if="selectedLanguage === 'german'" class="content-column">
        <div class="content-section">
          <h3>1 Bericht</h3>
          <p>
            In einer sich ständig verändernden Welt wird das Kulturschaffen mit
            einer Reihe von Herausforderungen konfrontiert, die seine
            Nachhaltigkeit in Frage stellen. Dazu gehören zunehmend auch Fragen
            ökologischer, sozialer und ökonomischer Nachhaltigkeit. Die
            Arbeitsgruppe hat sich zum Ziel gesetzt, einen
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            mit konkreten Lösungen für Herausforderungen im Zusammenhang mit der
            Nachhaltigkeit im Kulturbereich herauszugeben.
          </p>
        </div>

        <div class="content-section">
          <h3>1 Werkzeugkasten</h3>
          <p>
            Dieser Werkzeugkasten soll Kulturschaffenden, die privat,
            öffentlich, unabhängig oder in Kulturinstitutionen tätig sind,
            Inspiration für neue Lösungswege bieten. Der
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            stellt einen Ausgangspunkt und keineswegs eine vollständige
            Zusammenstellung dar. Er soll Wege zur Umsetzung konkreter
            Massnahmen vorschlagen, um das Kulturschaffen an die
            Nachhaltigkeitsansätze in anderen Wirtschaftszweigen anzunähern.
            Darüber hinaus bringt der
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            innovative Überlegungen ein, welche als Inspiration dienen sollen.
            Der
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            knüpft an bereits laufende gesellschaftliche Reflexionen an, wie die
            Agenda 2030 oder 2050 des Kantons und oder Bundes.
          </p>
        </div>

        <div class="content-section">
          <h3>5 Ziele</h3>
          <p>
            Der
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            basiert auf 5 Zielen:
          </p>
          <ul>
            <li>Lösungen anbieten</li>
            <li>Verantwortungsbewusstes Verhalten fördern</li>
            <li>
              Erleichterte Vernetzung mit Akteuren schaffen, die sich für
              nachhaltige Praktiken einsetzen
            </li>
            <li>
              Kontinuierliche und sich entwickelnde Quelle als Referenz für
              aktuelle und zukünftige Projekte bieten
            </li>
            <li>
              Kulturschaffende in den Elementen der Nachhaltigkeit schulen
            </li>
          </ul>
        </div>

        <div class="content-section">
          <h3>9 Entwicklungsbereiche</h3>
          <p>
            Ausgehend von diesen Zielen analysiert der
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            Veränderungsmassnahmen in 9 Entwicklungsbereichen:
          </p>
          <ul>
            <li>Personalmanagement</li>
            <li>Mobilität und Transport</li>
            <li>Digitalisierung</li>
            <li>Energie</li>
            <li>Beschaffung</li>
            <li>Gebäude und Architektur</li>
            <li>Abfall</li>
            <li>Finanzen</li>
            <li>Bildung</li>
          </ul>
        </div>

        <div class="content-section">
          <h3>3 Handlungsebenen</h3>
          <p>
            Der
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            baut auf 3 Handlungsebenen:
          </p>
          <ul>
            <li>
              Die aufbauende Ebene (1-5 Jahre), die relativ einfach
              einzuleitende Aktionen umfasst. Diese Aktionen tragen keine
              grösseren finanziellen oder logistischen Auswirkungen mit sich.
            </li>
            <li>
              Die progressive Ebene (5-10 Jahre), die einen grösseren Aufwand
              beinhaltet und Aktionen erfordert, die sorgfältig geplant werden
              müssen.
            </li>
            <li>
              Die visionäre Ebene (10-15 Jahre), die eine langfristige Vision
              und die Entwicklung eines strategischen Ansatzes beinhaltet.
            </li>
          </ul>
        </div>

        <div class="content-section">
          <h3>Weitere Quellen</h3>
          <p>
            Mit diesem
            <a href="/Bericht 'Nachhaltigkeit' zum Herunterladen.pdf" download
              >Bericht</a
            >
            hast du eine nützliche und umfassende Grundlage zur Förderung der
            Nachhaltigkeit im Kulturbereich. Gerne listen wir hier auch weitere
            hilfreiche Quellen zur Förderung von Nachhaltigkeit in der Kultur
            auf.
          </p>

          <h3>Labels</h3>
          <ul>
            <li>
              <a
                href="https://ecoentreprise.ch/certificats/certificats-ecoentreprise/"
                target="_blank"
                >Certificats EcoEntreprise</a
              >
            </li>
            <li>
              <a
                href="http://www.stv-fst.ch/fr/durabilite/centre-de-competences/swisstainable"
                target="_blank"
                >Label Swisstainable</a
              >
            </li>
            <li>
              Pro Infirmis:
              <a
                href="http://www.kulturinklusiv.ch/fr/bureau-specialise.html"
                target="_blank"
                >LABEL Culture inclusive</a
              >
            </li>
          </ul>

          <h3>Web</h3>
          <ul>
            <li>
              <a
                href="https://www.bak.admin.ch/bak/fr/home/themes/dialogue-culturel-national.html"
                target="_blank"
                >Dialogue culturel national</a
              >
            </li>
            <li>
              Francs Energie:
              <a href="https://www.francsenergie.ch/fr" target="_blank"
                >Programmes de subvention pour l'énergie et la mobilité</a
              >
            </li>
            <li>
              Green Shooting - Swiss Film & Media:
              <a href="https://www.green-shooting.ch/fr_FR/" target="_blank"
                >SWISS CO2-Calculator</a
              >
            </li>
            <li>
              Kompass Nachhaltigkeit:
              <a
                href="https://oeffentlichebeschaffung.kompass-nachhaltigkeit.ch/fileadmin/kundendaten/produkte-labels/Textilien/Fiche_d_information_Textiles.pdf"
                target="_blank"
                >Fiche pour des achats textiles responsables</a
              >
            </li>
            <li>
              Légumes suisses:
              <a
                href="https://www.gemuese.ch/fr/calendrier-des-saisons"
                target="_blank"
                >Calendrier de saison Suisse</a
              >
            </li>
            <li>
              myclimate:
              <a
                href="https://co2.myclimate.org/fr/event_calculators/new"
                target="_blank"
                >Calcul des émissions d'un événement</a
              >
            </li>
            <li>
              Palais des Beaux Arts de Lille:
              <a
                href="https://pba.lille.fr/Collections/POUR-UN-MUSEE-DURABLE"
                target="_blank"
                >POUR UN MUSÉE DURABLE</a
              >
            </li>
            <li>
              Petzi:
              <a
                href="https://www.petzi.ch/fr/projets-campagnes/enjoy-live-music-commit-to-a-sustainable-future/"
                target="_blank"
                >Enjoy LIVE Music - commit to a sustainable future</a
              >
            </li>
            <li>
              Plateforme de connaissances sur les achats public responsables:
              <a
                href="https://woeb.swiss/fr/documents/fiches-sur-les-groupes-de-produits-toolbox-partie-c"
                target="_blank"
                >Fiches sur les groupes de produits (Toolbox partie C)</a
              >
            </li>
            <li>
              Public Eye:
              <a
                href="https://www.publiceye.ch/fileadmin/doc/Mode/2017_PublicEye_Guide_des_labels_FR_Flyer.pdf"
                target="_blank"
                >Guide des Labels: "Comment s'orienter dans la jungle des
                labels?"</a
              >
            </li>
            <li>
              reflector:
              <a href="https://reflector.eco/fr/" target="_blank"
                >Green Guide for Cultural Organisations</a
              >
            </li>
            <li>
              reflector - White Light:
              <a
                href="https://reflector.eco/media/green-guide_white_light.pdf"
                target="_blank"
                >Green Guide for Performing Arts</a
              >
            </li>
            <li>
              <a href="https://theatregreenbook.com/about-us/" target="_blank"
                >Theatre Green Book</a
              >
            </li>
            <li>
              Toolbox Achats Responsables Suisse:
              <a
                href="https://woeb.swiss/images/dokumente/PDF/FR/Toolbox_B_outilsetmethodes_fr_2023.pdf"
                target="_blank"
                >Outils d'évaluation d'impact des fournisseurs et produits</a
              >
            </li>
            <li>
              WWF Switzerland:
              <a
                href="https://www.wwf.ch/fr/guide-labels-alimentaires"
                target="_blank"
                >Evaluation des principaux labels alimentaires</a
              >
            </li>
          </ul>

          <h3>Littérature</h3>
          <ul>
            <li>
              <em
                >Culture et créativité pour le développement durable, bonnes
                pratiques pour les collectivités publiques</em
              >, Office fédéral du développement territorial et Office fédéral
              de la culture, 2017.
            </li>
            <li><em>Décarbonons la culture !</em>, The Shift Project, 2021.</li>
            <li>
              <em
                >Economie d'énergie : recommandations de mesures dans le secteur
                culturel</em
              >, Conférence des responsables aux Affaires culturelles du Valais,
              2022.
            </li>
            <li>
              <em
                >Enquête sur les conditions de travail des artistes en
                Valais</em
              >, Hélène Mariéthoz, Visarte Valais, 2022.
            </li>
            <li>
              <em>Le palais des beaux-arts de Lille,</em> un musée en
              transition, Guide pratique d'écoconception, 2022.
            </li>
            <li>
              <em>Le système des arts de la scène en Suisse romande</em>,
              Mathias Rotha, Heg – Haute école de gestion Arc, 2022.
            </li>
            <li>
              <em>Recommandations d'économies d'énergie,</em> la Conférence des
              directeurs cantonaux de l'énergie (EnDK), 2022.
            </li>
            <li>Message culture 2025 – 2028 de la Confédération</li>
          </ul>

          <h3>Challenges pour vos équipes</h3>
          <ul>
            <li>
              APPLICATION WEFLO:
              <a href="https://www.weflo.fr/" target="_blank"
                >Centralisez les informations liées aux déplacements de vos
                collaborateurs, tout en les incitant à privilégier les mobilités
                douces.</a
              >
            </li>
            <li>
              LE CHALLENGE MA PETITE PLANÈTE:
              <a href="https://www.weflo.fr/" target="_blank"
                >Participez à un Défi écologique en entreprise durant trois
                semaine.</a
              >
            </li>
          </ul>
        </div>

        <div class="contact-section">
          <h3>Kontakte</h3>
          <div class="contact-grid">
            <div class="contact-item">
              <strong>Arnaud Favre</strong><br />
              Präsident der CRAC<br />
              <a href="mailto:arnaud.favre@riddes.ch">arnaud.favre@riddes.ch</a>
            </div>
            <div class="contact-item">
              <strong>Laurie Braconnier</strong><br />
              Verantwortliche für Kultur bei l'Archipel<br />
              <a href="mailto:laurie.b@archipelsion.ch"
                >laurie.b@archipelsion.ch</a
              >
            </div>
            <div class="contact-item">
              <strong>Alain Dubois</strong><br />
              Chef der Dienststelle für Kultur des Kantons Wallis<br />
              <a href="mailto:alain.dubois@admin.vs.ch"
                >alain.dubois@admin.vs.ch</a
              >
            </div>
            <div class="contact-item">
              <strong>Christophe Burgess</strong><br />
              Vertreter von Kartel<br />
              <a href="mailto:christophe.burgess@protonmail.ch"
                >christophe.burgess@protonmail.ch</a
              >
            </div>
            <div class="contact-item">
              <strong>Mathieu Bessero-Belti</strong><br />
              Präsident von Kultur Wallis und Mitglied der CRAC<br />
              <a href="mailto:mathieu.bessero-belti@villedemartigny.ch"
                >mathieu.bessero-belti@villedemartigny.ch</a
              >
            </div>
          </div>
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
.contact-item {
  padding: 1.2rem 0px;
  line-height: 1.4;
}
</style>
