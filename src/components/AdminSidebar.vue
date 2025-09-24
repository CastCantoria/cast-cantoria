<template>
  <aside class="bg-black text-yellow-400 w-64 min-h-screen p-6 hidden lg:block fixed top-0 left-0 z-50 shadow-lg">
    <h2 class="text-xl font-bold mb-8">🎼 Admin</h2>
    <nav class="space-y-4">
      <a href="/admin/dashboard" class="block hover:text-white">Tableau de bord</a>
      <a href="/admin/media" class="block hover:text-white">Médias</a>
      <a href="/admin/users" class="block hover:text-white">Utilisateurs</a>
      <a href="/logout" class="block hover:text-white">Déconnexion</a>
    </nav>
  </aside>
</template>

<script setup></script>