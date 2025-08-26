// server/routes/adminRoutes.js
import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.send("Bienvenue, administrateur 🎩");
});

router.get('/editor', verifyToken, authorizeRoles('admin', 'editor'), (req, res) => {
  res.send("Bienvenue, éditeur ✍️");
});

export default router;