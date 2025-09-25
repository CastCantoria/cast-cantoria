// api/middlewares/verifyToken.js
import { adminAuth, db } from '../utils/firebase.js'

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou invalide' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = await adminAuth.verifyIdToken(token)
    const userDoc = await db.collection('membres').doc(decoded.uid).get()
    const userData = userDoc.exists ? userDoc.data() : {}

    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      isAdmin: userData.isAdmin || false
    }

    next()
  } catch (error) {
    res.status(401).json({ error: 'Échec de vérification du token' })
  }
}