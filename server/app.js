// server/app.js
import dotenv from 'dotenv';
import express from 'express';
import authController from './controllers/authController.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/login', authController.login);
app.use('/', adminRoutes);

app.listen(3000, () => console.log("Serveur lancé sur le port 3000"));