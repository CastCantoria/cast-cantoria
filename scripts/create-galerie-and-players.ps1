# === create-galerie-and-players.ps1 ===
$viewsRoot = "src/views"
$componentsRoot = "src/components"

function Write-Or-Replace($path, $content) {
  $dir = Split-Path $path
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $content | Out-File -FilePath $path -Encoding utf8
  Write-Host "✅ Écrit: $path"
}

# --- MediaGallery.vue ---
$mediaGallery = @'
<template>
  <section class="gallery">
    <h2 class="title">Galerie multimédia</h2>
    <div class="grid">
      <figure v-for="(item, i) in items" :key="i" class="tile">
        <template v-if="item.type === 'image'">
          <img :src="item.src" :alt="item.caption" loading="lazy" />
        </template>
        <template v-else-if="item.type === 'audio'">
          <audio controls :src="item.src"></audio>
        </template>
        <template v-else-if="item.type === 'video'">
          <video controls :src="item.src" width="100%"></video>
        </template>
        <figcaption v-if="item.caption" class="caption">{{ item.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] }
})
</script>

<style scoped>
.gallery { background:#000; padding:2rem; }
.title { color:#FFD700; text-align:center; margin-bottom:1.5rem; font-size:1.8rem; }
.grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap:1rem; }
.tile { background:#111; border:1px solid #222; border-radius:6px; padding:0.5rem; text-align:center; }
img, video { max-width:100%; border-radius:4px; }
audio { width:100%; margin-top:0.5rem; }
.caption { color:#C0C0C0; margin-top:0.5rem; font-size:0.9rem; }
</style>
'@
Write-Or-Replace "$componentsRoot/MediaGallery.vue" $mediaGallery

# --- Galerie.vue ---
$galerieView = @'
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import MediaGallery from "../components/MediaGallery.vue"

const medias = [
  { type: "image", src: "/images/cast-chorale.jpg", caption: "Chorale C.A.S.T." },
  { type: "image", src: "/images/cathedrale-majestueuse.png", caption: "Cathédrale majestueuse" },
  { type: "audio", src: "/audio/hallelujah.mp3", caption: "Hallelujah - Händel" },
  { type: "video", src: "/video/concert-noel.mp4", caption: "Concert de Noël 2024" }
]
</script>

<template>
  <Header />
  <MediaGallery :items="medias" />
  <Footer />
</template>
'@
Write-Or-Replace "$viewsRoot/Galerie.vue" $galerieView

# --- Mise à jour du routeur ---
$routerPath = "src/router/index.js"
if (Test-Path $routerPath) {
  $routerContent = Get-Content $routerPath -Raw
  if ($routerContent -notmatch "Galerie") {
    $routerContent = $routerContent -replace "(const routes = \[)", "`$1`n  { path: '/galerie', name: 'Galerie', component: () => import('../views/Galerie.vue') },"
    $routerContent | Out-File $routerPath -Encoding utf8
    Write-Host "✅ Route /galerie ajoutée au routeur"
  } else {
    Write-Host "⏭️  Route Galerie déjà présente"
  }
} else {
  Write-Host "⚠️  Fichier routeur introuvable"
}
