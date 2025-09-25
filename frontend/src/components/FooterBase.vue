<template>
  <footer :class="['footer-base', variant]">
    <slot>
      <p class="footer-text">© {{ new Date().getFullYear() }} C.A.S.T. Cantoria · Tous droits réservés</p>
      <p class="footer-credit">Développé avec ❤️ par Tovoniaina</p>
    </slot>
  </footer>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'light' // 'dark' pour admin
  }
})
</script>

<style scoped>
.footer-base {
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #e0dcd4;
  margin-top: 2rem;
}
.footer-base.dark {
  background-color: #000;
  color: #c8a951;
  border-top: 1px solid #c8a951;
}
.footer-base.light {
  background-color: #fdfaf6;
  color: #3a3a3a;
}

.footer-text {
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}
.footer-credit {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>