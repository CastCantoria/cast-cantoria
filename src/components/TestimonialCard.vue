<template>
  <article class="card">
    <p class="text">« {{ text }} »</p>
    <div class="meta">
      <span class="name">{{ name }}</span>
      <span v-if="role" class="role"> · {{ role }}</span>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: '' }
})
</script>

<style scoped>
.card { background:#0a0a0a; border:1px solid #222; padding:1rem 1.25rem; border-radius:8px; box-shadow: inset 0 0 0 1px rgba(192,192,192,0.05); }
.text { color:#C0C0C0; font-style: italic; line-height:1.6; }
.meta { margin-top:.75rem; color:#FFD700; font-weight:600; }
.role { color:#C0C0C0; font-weight:400; }
</style>
