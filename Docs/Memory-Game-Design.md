# Memory Game Mode - Design Document

## 🎯 Overview

The Memory Game mode tests players' ability to remember and recall multiple words shown sequentially. Players must type all the words they remember, and the game validates each answer against the shown word list.

## 🔴 Current Problem

**Issue**: The game shows 3-5 words sequentially, then displays "Remember the words!" but:
- ❌ No proper UI to collect recalled words
- ❌ No validation logic to check if recalled words match shown words
- ❌ Answer checking is confusing (shows "correct answer" as the prompt)
- ❌ Doesn't track which words were recalled correctly

## ✅ New Design Solution

### Game Flow

```
1. DISPLAY PHASE
   ↓
   Show Word 1 (2 seconds)
   ↓
   Show Word 2 (2 seconds)
   ↓
   Show Word 3 (2 seconds)
   ↓
   ... (up to 5 words)
   ↓
2. RECALL PHASE
   ↓
   Prompt: "Type the words you remember!"
   ↓
   Player types word → Submit
   ↓
   Check if word matches ANY shown word
   ↓
   - ✓ Match: Mark as recalled, continue
   - ✗ No match: Continue (don't penalize)
   ↓
   Repeat until all shown words are recalled OR player skips
   ↓
3. RESULT PHASE
   ↓
   Show score: X/Y words recalled correctly
   ↓
   Load next memory challenge
```

## 📊 Data Structure

### State Variables

```javascript
// Words shown to player
shownWordsList = ['Pizza', 'Basketball', 'Paris']

// Words player has recalled (submitted)
recalledWords = []

// Correctly matched words
correctlyRecalledWords = []

// Current input from player
currentInput = ''

// Tracking
currentRecallIndex = 0 // Which word attempt (0, 1, 2...)
totalWordsToShow = 3   // How many words to display
```

### Pseudo-code Algorithm

```javascript
// PHASE 1: DISPLAY WORDS
function startMemoryChallenge() {
  shownWordsList = []
  totalWordsToShow = random(3, 5) // 3-5 words
  
  // Pick random words
  for (i = 0; i < totalWordsToShow; i++) {
    word = getRandomWord(topic, usedWords)
    shownWordsList.push(word)
    usedWords.push(word)
  }
  
  memoryPhase = 'display'
  
  // Show each word for 2 seconds
  for (i = 0; i < shownWordsList.length; i++) {
    showWord(shownWordsList[i])
    wait(2000)
  }
  
  memoryPhase = 'recall'
  currentRecallIndex = 0
  recalledWords = []
  correctlyRecalledWords = []
}

// PHASE 2: RECALL WORDS
function handleRecallSubmit(userInput) {
  currentRecallIndex++
  
  // Check if input matches any shown word
  userInputLower = userInput.toLowerCase().trim()
  
  found = false
  for (word in shownWordsList) {
    if (word.toLowerCase() === userInputLower) {
      // Match found!
      if (!correctlyRecalledWords.includes(word)) {
        correctlyRecalledWords.push(word)
        showFeedback('correct')
      } else {
        showFeedback('already-recalled')
      }
      found = true
      break
    }
  }
  
  if (!found) {
    showFeedback('incorrect')
  }
  
  recalledWords.push(userInput)
  
  // Check if all words recalled OR reached max attempts
  if (correctlyRecalledWords.length === shownWordsList.length) {
    // Perfect recall!
    memoryPhase = 'result'
    showResultScreen()
  } else if (currentRecallIndex >= shownWordsList.length * 2) {
    // Allow up to 2x attempts
    memoryPhase = 'result'
    showResultScreen()
  } else {
    // Continue recalling
    currentInput = ''
  }
}

// Handle Skip
function handleSkip() {
  memoryPhase = 'result'
  showResultScreen()
}

// PHASE 3: SHOW RESULTS
function showResultScreen() {
  score = correctlyRecalledWords.length
  total = shownWordsList.length
  
  if (score === total) {
    points = 5 // Perfect recall bonus
  } else if (score >= total * 0.66) {
    points = 3 // Good recall
  } else {
    points = 1 // Partial recall
  }
  
  addScore(points)
  
  // Show results for 3 seconds
  displayMessage = `You recalled ${score}/${total} words correctly!`
  
  wait(3000)
  
  // Start next challenge
  startMemoryChallenge()
}
```

## 🎨 UI Design

