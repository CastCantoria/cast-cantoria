<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const errorMessage = ref('')
const router = useRouter()

const signup = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas."
    return
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "member"
    })

    router.push('/home')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Inscription</h2>

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

    <div class="password-field">
      <input
        :type="showConfirm ? 'text' : 'password'"
        v-model="confirmPassword"
        placeholder="Confirmer le mot de passe"
        class="input"
      />
      <span class="eye" @click="showConfirm = !showConfirm">
        {{ showConfirm ? '🙈' : '👁️' }}
      </span>
    </div>

    <button @click="signup" class="btn">S’inscrire</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

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
.error {
  margin-top: 1rem;
  color: #ff6666;
  font-size: 0.9rem;
}
</style>