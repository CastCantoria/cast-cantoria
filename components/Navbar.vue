<template>
  <header class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2">
        <img src="/assets/images/branding/logo-cantoria.png" alt="Logo C.A.S.T." class="h-10 w-auto" />
        <span class="text-xl font-title font-bold text-primary">C.A.S.T. Cantoria</span>
      </router-link>

      <!-- Menu desktop -->
      <nav class="hidden md:flex space-x-6">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/galerie" class="nav-link">Galerie</router-link>
        <router-link to="/register" class="nav-link">Inscription</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </nav>

      <!-- Bouton hamburger -->
      <button @click="isOpen = !isOpen" class="md:hidden focus:outline-none">
        <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Menu mobile -->
    <transition name="fade">
      <nav v-if="isOpen" class="md:hidden bg-white border-t border-accent px-4 py-4 space-y-2">
        <router-link to="/" class="block nav-link">Accueil</router-link>
        <router-link to="/galerie" class="block nav-link">Galerie</router-link>
        <router-link to="/register" class="block nav-link">Inscription</router-link>
        <router-link to="/contact" class="block nav-link">Contact</router-link>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
.nav-link {
  color: var(--color-primary);
  font-weight: 600;
  transition-property: color;
  transition-duration: 300ms;
}
.nav-link:hover {
  color: var(--color-accent);
}
.text-primary {
  color: var(--color-primary);
}
.text-accent {
  color: var(--color-accent);
}
.font-title {
  font-family: var(--font-title);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>