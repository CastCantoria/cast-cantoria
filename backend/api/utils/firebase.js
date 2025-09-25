import { readFileSync } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const __dirname = dirname(fileURLToPath(import.meta.url))

let serviceAccount
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
} else {
  serviceAccount = JSON.parse(
    readFileSync(`${__dirname}/../serviceAccountKey.json`, 'utf8')
  )
}

const app = getApps().length === 0
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApp()

export const firebaseApp = app
export const adminAuth = getAuth(app)
export const db = getFirestore(app)