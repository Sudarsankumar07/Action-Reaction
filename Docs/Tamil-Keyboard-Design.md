# Tamil On-Screen Keyboard Design Document

## 🎯 Overview

This document provides the complete design specification for implementing a custom on-screen Tamil keyboard in the Action-Reaction game. The keyboard will automatically appear when players select Tamil language, eliminating the need for users to manually switch their device keyboard.

---

## 🚨 Problem Statement

### Current Issue
- Players who select Tamil language need to type Tamil words
- Most users don't know how to switch their device keyboard to Tamil
- Manual keyboard switching interrupts gameplay flow
- Results in poor user experience and feature abandonment

### Target Users
- Tamil-speaking players who are not tech-savvy
- Users unfamiliar with device keyboard settings
- Anyone who wants a seamless Tamil gaming experience

### Affected Game Modes
| Mode | Typing Required | Tamil Keyboard Needed |
|------|-----------------|----------------------|
| AI Hints | ✅ Yes | ✅ Yes |
| Time Attack | ✅ Yes | ✅ Yes |
| Memory Challenge | ✅ Yes | ✅ Yes |
| Multiplayer | ❌ No (Motion) | ❌ No |
| Practice | ❌ No (Browse) | ❌ No |

---

## 📝 Tamil Script Basics

### Tamil Alphabet Structure

Tamil is an abugida script with the following components:

#### 1. Vowels (உயிரெழுத்து) - 12 characters
| Letter | Romanization | Sound |
|--------|--------------|-------|
| அ | a | Short 'a' |
| ஆ | aa | Long 'a' |
| இ | i | Short 'i' |
| ஈ | ii | Long 'i' |
| உ | u | Short 'u' |
| ஊ | uu | Long 'u' |
| எ | e | Short 'e' |
| ஏ | ee | Long 'e' |
| ஐ | ai | 'ai' sound |
| ஒ | o | Short 'o' |
| ஓ | oo | Long 'o' |
| ஔ | au | 'au' sound |

#### 2. Consonants (மெய்யெழுத்து) - 18 characters
| Letter | Romanization | Sound |
|--------|--------------|-------|
| க் | k | 'k' |
| ங் | ng | 'ng' |
| ச் | ch | 'ch' |
| ஞ் | nj | 'nj' |
| ட் | t | Hard 't' |
| ண் | n | Hard 'n' |
| த் | th | Soft 't' |
| ந் | n | Soft 'n' |
| ப் | p | 'p' |
| ம் | m | 'm' |
| ய் | y | 'y' |
| ர் | r | 'r' |
| ல் | l | 'l' |
| வ் | v | 'v' |
| ழ் | zh | 'zh' |
| ள் | L | Hard 'l' |
| ற் | R | Hard 'r' |
| ன் | n | Final 'n' |

#### 3. Vowel Signs (உயிர்மெய் அடையாளங்கள்)
When consonants combine with vowels, they use vowel signs:

| Vowel | Sign | Example with க |
|-------|------|----------------|
| அ | (none) | க |
| ஆ | ா | கா |
| இ | ி | கி |
| ஈ | ீ | கீ |
| உ | ு | கு |
| ஊ | ூ | கூ |
| எ | ெ | கெ |
| ஏ | ே | கே |
| ஐ | ை | கை |
| ஒ | ொ | கொ |
| ஓ | ோ | கோ |
| ஔ | ௌ | கௌ |

#### 4. Special Character
| Character | Name | Purpose |
|-----------|------|---------|
| ஃ | Aytham | Represents 'h' sound |

---

## 🎨 Keyboard Layout Design

### Layout Option A: Simplified Game Keyboard (Recommended)

A streamlined keyboard optimized for game input:

```
┌─────────────────────────────────────────────────────────────┐
│                    VOWEL SIGNS ROW                          │
│  ா    ி    ீ    ு    ூ    ெ    ே    ை    ொ    ோ    ௌ    │
├─────────────────────────────────────────────────────────────┤
│                    CONSONANTS ROW 1                         │
│    க    ச    ட    த    ப    ற    ங    ஞ    ண            │
├─────────────────────────────────────────────────────────────┤
│                    CONSONANTS ROW 2                         │
│    ந    ம    ய    ர    ல    வ    ழ    ள    ன            │
├─────────────────────────────────────────────────────────────┤
│                    VOWELS ROW                               │
│    அ    ஆ    இ    ஈ    உ    ஊ    எ    ஏ    ஐ    ஒ    ஓ    ஔ  │
├─────────────────────────────────────────────────────────────┤
│                    ACTION ROW                               │
│   [ABC]    [SPACE ___________]    [⌫ DELETE]    [✓ DONE]   │
└─────────────────────────────────────────────────────────────┘
```

