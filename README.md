# Action Reaction 🎮

## Overview

**Action Reaction** is a feature-rich, interactive word-guessing game app with multiple game modes, AI-powered hints, and social gameplay. Whether you're playing with friends at a party or challenging yourself solo, Action Reaction offers diverse gameplay experiences that combine traditional party game mechanics with modern AI technology.

---

## 🎮 Game Modes

### 1. Multiplayer Mode (Classic Party Game)
The original forehead game experience:
* Hold phone to your forehead
* Friends act out the word on screen
* **Tilt face-down** → Correct guess ✅
* **Tilt face-up** → Pass/Skip 🔁
* 60-second fast-paced rounds

### 2. AI Hints Mode 🤖
Powered by Groq LLM (llama-3.3-70b-versatile):
* Progressive hint system (4 levels: Hard → Moderate → Easy → Very Easy)
* Hints reveal every 5 seconds
* AI generates context-aware, relatable clues
* Smart caching for offline gameplay
* Score based on hints used and time taken

### 3. Time Attack Mode ⏱️
Fast-paced puzzle challenges:
* **Scrambled Letters** - Unscramble the word
* **Emoji Hints** - Guess from emoji clues (🍕 → Pizza)
* **Fill in the Blanks** - Complete missing letters
* Combo system for consecutive correct answers

### 4. Memory Challenge Mode 🧠
Test your memory skills:
* Displays 3-5 words sequentially (2 seconds each)
* Recall and type all words you remember
* Order doesn't matter
* **100% recall** → 5 points 🎉
* **66-99%** → 3 points 👍

### 5. Practice Mode 📚
Casual learning:
* No time pressure
* Browse words at your own pace
* Perfect for vocabulary building

---

## 🎨 Key Features

### Core Features
✅ **5 Game Modes** - Multiplayer, AI Hints, Time Attack, Memory Challenge, Practice
✅ **7 Themed Topics** - Food, Sports, Movies, Animals, Places, Music, General
✅ **300+ Words** - Diverse word database with full emoji support
✅ **Motion Controls** - Accelerometer-based tilt detection for multiplayer
✅ **Beautiful UI** - Gradient themes for each topic
✅ **Score Tracking** - Real-time performance metrics

### AI & Smart Features
🤖 **Groq AI Integration** - Advanced hint generation with llama-3.3-70b-versatile
🌐 **Online/Offline Mode** - Auto-switches based on connectivity
💾 **Smart Caching** - Offline hints with 24-hour expiry
🎯 **Context-Aware Hints** - Topic and word-specific clues
📊 **Adaptive Difficulty** - Progressive hint revelation

### Game Enhancements
⚡ **Combo System** - Streak bonuses in Time Attack mode
🏆 **Dynamic Scoring** - Performance-based points across modes
🎭 **Emoji Support** - 300+ word-to-emoji mappings
🧩 **Multiple Challenge Types** - Scramble, blanks, memory tests
📱 **Keyboard Input** - Type answers in single-player modes

### Technical Features
🔄 **Network Detection** - Automatic online/offline switching
💿 **AsyncStorage** - Persistent hint caching
🎨 **Expo SDK ~54.0.0** - Modern React Native framework
📐 **Screen Orientation** - Auto-lock per game mode
⚙️ **Environment Variables** - Secure API key management

---

## 🌐 Multilingual Support (Planned)

### Upcoming Languages
* 🇮🇳 **Tamil (தமிழ்)** - Primary focus
* 🇮🇳 **Hindi (हिन्दी)**
* 🇮🇳 **Telugu (తెలుగు)**
* 🇮🇳 **Kannada (ಕನ್ನಡ)**
* 🇫🇷 **French**
* 🇪🇸 **Spanish**

### Implementation Features
* Full UI translation
* Localized word databases
* Language switcher in Settings
* Persistent language preference
* RTL support for Arabic/Urdu

*See `Docs/Multilingual-Design.md` for complete architecture*

---

## 🎯 How to Play

1. Open the app and select your preferred topic.
2. Press **Start** to begin the round.
3. Hold the phone to your forehead so others can see the word.
4. Watch your friends act out clues — guess as many as possible before time runs out!
5. Tilt down for **Correct**, tilt up for **Pass**.
6. See your final score and challenge your friends to beat it!

---

