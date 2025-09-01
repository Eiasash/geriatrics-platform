# 🔧 Setup GitHub Secrets for CI/CD

## Quick Setup Steps

### 1. Get Your Netlify Tokens

#### Option A: Use the Helper Tool
Open `get-netlify-tokens.html` in your browser and follow the interactive guide.

#### Option B: Manual Steps

**Get Auth Token:**
1. Go to: https://app.netlify.com/user/applications/personal
2. Click "New access token"
3. Name it: "GitHub Actions"
4. Copy the token

**Get Site ID:**
Your Site ID is: `4a77cfbc-afce-42eb-8789-e24cafd5a20a`

### 2. Add Secrets to GitHub

1. Go to: https://github.com/Eiasash/geriatrics-platform/settings/secrets/actions
2. Click "New repository secret" for each:

| Secret Name | Value |
|------------|-------|
| NETLIFY_AUTH_TOKEN | Your personal access token from step 1 |
| NETLIFY_SITE_ID | 4a77cfbc-afce-42eb-8789-e24cafd5a20a |
| SNYK_TOKEN | (Optional) Get from https://app.snyk.io/account |

### 3. Verify Workflows

Check your workflows are running:
https://github.com/Eiasash/geriatrics-platform/actions

## Current Workflow Status

Your repository has 4 workflows configured:

1. **Test and Deploy** - Runs tests and deploys to Netlify
2. **Security Audit** - Scans for vulnerabilities
3. **Lighthouse Performance** - Monitors site performance
4. **Dependabot** - Updates dependencies automatically

## Troubleshooting

### If workflows are failing:

1. **Missing Netlify secrets**: Add NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID
2. **Build errors**: The site is static HTML, no build needed
3. **Test failures**: Tests are set to pass with no tests (--passWithNoTests)

### Check workflow runs:
```bash
# View recent workflow runs (if gh CLI is installed)
gh run list --limit 5

# Or visit:
# https://github.com/Eiasash/geriatrics-platform/actions
```

## Deploy Manually (Alternative)

If you prefer to deploy manually instead of using CI/CD:

```bash
# Deploy directly to Netlify
npx netlify deploy --prod --dir=. --site=4a77cfbc-afce-42eb-8789-e24cafd5a20a

# Or use the Netlify CLI
netlify deploy --prod
```

## Your Current Setup

- **Repository**: https://github.com/Eiasash/geriatrics-platform
- **Live Site**: https://geriatrics-study.netlify.app/
- **Netlify Admin**: https://app.netlify.com/sites/geriatrics-study
- **Branch**: fellowship-ready
- **Deploy Method**: Static HTML (no build process)

## Next Steps

1. ✅ Add the GitHub secrets above
2. ✅ Push any changes to trigger workflows
3. ✅ Monitor the Actions tab for results
4. ✅ Your site will auto-deploy on successful push

## Quick Commands

```bash
# Check current branch
git branch

# Push changes to trigger deployment
git add .
git commit -m "Update platform"
git push origin fellowship-ready

# Check deployment status
netlify status

# Open site
netlify open:site
```