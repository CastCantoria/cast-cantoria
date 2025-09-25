// lib/controllers/members/getAll.js
import { db } from '../../../api/utils/firebase.js'

export default async function getAllMembers(req, res) {
  try {
    // 🔹 Lecture de la collection users, triée par date de création décroissante
    const snapshot = await db.collection('users')
      .orderBy('createdAt', 'desc')
      .get()

    const members = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        role: data.role || '',
        avatar: data.avatar || '',
        createdAt: data.createdAt || null
      }
    })

    res.status(200).json(members)
  } catch (error) {
    console.error('❌ Erreur dans getAllMembers :', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}