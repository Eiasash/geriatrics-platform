#!/bin/bash

# Netlify Deploy Script for Geriatrics Platform
# This script triggers a new deployment on Netlify

echo "🚀 Triggering Netlify deployment for Geriatrics Platform..."

# You need to get your build hook URL from:
# https://app.netlify.com/sites/geriatrics/settings/deploys#build-hooks
# Then replace YOUR_BUILD_HOOK_URL below

BUILD_HOOK_URL="YOUR_BUILD_HOOK_URL"

if [ "$BUILD_HOOK_URL" = "YOUR_BUILD_HOOK_URL" ]; then
    echo "❌ Error: Please set your build hook URL first!"
    echo "1. Go to: https://app.netlify.com/sites/geriatrics/settings/deploys#build-hooks"
    echo "2. Click 'Add build hook'"
    echo "3. Name it 'Deploy Script' and select 'main' branch"
    echo "4. Copy the webhook URL and replace YOUR_BUILD_HOOK_URL in this script"
    exit 1
fi

# Trigger the deploy
curl -X POST "$BUILD_HOOK_URL"

if [ $? -eq 0 ]; then
    echo "✅ Deploy triggered successfully!"
    echo "📊 View status at: https://app.netlify.com/sites/geriatrics/deploys"
    echo "🌐 Site will be updated at: https://geriatrics.netlify.app"
else
    echo "❌ Failed to trigger deploy"
fi