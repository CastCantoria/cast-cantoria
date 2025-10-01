// src/composables/useAdminApi.js
import { useAuthStore } from '@/stores/authStore'
import { useToaster } from '@/composables/useToaster'

export function useAdminApi() {
  const auth = useAuthStore()
  const { error } = useToaster()

  // 🔄 Retourne la base URL selon l'environnement
  const getApiBaseUrl = () => {
    return import.meta.env.MODE === 'development'
      ? 'http://localhost:3000'
      : 'https://cast-cantoria.vercel.app'
  }

  /**
   * Wrapper général pour les appels API admin
   * @param {string} endpoint - endpoint relatif (ex: '/members')
   * @param {object} options - options fetch
   * @returns {Promise<any>}
   */
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

    const url = `${getApiBaseUrl()}/api${endpoint}`

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

  // 🔹 Fonctions utilitaires pour GET / POST / PUT / DELETE
  const get = (endpoint, options) => request(endpoint, { ...options, method: 'GET' })
  const post = (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) })
  const put = (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) })
  const del = (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' })

  return { request, get, post, put, del }
}
