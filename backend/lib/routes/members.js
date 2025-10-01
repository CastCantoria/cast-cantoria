import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  const members = [
    {
      id: 'm1',
      firstName: 'Tena',
      lastName: 'Solution',
      email: 'tena.solution@gmail.com',
      phone: '0342866677',
      role: 'Membre Sopra'
    },
    {
      id: 'm2',
      firstName: 'Andy',
      lastName: 'Andrianatozo',
      email: 'andy.andrianatozo@gmail.com',
      phone: '0340033445',
      role: 'Staff'
    },
    {
      id: 'm3',
      firstName: 'Toky',
      lastName: 'Razanamiandrisoa',
      email: 'razanamiandrisoa@gmail.com',
      phone: '0340033445',
      role: 'Staff'
    },
    {
      id: 'm4',
      firstName: 'Fitiavana',
      lastName: 'Rahendrisoa',
      email: 'fitiavana.rahendrisoa@gmail.com',
      phone: '0340033445',
      role: 'Membre AMF'
    }
  ]

  res.status(200).json(members)
})

export default router