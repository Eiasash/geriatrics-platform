#!/bin/bash

# Geriatrics Platform Deployment Fix Script
# This script ensures the React app is properly built and deployed

echo "🚀 Starting Geriatrics Platform deployment fix..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Build the React application
echo "🔨 Building React application..."
npm run build

# Copy necessary files to dist
echo "📋 Copying additional files..."
cp roster.html dist/
cp public/manifest.json dist/
cp public/robots.txt dist/

# Verify build
echo "✅ Verifying build..."
if [ -f "dist/index.html" ] && [ -f "dist/assets/index-"*.js ]; then
    echo "✅ Build successful!"
    echo "📁 Files in dist/:"
    ls -la dist/
    echo ""
    echo "🌐 The application is ready for deployment!"
    echo "   - Main app: dist/index.html"
    echo "   - Patient roster: dist/roster.html"
    echo "   - Assets: dist/assets/"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Deployment fix complete!"