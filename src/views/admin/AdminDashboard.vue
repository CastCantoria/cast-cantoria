<template>
  <div class="dashboard-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Admin</h2>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="#" class="active">👥 Membres</a></li>
          <li><a href="#">🎶 Répertoires</a></li>
          <li><a href="#">📅 Événements</a></li>
          <li><a href="#">⚙️ Paramètres</a></li>
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
        <button @click="exportMembers" class="btn-export">📤 Exporter CSV</button>
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
                <button @click="editMember(member)" class="btn-edit">✏️</button>
                <button @click="deleteMember(member.id)" class="btn-delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <MemberEditor
        :member="selectedMember"
        :visible="editorVisible"
        @close="editorVisible = false"
        @updated="refreshMembers"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import MemberEditor from "@/components/admin/MemberEditor.vue"

// 📌 URL de l'API (chargée depuis .env)
const API_URL = import.meta.env.VITE_API_URL

const members = ref([])
const loading = ref(true)
const selectedMember = ref(null)
const editorVisible = ref(false)
const search = ref("")
const filterRole = ref("")

const availableRoles = [
  "Staff", "Contributeur", "Musicien", "Simple Membre",
  "Membre Alto", "Membre Soprano", "Membre Tenor", "Membre Basse",
  "Mezzosoprano", "Contralto", "Baryton"
]

onMounted(refreshMembers)

async function refreshMembers() {
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/api/members`)
    const data = await res.json()
    members.value = Array.isArray(data) ? data : data.members || []
  } catch (err) {
    console.error("Erreur lors du chargement :", err.message)
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
    await fetch(`${API_URL}/api/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    })
  } catch (err) {
    console.error("Erreur update :", err.message)
  }
}

async function deleteMember(id) {
  if (!confirm("🗑️ Supprimer ce membre ?")) return
  try {
    await fetch(`${API_URL}/api/members/${id}`, { method: "DELETE" })
    await refreshMembers()
  } catch (err) {
    console.error("Erreur suppression :", err.message)
  }
}

function exportMembers() {
  const headers = ["Prénom", "Nom", "Email", "Téléphone", "Rôle"]
  const rows = members.value.map(m =>
    [m.firstName, m.lastName, m.email, m.phone || "", m.role || ""].join(",")
  )
  const csvContent = [headers.join(","), ...rows].join("\n")
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "membres.csv"
  link.click()
}

const filteredMembers = computed(() => {
  return members.value.filter(m => {
    const matchesSearch =
      m.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      m.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
      m.email.toLowerCase().includes(search.value.toLowerCase())
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

/* Sidebar */
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

/* Content */
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
</style>
