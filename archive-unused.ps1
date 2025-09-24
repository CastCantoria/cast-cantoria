# archive-unused.ps1
$projectRoot = "D:\cast-cantoria"
$archiveFolder = "$projectRoot\__archive__"
$extensions = @("*.vue", "*.js", "*.ts")

# Créer le dossier d’archive s’il n’existe pas
if (!(Test-Path $archiveFolder)) {
    New-Item -ItemType Directory -Path $archiveFolder | Out-Null
}

# Récupérer tous les fichiers ciblés
$files = Get-ChildItem -Path $projectRoot -Recurse -Include $extensions | Where-Object {
    $_.FullName -notmatch "\\node_modules\\"
}

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($projectRoot.Length + 1)

    # Vérifier si le fichier est référencé dans le projet
    $isUsed = Get-ChildItem -Path $projectRoot -Recurse -Include *.vue, *.js, *.ts |
        Select-String -Pattern [regex]::Escape($file.BaseName) |
        Where-Object { $_.Path -ne $file.FullName }

    if (-not $isUsed) {
        Write-Host "📦 Archiving unused file: $relativePath"
        $targetPath = Join-Path $archiveFolder $relativePath

        # Créer les sous-dossiers si nécessaire
        $targetDir = Split-Path $targetPath
        if (!(Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }

        Move-Item -Path $file.FullName -Destination $targetPath
    }
}