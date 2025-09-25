import { useAuthStore } from '@/stores/authStore'

export async function apiFetch(path, options = {}) {
  const auth = useAuthStore()

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (auth.token) {
    headers.Authorization = `Bearer ${auth.token}`
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