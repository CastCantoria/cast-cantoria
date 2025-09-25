// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc
} from 'firebase/firestore'
import { useToaster } from '@/composables/useToaster'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const role = ref(null)
  const loading = ref(false)

  const isAdmin = computed(() => role.value === 'admin' || user.value?.isAdmin === true)
  const isLoggedIn = computed(() => !!user.value)

  const auth = getAuth()
  const db = getFirestore()
  const { success, error } = useToaster()

  function setUser(u) {
    user.value = u
    role.value = u?.isAdmin ? 'admin' : 'member'
  }

  function setToken(t) {
    token.value = t
  }

  async function login(email, password, router) {
    loading.value = true
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const u = result.user
      const tokenResult = await u.getIdToken()
      const userDocRef = doc(db, 'users', u.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        error('⛔ Profil utilisateur introuvable')
        return
      }

      const roleFromDb = userDoc.data().role || 'member'
      const isAdminFlag = roleFromDb === 'admin'

      setUser({
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoURL: u.photoURL,
        isAdmin: isAdminFlag
      })

      setToken(tokenResult)
      success('Connexion réussie 🎉')

      if (router) {
        router.push(isAdminFlag ? '/admin/dashboard' : '/')
      }
    } catch (err) {
      error('⛔ Erreur de connexion : ' + err.message)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout(router) {
    await signOut(auth)
    user.value = null
    token.value = null
    role.value = null
    success('Déconnexion réussie 👋')
    if (router) router.push('/')
  }

  async function fetchSession(router) {
    loading.value = true
    try {
      await new Promise((resolve) => {
        onAuthStateChanged(auth, async (u) => {
          if (!u) return resolve()

          const tokenResult = await u.getIdToken()
          const userDocRef = doc(db, 'users', u.uid)
          const userDoc = await getDoc(userDocRef)

          if (!userDoc.exists()) return resolve()

          const roleFromDb = userDoc.data().role || 'member'
          const isAdminFlag = roleFromDb === 'admin'

          setUser({
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
            isAdmin: isAdminFlag
          })

          setToken(tokenResult)

          if (router && isAdminFlag) {
            router.push('/admin/dashboard')
          }

          resolve()
        })
      })
    } catch (err) {
      error('⛔ Impossible de restaurer la session')
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    role,
    loading,
    isAdmin,
    isLoggedIn,
    login,
    logout,
    fetchSession,
    setUser,
    setToken
  }
}, {
  persist: {
    paths: ['user', 'token', 'role']
  }
})