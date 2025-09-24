import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export const useStore = defineStore('main', () => {
  const user = ref(null)
  const role = ref(null)
  const isAdmin = ref(false)

  const fetchUser = async () => {
    const auth = getAuth()
    const db = getFirestore()

    onAuthStateChanged(auth, async (u) => {
      user.value = u
      if (u) {
        const docSnap = await getDoc(doc(db, 'users', u.uid))
        role.value = docSnap.exists() ? docSnap.data().role : null
        isAdmin.value = role.value === 'admin'
      } else {
        role.value = null
        isAdmin.value = false
      }
    })
  }

  return { user, role, isAdmin, fetchUser }
})