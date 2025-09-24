# === fix-vue-root.ps1 ===
$viewsRoot = "src/views"

Get-ChildItem $viewsRoot -Filter *.vue | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    # Vérifie si déjà corrigé
    if ($content -match '<div class="page">') {
        Write-Host "⏭️ Déjà corrigé: $filePath"
        return
    }

    # Envelopper le contenu du template
    if ($content -match '(<template>)([\s\S]*?)(</template>)') {
        $inner = $matches[2].Trim()
        $newInner = "  <div class=`"page`">`n$inner`n  </div>"
        $content = $content -replace '(<template>)([\s\S]*?)(</template>)', "`$1`n$newInner`n`$3"
    } else {
        Write-Host "⚠️ Pas de <template> trouvé dans: $filePath"
        return
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

    # Sauvegarde
    Set-Content -Path $filePath -Value $content -Encoding utf8
    Write-Host "✅ Corrigé: $filePath"
}

Write-Host "`n✨ Toutes les pages ont maintenant un seul élément racine <div class='page'>."