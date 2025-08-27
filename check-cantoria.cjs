const fs = require('fs');
const path = require('path');

console.log("🎼 Vérification du projet Cast-Cantoria...");

// 📁 Dossiers essentiels
const requiredFolders = [
  'src/components/admin',
  'src/pages',
  'public/assets/audio',
  'server',
  'server/config',
  'server/controllers',
  'server/middleware',
  'server/models',
  'server/routes'
];

// 📄 Fichiers essentiels
const requiredFiles = [
  'package.json',
  'firebase.json',
  'vite.config.js',
  'server/app.js',
  'server/.env'
];

// 🎧 Vérification des fichiers audio
const audioFolder = 'public/assets/audio';
const audioFiles = fs.existsSync(audioFolder)
  ? fs.readdirSync(audioFolder).filter(file => file.endsWith('.mp3'))
  : [];

const expectedRoutes = ['adminRoutes.js', 'editorRoutes.js'];
const expectedControllers = ['authController.js', 'userController.js'];

// 🔍 Vérification des dossiers
requiredFolders.forEach(folder => {
  if (fs.existsSync(folder)) {
    console.log(`✅ Dossier présent : ${folder}`);
  } else {
    console.warn(`❌ Dossier manquant : ${folder}`);
  }
});

// 🔍 Vérification des fichiers
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Fichier présent : ${file}`);
  } else {
    console.warn(`❌ Fichier manquant : ${file}`);
  }
});

// 🔍 Vérification des fichiers audio
if (audioFiles.length > 0) {
  console.log(`✅ ${audioFiles.length} fichier(s) audio .mp3 trouvé(s) dans ${audioFolder}`);
} else {
  console.warn(`❌ Aucun fichier audio .mp3 trouvé dans ${audioFolder}`);
}

// 🔍 Vérification des routes
expectedRoutes.forEach(route => {
  const routePath = path.join('server/routes', route);
  if (fs.existsSync(routePath)) {
    console.log(`✅ Route "${route}" détectée`);
  } else {
    console.warn(`❌ Route "${route}" manquante`);
  }
});

// 🔍 Vérification des contrôleurs
expectedControllers.forEach(controller => {
  const controllerPath = path.join('server/controllers', controller);
  if (fs.existsSync(controllerPath)) {
    console.log(`✅ Contrôleur "${controller}" détecté`);
  } else {
    console.warn(`❌ Contrôleur "${controller}" manquant`);
  }
});

console.log("🎶 Vérification terminée. 'Ny feo mitambatra no mahery.'");