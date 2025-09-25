import { ref, watch } from 'vue'

export function useMemberEditor() {
  const showForm = ref(false)
  const selectedMember = ref(null)

  function openEditor(member = null) {
    selectedMember.value = member
    showForm.value = true
    document.body.style.overflow = 'hidden' // 🔒 verrouille le scroll
  }

  function closeEditor() {
    selectedMember.value = null
    showForm.value = false
    document.body.style.overflow = '' // 🔓 rétablit le scroll
  }

  watch(showForm, (visible) => {
    if (!visible) document.body.style.overflow = ''
  })

  return {
    showForm,
    selectedMember,
    openEditor,
    closeEditor,
  }
}