### Display Phase
```
┌─────────────────────────────┐
│     🧠 Memory Challenge      │
├─────────────────────────────┤
│                             │
│        [Word 1/5]           │
│                             │
│         PIZZA               │
│                             │
│     Memorize this word!     │
│                             │
└─────────────────────────────┘
```

### Recall Phase
```
┌─────────────────────────────┐
│  🧠 Recall the Words! (1/3) │
├─────────────────────────────┤
│                             │
│  Type the words you saw:    │
│                             │
│  ┌─────────────────────┐   │
│  │ [Type here...]      │   │
│  └─────────────────────┘   │
│         [Submit] ✓          │
│                             │
│  Recalled: 0/3              │
│  ✓ Pizza                    │
│  ✗ _____                    │
│  ✗ _____                    │
│                             │
│      [Finish & Score]       │
└─────────────────────────────┘
```

### Result Phase
```
┌─────────────────────────────┐
│      🎉 Great Recall!        │
├─────────────────────────────┤
│                             │
│    You got 2/3 words!       │
│                             │
│  ✓ Pizza                    │
│  ✓ Paris                    │
│  ✗ Basketball (missed)      │
│                             │
│      +3 points              │
│                             │
│    Loading next round...    │
└─────────────────────────────┘
```

## 🏆 Scoring System

| Recall Rate | Points | Description |
|------------|--------|-------------|
| 100% (3/3) | 5      | Perfect recall |
| 66-99% (2/3) | 3    | Good recall |
| 33-65% (1/3) | 1    | Partial recall |
| 0-32% (0/3) | 0     | No recall |

## ✨ Features

### Core Features
- ✅ Show 3-5 random words sequentially
- ✅ 2 seconds display per word
- ✅ Allow multiple recall attempts
- ✅ Case-insensitive matching
- ✅ Prevent duplicate recall
- ✅ Visual feedback for each answer
- ✅ Show final results with correct/missed words

### Bonus Features
- 🎯 Increase word count as player progresses (3→4→5)
- ⏱️ Faster display time for advanced levels
- 🏅 Combo bonus for multiple perfect recalls
- 📊 Track personal best (max words recalled)

## 🔧 Implementation Notes

### Key Functions
1. `startMemoryChallenge()` - Initialize and display words
2. `handleMemorySubmit()` - Process recalled word
3. `checkWordMatch()` - Validate against shown words
4. `showMemoryResults()` - Display results and award points
5. `loadNextMemoryRound()` - Start next challenge

### Edge Cases
- ✅ User types same word twice → Count only once
- ✅ User types word with different case → Accept (case-insensitive)
- ✅ User types word with extra spaces → Trim and accept
- ✅ User skips without recalling → Show 0/3 result
- ✅ User recalls all words before max attempts → End early with bonus

## 🎮 User Experience

### Good UX Principles
1. **Clear Progress** - Show "Word 1/5" during display
2. **Visual Feedback** - Green checkmark for correct, red X for wrong
3. **No Penalties** - Wrong answers don't deduct points
4. **Flexible** - Can finish early or use all attempts
5. **Informative** - Show what was missed in results

### Accessibility
- Large, readable text
- Color + icon for feedback (not just color)
- Keyboard support for input
- Clear instructions at each phase

## 📝 Example Gameplay

```
ROUND 1:
Display: Pizza → Basketball → Paris
Recall: 
  - User types "pizza" ✓ (correct)
  - User types "paris" ✓ (correct)
  - User types "soccer" ✗ (not shown)
  - User types "basketball" ✓ (correct)
Result: 3/3 words → +5 points ⭐

ROUND 2:
Display: Guitar → Lion → Coffee → Beach
Recall:
  - User types "guitar" ✓
  - User types "lion" ✓
  - User skips
Result: 2/4 words → +1 point

ROUND 3:
Display: Tokyo → Burger → Tennis → Monkey → Piano
Recall:
  - User types "burger" ✓
  - User types "pizza" ✗
  - User types "tennis" ✓
  - User types "tokyo" ✓
  - User types "piano" ✓
  - User types "monkey" ✓
Result: 5/5 words → +5 points ⭐
```

## 🚀 Implementation Checklist

- [ ] Add state variables for memory tracking
- [ ] Implement display phase with sequential word showing
- [ ] Create recall phase UI with input field
- [ ] Implement word matching logic (case-insensitive)
- [ ] Add duplicate prevention
- [ ] Create results screen with score calculation
- [ ] Add visual feedback animations
- [ ] Test edge cases
- [ ] Add progressive difficulty (optional)
- [ ] Polish UI/UX
