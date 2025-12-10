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

