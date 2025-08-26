// deploy.js
import { execSync } from 'child_process'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('📦 Déployer sur [firebase] ou [ghpages] ? ', (answer) => {
  if (answer === 'firebase') {
    console.log('🛠️ Construction du projet...')
    execSync('npm run build', { stdio: 'inherit' })

    console.log('🚀 Déploiement sur Firebase Hosting...')
    execSync('firebase deploy --only hosting', { stdio: 'inherit' })
  } else if (answer === 'ghpages') {
    console.log('🛠️ Construction du projet...')
    execSync('npm run build', { stdio: 'inherit' })

    console.log('📦 Publication sur GitHub Pages...')
    execSync('git add dist -f', { stdio: 'inherit' })
    execSync('git commit -m "Déploiement vers GitHub Pages"', { stdio: 'inherit' })
    execSync('git subtree push --prefix dist origin gh-pages', { stdio: 'inherit' })
  } else {
    console.log('❌ Option invalide. Choisis "firebase" ou "ghpages".')
  }

  rl.close()
})