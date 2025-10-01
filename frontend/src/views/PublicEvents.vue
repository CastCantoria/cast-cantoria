<template>
  <div class="public-events">
    <h1 class="title">📅 Événements à venir</h1>

    <div v-if="loading" class="loading">Chargement des événements...</div>
    <div v-else-if="errorMsg" class="error">⛔ {{ errorMsg }}</div>
    <div v-else-if="events.length === 0" class="empty">Aucun événement trouvé.</div>

    <ul class="event-list">
      <li v-for="event in events" :key="event.id" class="event-item">
        <h2>{{ event.title }}</h2>
        <p>{{ event.date }} — {{ event.location }}</p>
        <p>{{ event.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePublicApi } from '@/composables/usePublicApi'

const { get } = usePublicApi()
const events = ref([])
const loading = ref(true)
const errorMsg = ref(null)

onMounted(async () => {
  try {
    const data = await get('/events')
    events.value = data || []
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.public-events {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
.title {
  font-size: 2rem;
  color: #4f46e5;
  margin-bottom: 1.5rem;
}
.loading,
.error,
.empty {
  font-style: italic;
  color: #888;
  margin-bottom: 1rem;
}
.error {
  color: #e11d48;
  font-weight: bold;
}
.event-list {
  list-style: none;
  padding: 0;
}
.event-item {
  background: #f3f4f6;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
}
.event-item h2 {
  margin: 0 0 0.5rem;
  color: #111827;
}
</style>