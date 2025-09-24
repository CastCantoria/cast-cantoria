<template>
  <div v-if="isAuthPopupVisible" class="floating-overlay" @click.self="closeAuth">
    <transition name="fade-slide">
      <div class="auth-box" role="dialog" aria-modal="true">
        <button class="close-btn" @click="closeAuth" aria-label="Fermer la fenêtre">✕</button>

        <!-- Composant actif selon le mode -->
        <component
          :is="activeComponent"
          v-on="childListeners"
          @close="closeAuth"
        />

        <!-- Message d'erreur personnalisé -->
        <p v-if="errorMessage" class="error">
          {{ errorMessage }}
          <button
            v-if="showLoginLink"
            @click="switchToLogin"
            class="login-link"
          >
            Se connecter
          </button>
        </p>

        <!-- Lien d'inscription -->
        <div class="signup-prompt" v-if="mode !== 'register'">
          Pas encore inscrit ?
          <button class="signup-link" @click="mode = 'register'">Créer un compte</button>
        </div>

        <!-- Boutons de mode -->
        <div class="mode-switch">
          <button :class="{ active: mode === 'email' }" @click="mode = 'email'">📧 Email</button>
          <button :class="{ active: mode === 'phone' }" @click="mode = 'phone'">📱 Téléphone</button>
          <button :class="{ active: mode === 'admin' }" @click="mode = 'admin'">👤 Ajout manuel</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthPopup } from '@/composables/useAuthPopup'
import { useAuthStore } from '@/stores/authStore.js'

import EmailAuthForm from './EmailAuthForm.vue'
import PhoneSignup from './PhoneSignup.vue'
import AddMemberModal from './admin/AddMemberModal.vue'

// Utilise la vue d’inscription existante chez toi.
// Si tu préfères Inscription.vue, change l’import suivant:
import SignupForm from '@/views/SignupForm.vue' // ou '@/views/Inscription.vue'

const { isAuthPopupVisible, closeAuth, authMode } = useAuthPopup()
const authStore = useAuthStore()

// source d’autorité pour le mode dans ce composant
const mode = ref(authMode?.value || 'email') // email | register | phone | admin

const errorMessage = ref('')
const showLoginLink = ref(false)

// Fermer si l'utilisateur est connecté
watch(() => authStore.user, (u) => {
  if (u) closeAuth()
})

// Réinitialiser l'erreur à chaque changement de mode
watch(mode, () => {
  errorMessage.value = ''
  showLoginLink.value = false
})

const activeComponent = computed(() => {
  switch (mode.value) {
    case 'register':
      return SignupForm
    case 'phone':
      return PhoneSignup
    case 'admin':
      return AddMemberModal
    default:
      return EmailAuthForm
  }
})

// Normalisation des erreurs Firebase
function normalizeError(err) {
  const code = err?.code || ''
  if (code === 'auth/email-already-in-use') {
    return { message: 'Cette adresse email est déjà enregistrée. Veuillez vous connecter directement.', suggestLogin: true }
  }
  if (code === 'auth/invalid-email') {
    return { message: 'Adresse email invalide. Vérifiez le format.', suggestLogin: false }
  }
  if (code === 'auth/weak-password') {
    return { message: 'Mot de passe trop faible. Utilisez au moins 6 caractères.', suggestLogin: false }
  }
  if (code === 'auth/operation-not-allowed') {
    return { message: 'Méthode d’inscription désactivée. Contactez l’administrateur.', suggestLogin: false }
  }
  if (code === 'auth/too-many-requests') {
    return { message: 'Trop de tentatives. Réessayez plus tard.', suggestLogin: false }
  }
  return { message: err?.message || 'Une erreur est survenue. Veuillez réessayer.', suggestLogin: false }
}

function handleError(err) {
  const { message, suggestLogin } = normalizeError(err)
  errorMessage.value = message
  showLoginLink.value = suggestLogin
}

// Écoute plusieurs noms d'événements, selon l’enfant
const childListeners = {
  error: handleError,
  'auth-error': handleError,
  fail: handleError,
}

function switchToLogin() {
  mode.value = 'email'
  setTimeout(() => {
    errorMessage.value = ''
    showLoginLink.value = false
  }, 1200)
}
</script>

<style scoped>
.floating-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.auth-box {
  background: #fdfaf6;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(200, 169, 81, 0.3);
  position: relative;
  animation: breathe 0.6s ease;
  color: #3a3a3a;
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #c8a951;
}
.signup-prompt {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #555;
}
.signup-link {
  background: none;
  border: none;
  color: #c8a951;
  font-weight: bold;
  cursor: pointer;
  margin-left: 0.3rem;
  text-decoration: underline;
}
.signup-link:hover {
  color: #a88b3f;
}
.mode-switch {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.mode-switch button {
  padding: 0.4rem 0.8rem;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.9rem;
}
.mode-switch button.active {
  background: #c8a951;
  color: #fff;
}
.error {
  color: #c0392b;
  margin-top: 0.8rem;
  text-align: center;
}
.login-link {
  background: none;
  border: none;
  color: #c8a951;
  font-weight: bold;
  cursor: pointer;
  margin-left: 0.3rem;
  text-decoration: underline;
}
.login-link:hover {
  color: #a88b3f;
}
@keyframes breathe {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>