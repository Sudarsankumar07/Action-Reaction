# 🎮 Single-Player Mode Design Document

## Overview

This document outlines the design and implementation strategy for adding **Single-Player Mode** to the Action Reaction game. The goal is to enable solo gameplay without requiring other players to act out clues, making the game accessible anytime, anywhere.

---

## Current Game Analysis

**Action Reaction** is designed as a **multiplayer party game** where:
- One player holds the phone on their forehead
- Other players see the word and act it out
- The player guesses based on actions and tilts the phone (face-down = correct, face-up = pass)
- Uses accelerometer for motion detection
- Features timed rounds (60 seconds default)
- Includes multiple topic categories (Food, Sports, Movies, Animals, Places, Music, General)

**Challenge**: The game requires at least 2+ players, limiting accessibility for solo users.

---

## 🎯 Single-Player Mode Features

### 1. AI Hint System ⭐ (Primary Recommendation)

**Concept**: Progressive hints appear automatically to help the player guess the word mentally.

**Gameplay Flow**:
1. Player starts single-player mode and selects a topic
2. Word appears on screen (player holds phone normally, not on forehead)
3. Progressive hints appear at timed intervals:
   - **5 seconds**: Category hint (e.g., "It's a type of food")
   - **10 seconds**: Letter count (e.g., "It has 5 letters: _ _ _ _ _")
   - **15 seconds**: First letter + descriptive clue (e.g., "Starts with P, an Italian dish with cheese")
   - **20 seconds**: Partial word reveal (e.g., "P I _ _ A")
4. Player guesses mentally and flips phone face-down when ready
5. Word is revealed, player confirms if they guessed correctly
6. Score calculated based on:
   - Base points: 10 points per correct guess
   - Speed bonus: Extra points for guessing before all hints appear
   - Hint penalty: -2 points for each hint used

**Scoring System**:
```
- Guessed before Hint 1: 10 points + 8 bonus = 18 points
- Guessed after Hint 1: 10 points + 6 bonus = 16 points
- Guessed after Hint 2: 10 points + 4 bonus = 14 points
- Guessed after Hint 3: 10 points + 2 bonus = 12 points
- Guessed after Hint 4: 10 points = 10 points
- Pass: 0 points
```

**Technical Requirements**:
- Hint generation logic for each topic
- Timer-based hint display system
- Modified scoring algorithm
- New game mode parameter in navigation

---

### 2. Text-to-Speech (TTS) Clue Mode 🔊

**Concept**: App reads out definitions/clues instead of showing the word.

**Gameplay Flow**:
1. Player selects TTS mode
2. Word is hidden, but app speaks a clue: *"A round Italian dish with cheese and tomato sauce"*
3. Player guesses mentally
4. Flips phone to reveal the answer
5. Confirms if guess was correct

**Benefits**:
- Hands-free gameplay
- Great for learning vocabulary
- Accessibility feature for visually impaired users

**Technical Requirements**:
- Integration with Expo Speech API (`expo-speech`)
- Clue/definition database for each word
- Audio playback controls

---

### 3. Time Attack Mode ⚡

**Concept**: Speed-based pattern recognition and word solving.

**Gameplay Variations**:

**A. Scrambled Letters**
- Display: "ZAPPI" → Answer: "PIZZA"
- Player unscrambles mentally and flips when ready

**B. Emoji Clues**
- Display: "🍕" → Answer: "PIZZA"
- Visual hint-based guessing

**C. Fill in the Blanks**
- Display: "P_ZZ_" + "Italian food" → Answer: "PIZZA"
- Word puzzle solving

**Scoring**:
- 1 point per correct word
- Bonus for consecutive correct answers (combo system)
- High score tracking

**Technical Requirements**:
- Word scrambling algorithm
- Emoji mapping database
- Blank generation logic
- Combo multiplier system

---

### 4. Memory Challenge Mode 🧠

**Concept**: Test memory and recall abilities.

**Gameplay Flow**:
1. Show sequence of 3-5 words (2 seconds each)
2. Words disappear
3. Player must recall all words in order
4. Flip phone to submit recall
5. App shows all words, player checks their mental list
6. Score based on how many words recalled correctly

