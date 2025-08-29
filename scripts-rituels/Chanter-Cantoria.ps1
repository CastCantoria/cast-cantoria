# Chanter-Cantoria.ps1
# Rituel de déploiement pour cast-84d3f

function Ajouter-AuJournal($message) {
    $journalPath = "$PSScriptRoot\journal-rituel.txt"
    Add-Content -Path $journalPath -Value $message
    Write-Host "Journal mis à jour : $message" -ForegroundColor DarkGray
}

function Chanter-Cantoria {
    Clear-Host
    Write-Host "Bienvenue dans le rituel de déploiement cast-84d3f" -ForegroundColor Cyan
    Write-Host '"Ny feo madio no mitondra hafatra masina."' -ForegroundColor Yellow
    Write-Host ""

    # Vérification de Vercel
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Host "Vercel n'est pas installé. Installation en cours..." -ForegroundColor Red
        npm install -g vercel
    }

    # Menu interactif
    Write-Host "Choisis ton chant :"
    Write-Host "1. Déployer en développement (vercel dev)"
    Write-Host "2. Déployer en production (vercel --prod)"
    Write-Host "3. Lier le projet (vercel link)"
    Write-Host "4. Quitter"
    $choix = Read-Host "Entrez le numéro de votre choix"

    switch ($choix) {
        "1" {
            Write-Host "Répétition sacrée en cours..." -ForegroundColor Green
            vercel dev
        }
        "2" {
            Write-Host "Déploiement en production..." -ForegroundColor Green
            Write-Host '"Ny asa vita tsara no mitondra voninahitra."' -ForegroundColor Magenta
            vercel --prod
            Ajouter-AuJournal "Déploiement en production effectué le $(Get-Date)"
        }
        "3" {
            Write-Host "Union sacrée avec le projet Vercel..." -ForegroundColor Green
            vercel link
        }
        "4" {
            Write-Host "Fin du rituel. Que ton code chante encore longtemps." -ForegroundColor Cyan
        }
        default {
            Write-Host '"Choix non reconnu. Le silence est aussi une forme de musique."' -ForegroundColor Red
        }
    }
}

# Lancement du rituel
Chanter-Cantoria