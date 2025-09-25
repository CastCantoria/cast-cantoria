# === fix-encoding.ps1 ===
$rootPaths = @("src", "public")

# Table de correspondance des caractères mal encodés
$map = @{
    "Ã " = "à"
    "Ã¢" = "â"
    "Ã¤" = "ä"
    "Ã©" = "é"
    "Ã¨" = "è"
    "Ãª" = "ê"
    "Ã«" = "ë"
    "Ã®" = "î"
    "Ã¯" = "ï"
    "Ã´" = "ô"
    "Ã¶" = "ö"
    "Ã¹" = "ù"
    "Ã»" = "û"
    "Ã¼" = "ü"
    "Ã§" = "ç"
    "â" = "’"
    "â" = "–"
    "â" = "—"
    "â¦" = "…"
    "Â"    = ""   # espace insécable corrompu
}

foreach ($root in $rootPaths) {
    Get-ChildItem $root -Recurse -Include *.vue,*.js,*.ts,*.html,*.md | ForEach-Object {
        $filePath = $_.FullName
        $content = Get-Content $filePath -Raw

        $modified = $false
        foreach ($bad in $map.Keys) {
            if ($content -match [regex]::Escape($bad)) {
                $content = $content -replace [regex]::Escape($bad), $map[$bad]
                $modified = $true
            }
        }

        if ($modified) {
            # Sauvegarde en UTF-8 avec BOM
            $utf8bom = New-Object System.Text.UTF8Encoding($true)
            [System.IO.File]::WriteAllText($filePath, $content, $utf8bom)
            Write-Host "✅ Corrigé : $filePath"
        }
    }
}

Write-Host "`n✨ Correction terminée : tous les caractères spéciaux mal encodés ont été remplacés."