<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import TextWithImage from "../components/TextWithImage.vue"
</script>

<template>
  <div class="page">
    <Header />

    <section class="p-8 bg-black">
      <TextWithImage
        title="Quand la foi devient vibration"
        verse="Ce ne sont pas des voix… Ce sont des âmes en prière."
        text="Dans chaque voix du C.A.S.T., il y a une histoire, une foi, une espérance. Le chœur devient un laboratoire spirituel, où la musique éclaire le cœur."
        image="spiritualite.jpg"
        alt="Moment de spiritualité"
        position="left"
      />

      <TextWithImage
        title="Là où la voix devient lumière"
        verse="Chantez à l'Éternel un cantique nouveau."
        text="Chaque note est une offrande, chaque harmonie une prière. La musique devient un pont entre le ciel et la terre."
        image="chorale-1.jpg"
        alt="Chorale en lumière"
        position="right"
      />
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.page {
  background-color: #000;
  color: #C0C0C0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>