### Layout Option B: Traditional Tamil Keyboard

Full Tamil keyboard similar to device keyboards:

```
┌──────────────────────────────────────────────────────────────┐
│  Row 1: அ  ஆ  இ  ஈ  உ  ஊ  எ  ஏ  ஐ  ஒ  ஓ  ஔ  ஃ              │
├──────────────────────────────────────────────────────────────┤
│  Row 2: க  ங  ச  ஞ  ட  ண  த  ந  ப  ம                       │
├──────────────────────────────────────────────────────────────┤
│  Row 3: ய  ர  ல  வ  ழ  ள  ற  ன                              │
├──────────────────────────────────────────────────────────────┤
│  Row 4: ா  ி  ீ  ு  ூ  ெ  ே  ை  ொ  ோ  ௌ  ்                │
├──────────────────────────────────────────────────────────────┤
│  Row 5: [SPACE]  [⌫]  [CLEAR]  [✓ SUBMIT]                    │
└──────────────────────────────────────────────────────────────┘
```

### Recommended: Option A (Simplified Game Keyboard)

**Reasons:**
1. Easier to use for beginners
2. Larger key sizes for touch accuracy
3. Game-optimized (not general purpose)
4. Faster word input for gameplay
5. Less overwhelming for new Tamil learners

### ✅ IMPLEMENTED: Option B (Traditional Tamil Keyboard)

**Implementation Status:** ✅ Complete

**Files Created:**
- `src/components/TamilKeyboard/index.js` - Main export
- `src/components/TamilKeyboard/TamilKeyboard.js` - Keyboard component
- `src/components/TamilKeyboard/keyboardData.js` - Tamil character data
- `src/components/TamilKeyboard/styles.js` - Styling

**Integration:**
- `src/screens/GameScreen.js` - Integrated with conditional rendering

---

## 🏗️ Component Architecture

### File Structure

```
src/
├── components/
│   ├── TamilKeyboard/
│   │   ├── index.js              # Main export
│   │   ├── TamilKeyboard.js      # Main keyboard component
│   │   ├── KeyboardKey.js        # Individual key component
│   │   ├── VowelSignsRow.js      # Vowel signs row
│   │   ├── ConsonantsRow.js      # Consonants row
│   │   ├── VowelsRow.js          # Vowels row
│   │   ├── ActionRow.js          # Action buttons row
│   │   ├── keyboardData.js       # Tamil character data
│   │   └── styles.js             # Keyboard styles
│   └── ...
```

### Component Hierarchy

```
TamilKeyboard
├── KeyboardContainer
│   ├── InputDisplay (shows current typed text)
│   ├── VowelSignsRow
│   │   └── KeyboardKey (×11)
│   ├── ConsonantsRow1
│   │   └── KeyboardKey (×9)
│   ├── ConsonantsRow2
│   │   └── KeyboardKey (×9)
│   ├── VowelsRow
│   │   └── KeyboardKey (×12)
│   └── ActionRow
│       ├── SwitchKeyboardKey (ABC/Tamil toggle)
│       ├── SpaceKey
│       ├── BackspaceKey
│       └── SubmitKey
```

---

## 📐 Visual Design Specifications

### Key Dimensions

```javascript
const KEYBOARD_CONSTANTS = {
  // Screen-relative sizing
  KEYBOARD_HEIGHT_RATIO: 0.45,    // 45% of screen height
  KEY_MARGIN: 4,
  KEY_BORDER_RADIUS: 8,
  
  // Key sizes
  NORMAL_KEY_WIDTH: 32,
  NORMAL_KEY_HEIGHT: 44,
  SPACE_KEY_WIDTH: 140,
  ACTION_KEY_WIDTH: 64,
  
  // Font sizes
  TAMIL_FONT_SIZE: 22,
  LABEL_FONT_SIZE: 12,
};
```

### Color Scheme (Matching App Theme)

