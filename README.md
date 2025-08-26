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
