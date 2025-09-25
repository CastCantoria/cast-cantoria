<template>
  <footer class="admin-footer">
    <p class="text-sm">© {{ new Date().getFullYear() }} C.A.S.T. Cantoria · Tous droits réservés</p>
    <p class="text-xs mt-1">Développé avec ❤️ par Tovoniaina</p>
  </footer>
</template>

<script setup></script>

<style scoped>
.admin-footer {
  background-color: #000;
  color: #c8a951;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #c8a951;
}
.text-sm {
  font-size: 0.85rem;
}
.text-xs {
  font-size: 0.75rem;
}
</style>