**Difficulty Levels**:
- **Easy**: 3 words, 3 seconds each
- **Medium**: 4 words, 2 seconds each  
- **Hard**: 5 words, 1.5 seconds each
- **Expert**: 7 words, 1 second each

**Scoring**:
- All words correct: 15 points
- 80% correct: 10 points
- 60% correct: 5 points
- Below 60%: 0 points

**Technical Requirements**:
- Sequential word display animation
- Memory state management
- Results comparison screen

---

### 5. Audio Description Mode 🎵 (Music Topic)

**Concept**: Audio-based guessing for music-related words.

**Gameplay Examples**:
- Play piano melody → Guess: "Piano"
- Play guitar riff → Guess: "Guitar"
- Play drum pattern → Guess: "Drums"

**Technical Requirements**:
- Audio file library for instruments
- Integration with Expo AV (`expo-av`)
- Sound effect database

**Note**: This mode is topic-specific (Music category primarily)

---

### 6. Practice/Study Mode 📚

**Concept**: No-pressure learning mode to familiarize with words.

**Features**:
- Browse all words in a topic
- Flashcard-style interface
- No timer, no scoring
- Swipe to next/previous word
- Mark words as "learned" or "favorite"
- Review only difficult words

**Benefits**:
- Prepare for multiplayer games
- Learn new vocabulary
- Casual browsing experience

**Technical Requirements**:
- Swipeable card interface
- Word state persistence (AsyncStorage)
- Filter and sorting options

---

### 7. Daily Challenge 🏆

**Concept**: One special word per day with extra rewards.

**Features**:
- New challenging word each day
- Extra difficulty (fewer hints or harder words)
- Global leaderboard (future: Firebase integration)
- Streak tracking
- Special badges for consecutive days

**Scoring**:
- Daily word: 50 points
- Streak bonus: +10 points per consecutive day

**Technical Requirements**:
- Date-based word selection algorithm
- Local storage for streak tracking
- Notification system (expo-notifications)

---

## 🎨 UI/UX Design Changes

### Mode Selection Screen

Add to **HomeScreen** before topic selection:

```
┌─────────────────────────────────┐
│     Choose Game Mode            │
├─────────────────────────────────┤
│  👥 Multiplayer (Classic)       │
│     Play with friends           │
├─────────────────────────────────┤
│  🎯 Single Player (AI Hints)    │
│     Play solo with clues        │
├─────────────────────────────────┤
│  ⚡ Time Attack                 │
│     Speed challenge             │
├─────────────────────────────────┤
│  🧠 Memory Challenge            │
│     Test your recall            │
├─────────────────────────────────┤
│  📚 Practice Mode               │
│     Learn new words             │
└─────────────────────────────────┘
```

### Single-Player Game Screen Layout

```
┌─────────────────────────────────┐
│  ⏱️  45s      🎯 Score: 24      │
├─────────────────────────────────┤
│                                 │
│         PIZZA                   │
│                                 │
│  💡 Hint 1: It's a type of food │
│  💡 Hint 2: 5 letters: P____A   │
│                                 │
│  [Flip Face-Down When Ready]    │
│                                 │
│  ✅ Correct  ❌ Pass  🔄 Skip   │
│                                 │
└─────────────────────────────────┘
```

---

## 📊 Implementation Priority

### Phase 1: MVP (Quick Win) - Week 1-2
**Priority Features**:
1. ✅ **AI Hint System** - Core single-player experience
2. ✅ **Practice Mode** - Low complexity, high value
3. ✅ **Mode Selection UI** - Entry point for single-player

**Deliverables**:
- Mode selection on HomeScreen
- Hint generation system
- Modified GameScreen for single-player
- Basic scoring adjustments

### Phase 2: Enhanced Experience - Week 3-4
**Priority Features**:
1. ✅ **Time Attack Mode** - Adds variety
2. ✅ **Text-to-Speech Mode** - Audio dimension
3. ✅ **Improved scoring system** - Combo multipliers

**Deliverables**:
- Scrambled word algorithm
- TTS integration
- Combo system
- Enhanced statistics

### Phase 3: Advanced Features - Week 5-6
**Priority Features**:
1. ✅ **Memory Challenge Mode** - Cognitive gameplay
2. ✅ **Daily Challenge** - Retention mechanism
3. ✅ **Leaderboards** - Competition element

