<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <h2>{{ isEdit ? '✏️ Modifier le membre' : '✨ Ajouter un membre' }}</h2>

      <form @submit.prevent="handleSubmit">
        <label>
          Prénom
          <input v-model="form.firstName" required />
        </label>

        <label>
          Nom
          <input v-model="form.lastName" required />
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
            <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
          </select>
        </label>

        <div class="actions">
          <button type="submit" :disabled="loading">
            {{ loading ? 'Envoi...' : isEdit ? '✅ Mettre à jour' : '✅ Enregistrer' }}
          </button>
          <button type="button" @click="close">❌ Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useAdminApi } from '@/composables/useAdminApi' // ✅ export nommée
import { useToaster } from '@/composables/useToaster'

const props = defineProps({
  member: Object // si présent : édition
})
const emit = defineEmits(['close', 'saved'])

const { post, patch } = useAdminApi()
const { success, error } = useToaster()

const loading = ref(false)
const isEdit = ref(false)

const availableRoles = [
  'Staff', 'Contributeur', 'Musicien', 'Simple Membre',
  'Membre Alto', 'Membre Soprano', 'Membre Tenor', 'Membre Basse',
  'Mezzosoprano', 'Contralto', 'Baryton'
]

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'member'
})

// Remplir le formulaire si on modifie un membre
watch(
  () => props.member,
  (m) => {
    if (m) {
      isEdit.value = true
      Object.assign(form, m)
    } else {
      isEdit.value = false
      form.firstName = ''
      form.lastName = ''
      form.email = ''
      form.phone = ''
      form.role = 'member'
    }
  },
  { immediate: true }
)

function close() {
  emit('close')
}

async function handleSubmit() {
  loading.value = true
  try {
    console.log('[FloatingMemberForm] Données envoyées:', form)
    if (isEdit.value) {
      await patch(`/members/${props.member.id}`, { ...form })
      success(`✏️ Membre mis à jour : ${form.firstName} ${form.lastName}`)
    } else {
      await post('/members', { ...form })
      success(`🎉 Membre ajouté : ${form.firstName} ${form.lastName}`)
    }
    emit('saved')
    close()
  } catch (err) {
    error('⛔ Échec : ' + err.message)
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 30, 30, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}
.modal {
  background: #fffbe6;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #c8a951;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
  animation: popIn 0.3s ease;
}
label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  font-weight: bold;
}
input, select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button[type="submit"] {
  background: #27ae60;
  color: white;
}
button[type="submit"]:hover {
  background: #219150;
}
button[type="button"] {
  background: #e74c3c;
  color: white;
}
button[type="button"]:hover {
  background: #c0392b;
}
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
@keyframes popIn {
  from { transform: scale(0.9); opacity: 0 }
  to { transform: scale(1); opacity: 1 }
}
</style>