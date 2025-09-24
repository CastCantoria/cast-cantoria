<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <!-- HEADER fixe en haut -->
    <AdminHeader class="flex-shrink-0" />

    <!-- CONTENU : chaque page gère son propre sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Zone de contenu scrollable -->
      <main class="flex-1 overflow-y-auto p-6 bg-white rounded-tl-xl shadow-inner">
        <router-view />
      </main>
    </div>

    <!-- FOOTER fixe en bas -->
    <AdminFooter class="flex-shrink-0" />
  </div>
</template>

<script setup>
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminFooter from '@/components/admin/AdminFooter.vue'
</script>

<style scoped>
/* Animation douce pour le contenu */
@keyframes fade-slide {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-slide {
  animation: fade-slide 0.4s ease-out;
}
</style>
