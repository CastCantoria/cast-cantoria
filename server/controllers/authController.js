// server/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users = [
  { id: 1, email: "admin@cantoria.com", passwordHash: bcrypt.hashSync("motdepasse", 10), role: "admin" },
  { id: 2, email: "editor@cantoria.com", passwordHash: bcrypt.hashSync("editeurpass", 10), role: "editor" }
];

export default {
  login(req, res) {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).send("Utilisateur non trouvé");

    const valid = bcrypt.compareSync(password, user.passwordHash);
    if (!valid) return res.status(401).send("Mot de passe incorrect");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  }
};