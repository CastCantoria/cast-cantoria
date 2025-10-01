import { ref } from 'vue'
import { useAdminApi } from '@/composables/useAdminApi'
import { useToaster } from '@/composables/useToaster'

export function useAdminFetch() {
  const loading = ref(false)
  const errorMsg = ref(null)
  const { get, post, patch, del, put } = useAdminApi()
  const { success, error } = useToaster()

  async function fetchData(method, url, payload = null) {
    loading.value = true
    errorMsg.value = null
    try {
      let response
      switch (method) {
        case 'get': response = await get(url); break
        case 'post': response = await post(url, payload); break
        case 'patch': response = await patch(url, payload); break
        case 'put': response = await put(url, payload); break
        case 'delete': response = await del(url); break
        default: throw new Error(`Méthode inconnue : ${method}`)
      }
      success(`✅ ${method.toUpperCase()} réussi`)
      return response
    } catch (err) {
      errorMsg.value = err.message
      error(`⛔ ${method.toUpperCase()} échoué : ${err.message}`)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    fetchData,
    loading,
    errorMsg
  }
}