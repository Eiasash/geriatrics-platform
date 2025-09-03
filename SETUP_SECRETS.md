# 🔐 GitHub Secrets Setup Guide

## Quick Setup Steps

### 1. 🔑 Get Your Netlify Tokens

#### Option A: Via Netlify CLI (Recommended)
```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Login to Netlify
netlify login

# Get your auth token
netlify status --json | grep -o '"authToken":"[^"]*' | grep -o '[^"]*$'

# Get your site ID
netlify sites:list
# Look for your site: geriatrics-study.netlify.app
# The ID will be in format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

#### Option B: Via Netlify Dashboard
1. Go to [Netlify User Settings](https://app.netlify.com/user/applications#personal-access-tokens)
2. Click "New access token"
3. Name it: "GitHub Actions CI/CD"
4. Copy the token (you won't see it again!)

For Site ID:
1. Go to your site dashboard: https://app.netlify.com/sites/geriatrics-study
2. Go to "Site settings" → "General" → "Site details"
3. Copy the "Site ID" (API ID)

### 2. 🔧 Add Secrets to GitHub

Go to your repository: https://github.com/Eiasash/geriatrics-platform/settings/secrets/actions

Click "New repository secret" for each:

#### Required Secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `NETLIFY_AUTH_TOKEN` | Your personal access token | From step 1 |
| `NETLIFY_SITE_ID` | Your site ID | Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

#### Optional Secrets:

| Secret Name | Value | How to Get |
|------------|-------|------------|
| `SNYK_TOKEN` | Your Snyk auth token | [Sign up free](https://snyk.io/signup) → Account Settings → Auth Token |
| `CODECOV_TOKEN` | Your Codecov token | [Sign up](https://codecov.io) → Add repo → Copy token |

### 3. 🤖 Enable Dependabot

1. Go to: https://github.com/Eiasash/geriatrics-platform/settings/security_analysis
2. Enable:
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Dependabot version updates

### 4. 📊 Enable GitHub Pages (Optional)

1. Go to: https://github.com/Eiasash/geriatrics-platform/settings/pages
2. Source: Deploy from a branch
3. Branch: `fellowship-ready` / `/ (root)`
4. Click Save

## 🚀 Verify Setup

After adding secrets, trigger a test run:

```bash
# Trigger a workflow manually
git commit --allow-empty -m "Test CI/CD pipeline"
git push origin fellowship-ready
```

Then check: https://github.com/Eiasash/geriatrics-platform/actions

## 📝 Environment Variables Reference

```yaml
# .github/workflows/test-and-deploy.yml uses:
NETLIFY_AUTH_TOKEN    # Required for deployment
NETLIFY_SITE_ID       # Required for deployment
GITHUB_TOKEN          # Automatically provided by GitHub

# .github/workflows/security.yml uses:
SNYK_TOKEN           # Optional, for Snyk scanning

# .github/workflows/lighthouse.yml uses:
LHCI_GITHUB_APP_TOKEN # Optional, for Lighthouse CI
```

## 🔍 Troubleshooting

### If deployment fails:
1. Check if tokens are correct
2. Verify site ID matches your Netlify site
3. Check Actions tab for error logs

### If security scan fails:
- npm audit issues are warnings only (won't fail build)
- Snyk scan will continue even without token
- CodeQL runs without configuration

### If Dependabot doesn't work:
1. Check if `.github/dependabot.yml` exists
2. Verify it's enabled in Security settings
3. Wait for weekly schedule (Mondays at 3 AM)

## 📚 Additional Resources

- [Netlify CLI Docs](https://docs.netlify.com/cli/get-started/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot)
- [Snyk Integration](https://docs.snyk.io/integrations/ci-cd-integrations/github-actions-integration)

---

✨ **Pro Tip**: Save your tokens securely in a password manager. You'll need them if you recreate the repository.