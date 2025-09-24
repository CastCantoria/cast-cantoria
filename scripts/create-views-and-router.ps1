# === create-views-and-router.ps1 ===
$viewsRoot = "src/views"
if (!(Test-Path $viewsRoot)) { New-Item -ItemType Directory -Path $viewsRoot | Out-Null }

function Write-IfMissingOrReplace($path, $content) {
  $dir = Split-Path $path
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $content | Out-File -FilePath $path -Encoding utf8
  Write-Host "✅ Écrit: $path"
}

# --- HOME ---
$homeView = @'
<script setup>
import Header from "../components/Header.vue"
import HeroSection from "../components/HeroSection.vue"
import QuoteBlock from "../components/QuoteBlock.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <Header />
  <HeroSection />

  <section class="p-8 bg-black text-silver">
    <QuoteBlock
      text="Quand l’art devient prière, la musique touche l’âme"
      author="C.A.S.T."
    />
    <p class="max-w-3xl mx-auto leading-relaxed mt-6">
      Fondé en 2003 à Antananarivo, le C.A.S.T. est un ensemble vocal dont
      l’essence repose sur le souffle sacré de la musique. Fruit d’une
      convergence de vocations artistiques et spirituelles, il rassemble des
      choristes issus de toutes les Églises chrétiennes du FFKM, illustrant
      ainsi une véritable unité œcuménique.
    </p>
  </section>

  <Footer />
</template>

<style scoped>
.text-silver { color: #C0C0C0; }
</style>
'@
Write-IfMissingOrReplace "$viewsRoot/Home.vue" $homeView

# --- ABOUT ---
$aboutView = @'
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <Header />
  <section class="p-8 bg-black text-silver">
    <h2 class="text-gold text-3xl mb-4">Histoire</h2>
    <p>
      Depuis sa création, le C.A.S.T. incarne une mission de service et de
      spiritualité, œuvrant à faire entendre la voix de l’âme malgache dans un
      dialogue entre tradition et modernité.
    </p>

    <h2 class="text-gold text-3xl mt-8 mb-4">Fondateurs et direction</h2>
    <ul class="list-disc pl-6">
      <li>Son Excellence Liva ANDRIAMANALINARIVO – Président fondateur</li>
      <li>Maître Éric RASAMIMANANA – Directeur artistique</li>
      <li>Jules R. et Tovoniaina R. – Assistants et chefs de pupitre</li>
    </ul>

    <h2 class="text-gold text-3xl mt-8 mb-4">Vision</h2>
    <p>
      Le C.A.S.T. aspire à devenir une cathédrale vivante, où chaque voix,
      chaque note, chaque silence participe à la révélation du divin dans l’art
      vocal, tout en affirmant l’identité culturelle malgache.
    </p>
  </section>
  <Footer />
</template>

<style scoped>
.text-gold { color: #FFD700; }
.text-silver { color: #C0C0C0; }
</style>
'@
Write-IfMissingOrReplace "$viewsRoot/About.vue" $aboutView

# --- REPERTOIRE ---
$repertoireView = @'
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import RepertoireList from "../components/RepertoireList.vue"

const european = [
  { title: "Messiah (Hallelujah, Zadok the Priest)", composer: "Händel" },
  { title: "La Création", composer: "Haydn" },
  { title: "Requiem", composer: "Mozart" },
  { title: "Ode à la joie", composer: "Beethoven" }
]

const malagasy = [
  { title: "Tompo ô, indrisy", composer: "Rémi Andriantsoavina" },
  { title: "Ny feonay", composer: "Joelison Randrianindrina" }
]
</script>

<template>
  <Header />
  <section class="p-8 bg-black">
    <RepertoireList :european="european" :malagasy="malagasy" />
  </section>
  <Footer />
</template>
'@
Write-IfMissingOrReplace "$viewsRoot/Repertoire.vue" $repertoireView

# --- CONCERTS ---
$concertsView = @'
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import EventCalendar from "../components/EventCalendar.vue"

const events = [
  { date: "2025-12-20", title: "Veillée de Noël", location: "Cathédrale d’Andohalo" },
  { date: "2026-03-15", title: "Concert anniversaire", location: "Faravohitra" }
]
</script>

<template>
  <Header />
  <section class="p-8 bg-black">
    <EventCalendar :events="events" />
  </section>
  <Footer />
</template>
'@
Write-IfMissingOrReplace "$viewsRoot/Concerts.vue" $concertsView

# --- SPIRITUALITE ---
$spiritualiteView = @'
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import SpiritualMeditation from "../components/SpiritualMeditation.vue"
</script>

<template>
  <Header />
  <section class="p-8 bg-black">
    <SpiritualMeditation
      title="Quand la foi devient vibration"
      verse="Ce ne sont pas des voix… Ce sont des âmes en prière"
      body="<p>Dans chaque voix du C.A.S.T., il y a une histoire, une foi, une espérance. Le chœur devient un laboratoire spirituel, où la musique éclaire le cœur.</p>"
    />
  </section>
  <Footer />
</template>
'@
Write-IfMissingOrReplace "$viewsRoot/Spiritualite.vue" $spiritualiteView

# --- ROUTER ---
$routerContent = @'
import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Repertoire from "../views/Repertoire.vue"
import Concerts from "../views/Concerts.vue"
import Spiritualite from "../views/Spiritualite.vue"

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/repertoire", name: "Repertoire", component: Repertoire },
  { path: "/concerts", name: "Concerts", component: Concerts },
  { path: "/spiritualite", name: "Spiritualite", component: Spiritualite }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
'@
Write-IfMissingOrReplace "src/router/index.js" $routerContent

Write-Host "`n✨ Vues et routeur mis à jour avec succès."