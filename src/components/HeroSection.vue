<template>
  <section class="hero">
    <h1 class="text-gold text-4xl mb-2">Bienvenue dans Sanctum Vox</h1>
    <p class="text-silver mb-6">Un espace où le silence chante et l’art devient offrande.</p>
    <router-link to="/about" class="btn-red">Entrer dans le sanctuaire</router-link>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  background-color: black;
  padding: 4rem 2rem;
  text-align: center;
}
.text-gold {
  color: #FFD700;
}
.text-silver {
  color: #C0C0C0;
}
.btn-red {
  background-color: #B22222;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}
.btn-red:hover {
  background-color: #8B1A1A;
}
</style>