# Firebase Setup for Geriatrics Platform

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Create a project" or "Add project"
3. Name it: "geriatrics-platform"
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, click "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (e.g., "us-central")
5. Click "Enable"

## Step 3: Enable Authentication

1. Click "Build" → "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Anonymous" authentication

## Step 4: Get Your Configuration

1. Click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps"
3. Click "</>" (Web) icon
4. Register app with nickname "Geriatrics Platform"
5. Copy the configuration object

Your config will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "geriatrics-platform.firebaseapp.com",
  projectId: "geriatrics-platform",
  storageBucket: "geriatrics-platform.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

## Step 5: Add to Netlify Environment Variables

1. Go to https://app.netlify.com/sites/geriatrics/settings/env
2. Click "Add a variable"
3. Key: `VITE_FIREBASE_CONFIG`
4. Value: Copy the JSON string of your config (stringify it):
```
{"apiKey":"AIzaSy...","authDomain":"geriatrics-platform.firebaseapp.com","projectId":"geriatrics-platform","storageBucket":"geriatrics-platform.appspot.com","messagingSenderId":"123456789","appId":"1:123456789:web:abc123..."}
```
5. Click "Save"
6. Go to "Deploys" tab and click "Trigger deploy" → "Deploy site"

## Step 6: Update Firestore Security Rules

After setup, go to Firestore Database → Rules and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /artifacts/{appId}/users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click "Publish" to save the rules.

## That's it! Your app should now work with Firebase.