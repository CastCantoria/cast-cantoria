<template>
  <section class="admin-members">
    <h1 class="dashboard-title">🎼 Tableau de bord Admin – Membres</h1>

    <!-- 🔍 Barre de recherche et filtres -->
    <div class="controls">
      <input v-model="search" type="text" placeholder="🔍 Rechercher un membre..." class="search-input" />
      <select v-model="filterRole" class="filter-select">
        <option value="">Tous les rôles</option>
        <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
      </select>
      <button @click="openEditor()" class="btn-add">➕ Ajouter</button>
      <button @click="exportMembers" class="btn-export">📤 Exporter CSV</button>
    </div>

    <!-- 🕐 Chargement -->
    <div v-if="loading" class="loading-text">Chargement des membres...</div>

    <!-- 📋 Tableau des membres -->
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
              <input v-model="member.phone" @blur="updateMember(member.id, { phone: member.phone })" class="table-input"/>
            </td>
            <td>
              <select v-model="member.role" @change="updateMember(member.id, { role: member.role })" class="table-select">
                <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
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

    <!-- 🧙‍♂️ Formulaire flottant -->
    <FloatingMemberForm v-if="showForm" :member="selectedMember" @close="closeEditor" @saved="refreshMembers" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FloatingMemberForm from '@/components/admin/FloatingMemberForm.vue'
import { useMemberEditor } from '@/composables/useMemberEditor'
import { useAdminApi } from '@/composables/useAdminApi'
import { useToaster } from '@/composables/useToaster'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useAuth } from '@/composables/useAuth'

const { get, post, patch, del, put } = useAdminApi()
const { success, error } = useToaster()
const { user } = useAuth()

const members = ref([])
const loading = ref(true)
const search = ref('')
const filterRole = ref('')

const availableRoles = [
  'Staff', 'Contributeur', 'Musicien', 'Simple Membre',
  'Membre Alto', 'Membre Soprano', 'Membre Tenor', 'Membre Basse',
  'Mezzosoprano', 'Contralto', 'Baryton'
]

const { showForm, selectedMember, openEditor, closeEditor } = useMemberEditor()

onMounted(() => {
  if (user.value?.email === 'castcantoria@gmail.com') {
    refreshMembers()
  } else {
    alert('Accès réservé à l’administrateur.')
  }
})

async function refreshMembers() {
  loading.value = true
  try {
    members.value = await get('/members')
    const snapshot = await getDocs(collection(db, 'users'))
    const firebaseMembers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    members.value = [...members.value, ...firebaseMembers]
  } catch (err) {
    error('⛔ Erreur chargement : ' + err.message)
  } finally {
    loading.value = false
  }
}

async function updateMember(id, updates) {
  try {
    await patch(`/members/${id}`, updates)
    await updateDoc(doc(db, 'users', id), updates)
    success('✅ Membre mis à jour')
  } catch (err) {
    error('⛔ Erreur update : ' + err.message)
  }
}

async function deleteMember(id) {
  if (!confirm('🗑️ Supprimer ce membre ?')) return
  try {
    await del(`/members/${id}`)
    await deleteDoc(doc(db, 'users', id))
    members.value = members.value.filter(m => m.id !== id)
    success('✅ Membre supprimé')
  } catch (err) {
    error('⛔ Erreur suppression : ' + err.message)
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
.admin-members {
  padding: 2rem;
  background-color: #000;
  color: #FFD700;
}
.dashboard-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.search-input, .filter-select {
  padding: 0.5rem;
  border: 1px solid #FFD700;
  background: #111;
  color: #FFD700;
}
.btn-add, .btn-export, .btn-edit, .btn-delete {
  background: none;
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
.btn-add:hover, .btn-export:hover, .btn-edit:hover, .btn-delete:hover {
  background: #FFD700;
  color: #000;
}
.table-wrapper {
  overflow-x: auto;
}
.member-table {
  width: 100%;
  border-collapse: collapse;
}
.member-table th, .member-table td {
  padding: 0.8rem;
  border-bottom: 1px solid #FFD700;
}
.table-input, .table-select {
  width: 100%;
  padding: 0.4rem;
  background: #111;
  color: #FFD700;
  border: 1px solid #FFD700;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.loading-text {
  font-style: italic;
  color: #FFD700;
}
</style>