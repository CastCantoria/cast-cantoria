import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export function useWelcome(key = 'welcomeSeen') {
  const visible = ref(false)
  const firstName = ref('ami')
  const role = ref('Membre')

  const auth = getAuth()
  const db = getFirestore()

  const checkWelcome = () => {
    const alreadySeen = localStorage.getItem(key)
    if (alreadySeen) return

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const data = userDoc.data()
        firstName.value = data?.firstName || user.displayName?.split(' ')[0] || 'ami'
        role.value = data?.role || 'Membre'
        visible.value = true
      }
    })
  }

  const dismiss = () => {
    visible.value = false
    localStorage.setItem(key, 'true')
  }

  return {
    visible,
    firstName,
    role,
    checkWelcome,
    dismiss
  }
}