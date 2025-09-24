<template>
  <div>
    <h3 class="title">Inscription par téléphone</h3>

    <form @submit.prevent="sendCode">
      <input v-model="nom" type="text" placeholder="Nom complet" required />
      <input v-model="phone" type="tel" placeholder="Numéro de téléphone (+261...)" required />
      <div id="recaptcha-container"></div>
      <button type="submit" :disabled="isSending">{{ isSending ? 'Envoi...' : 'Envoyer le code' }}</button>
    </form>

    <form v-if="confirmationResult" @submit.prevent="verifyCode">
      <input v-model="code" type="text" placeholder="Code reçu par SMS" required />
      <button type="submit" :disabled="isVerifying">{{ isVerifying ? 'Vérification...' : 'Valider' }}</button>
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()

const nom = ref('')
const phone = ref('')
const code = ref('')
const confirmationResult = ref(null)
const errorMessage = ref('')
const successMessage = ref('')
const isSending = ref(false)
const isVerifying = ref(false)

const sendCode = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSending.value = true

  try {
    const verifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth)
    confirmationResult.value = await signInWithPhoneNumber(auth, phone.value, verifier)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isSending.value = false
  }
}

const verifyCode = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isVerifying.value = true

  try {
    const result = await confirmationResult.value.confirm(code.value)
    const user = result.user

    await setDoc(doc(db, 'users', user.uid), {
      nom: nom.value,
      phone: user.phoneNumber,
      role: 'choriste',
      createdAt: serverTimestamp(),
      isActive: true
    })

    successMessage.value = 'Inscription réussie 🎉'
    nom.value = ''
    phone.value = ''
    code.value = ''
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isVerifying.value = false
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
  margin-bottom: 1rem;
}
input {
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