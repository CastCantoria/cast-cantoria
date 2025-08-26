// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send("Accès refusé");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send("Token invalide");
  }
}

export default verifyToken;