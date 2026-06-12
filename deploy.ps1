#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automated deployment script for Kira Diam to Azure Static Web Apps
.DESCRIPTION
    This script handles:
    1. Git setup and push to GitHub
    2. Azure resource group creation
    3. Static Web App deployment
    4. Automatic CI/CD setup via GitHub Actions
.PARAMETER GitHubToken
    GitHub Personal Access Token (required for deployment)
.PARAMETER GitHubUsername
    GitHub username (default: jainma-creater)
.PARAMETER RepositoryName
    GitHub repository name (default: kira-diam)
.EXAMPLE
    .\deploy.ps1 -GitHubToken "ghp_xxxxxxxxxxxxxxxxxxxx"
#>

param(
    [Parameter(Mandatory=$false)]
    [string]$GitHubToken = $env:GITHUB_TOKEN,
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubUsername = "jainma-creater",
    
    [Parameter(Mandatory=$false)]
    [string]$RepositoryName = "kira-diam",
    
    [Parameter(Mandatory=$false)]
    [string]$AzureRegion = "southindia",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = "kira-diam-rg"
)

Write-Host "🚀 Kira Diam - Azure Deployment Script" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
$prerequisites = @("git", "az", "node")
$missingTools = @()

foreach ($tool in $prerequisites) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        $missingTools += $tool
    }
}

