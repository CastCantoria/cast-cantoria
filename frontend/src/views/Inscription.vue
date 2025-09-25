<template>
  <div class="max-w-xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4 text-center">Créer un compte</h2>

    <form @submit.prevent="handleSignup" class="space-y-4">
      <input v-model="firstName" type="text" placeholder="Prénom" required class="input" />
      <input v-model="lastName" type="text" placeholder="Nom" required class="input" />
      <select v-model="selectedRole" required class="input">
        <option disabled value="">Choisir un rôle</option>
        <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
      </select>
      <input v-model="phone" type="tel" placeholder="Téléphone" class="input" />
      <input v-model="email" type="email" placeholder="Adresse email" required class="input" />
      <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" required class="input" />
      <button type="button" @click="showPassword = !showPassword" class="text-sm text-indigo-600">
        {{ showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe' }}
      </button>
      <input type="file" @change="handleFileChange" class="input" />

      <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        {{ isLoading ? '...' : 'S’inscrire' }}
      </button>

      <p v-if="errorMessage" class="text-red-600 text-sm text-center">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { uploadFileAndGetURL } from '@/composables/useStorage'
import { useRouter } from 'vue-router'
import { useToaster } from '@/composables/useToaster'

const auth = getAuth()
const db = getFirestore()
const router = useRouter()
const { success, error } = useToaster()

const firstName = ref('')
const lastName = ref('')
const selectedRole = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const avatarFile = ref(null)
const showPassword = ref(false)

const isLoading = ref(false)
const errorMessage = ref('')

const availableRoles = [
  'Staff', 'Contributeur', 'Musicien', 'Simple Membre',
  'Membre Alto', 'Membre Soprano', 'Membre Tenor',
  'Membre Basse', 'Mezzosoprano', 'Contralto', 'Baryton'
]

const handleFileChange = (e) => {
  avatarFile.value = e.target.files[0]
}

const handleSignup = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = result.user

    let avatarURL = ''
    if (avatarFile.value) {
      avatarURL = await uploadFileAndGetURL(avatarFile.value, `avatars/${user.uid}`)
    }

    await setDoc(doc(db, 'users', user.uid), {
      firstName: firstName.value,
      lastName: lastName.value,
      role: selectedRole.value,
      phone: phone.value,
      email: email.value,
      avatar: avatarURL,
      createdAt: new Date()
    }, { merge: true })

    success('Compte créé avec succès 🎉')
    router.push('/')
  } catch (err) {
    errorMessage.value = err.message
    error(err.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>