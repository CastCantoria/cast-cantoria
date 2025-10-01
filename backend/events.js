import express from 'express'
import eventsRouter from './lib/routes/events.js'
import membersRouter from './lib/routes/members.js'

const app = express()
app.use(express.json())

app.use('/api/events', eventsRouter)
app.use('/api/members', membersRouter)

export default app