import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

import membersRoutes from './routes/members.js'
import logger from './middlewares/logger.js'

const app = express()
const PORT = process.env.PORT || 3000

// 🛡️ Sécurité HTTP
app.use(helmet())

// 🌐 CORS – autoriser le frontend Vite
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
)

// 🔧 Middlewares globaux
app.use(express.json()) // parser le JSON
app.use(logger)         // log personnalisé

// 📦 Routes API
app.use('/api/members', membersRoutes)

// 🧪 Route de test
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' })
})

// 🚀 Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API running on http://localhost:${PORT}`)
})