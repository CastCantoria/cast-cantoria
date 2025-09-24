// 📁 lib/controllers/members/getMemberById.js
import { db } from '../../../api/utils/firebase.js'
import { doc, getDoc } from 'firebase/firestore'

export default async function getMemberById(req, res) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'ID du membre manquant' })
    }

    const docRef = doc(db, 'members', id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    res.status(200).json({ id: snapshot.id, ...snapshot.data() })
  } catch (err) {
    console.error('Erreur dans getMemberById:', err)
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: err.message
    })
  }
}