<script setup>
import { ref, watch } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()

const message = ref('')
const visible = ref(false)

const showMessage = (text) => {
  message.value = text
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 6000)
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    const data = userDoc.data()
    const firstName = data?.firstName || user.displayName?.split(' ')[0] || 'ami'
    const role = data?.role || 'Membre'

    showMessage(`Bienvenue ${firstName} ! Tu es inscrit en tant que ${role}. Tu peux modifier ton profil à tout moment.`)
  }
})
</script>

<template>
  <transition name="fade-slide">
    <div v-if="visible" class="welcome-banner">
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.welcome-banner {
  background-color: #fff8e1;
  color: #3a3a3a;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  border-bottom: 1px solid #c8a951;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  animation: fadeOut 6s ease forwards;
}

@keyframes fadeOut {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; display: none; }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>