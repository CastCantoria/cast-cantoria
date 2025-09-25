import { ref, onMounted } from 'vue'

export function useMembers() {
  const members = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function isBackendReady() {
    try {
      const res = await fetch('/api/health')
      return res.ok
    } catch {
      return false
    }
  }

  async function fetchMembers() {
    loading.value = true
    error.value = null

    const ready = await isBackendReady()
    if (!ready) {
      error.value = '⛔ Backend indisponible (API non joignable)'
      loading.value = false
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/members')
      if (!res.ok) throw new Error(`Erreur ${res.status}`)
      members.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    setTimeout(fetchMembers, 500) // ⏳ laisse le temps au backend de démarrer
  })

  return { members, loading, error, fetchMembers }
}