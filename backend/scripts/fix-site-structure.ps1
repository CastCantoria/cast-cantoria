# === fix-site-structure.ps1 ===
$viewsRoot = "src/views"
$indexHtml = "index.html"
$mainCss = "src/assets/main.css"

# 1️⃣ Corriger toutes les vues
Get-ChildItem $viewsRoot -Filter *.vue | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    # Ajouter Header/Footer si absents
    if ($content -notmatch 'import Header') {
        $content = $content -replace '(<script setup>)', '$1`nimport Header from "../components/Header.vue"'
    }
    if ($content -notmatch 'import Footer') {
        $content = $content -replace '(<script setup>)', '$1`nimport Footer from "../components/Footer.vue"'
    }

    # Envelopper le contenu du template
    if ($content -match '(<template>)([\s\S]*?)(</template>)' -and $content -notmatch '<div class="page">') {
        $inner = $matches[2].Trim()
        $newInner = "  <div class=`"page`">`n$inner`n  </div>"
        $content = $content -replace '(<template>)([\s\S]*?)(</template>)', "`$1`n$newInner`n`$3"
    }

    # Ajouter style commun si absent
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
</style>
'@
        $content += "`n$styleBlock"
    }

    Set-Content -Path $filePath -Value $content -Encoding utf8
    Write-Host "🔄 Corrigé: $filePath"
}

# 2️⃣ Ajouter polices dans index.html
if (Test-Path $indexHtml) {
    $html = Get-Content $indexHtml -Raw
    if ($html -notmatch 'fonts.googleapis.com/css2\?family=Lato') {
        $fontLinks = @'
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
'@
        $html = $html -replace '(<head>)', "`$1`n$fontLinks"
        Set-Content -Path $indexHtml -Value $html -Encoding utf8
        Write-Host "🎨 Polices ajoutées dans index.html"
    }
}

# 3️⃣ Définir polices globales dans main.css
if (Test-Path $mainCss) {
    $css = Get-Content $mainCss -Raw
    if ($css -notmatch '--font-body') {
        $fontVars = @'
:root {
  --font-body: "Lato", sans-serif;
  --font-title: "Playfair Display", serif;
}

body {
  font-family: var(--font-body);
  background-color: #000;
  color: #C0C0C0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-title);
  color: #FFD700;
}
'@
        $css = $fontVars + "`n" + $css
        Set-Content -Path $mainCss -Value $css -Encoding utf8
        Write-Host "🖋 Styles globaux ajoutés dans main.css"
    }
}

Write-Host "`n✨ Structure corrigée, Header/Footer ajoutés, polices et styles appliqués."