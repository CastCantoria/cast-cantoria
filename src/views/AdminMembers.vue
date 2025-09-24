<script setup>
import { ref, onMounted } from "vue"
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../composables/useAuth"

const { user } = useAuth()
const membres = ref([])

const chargerMembres = async () => {
  const snapshot = await getDocs(collection(db, "users"))
  membres.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const supprimerMembre = async (id) => {
  await deleteDoc(doc(db, "users", id))
  membres.value = membres.value.filter(m => m.id !== id)
}

const changerRole = async (id, nouveauRole) => {
  await updateDoc(doc(db, "users", id), { role: nouveauRole })
  membres.value = membres.value.map(m => m.id === id ? { ...m, role: nouveauRole } : m)
}

onMounted(() => {
  if (user.value?.email === "castcantoria@gmail.com") {
    chargerMembres()
  } else {
    alert("Accès réservé à l’administrateur.")
  }
})
</script>

<template>
  <div class="admin-members">
    <h1>Gestion des membres</h1>
    <table>
      <thead>
        <tr><th>Email</th><th>Rôle</th><th>Actions</th></tr>
      </thead>
      <tbody>
        <tr v-for="membre in membres" :key="membre.id">
          <td>{{ membre.email }}</td>
          <td>{{ membre.role }}</td>
          <td>
            <button @click="changerRole(membre.id, 'admin')">Admin</button>
            <button @click="changerRole(membre.id, 'member')">Membre</button>
            <button @click="supprimerMembre(membre.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-members {
  padding: 2rem;
  background-color: #000;
  color: #FFD700;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 0.8rem;
  border-bottom: 1px solid #FFD700;
}
button {
  margin-right: 0.5rem;
  background: none;
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #FFD700;
  color: #000;
}
</style>