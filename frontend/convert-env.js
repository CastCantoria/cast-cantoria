// convert-env.js
import fs from "fs";

// Lis ton fichier serviceAccountKey.json
const serviceAccount = JSON.parse(
  fs.readFileSync("./api/serviceAccountKey.json", "utf8")
);

// Transforme la clé privée : remplace les retours à la ligne par \n
const privateKey = serviceAccount.private_key.replace(/\n/g, "\\n");

// Construit les variables d'environnement
const env = `
FIREBASE_PROJECT_ID=${serviceAccount.project_id}
FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}
FIREBASE_PRIVATE_KEY=${privateKey}
`;

console.log(env);
