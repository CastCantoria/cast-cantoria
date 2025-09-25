// backend/lib/firebaseAdmin.js
import admin from 'firebase-admin'

// ✅ Évite les réinitialisations multiples (utile en dev ou hot reload)
if (!admin.apps.length) {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error('❌ Variables Firebase manquantes (vérifie .env ou paramètres Vercel/Firebase)')
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  })
}

// 🔥 Accès à Firestore
const db = admin.firestore()

export { db, admin }