import { Router } from "express"
import {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
} from "../../lib/controllers/index.js"
import { body, validationResult } from "express-validator"
import { verifyToken } from "../middlewares/verifyToken.js"

const router = Router()

// ✅ Validation des données membres
const memberValidation = [
  body("firstName").trim().notEmpty().withMessage("Le prénom est requis"),
  body("lastName").trim().notEmpty().withMessage("Le nom est requis"),
  body("email").trim().isEmail().withMessage("Email invalide"),
  body("role").trim().notEmpty().withMessage("Le rôle est requis"),
  body("phone").optional().trim(),
]

// 📌 Middleware pour gérer la validation et renvoyer du JSON
function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }) // ✅ retour JSON clair
  }
  next()
}

// 📌 Helper pour capturer les erreurs async et renvoyer du JSON
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error("❌ Erreur API:", err)
    res.status(500).json({
      error: "Erreur interne du serveur",
      details: err.message,
    })
  })
}

// 📖 Routes publiques
router.get("/", asyncHandler(getAllMembers))
router.get("/:id", asyncHandler(getMemberById))

// 🔐 Routes protégées
router.post("/", verifyToken, memberValidation, validate, asyncHandler(createMember))
router.put("/:id", verifyToken, memberValidation, validate, asyncHandler(updateMember))
router.delete("/:id", verifyToken, asyncHandler(deleteMember))

export default router
