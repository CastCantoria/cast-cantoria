import { useToast } from 'vue-toastification'

export function useToaster() {
  // Vérifie que l’appel est bien dans un composant ou composable setup()
  try {
    const toast = useToast()

    const success = (message, options = {}) =>
      toast.success(message, {
        icon: '✅',
        transition: 'Vue-Toastification__bounce',
        timeout: 3000,
        ...options
      })

    const error = (message, options = {}) =>
      toast.error(message, {
        icon: '⛔',
        transition: 'Vue-Toastification__slideBlurred',
        timeout: 4000,
        ...options
      })

    const info = (message, options = {}) =>
      toast.info(message, {
        icon: 'ℹ️',
        transition: 'Vue-Toastification__fade',
        timeout: 2500,
        ...options
      })

    const admin = (message, options = {}) =>
      toast(message, {
        icon: '🛡️',
        transition: 'Vue-Toastification__zoom',
        timeout: 3500,
        className: 'bg-indigo-100 text-indigo-800 font-semibold',
        ...options
      })

    const member = (message, options = {}) =>
      toast(message, {
        icon: '🎶',
        transition: 'Vue-Toastification__bounce',
        timeout: 3000,
        className: 'bg-green-100 text-green-800 font-medium',
        ...options
      })

    return { success, error, info, admin, member }
  } catch (err) {
    console.warn('useToaster() doit être appelé dans un composant ou composable setup()')
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      admin: () => {},
      member: () => {}
    }
  }
}