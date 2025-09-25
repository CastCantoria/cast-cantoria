<template>
  <button class="google-btn" @click="handleGoogleLogin" aria-label="Connexion avec Google">
    <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.4h-1.9v-.1H24v7.3h11.3c-1.6 4.4-5.8 7.5-10.8 7.5-6.4 0-11.6-5.2-11.6-11.6S18.1 12.9 24.5 12.9c3.1 0 5.9 1.2 8 3.1l5.2-5.2C34.2 7.3 29.6 5.3 24.5 5.3 13.9 5.3 5.3 13.9 5.3 24.5S13.9 43.7 24.5 43.7c10.6 0 19.2-8.6 19.2-19.2 0-1.3-.1-2.7-.3-4.1z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6 4.4c1.6-3.1 4.3-5.6 7.6-6.9l-6-4.4c-3.2 1.6-5.9 4.1-7.6 6.9z"/>
      <path fill="#4CAF50" d="M24.5 43.7c5.1 0 9.7-1.9 13.2-5l-6.3-5.2c-2.2 1.6-5 2.6-7.9 2.6-5 0-9.2-3.1-10.8-7.5l-6.3 5.2c3.5 6.2 10.2 10.4 17.1 10.4z"/>
      <path fill="#1976D2" d="M43.6 20.4h-1.9v-.1H24v7.3h11.3c-.7 2-2 3.8-3.6 5.2l6.3 5.2c3.7-3.4 6-8.4 6-13.6 0-1.3-.1-2.7-.3-4.1z"/>
    </svg>
    Se connecter avec Google
  </button>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useAuthStore } from '@/stores/authStore.js'

const auth = getAuth()
const db = getFirestore()
const authStore = useAuthStore()

const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const [firstName, ...lastParts] = user.displayName?.split(' ') || []
    const lastName = lastParts.join(' ')

    await setDoc(doc(db, 'users', user.uid), {
      firstName: firstName || '',
      lastName: lastName || '',
      email: user.email,
      avatar: user.photoURL || '',
      role: 'Simple Membre',
      createdAt: new Date()
    }, { merge: true })

    // 🔄 Synchroniser avec Pinia
    authStore.user = user
  } catch (error) {
    console.error('Erreur Google Sign-In :', error.message)
  }
}
</script>

<style scoped>
.google-btn {
  background-color: #fff;
  color: #444;
  border: 1px solid #ccc;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: background 0.3s ease;
}

.google-btn:hover {
  background-color: #f5f5f5;
}

.google-icon {
  width: 20px;
  height: 20px;
}
</style>