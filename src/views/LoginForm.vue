<template>
  <div class="auth-form">
    <h2>Connexion</h2>

    <input v-model="email" type="email" placeholder="Email" class="input" />

    <div class="password-field">
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        placeholder="Mot de passe"
        class="input"
      />
      <span class="eye" @click="showPassword = !showPassword">
        {{ showPassword ? '🙈' : '👁️' }}
      </span>
    </div>

    <button @click="onLogin" class="btn" :disabled="authStore.loading">
      {{ authStore.loading ? 'Connexion...' : 'Se connecter' }}
    </button>

    <p class="forgot" @click="resetPassword">Mot de passe oublié ?</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()
const auth = getAuth()

async function onLogin() {
  errorMessage.value = ''
  try {
    await authStore.login(email.value, password.value, router)
  } catch (err) {
    errorMessage.value = err.message
  }
}

async function resetPassword() {
  if (!email.value) {
    alert("Entrez votre email d'abord.")
    return
  }
  try {
    await sendPasswordResetEmail(auth, email.value)
    alert("Email de réinitialisation envoyé.")
  } catch (error) {
    alert("Erreur : " + error.message)
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: #FFD700;
}
.input {
  width: 100%;
  margin: 1rem 0;
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #FFD700;
  background-color: #111;
  color: #FFD700;
}
.password-field {
  display: flex;
  align-items: center;
}
.eye {
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
}
.btn {
  background-color: #FFD700;
  color: #000;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
.btn:hover {
  background-color: #FFA500;
}
.forgot {
  margin-top: 1rem;
  color: #C0C0C0;
  cursor: pointer;
  font-size: 0.9rem;
}
.error {
  margin-top: 1rem;
  color: #ff6666;
  font-size: 0.9rem;
}
</style>