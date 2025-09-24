import express from 'express'
import cors from 'cors'
import membersRoutes from './routes/members.js'
import logger from './middlewares/logger.js'

const app = express()
const PORT = process.env.PORT || 3000

// 🌐 Autoriser les requêtes du frontend local
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

// 🔧 Middlewares globaux
app.use(express.json())
app.use(logger)

// 📦 Routes API
app.use('/api/members', membersRoutes)

// 🧪 Route de test
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' })
})

// 🚀 Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`)
})