```javascript
const KEYBOARD_COLORS = {
  // Background
  keyboardBackground: '#1a1a2e',      // Dark navy
  
  // Keys
  consonantKey: {
    background: '#16213e',             // Dark blue
    text: '#FFFFFF',
    pressed: '#0f3460',
  },
  vowelKey: {
    background: '#1a1a40',             // Slightly purple
    text: '#FFD93D',                   // Golden yellow
    pressed: '#2c2c54',
  },
  vowelSignKey: {
    background: '#0f3460',             // Blue
    text: '#00FFC5',                   // Cyan accent
    pressed: '#1e5f74',
  },
  actionKey: {
    background: '#e94560',             // Red/pink accent
    text: '#FFFFFF',
    pressed: '#c73e54',
  },
  spaceKey: {
    background: '#2c2c54',
    text: '#888888',
    pressed: '#3d3d6b',
  },
  deleteKey: {
    background: '#ff6b6b',             // Red
    text: '#FFFFFF',
    pressed: '#ee5a5a',
  },
  
  // Input display
  inputBackground: '#0d0d1a',
  inputText: '#FFFFFF',
  inputBorder: '#00FFC5',
  cursor: '#00FFC5',
};
```

### Visual Mockup

```
╔═══════════════════════════════════════════════════════════════╗
║                      INPUT DISPLAY                             ║
║  ┌───────────────────────────────────────────────────────┐    ║
║  │  தமிழ்█                                                │    ║
║  └───────────────────────────────────────────────────────┘    ║
╠═══════════════════════════════════════════════════════════════╣
║                      VOWEL SIGNS                               ║
║  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐    ║
║  │ா │ │ி │ │ீ │ │ு │ │ூ │ │ெ │ │ே │ │ை │ │ொ │ │ோ │ │ௌ │    ║
║  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘    ║
╠═══════════════════════════════════════════════════════════════╣
║                      CONSONANTS                                ║
║    ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐            ║
║    │க │ │ச │ │ட │ │த │ │ப │ │ற │ │ங │ │ஞ │ │ண │            ║
║    └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘            ║
║    ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐            ║
║    │ந │ │ம │ │ய │ │ர │ │ல │ │வ │ │ழ │ │ள │ │ன │            ║
║    └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘            ║
╠═══════════════════════════════════════════════════════════════╣
║                      VOWELS                                    ║
║  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐║
║  │அ │ │ஆ │ │இ │ │ஈ │ │உ │ │ஊ │ │எ │ │ஏ │ │ஐ │ │ஒ │ │ஓ │ │ஔ │║
║  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘║
╠═══════════════════════════════════════════════════════════════╣
║                      ACTIONS                                   ║
║  ┌─────┐ ┌─────────────────────────┐ ┌─────┐ ┌──────────┐     ║
║  │ ABC │ │        SPACE            │ │  ⌫  │ │  SUBMIT  │     ║
║  └─────┘ └─────────────────────────┘ └─────┘ └──────────┘     ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## ⚙️ Technical Implementation

### 1. Keyboard Data Structure

```javascript
// src/components/TamilKeyboard/keyboardData.js

export const TAMIL_VOWELS = [
  { char: 'அ', code: '\u0B85', label: 'a' },
  { char: 'ஆ', code: '\u0B86', label: 'aa' },
  { char: 'இ', code: '\u0B87', label: 'i' },
  { char: 'ஈ', code: '\u0B88', label: 'ii' },
  { char: 'உ', code: '\u0B89', label: 'u' },
  { char: 'ஊ', code: '\u0B8A', label: 'uu' },
  { char: 'எ', code: '\u0B8E', label: 'e' },
  { char: 'ஏ', code: '\u0B8F', label: 'ee' },
  { char: 'ஐ', code: '\u0B90', label: 'ai' },
  { char: 'ஒ', code: '\u0B92', label: 'o' },
  { char: 'ஓ', code: '\u0B93', label: 'oo' },
  { char: 'ஔ', code: '\u0B94', label: 'au' },
];

export const TAMIL_CONSONANTS_ROW1 = [
  { char: 'க', code: '\u0B95', label: 'ka' },
  { char: 'ச', code: '\u0B9A', label: 'cha' },
  { char: 'ட', code: '\u0B9F', label: 'ta' },
  { char: 'த', code: '\u0BA4', label: 'tha' },
  { char: 'ப', code: '\u0BAA', label: 'pa' },
  { char: 'ற', code: '\u0BB1', label: 'Ra' },
  { char: 'ங', code: '\u0B99', label: 'nga' },
  { char: 'ஞ', code: '\u0B9E', label: 'nja' },
  { char: 'ண', code: '\u0BA3', label: 'Na' },
];

