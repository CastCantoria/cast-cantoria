<template>
  <form @submit.prevent="handleSubmit" class="member-form">
    <h2>➕ Ajouter un membre</h2>

    <label>
      Prénom
      <input v-model="form.firstName" type="text" required />
    </label>

    <label>
      Nom
      <input v-model="form.lastName" type="text" required />
    </label>

    <label>
      Email
      <input v-model="form.email" type="email" required />
    </label>

    <label>
      Téléphone
      <input v-model="form.phone" type="tel" />
    </label>

    <label>
      Rôle
      <select v-model="form.role" required>
        <option value="member">Membre</option>
        <option value="admin">Administrateur</option>
        <option value="guest">Invité</option>
      </select>
    </label>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Envoi...' : '✅ Enregistrer' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAdminApi } from '@/composables/useAdminApi'
import { useToaster } from '@/composables/useToaster'

const { adminFetch } = useAdminApi()
const { success, error } = useToaster()

const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'member',
})

async function handleSubmit() {
  loading.value = true
  try {
    await adminFetch('/members', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    success('🎉 Membre ajouté avec succès')
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'member',
    })
  } catch (err) {
    error('⛔ Échec de l’ajout : ' + err.message)
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.member-form {
  padding: 2rem;
  background: #fdfcf7;
  border: 2px dashed #c8a951;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}
input, select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #219150;
}
</style>