<template>
  <div class="debug-panel">
    <h3>🛠️ Panneau de debug CAST</h3>
    <ul>
      <li><strong>Backend :</strong> {{ backendStatus }}</li>
      <li><strong>Membres chargés :</strong> {{ memberCount }}</li>
      <li><strong>Dernière action :</strong> {{ lastAction }}</li>
      <li><strong>Filtre rôle :</strong> {{ currentRoleFilter }}</li>
      <li v-if="lastError"><strong>Erreur :</strong> ⚠️ {{ lastError }}</li>
    </ul>
    <button @click="reload" class="reload-button">🔄 Recharger les membres</button>
  </div>
</template>

<script setup>
import { useDebugPanel } from '@/composables/useDebugPanel'
import { inject, onMounted } from 'vue'

const {
  backendStatus,
  memberCount,
  lastError,
  lastAction,
  currentRoleFilter,
  checkBackend,
} = useDebugPanel()

const reloadMembers = inject('reloadMembers')

function reload() {
  checkBackend()
  if (reloadMembers) reloadMembers()
}

onMounted(() => {
  checkBackend()
})
</script>

<style scoped>
.debug-panel {
  background: #fffbe6;
  border: 2px dashed #c8a951;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 2rem;
  font-family: monospace;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
.reload-button {
  margin-top: 1rem;
  background: #c8a951;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.reload-button:hover {
  background: #a88b3d;
}
</style>