export const TAMIL_CONSONANTS_ROW2 = [
  { char: 'ந', code: '\u0BA8', label: 'na' },
  { char: 'ம', code: '\u0BAE', label: 'ma' },
  { char: 'ய', code: '\u0BAF', label: 'ya' },
  { char: 'ர', code: '\u0BB0', label: 'ra' },
  { char: 'ல', code: '\u0BB2', label: 'la' },
  { char: 'வ', code: '\u0BB5', label: 'va' },
  { char: 'ழ', code: '\u0BB4', label: 'zha' },
  { char: 'ள', code: '\u0BB3', label: 'La' },
  { char: 'ன', code: '\u0BA9', label: 'na' },
];

export const TAMIL_VOWEL_SIGNS = [
  { char: 'ா', code: '\u0BBE', label: 'aa', combinesWith: 'consonant' },
  { char: 'ி', code: '\u0BBF', label: 'i', combinesWith: 'consonant' },
  { char: 'ீ', code: '\u0BC0', label: 'ii', combinesWith: 'consonant' },
  { char: 'ு', code: '\u0BC1', label: 'u', combinesWith: 'consonant' },
  { char: 'ூ', code: '\u0BC2', label: 'uu', combinesWith: 'consonant' },
  { char: 'ெ', code: '\u0BC6', label: 'e', combinesWith: 'consonant' },
  { char: 'ே', code: '\u0BC7', label: 'ee', combinesWith: 'consonant' },
  { char: 'ை', code: '\u0BC8', label: 'ai', combinesWith: 'consonant' },
  { char: 'ொ', code: '\u0BCA', label: 'o', combinesWith: 'consonant' },
  { char: 'ோ', code: '\u0BCB', label: 'oo', combinesWith: 'consonant' },
  { char: 'ௌ', code: '\u0BCC', label: 'au', combinesWith: 'consonant' },
];

