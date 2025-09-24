<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <div class="page">
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
.text-gold {
  color: #FFD700;
}
.text-silver {
  color: #C0C0C0;
}
</style>