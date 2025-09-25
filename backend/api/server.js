import express from "express"
import cors from "cors"
import membersRoutes from "./routes/members.js"
import logger from "./middlewares/logger.js"

const app = express()
const PORT = process.env.PORT || 3000

// 🌐 Autoriser les requêtes du frontend (Vite tourne sur 5173 ou 5174)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
)

// 🔧 Middlewares globaux
app.use(express.json()) // pour parser le JSON dans les requêtes
app.use(logger)

// 📦 Routes API
app.use("/api/members", membersRoutes)

// 🧪 Route de test rapide
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" }) // ✅ toujours renvoyer du JSON
})

// 🚀 Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`)
})
