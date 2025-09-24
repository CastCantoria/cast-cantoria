<!-- src/components/admin/AdminLogPanel.vue -->
<template>
  <div class="p-4 bg-white rounded shadow-md max-w-xl mx-auto">
    <h2 class="text-lg font-bold text-indigo-700 mb-4">Historique des actions admin</h2>
    <ul class="space-y-2">
      <li
        v-for="(log, index) in logs"
        :key="index"
        class="flex items-start space-x-2 animate-fade-in"
      >
        <span class="text-xl">{{ log.icon }}</span>
        <div>
          <p class="text-sm text-gray-800">{{ log.message }}</p>
          <p class="text-xs text-gray-500">{{ formatDate(log.timestamp) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const logs = ref([
  { icon: '🛡️', message: 'Ajout d’un nouveau membre', timestamp: Date.now() - 10000 },
  { icon: '🗑️', message: 'Suppression d’un membre', timestamp: Date.now() - 5000 },
  { icon: '📤', message: 'Export CSV effectué', timestamp: Date.now() }
])

function formatDate(ts) {
  return new Date(ts).toLocaleString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>