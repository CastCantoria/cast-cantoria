<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../composables/useAuth'

const { role } = useAuth()
const messages = ref([])
const loading = ref(true)
const filtreNonLus = ref(false)

onMounted(async () => {
  const q = query(collection(db, 'messages'), orderBy('date', 'desc'))
  const snapshot = await getDocs(q)
  messages.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  loading.value = false
})

const markAsRead = async (id) => {
  await updateDoc(doc(db, 'messages', id), { lu: true })
  messages.value = messages.value.map(m => m.id === id ? { ...m, lu: true } : m)
}
</script>
<template>
  <div class="page">
    <section class="messages">
      <h2>📨 Messages reçus</h2>

      <div v-if="role !== 'admin' && role !== 'Staff'" class="unauthorized">
        <p>⛔ Accès réservé aux administrateurs et membres du staff.</p>
      </div>

      <div v-else>
        <div class="filtre-bar">
          <label>
            <input type="checkbox" v-model="filtreNonLus" />
            Afficher uniquement les non lus
          </label>
        </div>

        <div v-if="loading">Chargement des messages...</div>
        <div v-else-if="messages.length === 0">Aucun message pour le moment.</div>

        <ul v-else class="message-list">
          <li
            v-for="msg in messages.filter(m => !filtreNonLus || !m.lu)"
            :key="msg.id"
            class="message-item"
            :class="{ unread: !msg.lu }"
          >
            <p><strong>Nom :</strong> {{ msg.nom }}</p>
            <p><strong>Email :</strong> {{ msg.email }}</p>
            <p><strong>Sujet :</strong> {{ msg.sujet }}</p>
            <p><strong>Message :</strong><br />{{ msg.message }}</p>
            <p class="date">🕒 {{ new Date(msg.date.seconds * 1000).toLocaleString() }}</p>
            <button v-if="!msg.lu" class="btn-mark" @click="markAsRead(msg.id)">
              Marquer comme lu
            </button>
          </li>
        </ul>

        <h3>📁 Archivés</h3>
        <ul class="message-list">
          <li
            v-for="msg in messages.filter(m => m.lu)"
            :key="msg.id"
            class="message-item archived"
          >
            <p><strong>Nom :</strong> {{ msg.nom }}</p>
            <p><strong>Email :</strong> {{ msg.email }}</p>
            <p><strong>Sujet :</strong> {{ msg.sujet }}</p>
            <p><strong>Message :</strong><br />{{ msg.message }}</p>
            <p class="date">🕒 {{ new Date(msg.date.seconds * 1000).toLocaleString() }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<style scoped>
.page {
  background-color: #000;
  color: #FFD700;
  min-height: 100vh;
  padding: 2rem;
}

.messages {
  max-width: 800px;
  margin: auto;
  background-color: #111;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #FFD700;
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.2);
}

h2, h3 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.unauthorized {
  text-align: center;
  color: #FF4444;
  font-size: 1.1rem;
}

.filtre-bar {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
}

.message-list {
  list-style: none;
  padding: 0;
}

.message-item {
  margin-bottom: 1.5rem;
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #FFD700;
}

.message-item p {
  margin: 0.3rem 0;
  color: #ccc;
}

.date {
  font-size: 0.85rem;
  color: #888;
  font-style: italic;
  margin-top: 0.5rem;
}

.unread {
  border-left: 4px solid #FFD700;
  background-color: #1a1a1a;
}

.archived {
  opacity: 0.6;
  border-left: 4px solid #444;
}

.btn-mark {
  margin-top: 0.5rem;
  background-color: #FFD700;
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
</style>