# === fix-image-paths.ps1 ===
$imagesRoot = "public/assets/images"
$searchPaths = @("src/views", "src/components")

# 1️⃣ Récupérer la liste exacte des fichiers images
$images = Get-ChildItem $imagesRoot -File |
    Where-Object { $_.Extension -match 'jpg|jpeg|png|gif|webp' } |
    Select-Object -ExpandProperty Name

if ($images.Count -eq 0) {
    Write-Host "⚠️ Aucune image trouvée dans $imagesRoot"
    exit
}

Write-Host "📷 Images trouvées :"
$images | ForEach-Object { Write-Host " - $_" }

# 2️⃣ Parcourir les fichiers Vue/JS/TS
foreach ($path in $searchPaths) {
    Get-ChildItem $path -Recurse -Include *.vue,*.js,*.ts | ForEach-Object {
        $filePath = $_.FullName
        $content = Get-Content $filePath -Raw
        $modified = $false

        foreach ($img in $images) {
            # Si le nom de fichier est présent mais pas déjà avec /assets/images/
            if ($content -match [regex]::Escape($img) -and $content -notmatch "/assets/images/$([regex]::Escape($img))") {
                $pattern = "([""'`])" + [regex]::Escape($img) + "([""'`])"
                $replacement = "`$1/assets/images/$img`$2"
                $content = [regex]::Replace($content, $pattern, $replacement)
                $modified = $true
            }
        }

        if ($modified) {
            Set-Content -Path $filePath -Value $content -Encoding utf8
            Write-Host "✅ Corrigé : $filePath"
        }
    }
}

Write-Host ""
Write-Host "✨ Chemins d'images corrigés avec les noms exacts."