import express from 'express'
import membersRouter from './lib/routes/members.js'
import eventsRouter from './lib/routes/events.js'

const app = express()
app.use(express.json())

app.use('/api/members', membersRouter)
app.use('/api/events', eventsRouter)

// ✅ Ajout pour le mode local uniquement
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`[Server] Écoute sur http://localhost:${PORT}`)
  })
}

export default app