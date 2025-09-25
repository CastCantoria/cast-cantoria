import { db } from '../../../api/utils/firebase.js'
import { validationResult } from 'express-validator'

export default async function updateMember(req, res) {
  // ✅ Validation des données
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // ✅ Vérification des droits
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Accès interdit' })
  }

  const { firstName, lastName, phone, role, email } = req.body

  try {
    const docRef = db.collection('users').doc(req.params.id)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    const updates = {
      firstName,
      lastName,
      phone,
      role,
      email,
      updatedAt: new Date().toISOString()
    }

    await docRef.update(updates)

    res.status(200).json({ message: '✅ Membre mis à jour avec succès' })
  } catch (error) {
    console.error('❌ Erreur dans updateMember :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}