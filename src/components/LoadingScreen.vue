<!-- src/components/LoadingScreen.vue -->
<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    <p class="ml-4 text-blue-700 font-semibold">Chargement en cours...</p>
  </div>
</template>

<script setup>
// Aucun script nécessaire ici, c’est un composant visuel
</script>

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>