## 🚀 Technology Stack

### Frontend
* **React Native** - Cross-platform mobile framework
* **Expo SDK ~54.0.0** - Development platform
* **React Navigation** - Screen navigation
* **Ionicons** - Icon library

### Backend & AI
* **Groq API** - LLM hint generation
* **llama-3.3-70b-versatile** - AI model
* **Axios** - HTTP client

### Device Features
* **Expo Sensors** - Accelerometer motion control
* **Expo Haptics** - Vibration feedback
* **NetInfo** - Network connectivity detection

### Storage
* **AsyncStorage** - Hint caching and persistence
* **react-native-dotenv** - Environment variables

---

## 📂 Project Structure

```
Action-Reaction/
├── App.js                    # Main app entry
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Topic and mode selection
│   │   ├── GameScreen.js     # Main gameplay
│   │   ├── ScoreboardScreen.js
│   │   └── SettingsScreen.js
│   ├── services/
│   │   ├── groqService.js    # Groq API integration
│   │   └── hintService.js    # Caching & network logic
│   ├── data/
│   │   ├── words.js          # 300+ words database
│   │   └── hints.js          # Emoji mappings
│   └── theme/
│       └── index.js          # Colors & gradients
└── Docs/                     # Documentation
    ├── Memory-Game-Design.md
    ├── Multilingual-Design.md
    └── LLM-Hint-System-Design.md
```

---

## 🛠️ Setup & Installation

### Prerequisites

* **Node.js** (v20.16.0 or higher)
* **npm** or **yarn**
* **Expo CLI** (`npm install -g expo-cli`)
* **Git**
* **Android Studio** (for Android) or **Xcode** (for iOS)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Sudarsankumar07/Action-Reaction.git
cd Action-Reaction

# Install dependencies
npm install

# Start development server
npx expo start
```

---

## 🔧 Running the App

### Option 1: Run with Expo Go (Easiest - No Firebase)

**Best for:** Quick testing, development without AI hints

```bash
npx expo start
```

Then:
* **Scan QR code** with Expo Go app (Android) or Camera (iOS)
* App loads in **fallback mode** (AI hints use static fallback)
* No Firebase authentication required

**Limitations:**
* ❌ No AI-powered hints (uses fallback)
* ❌ API calls won't work
* ✅ All other game modes work perfectly

---

### Option 2: Run with Full API Support (Firebase + AI Hints)

**Best for:** Production-ready app, testing AI features

This requires Firebase Authentication setup for secure API access.

#### Step 1: Install Firebase Dependencies

```bash
npm install @react-native-firebase/app @react-native-firebase/auth
```

#### Step 2: Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create or select project: `action-reaction-game`
3. **Enable Anonymous Authentication:**
   * Go to **Authentication** → **Sign-in method**
   * Enable **Anonymous** provider
   
4. **Download `google-services.json` (Android):**
   * **⚙️ Settings** → **Project settings**
   * Add Android app
   * Package name: `com.actionreaction.app`
   * Download `google-services.json`
   * Place in root: `Action-Reaction/google-services.json`

5. **Get Service Account Key (Backend):**
   * Go to **Service accounts** tab
   * Click **Generate new private key**
   * Download JSON for backend environment variables

#### Step 3: Backend API Setup

Backend hosted at: `https://action-reaction-api.vercel.app`

**Required Vercel Environment Variables:**

