import { useAuthStore } from '@/stores/authStore'
import { useToaster } from '@/composables/useToaster'

export function useSecureApi() {
  const auth = useAuthStore()
  const { error } = useToaster()

  async function secureFetch(path, options = {}) {
    if (!auth.token) {
      error('⛔ Accès refusé : vous devez être connecté')
      throw new Error('Token manquant – authentification requise')
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${auth.token}`,
    }

    const res = await fetch(`/api${path}`, {
      ...options,
      headers,
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Erreur API ${res.status} : ${errorText}`)
    }

    const contentType = res.headers.get('content-type')
    return contentType?.includes('application/json') ? res.json() : null
  }

  return { secureFetch }
}