export const SPECIAL_KEYS = {
  pulli: { char: '்', code: '\u0BCD', label: 'pulli' }, // Removes inherent vowel
  aytham: { char: 'ஃ', code: '\u0B83', label: 'aytham' },
  space: { char: ' ', code: ' ', label: 'space' },
  backspace: { char: '⌫', code: 'BACKSPACE', label: 'delete' },
  submit: { char: '✓', code: 'SUBMIT', label: 'submit' },
  clear: { char: '✕', code: 'CLEAR', label: 'clear' },
};
```

### 2. Main Keyboard Component

```javascript
// src/components/TamilKeyboard/TamilKeyboard.js

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  TAMIL_VOWELS,
  TAMIL_CONSONANTS_ROW1,
  TAMIL_CONSONANTS_ROW2,
  TAMIL_VOWEL_SIGNS,
  SPECIAL_KEYS,
} from './keyboardData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TamilKeyboard({
  value = '',
  onChange,
  onSubmit,
  visible = true,
  showInput = true,
  maxLength = 30,
  placeholder = 'தட்டச்சு செய்யவும்...',
}) {
  const [pressedKey, setPressedKey] = useState(null);

  // Handle key press with haptic feedback
  const handleKeyPress = useCallback(async (keyData) => {
    // Haptic feedback
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const { code, char } = keyData;

    switch (code) {
      case 'BACKSPACE':
        onChange(value.slice(0, -1));
        break;
      case 'CLEAR':
        onChange('');
        break;
      case 'SUBMIT':
        onSubmit?.(value);
        break;
      case ' ':
        if (value.length < maxLength) {
          onChange(value + ' ');
        }
        break;
      default:
        if (value.length < maxLength) {
          onChange(value + char);
        }
        break;
    }
  }, [value, onChange, onSubmit, maxLength]);

  // Handle key press start (for visual feedback)
  const handlePressIn = useCallback((key) => {
    setPressedKey(key);
  }, []);

  // Handle key press end
  const handlePressOut = useCallback(() => {
    setPressedKey(null);
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Input Display */}
      {showInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>
            {value || <Text style={styles.placeholder}>{placeholder}</Text>}
          </Text>
          <View style={styles.cursor} />
        </View>
      )}

      {/* Vowel Signs Row */}
      <View style={styles.row}>
        {TAMIL_VOWEL_SIGNS.map((key) => (
          <KeyboardKey
            key={key.code}
            keyData={key}
            type="vowelSign"
            isPressed={pressedKey === key.code}
            onPress={handleKeyPress}
            onPressIn={() => handlePressIn(key.code)}
            onPressOut={handlePressOut}
          />
        ))}
      </View>

      {/* Consonants Row 1 */}
      <View style={styles.row}>
        {TAMIL_CONSONANTS_ROW1.map((key) => (
          <KeyboardKey
            key={key.code}
            keyData={key}
            type="consonant"
            isPressed={pressedKey === key.code}
            onPress={handleKeyPress}
            onPressIn={() => handlePressIn(key.code)}
            onPressOut={handlePressOut}
          />
        ))}
      </View>

      {/* Consonants Row 2 */}
      <View style={styles.row}>
        {TAMIL_CONSONANTS_ROW2.map((key) => (
          <KeyboardKey
            key={key.code}
            keyData={key}
            type="consonant"
            isPressed={pressedKey === key.code}
            onPress={handleKeyPress}
            onPressIn={() => handlePressIn(key.code)}
            onPressOut={handlePressOut}
          />
        ))}
      </View>

      {/* Vowels Row */}
      <View style={styles.row}>
        {TAMIL_VOWELS.map((key) => (
          <KeyboardKey
            key={key.code}
            keyData={key}
            type="vowel"
            isPressed={pressedKey === key.code}
            onPress={handleKeyPress}
            onPressIn={() => handlePressIn(key.code)}
            onPressOut={handlePressOut}
          />
        ))}
      </View>

      {/* Action Row */}
      <View style={styles.actionRow}>
        <KeyboardKey
          keyData={SPECIAL_KEYS.pulli}
          type="special"
          isPressed={pressedKey === SPECIAL_KEYS.pulli.code}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn(SPECIAL_KEYS.pulli.code)}
          onPressOut={handlePressOut}
          width={50}
        />
        <KeyboardKey
          keyData={SPECIAL_KEYS.space}
          type="space"
          isPressed={pressedKey === 'SPACE'}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn('SPACE')}
          onPressOut={handlePressOut}
          width={SCREEN_WIDTH * 0.35}
          label="Space"
        />
        <KeyboardKey
          keyData={SPECIAL_KEYS.backspace}
          type="delete"
          isPressed={pressedKey === 'BACKSPACE'}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn('BACKSPACE')}
          onPressOut={handlePressOut}
          width={50}
        />
        <KeyboardKey
          keyData={SPECIAL_KEYS.submit}
          type="submit"
          isPressed={pressedKey === 'SUBMIT'}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn('SUBMIT')}
          onPressOut={handlePressOut}
          width={70}
          label="சமர்ப்பி"
        />
      </View>
    </View>
  );
}

// Individual Key Component
function KeyboardKey({
  keyData,
  type,
  isPressed,
  onPress,
  onPressIn,
  onPressOut,
  width,
  label,
}) {
  const keyStyles = getKeyStyles(type, isPressed);

  return (
    <TouchableOpacity
      style={[styles.key, keyStyles.container, width && { width }]}
      onPress={() => onPress(keyData)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.7}
    >
      <Text style={[styles.keyText, keyStyles.text]}>
        {label || keyData.char}
      </Text>
    </TouchableOpacity>
  );
}

// Get styles based on key type
function getKeyStyles(type, isPressed) {
  const styles = {
    consonant: {
      container: {
        backgroundColor: isPressed ? '#0f3460' : '#16213e',
      },
      text: { color: '#FFFFFF' },
    },
    vowel: {
      container: {
        backgroundColor: isPressed ? '#2c2c54' : '#1a1a40',
      },
      text: { color: '#FFD93D' },
    },
    vowelSign: {
      container: {
        backgroundColor: isPressed ? '#1e5f74' : '#0f3460',
      },
      text: { color: '#00FFC5' },
    },
    special: {
      container: {
        backgroundColor: isPressed ? '#2c2c54' : '#1a1a40',
      },
      text: { color: '#FF6B6B' },
    },
    space: {
      container: {
        backgroundColor: isPressed ? '#3d3d6b' : '#2c2c54',
      },
      text: { color: '#888888' },
    },
    delete: {
      container: {
        backgroundColor: isPressed ? '#ee5a5a' : '#ff6b6b',
      },
      text: { color: '#FFFFFF' },
    },
    submit: {
      container: {
        backgroundColor: isPressed ? '#c73e54' : '#e94560',
      },
      text: { color: '#FFFFFF' },
    },
  };

  return styles[type] || styles.consonant;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d0d1a',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00FFC5',
    padding: 12,
    marginBottom: 12,
    minHeight: 50,
  },
  inputText: {
    flex: 1,
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
  },
  placeholder: {
    color: '#666666',
    fontStyle: 'italic',
  },
  cursor: {
    width: 2,
    height: 28,
    backgroundColor: '#00FFC5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  key: {
    minWidth: 28,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    paddingHorizontal: 8,
  },
  keyText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
