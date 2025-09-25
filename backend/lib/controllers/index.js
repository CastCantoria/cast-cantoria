import { db } from '../firebase.js'

// 📌 Récupérer tous les membres
export async function getAllMembers(req, res) {
  try {
    const snapshot = await db.collection('members').get()
    const members = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    res.status(200).json(members)
  } catch (err) {
    console.error('❌ Erreur getAllMembers:', err)
    res.status(500).json({ error: 'Impossible de charger les membres' })
  }
}

// 📌 Récupérer un membre par ID
export async function getMemberById(req, res) {
  try {
    const { id } = req.params
    const doc = await db.collection('members').doc(id).get()
    if (!doc.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }
    res.status(200).json({ id: doc.id, ...doc.data() })
  } catch (err) {
    console.error('❌ Erreur getMemberById:', err)
    res.status(500).json({ error: 'Impossible de charger le membre' })
  }
}

// 📌 Créer un membre
export async function createMember(req, res) {
  try {
    const { firstName, lastName, email, role, phone } = req.body

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Prénom, nom et email sont requis' })
    }

    const docRef = await db.collection('members').add({
      firstName,
      lastName,
      email,
      role: role || 'Simple Membre',
      phone: phone || '',
    })

    res.status(201).json({ id: docRef.id, firstName, lastName, email, role, phone })
  } catch (err) {
    console.error('❌ Erreur createMember:', err)
    res.status(500).json({ error: 'Impossible de créer le membre' })
  }
}

// 📌 Mettre à jour un membre
export async function updateMember(req, res) {
  try {
    const { id } = req.params
    const updates = req.body

    const docRef = db.collection('members').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    await docRef.update(updates)
    res.status(200).json({ id, ...updates })
  } catch (err) {
    console.error('❌ Erreur updateMember:', err)
    res.status(500).json({ error: 'Impossible de mettre à jour le membre' })
  }
}

// 📌 Supprimer un membre
export async function deleteMember(req, res) {
  try {
    const { id } = req.params

    const docRef = db.collection('members').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: 'Membre introuvable' })
    }

    await docRef.delete()
    res.status(200).json({ success: true, message: 'Membre supprimé' })
  } catch (err) {
    console.error('❌ Erreur deleteMember:', err)
    res.status(500).json({ error: 'Impossible de supprimer le membre' })
  }
}