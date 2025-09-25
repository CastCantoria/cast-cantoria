import { admin } from '../lib/firebaseAdmin.js'

export default async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou mal formé' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken // ✅ attaché à la requête
    next()
  } catch (err) {
    console.error('❌ Token invalide :', err)
    res.status(403).json({ error: 'Token invalide ou expiré' })
  }
}