```

### 3. Integration with GameScreen

```javascript
// Usage in GameScreen.js

import TamilKeyboard from '../components/TamilKeyboard';
import { useLanguage } from '../contexts/LanguageContext';

// Inside GameScreen component
const { language } = useLanguage();
const [userAnswer, setUserAnswer] = useState('');

// Render input section based on language
const renderInputSection = () => {
  if (language === 'ta') {
    return (
      <TamilKeyboard
        value={userAnswer}
        onChange={setUserAnswer}
        onSubmit={handleSubmitAnswer}
        visible={true}
        placeholder="உங்கள் பதிலை தட்டச்சு செய்யவும்..."
      />
    );
  }

  // English - use default TextInput
  return (
    <TextInput
      style={styles.input}
      value={userAnswer}
      onChangeText={setUserAnswer}
      placeholder="Type your answer..."
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};
```

---

## 🔄 Character Composition Logic

### Tamil Text Composition Rules

Tamil script requires special handling for character composition:

```javascript
// src/components/TamilKeyboard/tamilComposer.js

/**
 * Tamil Unicode Ranges:
 * - Vowels: U+0B85 to U+0B94
 * - Consonants: U+0B95 to U+0BB9
 * - Vowel Signs: U+0BBE to U+0BCC
 * - Pulli (Virama): U+0BCD
 */

export const TAMIL_UNICODE = {
  VOWEL_START: 0x0B85,
  VOWEL_END: 0x0B94,
  CONSONANT_START: 0x0B95,
  CONSONANT_END: 0x0BB9,
  VOWEL_SIGN_START: 0x0BBE,
  VOWEL_SIGN_END: 0x0BCC,
  PULLI: 0x0BCD, // Virama - removes inherent 'a' vowel
};

/**
 * Check if character is a Tamil consonant
 */
export function isConsonant(char) {
  const code = char.charCodeAt(0);
  return code >= TAMIL_UNICODE.CONSONANT_START && 
         code <= TAMIL_UNICODE.CONSONANT_END;
}

/**
 * Check if character is a Tamil vowel sign
 */
export function isVowelSign(char) {
  const code = char.charCodeAt(0);
  return code >= TAMIL_UNICODE.VOWEL_SIGN_START && 
         code <= TAMIL_UNICODE.VOWEL_SIGN_END;
}

/**
 * Check if the last character can accept a vowel sign
 */
export function canAcceptVowelSign(text) {
  if (!text || text.length === 0) return false;
  const lastChar = text[text.length - 1];
  return isConsonant(lastChar);
}

/**
 * Compose Tamil text properly
 * Handles vowel signs attaching to consonants
 */
export function composeTamilText(currentText, newChar) {
  // If new character is a vowel sign, attach to last consonant
  if (isVowelSign(newChar) && canAcceptVowelSign(currentText)) {
    // Vowel sign will automatically combine with the consonant
    return currentText + newChar;
  }
  
  // Normal append
  return currentText + newChar;
}
```

---

## 🎮 User Experience Features

### 1. Key Press Feedback

```javascript
// Visual and haptic feedback on key press
const handleKeyPressWithFeedback = async (key) => {
  // Visual feedback
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }),
  ]).start();

  // Haptic feedback (iOS & Android)
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  // Sound feedback (optional)
  if (soundEnabled) {
    await playKeySound();
  }
};
```

### 2. Auto-Suggestions (Optional Enhancement)

```javascript
// Show word suggestions based on input
const [suggestions, setSuggestions] = useState([]);

useEffect(() => {
  if (userAnswer.length >= 2) {
    const matches = tamilWords.filter(word => 
      word.startsWith(userAnswer)
    ).slice(0, 3);
    setSuggestions(matches);
  } else {
    setSuggestions([]);
  }
}, [userAnswer]);

