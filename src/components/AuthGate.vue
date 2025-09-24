<template>
  <div v-if="isAllowed">
    <slot />
  </div>
  <div v-else class="p-4 text-center text-red-600 bg-red-50 rounded-md">
    ⛔ Accès refusé : vous n’avez pas les droits nécessaires.
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { computed } from 'vue'

const props = defineProps({
  requireAdmin: { type: Boolean, default: false },
  requireLogin: { type: Boolean, default: false }
})

const auth = useAuthStore()

const isAllowed = computed(() => {
  if (props.requireAdmin && !auth.isAdmin) return false
  if (props.requireLogin && !auth.isLoggedIn) return false
  return true
})
</script>