<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <AppHeader />

    <main class="flex-grow animate-fade-slide">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/admin/Header.vue'
import AppFooter from '@/components/admin/Footer.vue'
</script>

<style scoped>
@keyframes fade-slide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-slide {
  animation: fade-slide 0.5s ease-out;
}
</style>