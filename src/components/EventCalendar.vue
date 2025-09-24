<template>
  <section class="calendar">
    <h3 class="title">Programmation</h3>
    <ul class="list">
      <li v-for="(ev, i) in events" :key="i" class="item">
        <span class="date">{{ formatDate(ev.date) }}</span>
        <span class="dot"></span>
        <span class="info">
          <strong class="name">{{ ev.title }}</strong>
          <em v-if="ev.location" class="place"> — {{ ev.location }}</em>
        </span>
      </li>
    </ul>
    <p v-if="!events.length" class="empty">Bientôt de nouveaux rendez-vous.</p>
  </section>
</template>

<script setup>
const props = defineProps({
  events: { type: Array, default: () => [] }
})

function formatDate(d) {
  try {
    const date = new Date(d)
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })
  } catch {
    return d
  }
}
</script>

<style scoped>
.calendar { background:#000; padding:1.5rem; }
.title { color:#FFD700; margin-bottom:.5rem; }
.list { list-style:none; padding:0; margin:0; }
.item { color:#C0C0C0; display:flex; align-items:center; gap:.5rem; padding:.5rem 0; border-bottom:1px solid #111; }
.date { color:#FFD700; min-width: 9rem; }
.dot { width:8px; height:8px; background:#B22222; border-radius:50%; display:inline-block; }
.name { color:#C0C0C0; }
.place { color:#C0C0C0; opacity:.8; }
.empty { color:#C0C0C0; text-align:center; margin-top:1rem; }
</style>
