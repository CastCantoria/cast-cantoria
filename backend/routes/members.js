import express from 'express'
import { body, validationResult } from 'express-validator'
import { db } from '../lib/firebaseAdmin.js'

const router = express.Router()

// ✅ GET /api/members – liste tous les membres (depuis la collection "users")
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get()
    const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log('📦 Membres Firestore :', members)
    res.status(200).json(members)
  } catch (err) {
    console.error('❌ Erreur GET /members :', err)
    res.status(500).json({ error: 'Impossible de charger les membres' })
  }
})

// ✅ POST /api/members – ajoute un membre dans "users"
router.post(
  '/',
  [
    body('firstName').notEmpty().withMessage('Prénom requis'),
    body('lastName').notEmpty().withMessage('Nom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('role').notEmpty().withMessage('Rôle requis'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { firstName, lastName, email, role, phone } = req.body
      const docRef = await db.collection('users').add({
        firstName,
        lastName,
        email,
        role,
        phone: phone || '',
      })
      res.status(201).json({ id: docRef.id, firstName, lastName, email, role, phone })
    } catch (err) {
      console.error('❌ Erreur POST /members :', err)
      res.status(500).json({ error: 'Impossible de créer le membre' })
    }
  }
)

// ✅ PATCH /api/members/:id – met à jour partiellement un membre
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const updates = req.body

  try {
    const docRef = db.collection('users').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    await docRef.update(updates)
    console.log(`✏️ Membre ${id} mis à jour via PATCH :`, updates)
    res.status(200).json({ success: true, message: 'Membre mis à jour' })
  } catch (err) {
    console.error('❌ Erreur PATCH /members :', err)
    res.status(500).json({ error: 'Impossible de modifier le membre' })
  }
})

// ✅ PUT /api/members/:id – met à jour complètement un membre
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updates = req.body

  try {
    const docRef = db.collection('users').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    await docRef.update(updates)
    console.log(`✏️ Membre ${id} mis à jour via PUT :`, updates)
    res.status(200).json({ success: true, message: 'Membre mis à jour' })
  } catch (err) {
    console.error('❌ Erreur PUT /members :', err)
    res.status(500).json({ error: 'Impossible de modifier le membre' })
  }
})

// ✅ DELETE /api/members/:id – supprime un membre dans "users"
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const docRef = db.collection('users').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    await docRef.delete()
    res.status(200).json({ success: true, message: 'Membre supprimé' })
  } catch (err) {
    console.error('❌ Erreur DELETE /members :', err)
    res.status(500).json({ error: 'Impossible de supprimer le membre' })
  }
})

export default router