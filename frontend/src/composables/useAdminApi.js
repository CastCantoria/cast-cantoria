import { useAuthStore } from '@/stores/authStore'
import { useToaster } from '@/composables/useToaster'

export function useAdminApi() {
  const auth = useAuthStore()
  const { error } = useToaster()

  async function adminFetch(path, options = {}) {
    if (!auth.token || !auth.isAdmin) {
      error('🔒 Accès réservé aux administrateurs')
      throw new Error('Accès refusé – rôle admin requis')
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

  return { adminFetch }
}