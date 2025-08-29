// server/app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // 🔐 Charge les variables depuis .env

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🏠 Route d’accueil (évite "Cannot GET /")
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>C.A.S.T. Cantoria</title></head>
      <body style="font-family:serif; text-align:center; padding:2rem;">
        <h1>🕊️ Bienvenue</h1>
        <p>« Là où le code s’unit à la foi, naît une voix qui ne s’éteint jamais. »</p>
        <p><em>Le sanctuaire est vivant sur le port ${PORT}</em></p>
      </body>
    </html>
  `);
});

// 🩺 Route de vérification de santé
app.get('/healthz', (req, res) => {
  res.status(200).send('🕊️ Le sanctuaire est vivant.');
});

// 📬 Route pour le formulaire de contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs sont requis.',
    });
  }

  console.log('📨 Nouveau message reçu :');
  console.log(`👤 Nom : ${name}`);
  console.log(`📧 Email : ${email}`);
  console.log(`🗣️ Message : ${message}`);

  res.status(200).json({
    success: true,
    message: 'Message bien reçu. Merci pour votre contact !',
  });
});

// 🙏 Route pour soumettre une intention
let intentions = [];

app.post('/api/intentions', (req, res) => {
  const { name, intention } = req.body;

  if (!name || !intention) {
    return res.status(400).json({
      success: false,
      message: 'Nom et intention requis.',
    });
  }

  const entry = {
    name,
    intention,
    date: new Date().toISOString()
  };

  intentions.push(entry);
  console.log('🙏 Intention reçue :', entry);

  res.status(200).json({
    success: true,
    message: 'Intention enregistrée.',
    data: entry
  });
});

// 📖 Route pour afficher toutes les intentions
app.get('/api/intentions', (req, res) => {
  res.json(intentions);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});