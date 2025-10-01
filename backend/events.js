export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  // 🎭 Événements fictifs CAST
  const events = [
    {
      id: 'evt1',
      title: 'Concert de l’Avent',
      date: '2025-12-15',
      location: 'Cathédrale d’Antananarivo',
      description: 'Un moment spirituel et musical pour célébrer l’Avent avec le chœur CAST.'
    },
    {
      id: 'evt2',
      title: 'Atelier vocal ouvert',
      date: '2025-11-05',
      location: 'Centre Cantoria',
      description: 'Atelier gratuit pour découvrir les techniques vocales du chœur.'
    },
    {
      id: 'evt3',
      title: 'CAST en plein air',
      date: '2025-10-20',
      location: 'Jardin d’Ambohijatovo',
      description: 'Concert en plein air pour tous les amoureux de la musique chorale.'
    }
  ]

  res.status(200).json(events)
}