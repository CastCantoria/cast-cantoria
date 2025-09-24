import { computed } from 'vue'
import { useAuth } from './useAuth'

export function usePermissions() {
  const { role } = useAuth()

  const canEditGallery = computed(() => role.value === 'admin')
  const canDeleteUser = computed(() => role.value === 'admin')
  const canViewDashboard = computed(() => ['admin', 'membre'].includes(role.value))
  const canUploadMedia = computed(() => role.value === 'admin' || role.value === 'membre')

  return {
    canEditGallery,
    canDeleteUser,
    canViewDashboard,
    canUploadMedia
  }
}