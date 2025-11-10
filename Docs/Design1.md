# 🎮 Action Reaction — Game Design Document

## 1️⃣ Overview
**Action Reaction** is an interactive mobile party game built with **React Native** using **Expo Go**.  
It blends fun, teamwork, and quick thinking — where players act out clues while one player guesses the word shown on their phone screen.

The app is designed for **in-person group play**, focusing on smooth gameplay, large readable visuals, and intuitive motion-based interaction.

---

## 2️⃣ Game Concept
- One player holds the phone **on their forehead** so others can see the word displayed.
- The other players must **act out** or **mime** the word without speaking or spelling it out.
- The player guesses the word based on the performance.
- The app detects **device flips** to record correct or passed guesses:
  - ✅ **Flip Down** → Correct
  - 🔄 **Flip Up** → Pass
- A countdown timer runs for each round, and the score is displayed at the end.

---

## 3️⃣ Built With
This app is developed using:

- ⚛️ **React Native** — for building a single codebase for Android and iOS  
- 🚀 **Expo Go** — for quick development, testing, and access to native features like sensors  
- 🧭 **JavaScript / TypeScript** — for structured and maintainable code  
- 📱 **Device Sensors (Accelerometer)** — for motion-based gameplay detection  

---

## 4️⃣ Target Audience
- Designed for **friends, families, and social gatherings**.
- Ideal for **casual fun**, parties, or ice-breaking sessions.
- Supports **offline play**, requiring only one device per group.

---

## 5️⃣ Core Features
| Feature | Description |
|----------|--------------|
| 🕹️ Gameplay | Hold phone to forehead, others act out clues |
| 🔄 Motion Detection | Flip detection for “Correct” or “Pass” |
| 🧠 Topics | Different categories (e.g., Food, Sports, Movies) |
| ⏱️ Timer | Countdown for each round |
| 🏆 Scoreboard | Displays total correct and skipped words |
| ⚙️ Settings | Adjust sensitivity, sounds, and vibrations |
| ✏️ Custom Words | Add your own word packs (future update) |

---

## 6️⃣ Gameplay Flow

### Step 1 — Start Game
- User selects a **topic** (e.g., Food).
- Presses the **Start** button.
- 3-second countdown begins before the first word appears.

### Step 2 — Game Round
- A random word is displayed.
- Opposite players act out the word.
- Player guesses and flips the phone to mark results:
  - **Flip Down** = Correct ✅
  - **Flip Up** = Pass 🔄
- Next word automatically appears.

### Step 3 — Round End
- Timer reaches zero.
- Score summary is displayed with:
  - ✅ Number of correct guesses
  - 🔄 Number of passes
  - ⏱️ Total time played
- Option to **Play Again** or **Return to Home**.

---

## 7️⃣ Screen Design

### 🏠 Home Screen
- Game title and logo
- “Play”, “Settings”, and “Create Word Pack” buttons
- Theme selector (Food, Sports, Movies, etc.)

### 🎯 Game Screen
- Full-screen word (large text)
- Subtle background color (changes with topic)
- Small timer at top
- Feedback animation for each action (green = correct, red = pass)

### 🏆 Scoreboard Screen
- Final score with correct/pass counts
- Share score option
- “Play Again” and “Home” buttons

### ⚙️ Settings Screen
- Flip sensitivity slider
- Toggle for sound, vibration, timer
- About section

---

## 8️⃣ Data Design
### Word Object
```json
{
  "id": "food_001",
  "text": "Pizza",
  "topic": "Food"
}
