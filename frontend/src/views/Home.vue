<script setup>
import { ref, onMounted } from "vue"
import { useAuthPopup } from '@/composables/useAuthPopup'

import Header from "../components/Header.vue"
import HeroSection from "../components/HeroSection.vue"
import QuoteBlock from "../components/QuoteBlock.vue"
import Footer from "../components/Footer.vue"
import Slider from "../components/Slider.vue"

const { openAuth } = useAuthPopup()
const goToAuth = () => {
  openAuth('login')
}

const sliderImages = [
  {
    src: '/assets/images/slide1.jpg',
    caption: 'Chœur en prière – l’union des voix sacrées'
  },
  {
    src: '/assets/images/slide2.jpg',
    caption: 'Lumière sur l’autel – la foi en lumière'
  },
  {
    src: '/assets/images/slide3.jpg',
    caption: 'Silence sacré – le souffle avant le chant'
  }
]

const sections = ref([
  {
    title: "",
    text: `Fondé en 2003 à Antananarivo, le C.A.S.T. est un ensemble vocal dont
    l’essence repose sur le souffle sacré de la musique. Fruit d’une
    convergence de vocations artistiques et spirituelles, il rassemble des
    choristes issus de toutes les Églises chrétiennes du FFKM — Fiombonan’ny
    Fiangonana Kristiana eto Madagasikara — illustrant ainsi une véritable
    unité œcuménique.`,
    image: "/assets/images/cast-chorale.jpg"
  },
  {
    title: "",
    text: `Sous la houlette de Son Excellence Liva ANDRIAMANALINARIVO, président
    fondateur, le chœur poursuit un objectif de faire vibrer l’âme et de
    porter au-delà des mots la puissance de la foi par la voix humaine. Le
    directeur artistique, Maître Éric RASAMIMANANA, insuffle chaque
    interprétation d’une rigueur musicale profonde et d’un amour sincère du
    sacré.`,
    image: "/assets/images/fondateur-cast.jpg"
  },
  {
    title: "🎗️ In Memoriam – Le murmure d’un homme devenu souffle éternel",
    text: `Avant même d’évoquer les fondations visibles du chœur, il est juste de
    saluer une présence discrète mais essentielle : Monsieur Lucien Emmanuel
    RANDRIANARIVELO (†).

    À l’image d’un orfèvre du sacré, il a patiemment transcrit les partitions
    complexes en grilles solfa accessibles, offrant à chaque choriste le don
    de compréhension. Mais sa mission allait plus loin : il a offert une âme
    malgache aux chefs-d’œuvre classiques, traduisant leurs paroles avec
    délicatesse, fidélité et spiritualité.

    "Misaotra anao, Raiamandreny. Ianao no nandika sy nandray ny feon’ny
    lanitra ho tenin’ny tanindrazana."

    Son héritage est immatériel, mais palpable à chaque instant, dans chaque
    vibration du chœur. Il ne chantait pas… mais c’est grâce à lui que chacun
    peut chanter avec clarté et profondeur.`,
    image: "/assets/images/lucien-emmanuel.png"
  }
])

onMounted(() => {
  sections.value = sections.value.map((s, i) => ({
    ...s,
    reverse: i % 2 === 1
  }))
})
</script>

<template>
  <div class="page">
    <Header />
    <HeroSection />

    <!-- Slider doux et sacré -->
    <section class="slider-section">
      <Slider :images="sliderImages" :interval="6000" />
    </section>

    <!-- Citation -->
    <section class="p-8 bg-black text-silver">
      <QuoteBlock
        text="Quand l’art devient prière, la musique touche l’âme"
        author="C.A.S.T."
      />

      <!-- Sections alternées -->
      <div class="max-w-5xl mx-auto mt-8 space-y-12">
        <div
          v-for="(item, index) in sections"
          :key="index"
          class="flex flex-col md:flex-row items-center gap-6"
          :class="{ 'md:flex-row-reverse': item.reverse }"
        >
          <div class="md:w-1/2 flex justify-center">
            <img
              :src="item.image"
              :alt="item.title || 'Illustration'"
              class="image-elegante image-reduite"
            />
          </div>
          <div class="md:w-1/2 leading-relaxed">
            <h2
              v-if="item.title"
              class="text-gold text-xl font-bold mb-2"
            >
              {{ item.title }}
            </h2>
            <p
              v-for="(para, pIndex) in item.text.split('\n').filter(Boolean)"
              :key="pIndex"
              class="mb-3"
            >
              {{ para }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <Footer />

    <!-- Avatar en bas -->
    <div class="avatar-container bottom">
      <img src="/assets/avatar.png" alt="Connexion" class="avatar" @click="goToAuth" />
    </div>
  </div>
</template>

<style scoped>
.page {
  background-color: #fdfaf6; /* fond crème doux */
  color: #3a3a3a; /* texte brun/gris foncé */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.text-silver {
  color: #6c6c6c;
}

.text-gold {
  color: #c8a951;
}

.image-elegante {
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(200, 169, 81, 0.2);
  border: 1px solid rgba(200, 169, 81, 0.3);
}

.image-reduite {
  max-width: 80%;
}

.slider-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.avatar-container {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
  border: 2px solid #c8a951;
}

.avatar:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .image-reduite {
    max-width: 100%;
  }
}
</style>