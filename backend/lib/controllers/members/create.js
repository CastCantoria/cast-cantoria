import { db } from '../../../api/utils/firebase.js'
import { validationResult } from 'express-validator'

export default async function createMember(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { nom, prenom, affiliation, adresse, email } = req.body
  try {
    const docRef = await db.collection('membres').add({
      nom,
      prenom,
      affiliation,
      adresse,
      email,
      createdAt: new Date().toISOString(),
      isAdmin: false
    })
    res.status(201).json({ id: docRef.id })
  } catch (error) {
    console.error('❌ Erreur dans createMember :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}