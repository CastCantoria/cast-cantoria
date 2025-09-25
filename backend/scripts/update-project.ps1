# === update-project.ps1 ===
$viewsRoot = "src/views"
$componentsRoot = "src/components"

Write-Host "🔄 Mise à jour des vues..."

Get-ChildItem $viewsRoot -Filter *.vue | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    # 1️⃣ Ajouter <div class="page"> si absent
    if ($content -notmatch '<div class="page">') {
        if ($content -match '(<template>)([\s\S]*?)(</template>)') {
            $inner = $matches[2].Trim()
            $newInner = "  <div class=`"page`">`n$inner`n  </div>"
            $content = $content -replace '(<template>)([\s\S]*?)(</template>)', "`$1`n$newInner`n`$3"
        }
    }

    # 2️⃣ Ajouter style commun responsive si absent
    if ($content -notmatch '\.page\s*\{') {
        $styleBlock = @'
<style scoped>
.page {
  background-color: #000;
  color: #C0C0C0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 2rem;
}
img {
  max-width: 100%;
  height: auto;
}
@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
}
</style>
'@
        $content += "`n$styleBlock"
    }

    Set-Content -Path $filePath -Value $content -Encoding utf8
    Write-Host "✅ Vue mise à jour : $filePath"
}

Write-Host "🔄 Mise à jour du Header.vue..."

$headerPath = Join-Path $componentsRoot "Header.vue"
if (Test-Path $headerPath) {
    $headerContent = @'
<template>
  <header class="header">
    <div class="logo-container">
      <img src="/assets/images/logo-cantoria.png" alt="Logo Cantoria" class="logo-img" />
      <span class="logo-text">Sanctum Vox</span>
    </div>
    <button class="menu-toggle" @click="isOpen = !isOpen">☰</button>
    <nav class="nav" :class="{ open: isOpen }">
      <router-link to="/" class="nav-link" @click="isOpen = false">Accueil</router-link>
      <router-link to="/about" class="nav-link" @click="isOpen = false">À propos</router-link>
      <router-link to="/repertoire" class="nav-link" @click="isOpen = false">Répertoire</router-link>
      <router-link to="/concerts" class="nav-link" @click="isOpen = false">Concerts</router-link>
      <router-link to="/spiritualite" class="nav-link" @click="isOpen = false">Spiritualité</router-link>
      <router-link to="/galerie" class="nav-link" @click="isOpen = false">Galerie</router-link>
      <router-link to="/contact" class="nav-link" @click="isOpen = false">Contact</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue"
const isOpen = ref(false)
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, #000000, #111111);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #B22222;
  flex-wrap: wrap;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.logo-img {
  height: 40px;
  width: auto;
}
.logo-text {
  color: #FFD700;
  font-size: 1.5rem;
  font-weight: bold;
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #FFD700;
  font-size: 1.8rem;
  cursor: pointer;
}
.nav {
  display: flex;
  gap: 1.5rem;
}
.nav-link {
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
  position: relative;
}
.nav-link:hover {
  color: #FFD700;
}
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  .nav {
    display: none;
    flex-direction: column;
    width: 100%;
    background: #000;
    padding: 1rem 0;
  }
  .nav.open {
    display: flex;
  }
  .nav-link {
    padding: 0.5rem 1rem;
  }
}
</style>
'@
    Set-Content -Path $headerPath -Value $headerContent -Encoding utf8
    Write-Host "✅ Header mis à jour"
}

Write-Host "`n✨ Mise à jour globale terminée."