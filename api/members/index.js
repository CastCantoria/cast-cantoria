import { getAllMembers, createMember } from '../../lib/controllers/index.js'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getAllMembers(req, res)
    case 'POST':
      return await createMember(req, res)
    default:
      return res.status(405).json({ error: 'Méthode non autorisée' })
  }
}