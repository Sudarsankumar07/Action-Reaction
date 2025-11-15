# App Logo Setup Guide - Action-Reaction

## Overview
This guide explains how to add an app icon/logo to your Action-Reaction app for Android and iOS devices.

---

## Required Logo Sizes

### Android (APK)
- **Adaptive Icon**: 1024x1024 px (foreground + background layers)
- **Legacy Icon**: 512x512 px (single image)

### iOS
- **App Store Icon**: 1024x1024 px

### Expo Requirements
- **icon**: 1024x1024 px (PNG, no transparency recommended)
- **adaptive-icon** (Android): 1024x1024 px
- **favicon**: 48x48 px (for web)

---

## Method 1: Create Your Own Logo (Recommended)

### Design Requirements:
- **Dimensions**: 1024x1024 pixels
- **Format**: PNG (with or without transparency)
- **Design**: Simple, recognizable icon representing the game
- **Colors**: Match your app theme (Purple/Indigo #6366f1)

### Logo Design Ideas for Action-Reaction:
1. **Flip Phone Icon** - Phone flipping with motion lines
2. **Action Symbol** - Lightning bolt + reaction arrow
3. **Gesture Icon** - Hand flipping gesture
4. **Timer + Cards** - Stopwatch with word cards
5. **Brain + Speed** - Brain with speed lines (quick thinking)

### Design Tools (Free):
- **Canva** (canva.com) - Easy, templates available
- **Figma** (figma.com) - Professional design tool
- **Adobe Express** (express.adobe.com) - Quick designs
- **GIMP** (gimp.org) - Free Photoshop alternative
- **Inkscape** (inkscape.org) - Vector graphics

### Steps:
1. Create 1024x1024 px canvas with your tool
2. Design your logo/icon
3. Export as PNG
4. Save as `icon.png` in `assets/` folder
5. Optionally create `adaptive-icon.png` for Android

---

## Method 2: Use Expo Icon Generator (Easiest)

### Using Default Expo Icon Template:
```bash
# Generate icon from a simple image
npx expo install expo-constants
```

### Or use online generator:
1. Visit: https://www.appicon.co/
2. Upload a square image (minimum 1024x1024)
3. Download the generated icon pack
4. Extract and use the icon.png file

---

## Method 3: AI Generated Logo (Quick)

### Free AI Tools:
- **Microsoft Designer** (designer.microsoft.com) - Prompt: "Modern mobile app icon for a word guessing game called Action Reaction, purple theme, minimalist"
- **Canva AI** - Text-to-image icon generator
- **Bing Image Creator** - Generate custom icon

### Example Prompts:
```
"Mobile app icon, purple gradient, flip gesture, word game, 
modern flat design, 1024x1024, clean background"

"Action Reaction game logo, lightning bolt and brain, 
indigo color #6366f1, minimalist icon, square format"
```

---

## Implementation Steps

### 1. Create Assets Folder
```powershell
# Create assets directory if it doesn't exist
New-Item -ItemType Directory -Path "assets" -Force
```

### 2. Add Your Logo Files
Place these files in the `assets/` folder:
- `icon.png` (1024x1024 px) - Main app icon
- `adaptive-icon.png` (1024x1024 px) - Android adaptive icon (optional)
- `splash.png` (1284x2778 px) - Splash screen image (optional)
- `favicon.png` (48x48 px) - Web favicon (optional)

### 3. Update app.json
```json
{
  "expo": {
    "name": "Action Reaction",
    "slug": "action-reaction",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6366f1"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.actionreaction.app",
      "icon": "./assets/icon.png"
    },
    "android": {
      "package": "com.actionreaction.app",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#6366f1"
      }
    },
    "web": {
      "bundler": "metro",
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## Quick Logo Creation Template

### Simple Text-Based Logo (5 minutes):
1. Open Canva (free account)
2. Create 1024x1024 custom size
3. Add gradient background (purple to indigo)
4. Add text: "AR" or "A↔R" (Action-Reaction)
5. Add icon: ⚡ lightning or 🔄 flip symbol
6. Download as PNG
7. Name it `icon.png`

### Color Scheme:
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Accent**: #ec4899 (Pink)
- **Background**: #ffffff (White) or gradient

---

## Android Adaptive Icon Explained

### What is Adaptive Icon?
- Android 8.0+ feature
- Separates foreground and background
- System shapes icon (circle, square, rounded)

### Structure:
```
adaptive-icon.png
├── Foreground Layer (your logo)
└── Background Layer (solid color or pattern)
```

### Design Tips:
- Keep important elements in center **66% of canvas**
- Outer 15% may be cropped
- Safe zone: 726x726 px centered

### Example Layout (1024x1024):
```
┌─────────────────────┐
│  Margin (149px)     │
│  ┌───────────────┐  │
│  │   Safe Zone   │  │
│  │   (726x726)   │  │
│  │     Logo      │  │
│  │               │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

---

## Testing Your Logo

### Preview in Expo Go:
```powershell
# Make sure icon.png is in assets folder
npx expo start

# Scan QR code with Expo Go app
# Check if icon appears in app switcher
```

### Build and Test APK:
```powershell
eas build -p android --profile preview

# Download APK and install
# Check icon in app drawer
# Check icon in app settings
```

---

## Common Issues & Solutions

### Issue 1: Icon Not Showing
**Solution**: 
- Ensure file path is correct: `./assets/icon.png`
- Check file exists and is valid PNG
- Rebuild app: `npx expo start -c`

### Issue 2: Icon Appears Blurry
**Solution**:
- Use exactly 1024x1024 px
- Export at high quality (100% PNG)
- Avoid JPEG compression

### Issue 3: Adaptive Icon Cropped
**Solution**:
- Keep logo elements in center 66%
- Test with different device shapes
- Use Android Studio preview tool

### Issue 4: Icon Has White Background
**Solution**:
- Export PNG with transparent background
- Or set backgroundColor in app.json
- Use adaptive icon for Android

---

## Recommended Logo Specifications

### File Details:
```
icon.png
├── Size: 1024x1024 px
├── Format: PNG
├── Color Mode: RGB
├── Bit Depth: 24-bit or 32-bit (with alpha)
├── File Size: < 1 MB
└── DPI: 72 or higher
```

### Design Guidelines:
- ✅ Simple and recognizable
- ✅ Works in small sizes (48x48)
- ✅ High contrast
- ✅ No text smaller than 48pt
- ✅ Matches app theme
- ❌ Avoid thin lines (< 2px)
- ❌ Avoid photo-realistic images
- ❌ Avoid small details

---

## Sample Logo Structure

### Option A: Simple Symbol
```
┌─────────────────────┐
│                     │
│                     │
│       ⚡ 🔄         │
│    Lightning +      │
│    Flip Icon        │
│                     │
│                     │
└─────────────────────┘
Purple Gradient BG
```

### Option B: Text + Icon
```
┌─────────────────────┐
│                     │
│        AR           │
│      ─────          │
│     Quick Game      │
│        🎮           │
│                     │
│                     │
└─────────────────────┘
Indigo Solid BG
```

### Option C: Minimal
```
┌─────────────────────┐
│                     │
│                     │
│         ⟲          │
│      Circular       │
│      Arrow          │
│                     │
│                     │
└─────────────────────┘
White Symbol on Purple
```

---

## Quick Start Commands

```powershell
# 1. Create assets folder
New-Item -ItemType Directory -Path "assets" -Force

# 2. Add your icon.png to assets/ folder
# (Create using Canva, Figma, or AI tool)

# 3. Update app.json with icon path
# (See configuration example above)

# 4. Test in Expo Go
npx expo start

# 5. Build APK with new icon
eas build -p android --profile preview
```

---

## Resources

### Icon Design Inspiration:
- **Dribbble** (dribbble.com/search/app-icon)
- **Behance** (behance.net/search/projects?search=mobile%20app%20icon)
- **Material Design Icons** (materialdesignicons.com)

### Icon Generators:
- **Appicon.co** - Generate all sizes from one image
- **MakeAppIcon** - App icon generator
- **Icon Kitchen** - Android adaptive icon preview

### Official Documentation:
- **Expo Icons Guide**: https://docs.expo.dev/guides/app-icons/
- **Android Icon Guidelines**: https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive
- **Apple HIG**: https://developer.apple.com/design/human-interface-guidelines/app-icons

---

## Next Steps

1. **Choose a method** (Create own, AI generate, or use template)
2. **Create icon.png** (1024x1024 px)
3. **Add to assets folder**
4. **Update app.json** with icon path
5. **Test in Expo Go**
6. **Build APK** and verify icon appears

---

**Created:** November 13, 2025  
**Status:** Ready for Implementation  
**Priority:** Medium (Enhances app branding)
