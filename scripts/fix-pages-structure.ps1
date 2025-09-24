# === fix-pages-structure.ps1 ===
$viewsRoot = "src/views"

Get-ChildItem $viewsRoot -Filter *.vue | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    if ($content -notmatch '<div class="page">') {
        # Extraire le contenu du template
        if ($content -match '(<template>)([\s\S]*?)(</template>)') {
            $inner = $matches[2].Trim()

            # Envelopper dans <div class="page">
            $newInner = "  <div class=`"page`">`n$inner`n  </div>"

            # Remplacer dans le fichier
            $content = $content -replace '(<template>)([\s\S]*?)(</template>)', "`$1`n$newInner`n`$3"

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
            Write-Host "✅ Corrigé: $filePath"
        } else {
            Write-Host "⚠️ Pas de <template> trouvé dans: $filePath"
        }
    } else {
        Write-Host "⏭️ Déjà corrigé: $filePath"
    }
}

Write-Host "`n✨ Toutes les pages ont été enveloppées dans <div class='page'>."