| Variable | Value | Source |
|----------|-------|--------|
| `GROQ_API_KEY` | Your API key | [Groq Console](https://console.groq.com/) |
| `FIREBASE_PROJECT_ID` | `action-reaction-game` | Firebase Console |
| `FIREBASE_SERVICE_ACCOUNT` | Full JSON | Service Account Key |

> **Note:** Backend already configured. Only needed for custom deployment.

#### Step 4: Build with EAS (Cloud Build)

Native Firebase modules require development build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build for Android
eas build --platform android --profile preview
```

**Build time:** ~10-20 minutes (first build)

**After completion:**
1. Download APK from EAS dashboard
2. Install on Android device
3. Firebase authenticates automatically

#### Step 5: Run the App

Once installed:
* Firebase authenticates silently (no login screen)
* Check logs: `✅ Firebase Authentication successful!`
* AI hints work with full Groq API

---

## 🔐 How Authentication Works

### For Users
* **No login required** - automatic background authentication  
* Each install gets unique anonymous user ID
* Completely transparent (no UI)

### For Developers

**Architecture:**
```
App Launch → Firebase Anonymous Auth → JWT Token → API → Groq LLM
```

**Security Features:**
* ✅ No API keys in app
* ✅ Google-signed JWT (unforgeable)
* ✅ Auto-expiring tokens
* ✅ Per-user rate limiting
* ✅ Backend JWT verification

**Documentation:** See `Docs/secure_llm_integration.md` and `Docs/FIREBASE_SETUP.md`

---

## 🌐 Online vs Offline Mode

App auto-switches between modes:

### Online Mode (with API)
* ✅ AI-powered hints from Groq LLM
* ✅ Context-aware clues
* ✅ Fresh hints every time
* ✅ Cached for offline use

### Offline Mode (Fallback)
* ✅ Static hints from local DB
* ✅ Emoji mappings
* ✅ No internet needed
* ✅ Instant response

**Auto-detection:** Network connectivity checked automatically.

---

## 🎮 Testing Different Modes

### Test AI Hints (Full Setup)
```bash
eas build --platform android --profile preview
# Install APK → AI Hints use Groq API
```

### Test Fallback Mode
```bash
npx expo start
# Scan QR → AI Hints use static fallback
```

### Test on Web
```bash
npx expo start --web
# Fallback mode (Firebase not available on web)
```

---

## 📱 Platform Support

| Platform | Expo Go | Dev Build | Production |
|----------|---------|-----------|------------|
| **Android** | ✅ Fallback | ✅ Full Firebase | ✅ Full Firebase |
| **iOS** | ⚠️ Not tested | ⚠️ Config needed | ⚠️ Config needed |
| **Web** | ✅ Fallback | N/A | ✅ Fallback |

---

## 🐛 Troubleshooting

### "No Firebase App has been created"
* **Cause:** Running on web/Expo Go
* **Fix:** Use EAS Build

### "API calls failing"
* Check network connectivity
* Verify Vercel environment variables
* Confirm Firebase Authentication enabled

### Build failures
* **Solution:** Use EAS Cloud Build
* **Command:** `eas build --platform android --profile preview`

### White screen
* Check terminal logs
* Try: `npx expo start --clear`

---

---

## 🏆 Scoring System

### Multiplayer Mode
* Correct guess: +1 point
* Final Score: Total correct in 60 seconds

### AI Hints Mode
```
Base: 10 points
+ Hint Bonus: (4 - hints_used) × 2
+ Speed Bonus: <10s → +5, <15s → +3
Max: 23 points per word
```

### Time Attack Mode
```
Base: 1 point
+ Combo Bonus: floor(combo / 3)
```

### Memory Challenge
```
100% recall → 5 points
66-99% → 3 points
33-65% → 1 point
```

---

## 🚀 Future Roadmap

### Phase 1: Multilingual (Q1 2026)
* Tamil language support
* Language switcher UI
* Translated word databases

### Phase 2: Social Features (Q2 2026)
* Online multiplayer
* Room codes
* Friend challenges
* Global leaderboards

### Phase 3: Customization (Q3 2026)
* Custom word packs
* Theme editor
* Achievements system

### Phase 4: Advanced AI (Q4 2026)
* Voice recognition
* Image-based hints
* Personalized difficulty

---

## 📚 Documentation

Comprehensive guides available in `/Docs`:
* **LLM-Hint-System-Design.md** - AI hint architecture
* **Memory-Game-Design.md** - Memory mode design
* **Memory-Game-Implementation.md** - Implementation details
* **Multilingual-Design.md** - Language support plan
* **Single-Player-Mode.md** - Game modes overview
* **Splash-Screen-Setup.md** - Splash screen guide

---

## 🎮 Credits

**Developer:** Sudarsankumar07
**AI Model:** Groq (llama-3.3-70b-versatile)
**Framework:** React Native with Expo
**Icons:** Ionicons

---

## 💡 Purpose

This project combines **technology and real-world interaction**, offering both social party gameplay and solo AI-powered challenges. It's designed to be educational, entertaining, and expandable — perfect for mobile gaming enthusiasts and developers who love interactive entertainment.

**Made with ❤️ for word game enthusiasts!**

