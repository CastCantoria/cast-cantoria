<template>
  <div class="email-auth-form">
    <h2 class="title">Connexion</h2>

    <form @submit.prevent="handleLogin" class="form">
      <label>
        Email :
        <input v-model="email" type="email" required />
      </label>

      <label class="password-field">
        Mot de passe :
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" required />
          <button type="button" class="toggle-btn" @click="showPassword = !showPassword">
            👁️
          </button>
        </div>
      </label>

      <div class="forgot-link">
        <button type="button" class="link-btn" @click="recoverPassword">Mot de passe oublié ?</button>
      </div>

      <button type="submit" class="btn-login">Se connecter</button>

      <div class="separator">ou</div>

      <GoogleLoginButton />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import GoogleLoginButton from './GoogleLoginButton.vue'

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  try {
    await login(email.value, password.value, router)
  } catch (err) {
    alert('Erreur : ' + err.message)
  }
}

const recoverPassword = () => {
  alert('Fonction de récupération à implémenter.')
}
</script>

<style scoped>
.email-auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #c8a951;
  text-align: center;
  margin-bottom: 1rem;
}

.form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #333;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.password-field {
  position: relative;
}

.password-wrapper {
  display: flex;
  align-items: center;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

.forgot-link {
  text-align: right;
  margin-top: 0.3rem;
}

.link-btn {
  background: none;
  border: none;
  color: #c8a951;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
}

.link-btn:hover {
  color: #a88b3f;
}

.btn-login {
  margin-top: 1rem;
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #4338ca;
}

.separator {
  text-align: center;
  margin: 1rem 0;
  color: #999;
  font-size: 0.9rem;
}
</style>