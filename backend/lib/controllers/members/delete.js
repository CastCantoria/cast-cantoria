import { db } from '../../../api/utils/firebase.js'

export default async function deleteMember(req, res) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Accès interdit' })
  }

  try {
    const docRef = db.collection('membres').doc(req.params.id)
    const docSnap = await docRef.get()
    if (!docSnap.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    await docRef.delete()
    res.status(204).end()
  } catch (error) {
    console.error('❌ Erreur dans deleteMember :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}