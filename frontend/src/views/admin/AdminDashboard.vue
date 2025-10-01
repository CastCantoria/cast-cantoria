<template>
  <div class="dashboard-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Admin</h2>
      <nav class="sidebar-nav">
        <ul>
          <li><RouterLink to="/admin/members" class="active">👥 Membres</RouterLink></li>
          <li><RouterLink to="/admin/repertoires">🎶 Répertoires</RouterLink></li>
          <li><RouterLink to="/admin/events">📅 Événements</RouterLink></li>
          <li><RouterLink to="/admin/settings">⚙️ Paramètres</RouterLink></li>
        </ul>
      </nav>
    </aside>

    <!-- CONTENU -->
    <main class="content">
      <h1 class="dashboard-title">🎼 Tableau de bord Admin</h1>

      <!-- Zone de contrôle -->
      <div class="controls">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 Rechercher un membre..."
          class="search-input"
        />
        <select v-model="filterRole" class="filter-select">
          <option value="">Tous les rôles</option>
          <option v-for="role in availableRoles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
        <button @click="openEditor()" class="btn-add">➕ Ajouter</button>
        <button @click="exportMembers" class="btn-export">📤 Exporter CSV</button>
      </div>

      <!-- Erreur -->
      <div v-if="errorMsg" class="status-panel status error">
        ⚠️ {{ errorMsg }}
      </div>

      <!-- Tableau -->
      <div v-if="loading" class="loading-text">Chargement des membres...</div>
      <div v-else class="table-wrapper">
        <table class="member-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in filteredMembers" :key="member.id">
              <td>{{ member.firstName }} {{ member.lastName }}</td>
              <td>{{ member.email }}</td>
              <td>
                <input
                  v-model="member.phone"
                  @blur="updateMember(member.id, { phone: member.phone })"
                  class="table-input"
                />
              </td>
              <td>
                <select
                  v-model="member.role"
                  @change="updateMember(member.id, { role: member.role })"
                  class="table-select"
                >
                  <option v-for="role in availableRoles" :key="role" :value="role">
                    {{ role }}
                  </option>
                </select>
              </td>
              <td class="actions">
                <button @click="openEditor(member)" class="btn-edit">✏️</button>
                <button @click="deleteMember(member.id)" class="btn-delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modale -->
      <FloatingMemberForm
        v-if="showForm"
        :member="selectedMember"
        @close="closeEditor"
        @saved="refreshMembers"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import FloatingMemberForm from '@/components/admin/FloatingMemberForm.vue'
import { useMemberEditor } from '@/composables/useMemberEditor'
import { useAdminFetch } from '@/composables/useAdminFetch'

const { fetchData, loading, errorMsg } = useAdminFetch()
const members = ref([])
const search = ref('')
const filterRole = ref('')

const availableRoles = [
  'Staff', 'Contributeur', 'Musicien', 'Simple Membre',
  'Membre Alto', 'Membre Soprano', 'Membre Tenor', 'Membre Basse',
  'Mezzosoprano', 'Contralto', 'Baryton'
]

const {
  showForm,
  selectedMember,
  openEditor,
  closeEditor,
} = useMemberEditor()

onMounted(refreshMembers)

async function refreshMembers() {
  const data = await fetchData('get', '/members')
  if (data) members.value = data
}

async function updateMember(id, updates) {
  await fetchData('patch', `/members/${id}`, updates)
}

async function deleteMember(id) {
  if (!confirm('🗑️ Supprimer ce membre ?')) return
  const result = await fetchData('delete', `/members/${id}`)
  if (result !== null) {
    members.value = members.value.filter(m => m.id !== id)
  }
}

function exportMembers() {
  const headers = ['Prénom', 'Nom', 'Email', 'Téléphone', 'Rôle']
  const rows = members.value.map(m =>
    [m.firstName, m.lastName, m.email, m.phone || '', m.role || ''].join(',')
  )
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'membres.csv'
  link.click()
}

const filteredMembers = computed(() => {
  return members.value.filter(m => {
    const matchesSearch =
      m.firstName?.toLowerCase().includes(search.value.toLowerCase()) ||
      m.lastName?.toLowerCase().includes(search.value.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.value.toLowerCase())
    const matchesRole = !filterRole.value || m.role === filterRole.value
    return matchesSearch && matchesRole
  })
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
}
.sidebar {
  width: 220px;
  background: #1f2937;
  color: white;
  padding: 1rem;
}
.sidebar-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.sidebar-nav ul {
  list-style: none;
  padding: 0;
}
.sidebar-nav li {
  margin-bottom: 0.8rem;
}
.sidebar-nav a {
  color: #d1d5db;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  transition: background 0.2s;
}
.sidebar-nav a:hover,
.sidebar-nav a.active {
  background: #374151;
  color: #fff;
}
.content {
  flex: 1;
  padding: 2rem;
}
.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  color: #4f46e5;
  margin-bottom: 1.5rem;
}
.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.search-input,
.filter-select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
}
.btn-add,
.btn-export {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.btn-add:hover,
.btn-export:hover {
  background: #4338ca;
}
.table-wrapper {
  overflow-x: auto;
}
.member-table {
  width: 100%;
  border-collapse: collapse;
}
.member-table th,
.member-table td {
  padding: 0.6rem;
  border-bottom: 1px solid #ddd;
}
.table-input,
.table-select {
  width: 100%;
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.btn-edit {
  background: transparent;
  border: 1px solid #4f46e5;
  color: #4f46e5;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
.btn-edit:hover {
  background: #4f46e5;
  color: white;
}
.btn-delete {
  background: transparent;
  border: 1px solid #e11d48;
  color: #e11d48;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
.btn-delete:hover {
  background: #e11d48;
  color: white;
}
.loading-text {
  font-style: italic;
  color: #888;
  margin-top: 1rem;
}
.status-panel {
  margin-top: 2rem;
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #374151;
}
.status.error {
  color: #e11d48;
  font-weight: bold;
}
</style>