import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD0lcH0MWPGbSsfEB3ZkGVrvu9h1m5F8YY',
  authDomain: 'cast-espace-membre.firebaseapp.com',
  projectId: 'cast-espace-membre',
  storageBucket: 'cast-espace-membre.appspot.com',
  messagingSenderId: '665168161680',
  appId: '1:665168161680:web:66260020196e0e25546115',
  measurementId: 'G-8MP04MJMS1'
}

// ✅ Empêche l’erreur "Firebase App named '[DEFAULT]' already exists"
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export function useFirebase() {
  return { auth, db, storage }
}