// Render suggestions bar
const renderSuggestions = () => (
  <View style={styles.suggestionsBar}>
    {suggestions.map((word, index) => (
      <TouchableOpacity 
        key={index}
        onPress={() => setUserAnswer(word)}
        style={styles.suggestionChip}
      >
        <Text style={styles.suggestionText}>{word}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
```

### 3. Keyboard Toggle

```javascript
// Toggle between Tamil keyboard and device keyboard
const [useTamilKeyboard, setUseTamilKeyboard] = useState(true);

const renderKeyboardToggle = () => (
  <TouchableOpacity 
    style={styles.toggleButton}
    onPress={() => setUseTamilKeyboard(!useTamilKeyboard)}
  >
    <Text style={styles.toggleText}>
      {useTamilKeyboard ? 'Device Keyboard' : 'Tamil Keyboard'}
    </Text>
  </TouchableOpacity>
);
```

---

## 📱 Responsive Design

### Screen Size Adaptations

```javascript
const { width, height } = Dimensions.get('window');

const getResponsiveStyles = () => {
  const isSmallScreen = width < 360;
  const isMediumScreen = width >= 360 && width < 400;
  const isLargeScreen = width >= 400;

  return {
    keyWidth: isSmallScreen ? 26 : isMediumScreen ? 30 : 34,
    keyHeight: isSmallScreen ? 40 : isMediumScreen ? 44 : 48,
    fontSize: isSmallScreen ? 18 : isMediumScreen ? 20 : 22,
    padding: isSmallScreen ? 4 : isMediumScreen ? 6 : 8,
  };
};
```

### Landscape Mode Support

```javascript
// Adjust keyboard layout for landscape
const [orientation, setOrientation] = useState('portrait');

useEffect(() => {
  const subscription = Dimensions.addEventListener('change', ({ window }) => {
    setOrientation(window.width > window.height ? 'landscape' : 'portrait');
  });
  return () => subscription.remove();
}, []);

const keyboardHeight = orientation === 'landscape' 
  ? height * 0.6 
  : height * 0.45;
```

---

## 🧪 Testing Checklist

### Functional Tests
- [ ] All Tamil characters render correctly
- [ ] Vowel signs combine with consonants properly
- [ ] Backspace removes one character at a time
- [ ] Clear button removes all text
- [ ] Submit button triggers onSubmit callback
- [ ] Space key adds space between words
- [ ] Pulli (்) works correctly with consonants
- [ ] Maximum length validation works

### Visual Tests
- [ ] Keys are properly sized on all screen sizes
- [ ] Text is readable on all key types
- [ ] Pressed state shows visual feedback
- [ ] Keyboard doesn't overlap game content
- [ ] Input display shows typed text correctly
- [ ] Cursor blinks animation works

### Performance Tests
- [ ] No lag when pressing keys rapidly
- [ ] Haptic feedback is instant
- [ ] Keyboard appears smoothly
- [ ] Memory usage is stable

### Device Tests
- [ ] iOS simulator/device
- [ ] Android emulator/device
- [ ] Web browser (if applicable)
- [ ] Different screen sizes (phone, tablet)

---

## 📅 Implementation Timeline

### Week 1: Core Implementation
- Day 1-2: Create keyboard data structures and constants
- Day 3-4: Build TamilKeyboard component with basic functionality
- Day 5: Implement character composition logic

### Week 2: Polish & Integration
- Day 1-2: Add haptic feedback and animations
- Day 3: Integrate with GameScreen
- Day 4: Responsive design adjustments
- Day 5: Testing and bug fixes

### Week 3: Enhancement (Optional)
- Auto-suggestions feature
- Sound effects
- Keyboard themes/customization
- Performance optimization

---

## 🔗 References

- [Tamil Unicode Chart](https://unicode.org/charts/PDF/U0B80.pdf)
- [React Native Keyboard Handling](https://reactnative.dev/docs/keyboard)
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- [Tamil Script Wikipedia](https://en.wikipedia.org/wiki/Tamil_script)

---

## ✅ Summary

This design document provides a complete blueprint for implementing an on-screen Tamil keyboard in the Action-Reaction game. The keyboard will:

1. **Eliminate keyboard switching** - Users don't need to change device settings
2. **Provide seamless experience** - Automatic display when Tamil is selected
3. **Support all Tamil characters** - Vowels, consonants, and vowel signs
4. **Include game-optimized features** - Large keys, haptic feedback, quick submit
5. **Be responsive** - Works on all screen sizes and orientations

Proceed to implementation when ready! 🚀
