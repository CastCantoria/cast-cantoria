# === add-text-with-image.ps1 ===
$componentsRoot = "src/components"
$viewsRoot = "src/views"

function Write-Or-Replace($path, $content) {
    $dir = Split-Path $path
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    $content | Out-File -FilePath $path -Encoding utf8
    Write-Host "✅ Écrit: $path"
}

# 1️⃣ Créer le composant TextWithImage.vue
$textWithImage = @'
<template>
  <div class="text-image" :class="position">
    <img :src="imageSrc" :alt="alt" class="image" />
    <p class="text" v-html="text"></p>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  text: { type: String, required: true },
  image: { type: String, required: true }, // nom du fichier dans /public/assets/images
  alt: { type: String, default: '' },
  position: { type: String, default: 'left' } // 'left' ou 'right'
})

const imageSrc = computed(() => `/assets/images/${props.image}`)
</script>

<style scoped>
.text-image {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}
.text-image.right {
  flex-direction: row-reverse;
}
.image {
  width: 200px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}
.text {
  flex: 1;
  color: #C0C0C0;
  line-height: 1.6;
}
</style>
'@
Write-Or-Replace "$componentsRoot/TextWithImage.vue" $textWithImage

# 2️⃣ Modifier les vues
Get-ChildItem $viewsRoot -Filter *.vue | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    if ($content -notmatch "TextWithImage") {
        # Ajouter l'import
        $content = $content -replace '(<script setup>)', "`$1`nimport TextWithImage from '../components/TextWithImage.vue'"

        # Remplacer uniquement le premier <p> trouvé
        $pattern = '<p([^>]*)>(.*?)</p>'
        $replacement = '<TextWithImage text="$2" image="exemple.jpg" alt="Illustration" position="left" />'
        $content = [regex]::Replace($content, $pattern, $replacement, 1)

        Set-Content -Path $filePath -Value $content -Encoding utf8
        Write-Host "🔄 Modifié: $filePath"
    } else {
        Write-Host "⏭️  Déjà modifié: $filePath"
    }
}

Write-Host "`n✨ Composant créé et exemples injectés dans les vues."