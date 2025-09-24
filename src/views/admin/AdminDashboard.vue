<template>
  <section class="admin-dashboard fade-in">
    <h1 class="dashboard-title">🎼 Tableau de bord Admin</h1>

    <div v-if="loading" class="loading-text">Chargement des membres...</div>

    <div v-else>
      <div class="table-wrapper">
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
            <tr v-for="member in members" :key="member.id">
              <td>{{ member.firstName }} {{ member.lastName }}</td>
              <td>{{ member.email }}</td>
              <td>
                <input
                  v-model="member.phone"
                  @change="updateMember(member.id, { phone: member.phone })"
                />
              </td>
              <td>
                <select
                  v-model="member.role"
                  @change="updateMember(member.id, { role: member.role })"
                >
                  <option v-for="role in availableRoles" :key="role" :value="role">
                    {{ role }}
                  </option>
                </select>
              </td>
              <td class="actions">
                <button @click="editMember(member)" aria-label="Modifier le membre" class="btn-edit">✏️</button>
                <button @click="deleteMember(member.id)" aria-label="Supprimer le membre" class="btn-delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button @click="exportMembers" class="btn-export">📤 Exporter en CSV</button>
    </div>

    <MemberEditor
      :member="selectedMember"
      :visible="editorVisible"
      @close="editorVisible = false"
      @updated="refreshMembers"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MemberEditor from '@/components/admin/MemberEditor.vue'

const members = ref([])
const loading = ref(true)
const selectedMember = ref(null)
const editorVisible = ref(false)

const availableRoles = [
  'Staff', 'Contributeur', 'Musicien', 'Simple Membre',
  'Membre Alto', 'Membre Soprano', 'Membre Tenor',
  'Membre Basse', 'Mezzosoprano', 'Contralto', 'Baryton'
]

onMounted(refreshMembers)

async function refreshMembers() {
  loading.value = true
  try {
    const res = await fetch('/api/members')
    const data = await res.json()
    members.value = Array.isArray(data) ? data : data.members || []
  } catch (err) {
    console.error('Erreur lors du chargement des membres :', err.message)
  } finally {
    loading.value = false
  }
}

function editMember(member) {
  selectedMember.value = member
  editorVisible.value = true
}

async function updateMember(id, updates) {
  try {
    await fetch(`/api/members/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
  } catch (err) {
    alert('Erreur : ' + err.message)
  }
}

async function deleteMember(id) {
  if (!confirm('🗑️ Supprimer ce membre ?')) return
  try {
    await fetch(`/api/members/${id}`, { method: 'DELETE' })
    await refreshMembers()
  } catch (err) {
    alert('Erreur : ' + err.message)
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
</script>

.admin-dashboard {
  background-color: #fdfaf6;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(200, 169, 81, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
  color: #c8a951;
  margin-bottom: 1.5rem;
  text-align: center;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
}

.member-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #e5e7eb;
}

.member-table th {
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
}

.member-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.member-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.member-table tbody tr:hover {
  background-color: #f3f4ff;
  transition: background-color 0.2s ease;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.3rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-edit:hover {
  background-color: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  transform: scale(1.1);
}

.btn-delete:hover {
  background-color: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  transform: scale(1.1);
}

.btn-export {
  margin-top: 1.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #c8a951;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  display: inline-block;
}

.btn-export:hover {
  background-color: #b08f3e;
}