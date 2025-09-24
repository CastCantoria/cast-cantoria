import { Router } from 'express'
import {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember
} from '../../lib/controllers/index.js'
import { body } from 'express-validator'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// ✅ Validation des données membres
const memberValidation = [
  body('firstName').trim().notEmpty().withMessage('Le prénom est requis'),
  body('lastName').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').trim().isEmail().withMessage('Email invalide'),
  body('role').trim().notEmpty().withMessage('Le rôle est requis'),
  body('phone').optional().trim()
]

// 📌 Helper pour capturer les erreurs async et renvoyer du JSON
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err)
    res.status(500).json({
      error: 'Erreur interne du serveur',
      details: err.message
    })
  })
}

// 📖 Routes publiques
router.get('/', asyncHandler(getAllMembers))
router.get('/:id', asyncHandler(getMemberById))

// 🔐 Routes protégées
router.post('/', verifyToken, memberValidation, asyncHandler(createMember))
router.put('/:id', verifyToken, memberValidation, asyncHandler(updateMember))
router.delete('/:id', verifyToken, asyncHandler(deleteMember))

export default router