<template>
  <section class="meditation">
    <h3 class="title">{{ title }}</h3>
    <p v-if="verse" class="verse">{{ verse }}</p>
    <div class="body" v-html="body"></div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  verse: { type: String, default: '' },
  body: { type: String, default: '' }
})
</script>

<style scoped>
.meditation { background:#000; border:1px solid #111; padding:1.25rem; border-radius:8px; }
.title { color:#FFD700; margin-bottom:.5rem; }
.verse { color:#B22222; margin-bottom:.75rem; font-weight:600; }
.body { color:#C0C0C0; line-height:1.75; }
</style>