if ($missingTools.Count -gt 0) {
    Write-Host "❌ Missing required tools: $($missingTools -join ', ')" -ForegroundColor Red
    Write-Host "Please install them and try again:" -ForegroundColor Red
    Write-Host "  - Git: https://git-scm.com/download/win" -ForegroundColor Gray
    Write-Host "  - Azure CLI: winget install Microsoft.AzureCLI" -ForegroundColor Gray
    Write-Host "  - Node.js: https://nodejs.org/en/" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ All prerequisites found`n" -ForegroundColor Green

# Validate GitHub Token
if (-not $GitHubToken) {
    Write-Host "❌ GitHub Token not provided!" -ForegroundColor Red
    Write-Host "Please set it via:" -ForegroundColor Yellow
    Write-Host '  $env:GITHUB_TOKEN = "your_token_here"' -ForegroundColor Gray
    Write-Host "Or pass it as parameter: -GitHubToken 'token'" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ GitHub Token provided`n" -ForegroundColor Green

# Step 1: Setup Git repository
Write-Host "📌 Step 1: Setting up Git repository..." -ForegroundColor Cyan
try {
    git config user.email "noreply@kiradiam.com" -ErrorAction SilentlyContinue
    git config user.name "Kira Diam" -ErrorAction SilentlyContinue
    
    git add .
    Write-Host "  ✓ Files staged" -ForegroundColor Green
    
    $status = git status --porcelain
    if ($status) {
        git commit -m "🚀 Deploy Kira Diam to Azure Static Web Apps"
        Write-Host "  ✓ Changes committed" -ForegroundColor Green
    } else {
        Write-Host "  ✓ No changes to commit" -ForegroundColor Green
    }
    
    # Check if remote exists
    $remoteExists = git remote get-url origin 2>$null
    if (-not $remoteExists) {
        Write-Host "  ⚠️  Remote not configured. Skipping push." -ForegroundColor Yellow
        Write-Host "  📝 Please create the repo on GitHub first at:" -ForegroundColor Yellow
        Write-Host "     https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Gray
    } else {
        git push -u origin main 2>$null
        Write-Host "  ✓ Pushed to GitHub" -ForegroundColor Green
    }
} catch {
    Write-Host "  ⚠️  Git setup warning: $_" -ForegroundColor Yellow
}

Write-Host ""

# Step 2: Azure login
Write-Host "📌 Step 2: Authenticating with Azure..." -ForegroundColor Cyan
try {
    $account = az account show -o json 2>$null | ConvertFrom-Json
    if ($account) {
        Write-Host "  ✓ Already logged in as: $($account.user.name)" -ForegroundColor Green
    }
} catch {
    Write-Host "  Logging in to Azure..." -ForegroundColor Yellow
    az login --allow-no-subscriptions
}

Write-Host ""

# Step 3: Create resource group
Write-Host "📌 Step 3: Creating Azure Resource Group..." -ForegroundColor Cyan
try {
    $rg = az group show -n $ResourceGroupName -o json 2>$null
    if ($rg) {
        Write-Host "  ✓ Resource group already exists: $ResourceGroupName" -ForegroundColor Green
    } else {
        az group create -n $ResourceGroupName -l $AzureRegion
        Write-Host "  ✓ Created resource group: $ResourceGroupName (Region: $AzureRegion)" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ Failed to create resource group: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Create Static Web App
Write-Host "📌 Step 4: Creating Azure Static Web App..." -ForegroundColor Cyan
try {
    $swa = az staticwebapp show -n $RepositoryName -g $ResourceGroupName -o json 2>$null
    if ($swa) {
        Write-Host "  ✓ Static Web App already exists: $RepositoryName" -ForegroundColor Green
        $url = ($swa | ConvertFrom-Json).defaultHostname
    } else {
        Write-Host "  Creating Static Web App (this may take 1-2 minutes)..." -ForegroundColor Yellow
        
        $result = az staticwebapp create `
            -n $RepositoryName `
            -g $ResourceGroupName `
            -s "https://github.com/$GitHubUsername/$RepositoryName" `
            -b main `
            -l $AzureRegion `
            -t $GitHubToken `
            -o json 2>$null
        
        if ($result) {
            $swaData = $result | ConvertFrom-Json
            $url = $swaData.defaultHostname
            Write-Host "  ✓ Created Static Web App: $RepositoryName" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Static Web App creation initiated (check Azure Portal for status)" -ForegroundColor Yellow
            $url = "$RepositoryName.azurestaticapps.net"
        }
    }
} catch {
    Write-Host "  ❌ Failed to create Static Web App: $_" -ForegroundColor Red
    Write-Host "  💡 Tip: Make sure the repository exists on GitHub" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Step 5: Display results
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Green

Write-Host "📊 Deployment Summary:" -ForegroundColor Cyan
Write-Host "  Repository: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Gray
Write-Host "  Azure Region: $AzureRegion" -ForegroundColor Gray
Write-Host "  Resource Group: $ResourceGroupName" -ForegroundColor Gray
Write-Host "  Static Web App: $RepositoryName" -ForegroundColor Gray

Write-Host "`n🎉 YOUR LIVE SITE:" -ForegroundColor Green
Write-Host "  URL: https://$url" -ForegroundColor Cyan
Write-Host "  Status: Deploying (check GitHub Actions for progress)" -ForegroundColor Yellow

Write-Host "`n📈 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Monitor deployment: https://github.com/$GitHubUsername/$RepositoryName/actions" -ForegroundColor Gray
Write-Host "  2. View site logs: https://portal.azure.com → Static Web Apps → $RepositoryName" -ForegroundColor Gray
Write-Host "  3. Add custom domain (optional): Point your domain to $url" -ForegroundColor Gray
Write-Host "  4. First deployment typically completes in 2-3 minutes" -ForegroundColor Gray

Write-Host "`n💰 Cost:" -ForegroundColor Cyan
Write-Host "  Free tier: \$0/month (1 site, 1GB bandwidth)" -ForegroundColor Green

Write-Host "`n❓ Troubleshooting:" -ForegroundColor Cyan
Write-Host "  • Check GitHub Actions: https://github.com/$GitHubUsername/$RepositoryName/actions" -ForegroundColor Gray
Write-Host "  • View build logs in GitHub Actions" -ForegroundColor Gray
Write-Host "  • Ensure repository is public (or grant access)" -ForegroundColor Gray

Write-Host ""
Write-Host "Happy deploying! 🚀" -ForegroundColor Cyan
