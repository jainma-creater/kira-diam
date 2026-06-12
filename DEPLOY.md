# Kira Diam - Deploy to Azure Static Web Apps

## 🚀 Quick Start - Deploy in 3 Steps

### Step 1: Push to GitHub
```powershell
# Navigate to project directory
cd c:\Users\Mayank Jain\Desktop\Kira\kira-diam

# Add all files
git add .

# Commit
git commit -m "Initial commit: Kira Diam luxury jewelry website"

# Create a new repository on GitHub at: https://github.com/jainma-creater/kira-diam
# Then push to GitHub:
git branch -M main
git remote add origin https://github.com/jainma-creater/kira-diam.git
git push -u origin main
```

### Step 2: Create Azure Static Web App (via Azure CLI)
```powershell
# Login to Azure
az login

# Create resource group
az group create `
  --name kira-diam-rg `
  --location southindia

# Create Static Web App
az staticwebapp create `
  --name kira-diam `
  --resource-group kira-diam-rg `
  --location southindia `
  --source https://github.com/jainma-creater/kira-diam `
  --branch main `
  --token $env:GITHUB_TOKEN
```

### Step 3: Wait for Deployment
- GitHub Actions will automatically build & deploy
- Live site URL: `https://kira-diam.azurestaticapps.net` (or custom domain)
- Monitor at: [Azure Portal](https://portal.azure.com) → Static Web Apps → kira-diam

---

## 📋 Prerequisites

1. ✅ GitHub account: **jainma-creater**
2. ✅ Azure subscription (free tier available)
3. ⏳ GitHub Personal Access Token (needed for `GITHUB_TOKEN`)

### Generate GitHub Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Scopes needed: `repo`, `admin:repo_hook`, `workflow`
4. Copy token and save securely

### Set environment variable:
```powershell
$env:GITHUB_TOKEN = "your_github_token_here"
```

---

## 📦 What Gets Deployed

✅ Full Next.js website with:
- Responsive luxury jewelry design
- Interactive 3D viewer (Three.js WebGL)
- Appointment booking form
- Navbar, hero, collections, footer sections
- Mobile-optimized across all devices

---

## 💰 Cost

**FREE TIER Benefits:**
- 1 static web app
- 1GB bandwidth per month
- Free SSL certificate
- Free custom domain support
- GitHub Actions CI/CD included

---

## 🎯 What Happens Next

1. **After Push to GitHub**: GitHub Actions runs automatically
2. **Build Phase**: `npm install` → `npm run build`
3. **Deploy Phase**: Uploads to Azure Static Web Apps
4. **Live**: Your site goes live at the provided URL

---

## ❓ Troubleshooting

### Build Fails
- Check GitHub Actions logs at: https://github.com/jainma-creater/kira-diam/actions
- Verify `npm run build` works locally first

### Can't Connect to GitHub
- Verify GitHub token has `repo` scope
- Check token isn't expired
- Token needs `admin:repo_hook` for webhooks

### Azure CLI Not Found
```powershell
# Install Azure CLI
winget install Microsoft.AzureCLI
```

---

## 🔗 Next Steps After Deployment

1. **Add Custom Domain** (optional)
   - Go to Azure Portal → kira-diam Static Web App → Custom domains
   - Point your domain (kiradiam.com) to the app

2. **Add Booking Backend** (future)
   - Currently: form only logs to console
   - Can integrate: Azure Functions, Supabase, Firebase, etc.

3. **Enable Analytics** (optional)
   - Add Application Insights for traffic/performance monitoring

---

## 📞 Support

If deployment fails:
1. Check GitHub Actions logs
2. Verify Azure CLI is authenticated (`az account show`)
3. Ensure GitHub token is valid
4. Check Node.js version (`node --version` should be 18+)

Happy deploying! 🎉
