import {
  getMemberById,
  updateMember,
  deleteMember
} from '../../lib/controllers/index.js'

export default async function handler(req, res) {
  const { id } = req.query
  req.params = { id } // 🔧 pour compatibilité avec les contrôleurs

  switch (req.method) {
    case 'GET':
      return await getMemberById(req, res)
    case 'PUT':
      return await updateMember(req, res)
    case 'DELETE':
      return await deleteMember(req, res)
    default:
      return res.status(405).json({ error: 'Méthode non autorisée' })
  }
}