param location string = 'southindia'
param resourceGroupName string = 'kira-diam-rg'
param staticSiteName string = 'kira-diam'
param repositoryUrl string
param branch string = 'main'
param githubToken string

resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
}

resource staticWebApp 'Microsoft.Web/staticSites@2021-03-01' = {
  name: staticSiteName
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    buildProperties: {
      appLocation: '/'
      outputLocation: '.next/standalone'
      appBuildCommand: 'npm run build'
    }
  }
}

output staticSiteUrl string = staticWebApp.properties.defaultHostname
output staticSiteId string = staticWebApp.id
