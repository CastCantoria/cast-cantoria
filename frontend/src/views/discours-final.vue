
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import TextWithImage from "../components/TextWithImage.vue"
</script>

<template>
  <div class="page">
    <Header />
    <main class="content">
      <h1 class="title">Discours final</h1>
      
      <TextWithImage
        text="â€œCe que vous entendrez aujourdâ€™hui, ce ne sont pas simplement des voixâ€¦Ce sont des Ã¢mes en priÃ¨re, des silences qui vibrent, des cÅ“urs en harmonie.Car ici, la musique ne se joue pas â€” elle se vit.Le C.A.S.T. est une offrande, un feu doux"
        image="cast-chorale.jpg"
        alt="Discours final"
        position="left"
      />
    </main>
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
.content {
  flex: 1;
  padding: 2rem;
}
.title {
  font-family: var(--font-title);
  color: #FFD700;
  text-align: center;
  margin-bottom: 2rem;
}
</style>

