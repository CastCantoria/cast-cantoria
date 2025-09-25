<template>
  <blockquote class="quote">
    <p class="quote-text"> {{ text }} </p>
    <footer v-if="author" class="author">— {{ author }}</footer>
  </blockquote>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true },
  author: { type: String, default: '' }
})
</script>

<style scoped>
.quote { background:#000; border-left:4px solid #FFD700; padding:1rem 1.25rem; margin:1rem 0; }
.quote-text { color:#C0C0C0; font-style: italic; }
.author { color:#FFD700; margin-top:.5rem; font-weight:600; }
</style>
