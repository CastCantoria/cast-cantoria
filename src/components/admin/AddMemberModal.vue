<template>
  <div>
    <h3 class="title">Ajouter un membre</h3>

    <form @submit.prevent="addMember">
      <input v-model="nom" type="text" placeholder="Nom complet" required />
      <select v-model="role" required>
        <option disabled value="">Choisir un rôle</option>
        <option v-for="r in availableRoles" :key="r" :value="r">{{ r }}</option>
      </select>
      <input v-model="phone" type="tel" placeholder="Téléphone (optionnel)" />
      <input v-model="email" type="email" placeholder="Email (optionnel)" />

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Ajout...' : 'Ajouter le membre' }}
      </button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const db = getFirestore()

const nom = ref('')
const role = ref('')
const phone = ref('')
const email = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const availableRoles = [
  'Staff', 'Contributeur', 'Musicien', 'Simple Membre',
  'Membre Alto', 'Membre Soprano', 'Membre Tenor',
  'Membre Basse', 'Mezzosoprano', 'Contralto', 'Baryton'
]

const addMember = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSubmitting.value = true

  try {
    await addDoc(collection(db, 'users'), {
      nom: nom.value,
      role: role.value,
      phone: phone.value || null,
      email: email.value || null,
      createdAt: serverTimestamp(),
      isActive: true
    })

    successMessage.value = 'Membre ajouté avec succès 🎉'
    nom.value = ''
    role.value = ''
    phone.value = ''
    email.value = ''
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
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
input, select {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
  color: #3a3a3a;
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