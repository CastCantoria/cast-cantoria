# === add-images-to-paragraphs.ps1 ===
$viewsRoot = "src/views"
$imagesRoot = "public/assets/images"

# 1️⃣ Récupérer toutes les images disponibles
$images = Get-ChildItem $imagesRoot -File |
    Where-Object { $_.Extension -match 'jpg|jpeg|png|gif|webp' } |
    Sort-Object Name |
    Select-Object -ExpandProperty Name

if ($images.Count -eq 0) {
    Write-Host "⚠️ Aucune image trouvée dans $imagesRoot"
    exit
}

Write-Host "📷 $($images.Count) images trouvées."

# 2️⃣ Parcourir toutes les vues
Get-ChildItem $viewsRoot -Filter *.vue | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    # Ajouter l'import si absent
    if ($content -notmatch 'import TextWithImage') {
        $content = $content -replace '(<script setup>)', '$1`nimport TextWithImage from "../components/TextWithImage.vue"'
    }

    $imgIndex = 0

    # Remplacer chaque <p>...</p> par un <TextWithImage>
    $pattern = '<p([^>]*)>(.*?)</p>'
    $content = [regex]::Replace($content, $pattern, {
        param($match)
        $text = $match.Groups[2].Value.Trim()
        $imgName = $images[$imgIndex % $images.Count]
        $imgIndex++
        return "<TextWithImage text=`"$text`" image=`"$imgName`" alt=`"$text`" position=`"left`" />"
    })

    Set-Content -Path $filePath -Value $content -Encoding utf8
    Write-Host "🔄 Modifié: $filePath"
}

Write-Host "`n✨ Injection terminée : chaque paragraphe a maintenant une image associée."