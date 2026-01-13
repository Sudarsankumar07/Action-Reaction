/**
 * Tamil On-Screen Keyboard Component
 * 
 * Traditional Layout (Option B):
 * Row 1: அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ ஃ  (Vowels + Aytham)
 * Row 2: க ங ச ஞ ட ண த ந ப ம         (Consonants Part 1)
 * Row 3: ய ர ல வ ழ ள ற ன              (Consonants Part 2)
 * Row 4: ா ி ீ ு ூ ெ ே ை ொ ோ ௌ ்    (Vowel Signs + Pulli)
 * Row 5: [SPACE] [⌫] [CLEAR] [✓]      (Action Keys)
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  TAMIL_VOWELS,
  TAMIL_CONSONANTS_ROW1,
  TAMIL_CONSONANTS_ROW2,
  TAMIL_VOWEL_SIGNS,
  SPECIAL_KEYS,
  isConsonant,
  isVowelSign,
} from './keyboardData';
import { styles, KEYBOARD_COLORS } from './styles';

/**
 * Individual Keyboard Key Component
 */
function KeyboardKey({
  keyData,
  type,
  isPressed,
  onPress,
  onPressIn,
  onPressOut,
  customLabel,
  disabled = false,
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animation on press
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressIn = () => {
    animatePress();
    onPressIn?.();
  };

  // Get styles based on key type
  const getKeyStyle = () => {
    const baseStyle = [styles.key];
    
    switch (type) {
      case 'vowel':
        baseStyle.push(isPressed ? styles.vowelKeyPressed : styles.vowelKey);
        break;
      case 'consonant':
        baseStyle.push(isPressed ? styles.consonantKeyPressed : styles.consonantKey);
        break;
      case 'vowelSign':
        baseStyle.push(isPressed ? styles.vowelSignKeyPressed : styles.vowelSignKey);
        break;
      case 'special':
        baseStyle.push(isPressed ? styles.specialKeyPressed : styles.specialKey);
        break;
      case 'space':
        baseStyle.push(styles.spaceKey);
        if (isPressed) baseStyle.push(styles.spaceKeyPressed);
        break;
      case 'delete':
        baseStyle.push(styles.deleteKey);
        if (isPressed) baseStyle.push(styles.deleteKeyPressed);
        break;
      case 'clear':
        baseStyle.push(styles.clearKey);
        if (isPressed) baseStyle.push(styles.clearKeyPressed);
        break;
      case 'submit':
        baseStyle.push(styles.submitKey);
        if (isPressed) baseStyle.push(styles.submitKeyPressed);
        break;
      default:
        baseStyle.push(styles.consonantKey);
    }

    if (disabled) {
      baseStyle.push({ opacity: 0.5 });
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.keyText];
    
    switch (type) {
      case 'vowel':
        baseStyle.push(styles.vowelKeyText);
        break;
      case 'consonant':
        baseStyle.push(styles.consonantKeyText);
        break;
      case 'vowelSign':
        baseStyle.push(styles.vowelSignKeyText);
        break;
      case 'special':
        baseStyle.push(styles.specialKeyText);
        break;
      case 'space':
        baseStyle.push(styles.spaceKeyText);
        break;
      case 'delete':
        baseStyle.push(styles.deleteKeyText);
        break;
      case 'clear':
        baseStyle.push(styles.clearKeyText);
        break;
      case 'submit':
        baseStyle.push(styles.submitKeyText);
        break;
      default:
        baseStyle.push(styles.consonantKeyText);
    }

    return baseStyle;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={getKeyStyle()}
        onPress={() => !disabled && onPress(keyData)}
        onPressIn={handlePressIn}
        onPressOut={onPressOut}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={getTextStyle()}>
          {customLabel || keyData.char}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/**
 * Main Tamil Keyboard Component
 */
export default function TamilKeyboard({
  value = '',
  onChange,
  onSubmit,
  visible = true,
  showInput = true,
  maxLength = 30,
  placeholder = 'தட்டச்சு செய்யவும்...',
  disabled = false,
}) {
  const [pressedKey, setPressedKey] = useState(null);
  const cursorAnim = useRef(new Animated.Value(1)).current;

  // Cursor blinking animation
  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();
    return () => blink.stop();
  }, []);

  // Handle key press with haptic feedback
  const handleKeyPress = useCallback(async (keyData) => {
    if (disabled) return;

    // Haptic feedback
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (e) {
        // Haptics not available
      }
    }

    const { code, char, combinesWith, isCompound } = keyData;

    switch (code) {
      case 'BACKSPACE':
        if (value.length > 0) {
          // Handle backspace - need to handle combining characters properly
          // Use string iterator to get actual grapheme clusters
          const chars = [...value];
          chars.pop();
          onChange(chars.join(''));
        }
        break;
      case 'CLEAR':
        onChange('');
        break;
      case 'SUBMIT':
        if (value.trim().length > 0) {
          onSubmit?.(value);
        }
        break;
      case 'SPACE':
        if (value.length < maxLength) {
          onChange(value + ' ');
        }
        break;
      default:
        if (value.length < maxLength) {
          // Handle Tamil character composition
          // Vowel signs should only be added after consonants
          if (combinesWith === 'consonant') {
            // Check if the last character is a consonant that can accept a vowel sign
            const chars = [...value];
            const lastChar = chars.length > 0 ? chars[chars.length - 1] : '';
            
            if (lastChar && isConsonant(lastChar)) {
              // Append the vowel sign (it will combine with the consonant)
              onChange(value + code);
            } else {
              // If no consonant to combine with, show a placeholder consonant
              // or just ignore (user needs to type consonant first)
              // For better UX, we'll still add it but it may not display correctly
              onChange(value + code);
            }
          } else {
            // Regular character (vowel, consonant, etc.)
            onChange(value + char);
          }
        }
        break;
    }
  }, [value, onChange, onSubmit, maxLength, disabled]);

  // Handle key press start (for visual feedback)
  const handlePressIn = useCallback((keyCode) => {
    setPressedKey(keyCode);
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
          <Text style={styles.inputText} numberOfLines={1}>
            {value ? (
              value
            ) : (
              <Text style={styles.placeholder}>{placeholder}</Text>
            )}
          </Text>
          <Animated.View 
            style={[
              styles.cursor, 
              { opacity: cursorAnim }
            ]} 
          />
        </View>
      )}

      {/* Row 1: Vowels + Aytham */}
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
            disabled={disabled}
          />
        ))}
      </View>

      {/* Row 2: Consonants Part 1 */}
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
            disabled={disabled}
          />
        ))}
      </View>

      {/* Row 3: Consonants Part 2 */}
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
            disabled={disabled}
          />
        ))}
      </View>

      {/* Row 4: Vowel Signs + Pulli */}
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
            disabled={disabled}
          />
        ))}
      </View>

      {/* Row 5: Action Keys */}
      <View style={styles.actionRow}>
        {/* Space Key */}
        <KeyboardKey
          keyData={SPECIAL_KEYS.space}
          type="space"
          isPressed={pressedKey === 'SPACE'}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn('SPACE')}
          onPressOut={handlePressOut}
          customLabel="Space"
          disabled={disabled}
        />

        {/* Backspace Key */}
        <KeyboardKey
          keyData={SPECIAL_KEYS.backspace}
          type="delete"
          isPressed={pressedKey === 'BACKSPACE'}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn('BACKSPACE')}
          onPressOut={handlePressOut}
          disabled={disabled}
        />

        {/* Clear Key */}
        <KeyboardKey
          keyData={SPECIAL_KEYS.clear}
          type="clear"
          isPressed={pressedKey === 'CLEAR'}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn('CLEAR')}
          onPressOut={handlePressOut}
          customLabel="Clear"
          disabled={disabled}
        />

        {/* Submit Key */}
        <KeyboardKey
          keyData={SPECIAL_KEYS.submit}
          type="submit"
          isPressed={pressedKey === 'SUBMIT'}
          onPress={handleKeyPress}
          onPressIn={() => handlePressIn('SUBMIT')}
          onPressOut={handlePressOut}
          customLabel="சமர்ப்பி"
          disabled={disabled || !value.trim()}
        />
      </View>
    </View>
  );
}
