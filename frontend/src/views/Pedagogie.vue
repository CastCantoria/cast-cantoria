<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
</script>

<template>
  <div class="page">
    <Header />

    <section class="pedagogie">
      <h1 class="text-gold text-3xl mb-4">La pédagogie du Sanctum</h1>
      <p>
        Ici, nous cultivons la voix comme une offrande. Chaque note, chaque souffle, chaque silence est un apprentissage.
      </p>
      <p>
        Cette page accueillera les méthodes, les rituels vocaux, les partitions vivantes et les témoignages de ceux qui enseignent et reçoivent.
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
.pedagogie {
  padding: 2rem;
  background-color: #000;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #FFD700;
}
p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ccc;
}
.text-gold {
  color: #FFD700;
}
</style>