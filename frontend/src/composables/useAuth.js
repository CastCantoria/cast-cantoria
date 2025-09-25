import { useAuthStore } from '@/stores/authStore.js'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile as firebaseUpdateProfile,
  updatePassword
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { useToaster } from '@/composables/useToaster'

export function useAuth() {
  const authStore = useAuthStore()
  const { success, error } = useToaster()

  // 📌 Connexion email/mot de passe via le store
  const login = async (email, password, router) => {
    try {
      await authStore.login(email, password, router)
    } catch (err) {
      // On laisse le composant parent gérer l'affichage via emit('error', err)
      throw err
    }
  }

  // 📝 Inscription email
  const signup = async (email, password, router) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user

      await setDoc(doc(db, 'users', user.uid), {
        role: 'member',
        email: user.email
      })

      authStore.setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: false
      })

      const token = await user.getIdToken()
      authStore.setToken(token)

      success('Inscription réussie 🎉')
      if (router) router.push('/')
    } catch (err) {
      error('⛔ Erreur d’inscription : ' + err.message)
      throw err
    }
  }

  // 🌐 Connexion Google
  const loginWithGoogle = async (router) => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      let roleFromDb = 'member'
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          role: roleFromDb,
          email: user.email
        })
      } else {
        roleFromDb = userDoc.data().role || 'member'
      }

      const isAdminFlag = roleFromDb === 'admin'

      authStore.setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAdmin: isAdminFlag
      })

      const token = await user.getIdToken()
      authStore.setToken(token)

      success('Connexion Google réussie 🎉')
      if (router) router.push(isAdminFlag ? '/admin/dashboard' : '/')
    } catch (err) {
      error('⛔ Erreur Google : ' + err.message)
      throw err
    }
  }

  // 🧾 Mise à jour du profil
  const updateProfile = async (user, data) => {
    await firebaseUpdateProfile(user, {
      displayName: data.displayName || '',
      photoURL: data.photoURL || null
    })

    await setDoc(
      doc(db, 'users', user.uid),
      {
        role: authStore.role || 'member',
        email: user.email,
        phone: data.phoneNumber || '',
        displayName: data.displayName || '',
        photoURL: data.photoURL || null
      },
      { merge: true }
    )

    success('Profil mis à jour ✨')
  }

  // 🔑 Changement de mot de passe
  const changePassword = async (newPassword) => {
    if (!auth.currentUser) throw new Error('Utilisateur non connecté.')
    await updatePassword(auth.currentUser, newPassword)
    success('Mot de passe mis à jour 🔐')
  }

  return {
    login,            // <-- ajout ici
    signup,
    loginWithGoogle,
    updateProfile,
    changePassword
  }
}