// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCT_8j9KBKgcYr3naOFRp-Kk-s-gr_A1gs',
  authDomain: 'cast-84d3f.firebaseapp.com',
  projectId: 'cast-84d3f',
  storageBucket: 'cast-84d3f.appspot.com',
  messagingSenderId: '160422742820',
  appId: '1:160422742820:web:f60e6c94ba743d1afd41b1',
  measurementId: 'G-9BNSYK4TH4'
}

// ✅ Empêche l’erreur "duplicate-app"
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Analytics : fallback en cas d'erreur réseau ou config
let analytics = null
try {
  analytics = getAnalytics(app)
} catch (e) {
  console.warn('Firebase Analytics non disponible, fallback measurementId utilisé', e)
}

// Auth, Firestore et Storage
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, analytics, auth, db, storage }
