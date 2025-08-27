📝 README.md — Cast Cantoria (React/Vite)
# 🎶 Cast Cantoria

Plateforme web moderne construite avec **React + Vite**, conçue pour une expérience fluide côté client, une architecture modulaire, et une intégration sécurisée via **Firebase/Auth**.

---

## 🚀 Fonctionnalités

- ⚛️ Architecture SPA avec React Router
- 🧩 Composants modulaires et réutilisables
- 🔐 Authentification Firebase (membres/admin)
- 📄 Formulaires dynamiques avec validation robuste
- 🎨 Animations fluides via Framer Motion
- 📦 Déploiement optimisé sur Vercel
- 🛠️ Configuration GitHub + CI/CD

---

## 📁 Structure du projet
📁 src/
├── [components](https://github.com/ton-utilisateur/ton-repo/tree/main/src/components)       → Composants UI réutilisables
├── [pages](https://github.com/ton-utilisateur/ton-repo/tree/main/src/pages)                → Pages principales (Galerie, Présentation, etc.)
├── [layouts](https://github.com/ton-utilisateur/ton-repo/tree/main/src/layouts)            → Layouts communs (Header, Footer)
├── [auth](https://github.com/ton-utilisateur/ton-repo/tree/main/src/auth)                  → Logique Firebase/Auth
├── [forms](https://github.com/ton-utilisateur/ton-repo/tree/main/src/forms)                → Formulaires avec validation
├── [assets](https://github.com/ton-utilisateur/ton-repo/tree/main/src/assets)              → Images, icônes, fichiers statiques
├── [utils](https://github.com/ton-utilisateur/ton-repo/tree/main/src/utils)                → Fonctions utilitaires
└── [App.jsx](https://github.com/ton-utilisateur/ton-repo/blob/main/src/App.jsx)            → Routing principal (React Router)

---

## 🔧 Installation locale

```bash
git clone https://github.com/ton-repo/cast-cantoria.git
cd cast-cantoria
npm install
npm run dev



🌐 Déploiement sur Vercel
Ajoute un fichier vercel.json à la racine :
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}


Cela permet à React Router de gérer les routes côté client sans erreur 404.

🔐 Authentification Firebase
Configure ton projet Firebase et ajoute les clés dans .env.local :
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...



📋 À venir
- 🛡️ Routes protégées (admin/membre)
- 📣 Système de notifications
- 🧑‍💻 Interface d’administration
- 📊 Tableau de bord dynamique

🤝 Contribuer
- Fork le repo
- Crée une branche (git checkout -b feature/ma-feature)
- Commit tes changements (git commit -am 'Ajout de ma feature')
- Push (git push origin feature/ma-feature)
- Ouvre une Pull Request

📄 Licence
MIT © Tovoniaina
=======
# 🎼 Cast-Cantoria

**Ny feo mitambatra no mahery** — La voix unie est puissante.  
Bienvenue dans le projet **Cast-Cantoria**, une plateforme collaborative dédiée à la gestion et à la diffusion du chant sacré.

---

## 📦 Structure du projet

Le projet est organisé pour faciliter la contribution, la vérification et la livraison :
📁 Structure du projet Cast-Cantoria
cast-cantoria/
├── src/
│   ├── components/
│   │   └── admin/              # Composants spécifiques à l'administration
│   └── pages/                  # Pages principales de l'application
│
├── public/
│   └── assets/
│       └── audio/              # Fichiers audio (.mp3) utilisés dans le projet 🎵
│
├── server/
│   ├── config/                 # Configuration du serveur (ex: Firebase, DB)
│   ├── controllers/            # Logique métier (authController, userController…)
│   ├── middleware/             # Fonctions intermédiaires (authentification, rôles…)
│   ├── models/                 # Schémas de données (utilisateurs, rôles…)
│   ├── routes/                 # Routes API (adminRoutes, editorRoutes…)
│   ├── app.js                  # Point d’entrée du serveur
│   └── .env                    # Variables d’environnement
│
├── package.json                # Dépendances et scripts du projet
├── firebase.json               # Configuration Firebase
├── vite.config.js              # Configuration du bundler Vite
└── check-cantoria.cjs          # Script de vérification avant livraison ✅


✅ Tous les dossiers critiques sont vérifiés par `check-cantoria.cjs` avant chaque livraison.  
✅ Les fichiers audio `.mp3` sont détectés automatiquement.  
✅ Les routes et contrôleurs sont validés pour garantir la cohérence du backend.

---

## 🚀 Lancement du projet

```bash
npm install
npm run dev

🔐 Authentification & Rôles
- Auth via Firebase
- Middleware pour les rôles (admin, éditeur)
- Routes sécurisées : adminRoutes.js, editorRoutes.js

📜 Scripts utiles
- check-cantoria.cjs : vérifie la structure et les fichiers clés
- setAdmin.cjs : attribue les rôles administratifs
- deploy.js : déploiement automatisé

🔐 Authentification & Rôles
- Authentification via Firebase
- Middleware pour les rôles (admin, éditeur)
- Routes sécurisées : adminRoutes.js, editorRoutes.js

📜 Scripts utiles
- check-cantoria.cjs : vérifie la structure et les fichiers clés
- setAdmin.cjs : attribue les rôles administratifs
- deploy.js : déploiement automatisé

🌍 Culture & Motivation
Chaque livraison est accompagnée d’un proverbe malgache pour renforcer l’esprit d’équipe.
Exemple : “Ny feo mitambatra no mahery” — La voix unie est puissante.

📲 Rituel de partage
Après chaque modification ou ajout :
- Mettre à jour le guide d’onboarding
- Partager les changements sur WhatsApp
- Célébrer les petites victoires 🎉

📘 Guide d’onboarding
Chaque nouveau membre est invité à :
- Lire le guide d’onboarding partagé sur WhatsApp
- Explorer la structure du projet via check-cantoria.cjs
- Poser ses questions dans le canal “Ajout d’un compte admin…”
Ce guide est mis à jour après chaque modification ou ajout de fonctionnalité.
Rappel rituel : “Ny fanazavana zaraina no mampitombo fahalalana.” — Le savoir partagé multiplie la connaissance.

📦 Livraison et Finalisation
Avant chaque livraison :
- Exécuter check-cantoria.cjs pour valider la structure
- Vérifier les fichiers audio et les routes critiques
- Mettre à jour le document de livraison avec :
- Les modules modifiés
- Les rôles impactés
- Les assets ajoutés
- Partager le résumé sur WhatsApp avec un proverbe motivant
- Célébrer les petites victoires 🎉
Exemple de proverbe :
“Ny asa vita miaraka no maharitra.” — Le travail accompli ensemble est durable.

🤝 Contributeurs
Ce projet est porté par une équipe rigoureuse et solidaire.
Chaque commit est une note dans notre partition collective.
Chaque livraison est une célébration de notre unité.