**Deliverables**:
- Sequential word display
- Date-based challenges
- Local/global leaderboards
- Achievement badges

---

## 🛠️ Technical Implementation

### Data Structure Updates

**Modified Game State**:
```javascript
{
  mode: 'single-player-hints' | 'multiplayer' | 'time-attack' | 'memory' | 'practice',
  currentWord: 'Pizza',
  hintsShown: 2,
  hintsAvailable: [
    "It's a type of food",
    "It has 5 letters",
    "Starts with P, an Italian dish",
    "P I _ _ A"
  ],
  hintTimer: 5, // seconds until next hint
  score: 24,
  combo: 3,
  timeSpentOnWord: 12, // seconds
}
```

### Hint Generation Algorithm

```javascript
const generateHints = (word, topic) => {
  const hints = [];
  
  // Hint 1: Topic category
  const categoryHints = {
    food: "It's a type of food",
    sports: "It's a sport or sports-related",
    movies: "It's a movie or film-related",
    // ... etc
  };
  hints.push(categoryHints[topic]);
  
  // Hint 2: Letter count with blanks
  const blanks = '_'.repeat(word.length);
  hints.push(`It has ${word.length} letters: ${blanks.split('').join(' ')}`);
  
  // Hint 3: First letter + custom clue
  const clue = customClues[word] || "A common word in this category";
  hints.push(`Starts with ${word[0]}, ${clue}`);
  
  // Hint 4: Partial reveal
  const partial = word.split('').map((c, i) => 
    i === 0 || i === word.length - 1 || i % 2 === 0 ? c : '_'
  ).join(' ');
  hints.push(partial);
  
  return hints;
};
```

### Custom Clue Database

```javascript
const customClues = {
  // Food
  'Pizza': 'an Italian dish with cheese and tomato sauce',
  'Burger': 'a sandwich with meat patty between buns',
  'Sushi': 'Japanese dish with rice and raw fish',
  
  // Sports
  'Basketball': 'played with an orange ball and hoops',
  'Soccer': 'the world\'s most popular sport with a round ball',
  
  // ... expand for all words
};
```

### Scoring System Implementation

```javascript
const calculateScore = (hintsUsed, timeSpent, isCorrect) => {
  if (!isCorrect) return 0;
  
  let basePoints = 10;
  let hintBonus = Math.max(0, (4 - hintsUsed) * 2); // 8, 6, 4, 2, 0
  let speedBonus = timeSpent < 10 ? 5 : 0;
  
  return basePoints + hintBonus + speedBonus;
};
```

---

## 🎯 Success Metrics

### User Engagement
- **Daily Active Users (DAU)** increase by 40%
- **Session Length** increase by 25%
- **Return Rate** increase by 30%

### Gameplay Metrics
- Average score per single-player session
- Most popular single-player mode
- Average hints used per word
- Completion rate (% of started games finished)

### Technical Metrics
- Hint generation latency < 100ms
- TTS response time < 500ms
- App performance (60 FPS maintained)

---

## 🔮 Future Enhancements

1. **Multiplayer + Single Player Hybrid**: Practice alone, compete with friends' scores
2. **AI Difficulty Levels**: Adjust hint timing and detail based on player skill
3. **Custom Word Packs**: Let users create and share their own word sets
4. **Voice Recognition**: Speak the answer instead of flipping phone
5. **Augmented Reality Mode**: Use camera to identify objects
6. **Social Features**: Share scores, challenge friends
7. **Educational Mode**: Learn new languages with translation hints

---

## 📝 Summary

The **Single-Player Mode** transforms Action Reaction from a party-only game into a versatile mobile experience playable anytime. The **AI Hint System** serves as the foundation, with additional modes (Time Attack, Memory Challenge, Practice) providing variety and replayability.

**Key Benefits**:
- ✅ Play anytime, anywhere without needing others
- ✅ Educational value through vocabulary building
- ✅ Multiple gameplay modes for variety
- ✅ Maintains core game mechanics (flip detection)
- ✅ Scalable architecture for future features

**Recommended Starting Point**: Implement AI Hint System first, then expand based on user feedback and engagement metrics.

---

*Document Created: November 26, 2025*  
*Version: 1.0*  
*Author: Sudarsan Kumar*
