<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Modifier le membre</h2>

      <form @submit.prevent="submit">
        <div class="mb-2">
          <label class="block text-sm">Nom</label>
          <input v-model="form.nom" class="w-full border px-2 py-1 rounded" required />
        </div>
        <div class="mb-2">
          <label class="block text-sm">Prénom</label>
          <input v-model="form.prenom" class="w-full border px-2 py-1 rounded" required />
        </div>
        <div class="mb-2">
          <label class="block text-sm">Email</label>
          <input v-model="form.email" type="email" class="w-full border px-2 py-1 rounded" required />
        </div>
        <div class="mb-2">
          <label class="block text-sm">Affiliation</label>
          <input v-model="form.affiliation" class="w-full border px-2 py-1 rounded" />
        </div>
        <div class="mb-2">
          <label class="block text-sm">Adresse</label>
          <input v-model="form.adresse" class="w-full border px-2 py-1 rounded" />
        </div>

        <div class="flex justify-end mt-4">
          <button type="button" @click="close" class="mr-2 px-4 py-2 bg-gray-300 rounded">Annuler</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'
import { emit } from 'vue'

const props = defineProps({
  member: Object,
  visible: Boolean
})
const emitEvent = defineEmits(['close', 'updated'])

const form = reactive({
  nom: '',
  prenom: '',
  email: '',
  affiliation: '',
  adresse: ''
})

watch(() => props.member, (newMember) => {
  if (newMember) {
    Object.assign(form, newMember)
  }
})

function close() {
  emitEvent('close')
}

async function submit() {
  try {
    const res = await fetch(`/api/members/${props.member.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (!res.ok) throw new Error('Erreur lors de la mise à jour')
    emitEvent('updated', form)
    close()
  } catch (err) {
    alert('❌ ' + err.message)
  }
}
</script>