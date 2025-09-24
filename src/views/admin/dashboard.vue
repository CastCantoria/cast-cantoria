<template>
  <section class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tableau de bord Admin</h1>

    <div v-if="loading">Chargement des membres...</div>
    <div v-else>
      <table class="w-full border">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td>{{ member.name }}</td>
            <td>{{ member.email }}</td>
            <td>
              <button @click="editMember(member)">✏️</button>
              <button @click="deleteMember(member.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="exportMembers" class="mt-4">📤 Exporter</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const members = ref([])
const loading = ref(true)

onMounted(async () => {
  const res = await fetch('/api/members')
  members.value = await res.json()
  loading.value = false
})

function editMember(member) {
  // ouvrir un formulaire ou une modale
}

function deleteMember(id) {
  // appel à DELETE /api/members/:id
}

function exportMembers() {
  // transformer en CSV ou JSON et déclencher un téléchargement
}
</script>