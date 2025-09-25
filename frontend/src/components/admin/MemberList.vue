<template>
  <div class="member-list">
    <h2>👥 Membres enregistrés</h2>

    <div v-if="loading" class="loading">Chargement en cours...</div>

    <ul v-else>
      <li v-for="member in safeMembers" :key="member.id" class="member-item">
        <strong>{{ member.firstName }} {{ member.lastName }}</strong>
        <span>📧 {{ member.email }}</span>
        <span>🎭 {{ member.role }}</span>
        <button @click="confirmDelete(member.id)">🗑️ Supprimer</button>
      </li>
    </ul>

    <button @click="loadMembers()" :disabled="loading || !lastVisible" class="load-more">
      🔄 Charger plus
    </button>

    <AdminDebugPanel />
  </div>
</template>

<script setup>
import { ref, onMounted, provide, computed } from 'vue'
import { useAdminApi } from '@/composables/useAdminApi'
import { useToaster } from '@/composables/useToaster'
import { useDebugPanel } from '@/composables/useDebugPanel'
import AdminDebugPanel from '@/components/admin/AdminDebugPanel.vue'

const { adminFetch } = useAdminApi()
const { success, error } = useToaster()
const { updateMembers, setError, setAction } = useDebugPanel()

const members = ref([])
const lastVisible = ref(null)
const loading = ref(false)

const safeMembers = computed(() =>
  Array.isArray(members.value) ? members.value : []
)

async function loadMembers(reset = false) {
  loading.value = true
  try {
    const url = lastVisible.value && !reset
      ? `/members?limit=10&startAfter=${lastVisible.value}`
      : `/members?limit=10`

    const res = await adminFetch(url)
    if (reset) members.value = []
    members.value.push(...res.members)
    lastVisible.value = res.lastVisible
    updateMembers(members.value.length)
    setAction(reset ? 'Rechargement complet' : 'Chargement page suivante')
  } catch (err) {
    setError(err.message)
    error('⛔ Impossible de charger les membres')
  } finally {
    loading.value = false
  }
}

async function confirmDelete(id) {
  const confirmed = window.confirm('⚠️ Supprimer ce membre ?')
  if (!confirmed) return

  try {
    await adminFetch(`/members/${id}`, { method: 'DELETE' })
    members.value = members.value.filter(m => m.id !== id)
    updateMembers(members.value.length)
    setAction(`Suppression du membre ${id}`)
    success('✅ Membre supprimé avec succès')
  } catch (err) {
    setError(err.message)
    error('⛔ Échec de la suppression')
  }
}

provide('reloadMembers', () => loadMembers(true))

onMounted(() => {
  loadMembers(true)
})
</script>

<style scoped>
.member-list {
  padding: 2rem;
  background: #fdfcf7;
  border: 2px dashed #c8a951;
  border-radius: 8px;
}
.member-item {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
button {
  align-self: flex-start;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #c0392b;
}
.load-more {
  margin-top: 1rem;
  background: #c8a951;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.load-more:hover {
  background: #a88b3d;
}
.loading {
  font-style: italic;
  color: #999;
}
</style>