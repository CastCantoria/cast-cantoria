<template>
  <div v-if="visible" class="modal-overlay" @keydown.esc="close">
    <div class="modal-content fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="0">
      <h2 id="modal-title" class="modal-title">📝 Modifier le membre</h2>

      <form @submit.prevent="submit" class="modal-form">
        <label>
          Nom :
          <input v-model="form.nom" type="text" required />
        </label>

        <label>
          Prénom :
          <input v-model="form.prenom" type="text" required />
        </label>

        <label>
          Email :
          <input v-model="form.email" type="email" required />
        </label>

        <label>
          Affiliation :
          <input v-model="form.affiliation" type="text" />
        </label>

        <div class="modal-actions">
          <button type="submit" class="btn-save">💾 Enregistrer</button>
          <button type="button" @click="close" class="btn-cancel">❌ Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { toRaw } from 'vue'

const props = defineProps({
  member: Object,
  visible: Boolean
})

const emit = defineEmits(['close', 'updated'])

const form = reactive({
  nom: '',
  prenom: '',
  email: '',
  affiliation: ''
})

watch(() => props.member, (m) => {
  if (m) {
    form.nom = m.nom || ''
    form.prenom = m.prenom || ''
    form.email = m.email || ''
    form.affiliation = m.affiliation || ''
  }
})

function close() {
  emit('close')
}

async function submit() {
  try {
    await fetch(`/api/members/${props.member.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toRaw(form))
    })
    emit('updated')
    close()
  } catch (err) {
    alert('Erreur : ' + err.message)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(60, 60, 60, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  outline: none;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #c8a951;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #333;
}

.modal-form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.btn-save {
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #4338ca;
}

.btn-cancel {
  background-color: #e5e7eb;
  color: #333;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #d1d5db;
}
</style>