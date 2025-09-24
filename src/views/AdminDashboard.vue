<template>
  <section class="admin-dashboard">
    <h1 class="dashboard-title">🎼 Tableau de bord Admin</h1>

    <div class="actions-bar">
      <button @click="showAddModal = true" class="btn-add">➕ Ajouter un membre</button>
      <button @click="exportMembers" class="btn-export">📤 Exporter en CSV</button>
    </div>

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
            <td data-label="Nom">{{ member.firstName }} {{ member.lastName }}</td>
            <td data-label="Email">{{ member.email }}</td>
            <td data-label="Téléphone">{{ member.phone || '—' }}</td>
            <td data-label="Rôle">{{ member.role }}</td>
            <td data-label="Actions" class="actions">
              <button @click="edit(member)" class="btn-icon">✏️</button>
              <button @click="deleteMember(member.id)" class="btn-icon">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <AddMemberModal :visible="showAddModal" @close="showAddModal = false" @created="fetchMembers" />
    <MemberEditor :visible="!!editingMember" :member="editingMember" @close="editingMember = null" @updated="fetchMembers" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddMemberModal from '@/components/admin/AddMemberModal.vue'
import MemberEditor from '@/components/admin/MemberEditor.vue'

const members = ref([])
const showAddModal = ref(false)
const editingMember = ref(null)

async function fetchMembers() {
  const res = await fetch('/api/members')
  members.value = await res.json()
}

function edit(member) {
  editingMember.value = member
}

async function deleteMember(id) {
  if (!confirm('Supprimer ce membre ?')) return
  await fetch(`/api/members/${id}`, { method: 'DELETE' })
  fetchMembers()
}

function exportMembers() {
  const headers = ['Nom', 'Email', 'Téléphone', 'Rôle']
  const rows = members.value.map(m => [
    `${m.firstName} ${m.lastName}`, m.email, m.phone || '', m.role || ''
  ].join(','))
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'membres.csv'
  link.click()
}

onMounted(fetchMembers)
</script>

<style scoped>
.admin-dashboard {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.dashboard-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #c8a951;
}
.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.btn-add {
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
.btn-export {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* Wrapper avec scroll horizontal et vertical si nécessaire */
.table-wrapper {
  width: 100%;
  max-height: 70vh;
  overflow-x: auto;
  overflow-y: auto;
}

/* Tableau desktop */
.member-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}
.member-table th, .member-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}
.member-table th {
  background-color: #f3f4f6;
  text-align: left;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

/* Responsive mobile : affichage en cartes */
@media (max-width: 768px) {
  .member-table, .member-table thead, .member-table tbody, .member-table th, .member-table td, .member-table tr {
    display: block;
    width: 100%;
  }
  .member-table thead {
    display: none;
  }
  .member-table tr {
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.5rem;
    background: white;
  }
  .member-table td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  .member-table td:last-child {
    border-bottom: none;
  }
  .member-table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #555;
  }
}
</style>