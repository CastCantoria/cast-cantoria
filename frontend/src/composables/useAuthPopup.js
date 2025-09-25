import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'

// État global partagé
const isAuthPopupVisible = ref(false)
const authMode = ref('login') // 'login' | 'register' | 'phone' | 'admin'

export function useAuthPopup() {
  const authStore = useAuthStore()

  const openAuth = (mode = 'login') => {
    authMode.value = mode
    isAuthPopupVisible.value = true
  }

  const closeAuth = () => {
    isAuthPopupVisible.value = false
  }

  // Ferme automatiquement la popup si l'utilisateur est connecté
  const autoCloseOnLogin = () => {
    watch(
      () => authStore.user, // ✅ getter, jamais undefined
      (u) => {
        if (u) closeAuth()
      }
    )
  }

  return {
    isAuthPopupVisible,
    authMode,
    openAuth,
    closeAuth,
    autoCloseOnLogin
  }
}