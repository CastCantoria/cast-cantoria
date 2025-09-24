<template>
  <header class="bg-black text-yellow-400 px-6 py-4 flex justify-between items-center shadow-md">
    <h1 class="text-xl font-bold tracking-wide">🎼 C.A.S.T. Cantoria - Admin</h1>
    <nav class="space-x-4">
      <a href="/" class="hover:underline">Accueil</a>
      <a href="/profile" class="hover:underline">Profil</a>
      <a href="/logout" class="hover:underline">Déconnexion</a>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
a {
  transition: color 0.3s ease;
}
a:hover {
  color: #fff;
}
</style>