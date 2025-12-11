# Splash Screen Setup Guide

## 🎨 What is a Splash Screen?

A splash screen is the first screen users see when launching your app, typically displaying:
- App logo
- Brand colors
- Loading indicator

## ✅ Already Configured

Your `app.json` already has splash screen configuration:

```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

## 🚀 Setup Steps

### 1. Install Package (if not already installed)
```bash
npm install expo-splash-screen
```

### 2. Create Splash Image

**Create** `assets/splash.png` with these specifications:
- **Size**: 1242x2436 pixels (iPhone X resolution)
- **Format**: PNG with transparency
- **Design**: Your Action-Reaction logo centered

**Quick Design Tips**:
- Keep logo in the center safe area
- Use your brand colors
- Simple and clean design
- Test on different screen sizes

### 3. Update App.js

Add splash screen control in your main `App.js`:

```javascript
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need here
        // await Font.loadAsync({...});
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Hide splash screen once app is ready
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    // Your app navigation here
    <NavigationContainer>
      {/* ... */}
    </NavigationContainer>
  );
}
```

## 🎨 Customization Options

### Change Background Color
```json
{
  "splash": {
    "backgroundColor": "#6366f1"  // Your brand color
  }
}
```

### Resize Modes
- `contain`: Fits image within screen (recommended)
- `cover`: Fills entire screen (may crop)
- `native`: Uses native scaling

### Platform-Specific
```json
{
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff",
    "ios": {
      "image": "./assets/splash-ios.png"
    },
    "android": {
      "image": "./assets/splash-android.png",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png"
      }
    }
  }
}
```

## 🔧 Advanced: Loading States

Show loading progress during splash:

```javascript
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 1. Load fonts
        // await loadFonts();
        
        // 2. Initialize network check
        // await NetInfo.fetch();
        
        // 3. Check authentication
        // await checkAuth();
        
        // Mark ready
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Splash screen still visible
  }

  return <YourApp />;
}
```

## 📱 Testing

### iOS Simulator
```bash
npx expo run:ios
```

### Android Emulator
```bash
npx expo run:android
```

### Expo Go
```bash
npx expo start
```

## 🎯 Best Practices

✅ **DO**:
- Keep it simple and fast (< 3 seconds)
- Use your brand colors
- Show loading indicators for longer tasks
- Test on multiple devices

❌ **DON'T**:
- Show splash for too long (> 5 seconds)
- Add animations (they slow down loading)
- Use high-resolution images (optimize file size)
- Display ads or promotional content

## 🐛 Troubleshooting

### Splash screen not showing
1. Check if `splash.png` exists in `assets/`
2. Run `npx expo prebuild` to regenerate native code
3. Clear cache: `npx expo start -c`

### Splash screen flashes quickly
- Increase minimum display time in `prepare()` function
- Add actual loading tasks that take time

### Image looks stretched
- Change `resizeMode` to `contain`
- Ensure image dimensions are correct (1242x2436)

## 🔗 Resources

- [Expo Splash Screen Docs](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
- [Expo App Config](https://docs.expo.dev/versions/latest/config/app/)
- [Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/launch-screen)
