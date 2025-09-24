// archive-unused.cjs
const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const archiveFolder = path.join(projectRoot, '__archive__')
const extensions = ['.vue', '.js', '.ts']

// Créer le dossier __archive__ s’il n’existe pas
if (!fs.existsSync(archiveFolder)) {
  fs.mkdirSync(archiveFolder)
}

// 🔍 Fonction pour récupérer tous les fichiers ciblés
function getAllFiles(dir, extList) {
  let results = []
  const list = fs.readdirSync(dir)
  for (const file of list) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('__archive__')) {
      results = results.concat(getAllFiles(fullPath, extList))
    } else if (extList.includes(path.extname(fullPath))) {
      results.push(fullPath)
    }
  }
  return results
}

// 🔍 Vérifie si un fichier est référencé ailleurs
function isFileUsed(filePath, allFiles) {
  const baseName = path.basename(filePath, path.extname(filePath))
  return allFiles.some(otherFile => {
    if (otherFile === filePath) return false
    try {
      const content = fs.readFileSync(otherFile, 'utf8')
      return content.includes(baseName)
    } catch (err) {
      return false
    }
  })
}

// 🧠 Étape 1 : collecter les fichiers à archiver
const allFiles = getAllFiles(projectRoot, extensions)
const filesToArchive = []

for (const file of allFiles) {
  if (!isFileUsed(file, allFiles)) {
    filesToArchive.push(file)
  }
}

// 📦 Étape 2 : déplacer les fichiers
for (const file of filesToArchive) {
  const relativePath = path.relative(projectRoot, file)
  const targetPath = path.join(archiveFolder, relativePath)
  const targetDir = path.dirname(targetPath)
  fs.mkdirSync(targetDir, { recursive: true })
  fs.renameSync(file, targetPath)
  console.log(`📦 Archivé : ${relativePath}`)
}