<template>
  <div class="add-member-modal">
    <h3 class="title">👤 Ajout manuel d’un membre</h3>

    <form @submit.prevent="submit">
      <input v-model="nom" type="text" placeholder="Nom complet" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <select v-model="role" required>
        <option disabled value="">Sélectionner un rôle</option>
        <option value="choriste">Choriste</option>
        <option value="admin">Administrateur</option>
        <option value="invite">Invité</option>
      </select>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Ajout en cours...' : 'Ajouter le membre' }}
      </button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

const db = getFirestore()

const nom = ref('')
const email = ref('')
const role = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const submit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    const id = uuidv4()
    await setDoc(doc(db, 'users', id), {
      nom: nom.value,
      email: email.value,
      role: role.value,
      createdAt: serverTimestamp(),
      isActive: true
    })

    successMessage.value = 'Membre ajouté avec succès 🎉'
    nom.value = ''
    email.value = ''
    role.value = ''
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.add-member-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #3a3a3a;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

input,
select {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
  color: #3a3a3a;
}

select:invalid {
  color: #999;
}

button {
  background-color: #c8a951;
  color: #fff;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #b08c3f;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
}

.success-message {
  color: #4caf50;
  font-size: 0.9rem;
  text-align: center;
}
</style>