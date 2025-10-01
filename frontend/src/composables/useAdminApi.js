import { useAuthStore } from '@/stores/authStore'
import { useToaster } from '@/composables/useToaster'

export function useAdminApi() {
  const auth = useAuthStore()
  const { error } = useToaster()

  const getApiBaseUrl = () => {
    return import.meta.env.VITE_API_URL || '/api'
  }

  const request = async (endpoint, options = {}) => {
    if (!auth.token || !auth.isAdmin) {
      const msg = '🔒 Accès réservé aux administrateurs'
      error(msg)
      throw new Error(msg)
    }

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${auth.token}`,
    }

    const url = `${getApiBaseUrl()}${endpoint}`

    try {
      const res = await fetch(url, { ...options, headers })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Erreur API ${res.status} : ${errorText}`)
      }
      const contentType = res.headers.get('content-type')
      return contentType?.includes('application/json') ? res.json() : null
    } catch (err) {
      console.error('Erreur API Admin:', err)
      error(`Erreur serveur: ${err.message}`)
      throw err
    }
  }

  const get = (endpoint, options) => request(endpoint, { ...options, method: 'GET' })
  const post = (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) })
  const patch = (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) })
  const put = (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) })
  const del = (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' })

  return { request, get, post, patch, put, del }
}