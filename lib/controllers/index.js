import { db } from "../firebase.js"

// 📌 Récupérer tous les membres
export async function getAllMembers(req, res) {
  try {
    const snapshot = await db.collection("members").get()
    const members = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    res.json(members) // ✅ réponse JSON
  } catch (err) {
    console.error("❌ Erreur getAllMembers:", err)
    res.status(500).json({ error: "Impossible de charger les membres" })
  }
}

// 📌 Récupérer un membre par ID
export async function getMemberById(req, res) {
  try {
    const doc = await db.collection("members").doc(req.params.id).get()
    if (!doc.exists) {
      return res.status(404).json({ error: "Membre introuvable" })
    }

    res.json({ id: doc.id, ...doc.data() })
  } catch (err) {
    console.error("❌ Erreur getMemberById:", err)
    res.status(500).json({ error: "Impossible de charger le membre" })
  }
}

// 📌 Créer un membre
export async function createMember(req, res) {
  try {
    const data = req.body
    const docRef = await db.collection("members").add(data)

    res.status(201).json({ id: docRef.id, ...data })
  } catch (err) {
    console.error("❌ Erreur createMember:", err)
    res.status(500).json({ error: "Impossible de créer le membre" })
  }
}

// 📌 Mettre à jour un membre
export async function updateMember(req, res) {
  try {
    const { id } = req.params
    const data = req.body

    const docRef = db.collection("members").doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: "Membre introuvable" })
    }

    await docRef.update(data)

    res.json({ id, ...data })
  } catch (err) {
    console.error("❌ Erreur updateMember:", err)
    res.status(500).json({ error: "Impossible de mettre à jour le membre" })
  }
}

// 📌 Supprimer un membre
export async function deleteMember(req, res) {
  try {
    const { id } = req.params

    const docRef = db.collection("members").doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: "Membre introuvable" })
    }

    await docRef.delete()
    res.json({ success: true, message: "Membre supprimé" })
  } catch (err) {
    console.error("❌ Erreur deleteMember:", err)
    res.status(500).json({ error: "Impossible de supprimer le membre" })
  }
}
