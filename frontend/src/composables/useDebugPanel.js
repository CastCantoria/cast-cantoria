import { ref } from 'vue'

export function useDebugPanel() {
  const backendStatus = ref('⏳ En attente...')
  const memberCount = ref(0)
  const lastError = ref(null)
  const lastAction = ref('Aucune')
  const currentRoleFilter = ref('Tous')

  async function checkBackend() {
    try {
      const res = await fetch('/api/health')
      backendStatus.value = res.ok ? '✅ Backend OK' : '❌ Backend KO'
    } catch {
      backendStatus.value = '❌ Backend inaccessible'
    }
  }

  function updateMembers(count) {
    memberCount.value = count
  }

  function setError(message) {
    lastError.value = message
  }

  function setAction(action) {
    lastAction.value = action
  }

  function setRole(role) {
    currentRoleFilter.value = role
  }

  return {
    backendStatus,
    memberCount,
    lastError,
    lastAction,
    currentRoleFilter,
    checkBackend,
    updateMembers,
    setError,
    setAction,
    setRole,
  }
}