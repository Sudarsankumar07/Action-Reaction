# Firebase Integration for Android App

This guide shows you how to integrate Firebase Anonymous Authentication into your Action-Reaction React Native/Expo app.

---

## 📋 Prerequisites

- ✅ Firebase project created (`action-reaction-game`)
- ✅ `google-services.json` downloaded from Firebase
- ✅ Backend API updated with JWT verification
- ✅ Package name: `com.actionreaction.app`

---

## 🚀 Step-by-Step Integration

### Step 1: Copy `google-services.json` to Android App

**Location:** Move the file to your Android app root directory

```bash
# Copy the file from API folder to Android app folder
Copy-Item "Action-reaction-api\google-services.json" -Destination "Action-Reaction\google-services.json"
```

**Expected location:**
```
Action-Reaction/
├── google-services.json  ← Place here
├── app.json
├── package.json
└── src/
```

---

### Step 2: Install Firebase Dependencies

Run this in your `Action-Reaction` folder:

```bash
npm install @react-native-firebase/app @react-native-firebase/auth
```

Or with Expo (if using managed workflow):

```bash
npx expo install @react-native-firebase/app @react-native-firebase/auth
```

---

### Step 3: Update `app.json` Configuration

Add Firebase plugin to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      "@react-native-firebase/app",
      [
        "expo-sensors",
        {
          "motionPermission": "Allow Action Reaction to access device motion for gameplay detection."
        }
      ]
    ],
    "android": {
      "package": "com.actionreaction.app",
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

**Key additions:**
- Add `@react-native-firebase/app` to plugins
- Add `googleServicesFile` path in android config

---

### Step 4: Create Firebase Authentication Service

**Create file:** `src/services/firebaseAuth.js`

```javascript
// src/services/firebaseAuth.js
import auth from '@react-native-firebase/auth';

/**
 * Sign in anonymously with Firebase
 * @returns {Promise<object>} User credential with JWT token
 */
export async function signInAnonymously() {
  try {
    const userCredential = await auth().signInAnonymously();
    const user = userCredential.user;
    
    // Get the Firebase JWT token
    const idToken = await user.getIdToken();
    
    console.log('✅ Firebase: Signed in anonymously');
    console.log('User ID:', user.uid);
    
    return {
      success: true,
      uid: user.uid,
      token: idToken,
    };
  } catch (error) {
    console.error('❌ Firebase sign-in failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get current user's JWT token
 * @returns {Promise<string|null>} Firebase JWT token
 */
export async function getCurrentUserToken() {
  try {
    const currentUser = auth().currentUser;
    
    if (!currentUser) {
      console.log('⚠️ No user signed in, signing in anonymously...');
      const result = await signInAnonymously();
      return result.success ? result.token : null;
    }
    
    // Refresh token if needed
    const token = await currentUser.getIdToken(true);
    return token;
  } catch (error) {
    console.error('❌ Failed to get user token:', error);
    return null;
  }
}

/**
 * Check if user is signed in
 * @returns {boolean}
 */
export function isUserSignedIn() {
  return auth().currentUser !== null;
}

/**
 * Listen for authentication state changes
 * @param {function} callback - Called when auth state changes
 * @returns {function} Unsubscribe function
 */
export function onAuthStateChanged(callback) {
  return auth().onAuthStateChanged(callback);
}
```

---

### Step 5: Update API Service to Send JWT

**Modify file:** `src/services/apiService.js` (or wherever you call the API)

**Find your current API call code** (it might look like this):

```javascript
// BEFORE (old approach with app secret)
const response = await fetch('https://your-api.vercel.app/api/hints/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-App-Secret': 'some-secret',  // ❌ Remove this
  },
  body: JSON.stringify({ word, topic, difficulty, language }),
});
```

**Replace with Firebase JWT authentication:**

```javascript
// AFTER (new approach with Firebase JWT)
import { getCurrentUserToken } from './firebaseAuth';

export async function generateHints(word, topic, difficulty = 'medium', language = 'en') {
  try {
    // Get Firebase JWT token
    const token = await getCurrentUserToken();
    
    if (!token) {
      throw new Error('Failed to authenticate with Firebase');
    }

    const response = await fetch('https://your-api.vercel.app/api/hints/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // ✅ Send JWT token
      },
      body: JSON.stringify({ word, topic, difficulty, language }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to generate hints');
    }

    return {
      success: true,
      hints: data.hints,
      cached: data.cached,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
```

---

### Step 6: Initialize Firebase on App Launch

**Modify file:** `App.js` (or your root component)

```javascript
import React, { useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from './src/services/firebaseAuth';

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // Sign in anonymously when app launches
    const initializeAuth = async () => {
      console.log('🔥 Initializing Firebase Authentication...');
      
      const result = await signInAnonymously();
      
      if (result.success) {
        console.log('✅ User authenticated:', result.uid);
      } else {
        console.error('❌ Authentication failed:', result.error);
      }
      
      setIsAuthenticating(false);
    };

    initializeAuth();

    // Listen for auth state changes (token refresh, sign out, etc.)
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        console.log('🔥 Firebase user:', user.uid);
      } else {
        console.log('⚠️ User signed out, re-authenticating...');
        signInAnonymously();
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticating) {
    return <SplashScreen />; // Show loading screen while authenticating
  }

  return (
    // Your normal app content
    <YourAppContent />
  );
}
```

---

### Step 7: Rebuild Your App

After making these changes, you need to rebuild your app:

**For Expo managed workflow:**
```bash
npx expo prebuild
npx expo run:android
```

**For bare React Native:**
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

---

## ✅ Testing Authentication

### Test 1: Check Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Go to **Authentication** → **Users**
3. Launch your app
4. You should see a new anonymous user appear!

### Test 2: Test API Call

1. Try generating hints in your app
2. Check the API logs (Vercel dashboard)
3. You should see: `✅ Authenticated user: <firebase-uid>`

### Test 3: Verify JWT Token

In your app, add this temporary code:

```javascript
import { getCurrentUserToken } from './src/services/firebaseAuth';

// Test JWT token
const token = await getCurrentUserToken();
console.log('JWT Token:', token);
// Should be a long string like: eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...
```

---

## 🐛 Troubleshooting

### Error: "Failed to authenticate with Firebase"

**Solution:** Make sure Firebase is initialized before calling the API
```javascript
// Wait for Firebase to be ready
import auth from '@react-native-firebase/auth';
await new Promise(resolve => {
  const unsubscribe = auth().onAuthStateChanged(() => {
    unsubscribe();
    resolve();
  });
});
```

### Error: "google-services.json not found"

**Solution:** Ensure the file is in the root of your project:
```
Action-Reaction/
├── google-services.json  ← Must be here
├── app.json
```

### Error: "INVALID_TOKEN" from API

**Solution:** 
1. Check that `FIREBASE_SERVICE_ACCOUNT` is set correctly in Vercel
2. Verify the token is being sent in the `Authorization` header
3. Check Vercel logs for specific error messages

### App crashes on Android

**Solution:** Rebuild the app after adding Firebase:
```bash
npx expo prebuild --clean
npx expo run:android
```

---

## 📊 What Happens Under the Hood

```
┌─────────────────┐
│  App Launches   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Firebase.signInAnon()   │  ← Silent, no UI
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Get JWT Token           │  ← Google-signed token
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ User plays game         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Request API with JWT    │  ← Authorization: Bearer <token>
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Vercel verifies JWT     │  ← Checks with Firebase
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ API returns hints       │
└─────────────────────────┘
```

---

## 🎯 Summary Checklist

- [ ] Copy `google-services.json` to Android app folder
- [ ] Install Firebase dependencies (`@react-native-firebase/app`, `@react-native-firebase/auth`)
- [ ] Update `app.json` with Firebase plugin
- [ ] Create `src/services/firebaseAuth.js`
- [ ] Update API service to send JWT in `Authorization` header
- [ ] Initialize Firebase in `App.js`
- [ ] Rebuild the app
- [ ] Test: Check Firebase Console for anonymous user
- [ ] Test: Generate hints in the app
- [ ] Verify: Check Vercel logs for authentication success

---

## 🔐 Security Benefits

| Before (App Secret) | After (Firebase JWT) |
|-------------------|---------------------|
| ❌ Static secret in APK | ✅ Dynamic JWT tokens |
| ❌ Can be extracted | ✅ Can't be forged (Google-signed) |
| ❌ No expiry | ✅ Auto-expires (~1 hour) |
| ❌ Same for all users | ✅ Unique per user |
| ❌ Can't revoke | ✅ Can revoke in Firebase Console |

---

## 📞 Need Help?

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Verify environment variables in Vercel
3. Check Firebase Console for authentication logs
4. Check Vercel logs for API errors

---

**Next:** After completing these steps, your app will be fully secured with Firebase Authentication! 🎉
