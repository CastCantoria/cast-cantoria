const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// UID passé en argument
const uid = process.argv[2];

if (!uid || typeof uid !== 'string') {
  console.error('\n❌ Aucun UID valide fourni.\n👉 Utilisation : npm run set-admin -- <UID>\n');
  process.exit(1);
}

// Initialisation Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Attribution du rôle "admin"
admin.auth().setCustomUserClaims(uid, { role: 'admin' })
  .then(() => {
    console.log(`✅ Rôle "admin" attribué à l'utilisateur : ${uid}`);
  })
  .catch((error) => {
    console.error('❌ Erreur lors de l’attribution du rôle :', error.message);
    process.exit(1);
  });