# === update-header-footer.ps1 ===
$componentsRoot = "src/components"
if (!(Test-Path $componentsRoot)) { New-Item -ItemType Directory -Path $componentsRoot | Out-Null }

function Write-Or-Replace($path, $content) {
  $dir = Split-Path $path
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $content | Out-File -FilePath $path -Encoding utf8
  Write-Host "✅ Mis à jour: $path"
}

# --- HEADER ---
$headerContent = @'
<template>
  <header class="bg-black text-gold p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">Sanctum Vox</h1>
    <nav class="flex gap-6">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/about" class="nav-link">À propos</router-link>
      <router-link to="/repertoire" class="nav-link">Répertoire</router-link>
      <router-link to="/concerts" class="nav-link">Concerts</router-link>
      <router-link to="/spiritualite" class="nav-link">Spiritualité</router-link>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.text-gold { color: #FFD700; }
.nav-link {
  color: #C0C0C0;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #FFD700;
}
.router-link-active {
  border-bottom: 2px solid #B22222;
  padding-bottom: 2px;
}
</style>
'@
Write-Or-Replace "$componentsRoot/Header.vue" $headerContent

# --- FOOTER ---
$footerContent = @'
<template>
  <footer class="bg-black text-silver p-6 text-center">
    <p>© 2003-2025 C.A.S.T. – Tous droits réservés</p>
    <p class="mt-2">
      <a href="https://facebook.com" target="_blank" class="link">Facebook</a> ·
      <a href="https://youtube.com" target="_blank" class="link">YouTube</a> ·
      <a href="mailto:contact@cast.org" class="link">Email</a>
    </p>
  </footer>
</template>

<script setup></script>

<style scoped>
.text-silver { color: #C0C0C0; }
.link {
  color: #FFD700;
  text-decoration: none;
}
.link:hover {
  color: #B22222;
}
</style>
'@
Write-Or-Replace "$componentsRoot/Footer.vue" $footerContent

Write-Host "`n✨ Header.vue et Footer.vue mis à jour avec succès."