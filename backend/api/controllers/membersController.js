import { db } from '../utils/firebase.js'
import { validationResult } from 'express-validator'

// 🔍 GET all members
export async function getAllMembers(req, res) {
  try {
    const snapshot = await db.collection('membres').get()
    const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(members)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ➕ POST new member
export async function createMember(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

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
    res.status(500).json({ error: error.message })
  }
}

// ✏️ PUT update member
export async function updateMember(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Accès interdit' })

  const { nom, prenom, affiliation, adresse, email } = req.body
  try {
    await db.collection('membres').doc(req.params.id).update({
      nom,
      prenom,
      affiliation,
      adresse,
      email,
      updatedAt: new Date().toISOString()
    })
    res.status(200).json({ message: '✅ Membre mis à jour' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 🗑️ DELETE member
export async function deleteMember(req, res) {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Accès interdit' })

  try {
    await db.collection('membres').doc(req.params.id).delete()
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}