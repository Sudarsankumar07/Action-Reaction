import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  Vibration,
  Platform,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, topicConfig, borderRadius } from '../theme';
import { getRandomWord } from '../data/words';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  generateHints, 
  scrambleWord, 
  generateBlanksPattern, 
  emojiHints, 
  calculateScore 
} from '../data/hints';
import hintService from '../services/hintService';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function GameScreen({ route, navigation }) {
  const { topic, mode = 'multiplayer' } = route.params;
  const config = topicConfig[topic];

  const { language } = useLanguage();

  // Game state
  const [currentWord, setCurrentWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gameEnded, setGameEnded] = useState(false);

  // Single-player specific state
  const [currentHints, setCurrentHints] = useState([]);
  const [hintsShown, setHintsShown] = useState(0);
  const [wordStartTime, setWordStartTime] = useState(Date.now());
  const [scrambledWord, setScrambledWord] = useState('');
  const [displayPattern, setDisplayPattern] = useState('');
  const [combo, setCombo] = useState(0);
  const [memoryWords, setMemoryWords] = useState([]);
  const [memoryPhase, setMemoryPhase] = useState('display'); // 'display', 'recall', 'result'
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [memoryCorrectWords, setMemoryCorrectWords] = useState([]); // Correctly recalled words
  const [memoryAttempts, setMemoryAttempts] = useState(0); // Number of recall attempts
  const [memoryResultMessage, setMemoryResultMessage] = useState(''); // Result message
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [loadingHints, setLoadingHints] = useState(false);

  // Use refs to track current scores for navigation
  const scoreRef = useRef(0);
  const passedRef = useRef(0);
  const gameEndedRef = useRef(false); // Track game ended state

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const feedbackAnim = useRef(new Animated.Value(0)).current;
  const [feedbackType, setFeedbackType] = useState(null);

  // Accelerometer state
  const [subscription, setSubscription] = useState(null);
  const lastAction = useRef(Date.now());
  const sensitivity = 0.7; // Adjusted for flip detection (lower value for z-axis)
  const isProcessing = useRef(false); // Add flag to prevent multiple triggers

  // Load timer setting from AsyncStorage with validation and focus effect
  useFocusEffect(
    React.useCallback(() => {
      async function loadTimer() {
        try {
          const savedTimer = await AsyncStorage.getItem('game_timer');
          if (savedTimer) {
            const timerValue = parseInt(savedTimer, 10);
            
            // Validate timer value (must be a number between 1 and 600 seconds)
            if (!isNaN(timerValue) && timerValue >= 15 && timerValue <= 600) {
              setTimeLeft(timerValue);
            } else {
              // Invalid value - fall back to default
              console.warn('Invalid timer value from storage:', timerValue, '- using default 60s');
              setTimeLeft(60);
            }
          }
        } catch (error) {
          console.error('Error loading timer setting:', error);
          // On error, use default value
          setTimeLeft(60);
        }
      }
      
      // Only load timer if game hasn't started yet
      if (!gameStarted) {
        loadTimer();
      }
    }, [gameStarted])
  );

  // Lock orientation based on mode
  useEffect(() => {
    async function lockOrientation() {
      if (!isWeb) {
        try {
          if (mode === 'multiplayer') {
            // Landscape for multiplayer (phone on forehead)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          } else {
            // Portrait for single-player modes
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          }
        } catch (error) {
          console.log('Error locking orientation:', error);
        }
      }
    }
    lockOrientation();

    // Unlock orientation when leaving
    return () => {
      if (!isWeb) {
        ScreenOrientation.unlockAsync();
      }
    };
  }, [mode]);

  useEffect(() => {
    // Start countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      // Start timer (skip for practice mode)
      if (mode !== 'practice') {
        const timerInterval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerInterval);
              endGame();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        // Only start accelerometer for multiplayer mode
        if (mode === 'multiplayer') {
          _subscribe();
        }

        return () => {
          clearInterval(timerInterval);
          _unsubscribe();
        };
      } else {
        // Practice mode - no timer
        return () => {
          _unsubscribe();
        };
      }
    }
  }, [gameStarted, gameEnded]);

  const startGame = () => {
    setGameStarted(true);
    
    if (mode === 'memory') {
      startMemoryChallenge();
    } else {
      loadNextWord();
    }
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startMemoryChallenge = () => {
    // Generate 3-5 random words for memory challenge
    const wordCount = 3 + Math.floor(Math.random() * 3); // 3, 4, or 5 words
    const words = [];
    const tempUsed = []; // Track words for this challenge only
    
    for (let i = 0; i < wordCount; i++) {
      // Pass combined list (usedWords + tempUsed) to avoid any duplicates
      const word = getRandomWord(topic, [...usedWords, ...tempUsed], language);
      if (word) {
        words.push(word);
        tempUsed.push(word);
      } else {
        // No more words available, break early to prevent undefined values
        console.warn('Not enough words available for memory challenge');
        break;
      }
    }
    
    // Check if we have at least 3 words for a valid memory game
    if (words.length < 3) {
      console.error('Insufficient words for memory game, ending game');
      endGame();
      return;
    }
    
    console.log('Memory Challenge - Words to show:', words);
    
    setMemoryWords(words);
    setMemoryPhase('display');
    setMemoryIndex(0);
    setMemoryCorrectWords([]);
    setMemoryAttempts(0);
    setUserAnswer('');
    setShowAnswer(false);
    
    // Add words to used words list
    setUsedWords(prev => [...prev, ...words]);
    
    // Show words one by one
    const showNextWord = (index) => {
      if (index < words.length) {
        setCurrentWord(words[index]);
        setMemoryIndex(index);
        setTimeout(() => showNextWord(index + 1), 2000);
      } else {
        // Move to recall phase
        setMemoryPhase('recall');
        setMemoryIndex(0);
        setCurrentWord('');
      }
    };
    showNextWord(0);
  };

  const loadNextWord = async () => {
    // Get the next word first
    const word = getRandomWord(topic, usedWords, language);
    
    if (!word) {
      // No more words available
      console.log('No more words available! Ending game.');
      endGame();
      return;
    }
    
    console.log('Next word:', word);
    console.log('Used words count:', usedWords.length);
    
    // Update state
    setCurrentWord(word);
    setWordStartTime(Date.now());
    setHintsShown(0);
    setUserAnswer('');
    setShowAnswer(false);
    
    // Add word to used words list
    setUsedWords(prev => [...prev, word]);
    
    // Setup based on mode
    if (mode === 'ai-hints') {
      setLoadingHints(true);
      try {
        const hints = await hintService.getHints(word, topic);
        setCurrentHints(hints);
        console.log('Loaded AI hints:', hints);
      } catch (error) {
        console.error('Error loading hints:', error);
        // Fallback to static hints
        const fallbackHints = generateHints(word, topic);
        setCurrentHints(fallbackHints);
      } finally {
        setLoadingHints(false);
      }
    } else if (mode === 'time-attack') {
      const randomMode = Math.random();
      if (randomMode < 0.33) {
        setScrambledWord(scrambleWord(word));
        setDisplayPattern('scrambled');
      } else if (randomMode < 0.66) {
        setDisplayPattern('emoji');
      } else {
        setDisplayPattern('blanks');
      }
    }
    
    // Animate word appearance
    scaleAnim.setValue(0.8);
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Auto-show hints for AI Hints mode
  useEffect(() => {
    if (mode === 'ai-hints' && gameStarted && !gameEnded && currentWord && hintsShown < 4) {
      // Each hint shows 3 seconds after the previous one
      const timer = setTimeout(() => {
        setHintsShown(prev => prev + 1);
      }, 4000); // 3 seconds delay for each hint
      
      return () => clearTimeout(timer);
    }
  }, [mode, gameStarted, gameEnded, currentWord, hintsShown]);

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    
    // Memory game recall logic
    if (mode === 'memory' && memoryPhase === 'recall') {
      handleMemoryRecall();
      return;
    }
    
    // Regular game modes
    const isCorrect = userAnswer.toLowerCase().trim() === currentWord.toLowerCase();
    
    if (isCorrect) {
      handleCorrect();
    } else {
      // Show the correct answer briefly, then move to next
      setShowAnswer(true);
      showFeedback('pass');
      setPassed(prev => {
        const newPassed = prev + 1;
        passedRef.current = newPassed;
        return newPassed;
      });
      
      if (mode === 'time-attack') {
        setCombo(0);
      }
      
      setTimeout(() => {
        loadNextWord();
      }, 2000);
    }
  };
  
  // Handle memory game recall
  const handleMemoryRecall = () => {
    const userInput = userAnswer.toLowerCase().trim();
    
    // Check if word matches any shown word
    let found = false;
    for (const word of memoryWords) {
      if (word.toLowerCase() === userInput) {
        // Check if already recalled
        if (memoryCorrectWords.includes(word)) {
          showFeedback('already');
          setUserAnswer('');
          return;
        }
        // Correct recall!
        found = true;
        setMemoryCorrectWords(prev => [...prev, word]);
        showFeedback('correct');
        break;
      }
    }
    
    if (!found) {
      showFeedback('pass');
    }
    
    // Track attempt
    const newAttempts = memoryAttempts + 1;
    setMemoryAttempts(newAttempts);
    setUserAnswer('');
    
    // Check if all words recalled or max attempts reached
    const newCorrectCount = found ? memoryCorrectWords.length + 1 : memoryCorrectWords.length;
    
    if (newCorrectCount === memoryWords.length) {
      // Perfect recall!
      setTimeout(() => showMemoryResults(newCorrectCount), 500);
    } else if (newAttempts >= memoryWords.length * 2) {
      // Max attempts reached (2x word count)
      setTimeout(() => showMemoryResults(newCorrectCount), 500);
    }
  };
  
  // Show memory game results
  const showMemoryResults = (correctCount) => {
    setMemoryPhase('result');
    
    const total = memoryWords.length;
    const percentage = (correctCount / total) * 100;
    
    // Calculate points
    let points = 0;
    if (percentage === 100) {
      points = 5; // Perfect recall
      setMemoryResultMessage(`🎉 Perfect! ${correctCount}/${total} words!`);
    } else if (percentage >= 66) {
      points = 3; // Good recall
      setMemoryResultMessage(`👍 Great! ${correctCount}/${total} words!`);
    } else if (percentage >= 33) {
      points = 1; // Partial recall
      setMemoryResultMessage(`😊 Good try! ${correctCount}/${total} words!`);
    } else {
      points = 0; // Poor recall
      setMemoryResultMessage(`💪 Keep trying! ${correctCount}/${total} words!`);
    }
    
    // Add score
    setScore(prev => {
      const newScore = prev + points;
      scoreRef.current = newScore;
      return newScore;
    });
    
    console.log(`Memory Round Complete: ${correctCount}/${total} words, +${points} points`);
    
    // Start next round after showing results (only if game hasn't ended)
    setTimeout(() => {
      if (!gameEndedRef.current) {
        startMemoryChallenge();
      }
    }, 3000);
  };

  const handleCorrect = () => {
    if (gameEndedRef.current || isProcessing.current) {
      console.log('Ignoring correct - game ended or processing');
      return;
    }
    
    const now = Date.now();
    if (now - lastAction.current < 1500) return; // Increased debounce to 1.5 seconds
    lastAction.current = now;
    isProcessing.current = true;

    console.log('Correct! Current score:', scoreRef.current);
    
    // Calculate score based on mode
    let points = 1;
    if (mode === 'ai-hints') {
      const timeSpent = Math.floor((Date.now() - wordStartTime) / 1000);
      points = calculateScore(hintsShown, timeSpent, true);
    } else if (mode === 'time-attack') {
      points = 1 + Math.floor(combo / 3); // Bonus for combo
      setCombo(prev => prev + 1);
    }
    
    setScore(prevScore => {
      const newScore = prevScore + points;
      scoreRef.current = newScore;
      console.log('New score:', newScore);
      return newScore;
    });
    
    showFeedback('correct');
    if (!isWeb) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    loadNextWord();
    
    // Reset processing flag after animation
    setTimeout(() => {
      if (!gameEndedRef.current) {
        isProcessing.current = false;
      }
    }, 1000);
  };

  const handlePass = () => {
    if (gameEndedRef.current || isProcessing.current) {
      console.log('Ignoring pass - game ended or processing');
      return;
    }
    
    const now = Date.now();
    if (now - lastAction.current < 1500) return; // Increased debounce to 1.5 seconds
    lastAction.current = now;
    isProcessing.current = true;

    console.log('Pass! Current passed:', passedRef.current);
    
    // Reset combo for time-attack mode
    if (mode === 'time-attack') {
      setCombo(0);
    }
    
    setPassed(prevPassed => {
      const newPassed = prevPassed + 1;
      passedRef.current = newPassed;
      console.log('New passed:', newPassed);
      return newPassed;
    });
    showFeedback('pass');
    if (!isWeb) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    loadNextWord();
    
    // Reset processing flag after animation
    setTimeout(() => {
      if (!gameEndedRef.current) {
        isProcessing.current = false;
      }
    }, 1000);
  };

  const showFeedback = (type) => {
    setFeedbackType(type);
    feedbackAnim.setValue(0);
    
    Animated.sequence([
      Animated.timing(feedbackAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(feedbackAnim, {
        toValue: 0,
        duration: 300,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start(() => setFeedbackType(null));
  };

  const endGame = () => {
    console.log('endGame called - stopping accelerometer');
    gameEndedRef.current = true; // Set ref immediately
    setGameEnded(true);
    isProcessing.current = true; // Block all further processing
    _unsubscribe();
    
    const finalScore = scoreRef.current;
    const finalPassed = passedRef.current;
    const finalTotal = finalScore + finalPassed;
    
    console.log('Game ended. Final score:', finalScore, 'passed:', finalPassed, 'total:', finalTotal);
    
    if (!isWeb) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    setTimeout(() => {
      navigation.replace('Scoreboard', {
        score: finalScore,
        passed: finalPassed,
        total: finalTotal,
        topic,
        mode,
      });
    }, 1000);
  };

  const _subscribe = () => {
    // Don't use accelerometer on web
    if (isWeb) return;
    
    Accelerometer.setUpdateInterval(200); // Increased to 200ms to reduce sensitivity
    
    const sub = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      
      // Check game state - use refs that don't trigger re-renders
      if (isProcessing.current) {
        console.log('Skipping - already processing');
        return;
      }
      
      // In landscape mode, z-axis detects phone flip
      // When phone is flipped face-down (correct): z will be strongly negative (< -0.7)
      // When phone is flipped face-up (pass): z will be strongly positive (> 0.7)
      
      if (z < -sensitivity) {
        // Phone flipped face-down = CORRECT
        console.log('Detected flip down for CORRECT');
        handleCorrect();
      } else if (z > sensitivity) {
        // Phone flipped face-up = PASS
        console.log('Detected flip up for PASS');
        handlePass();
      }
    });
    
    setSubscription(sub);
  };

  const _unsubscribe = () => {
    console.log('Unsubscribing accelerometer');
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  if (countdown > 0) {
    return (
      <LinearGradient colors={config.gradient} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{countdown}</Text>
          <Text style={styles.countdownLabel}>Get Ready!</Text>
        </View>
      </LinearGradient>
    );
  }

  if (gameEnded) {
    return (
      <LinearGradient colors={config.gradient} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.endContainer}>
          <Ionicons name="checkmark-circle" size={80} color={colors.white} />
          <Text style={styles.endText}>Time's Up!</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={config.gradient} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => {
          gameEndedRef.current = true; // Set ref immediately
          setGameEnded(true); // Stop the game
          _unsubscribe(); // Stop accelerometer
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={28} color={colors.white} />
      </TouchableOpacity>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Row: Timer and Score */}
          <View style={styles.topRow}>
        {mode !== 'practice' && (
          <View style={styles.timerContainer}>
            <View style={[styles.timerCircle, { borderColor: 'rgba(255,255,255,0.3)' }]}>
              <Text style={styles.timerText}>{timeLeft}</Text>
            </View>
            <Text style={styles.timerLabel}>seconds</Text>
          </View>
        )}

        <View style={styles.scoreContainer}>
          <View style={styles.scoreItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
          {mode === 'time-attack' && combo > 0 && (
            <View style={[styles.scoreItem, { backgroundColor: 'rgba(255,215,0,0.3)' }]}>
              <Ionicons name="flame" size={20} color="#FFD700" />
              <Text style={styles.scoreText}>{combo}x</Text>
            </View>
          )}
          <View style={styles.scoreItem}>
            <Ionicons name="close-circle" size={20} color={colors.white} />
            <Text style={styles.scoreText}>{passed}</Text>
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Left Side Instructions (only for multiplayer) */}
        {!isWeb && mode === 'multiplayer' && (
          <View style={styles.sideInstructionContainer}>
            <Ionicons name="phone-portrait" size={40} color="rgba(255,255,255,0.8)" style={{ transform: [{ rotate: '180deg' }] }} />
            <Text style={styles.sideInstructionText}>Flip{'\n'}Face-Down{'\n\n'}✓ Correct</Text>
          </View>
        )}

        {/* Word Display */}
        <Animated.View 
          style={[
            styles.wordContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Display based on mode */}
          {mode === 'memory' && memoryPhase === 'display' ? (
            <View style={styles.timeAttackContainer}>
              <Ionicons name="eye" size={80} color="rgba(255,255,255,0.8)" />
              <Text style={styles.modeLabel}>Word {memoryIndex + 1}/{memoryWords.length}</Text>
              <Text style={styles.word}>{currentWord}</Text>
              <Text style={styles.hintText}>Memorize this word!</Text>
            </View>
          ) : mode === 'memory' && memoryPhase === 'recall' ? (
            <View style={styles.timeAttackContainer}>
              <Ionicons name="bulb-outline" size={80} color="rgba(255,255,255,0.8)" />
              <Text style={styles.modeLabel}>Recall the Words!</Text>
              <Text style={styles.hintText}>Type the words you remember ({memoryCorrectWords.length}/{memoryWords.length})</Text>
              
              {/* Show recalled words */}
              <View style={styles.memoryListContainer}>
                {memoryWords.map((word, index) => {
                  const isRecalled = memoryCorrectWords.includes(word);
                  return (
                    <View key={index} style={styles.memoryWordItem}>
                      <Ionicons 
                        name={isRecalled ? "checkmark-circle" : "ellipse-outline"} 
                        size={20} 
                        color={isRecalled ? colors.success : "rgba(255,255,255,0.3)"} 
                      />
                      <Text style={[styles.memoryWordText, isRecalled && styles.memoryWordRecalled]}>
                        {isRecalled ? word : '?????'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : mode === 'memory' && memoryPhase === 'result' ? (
            <View style={styles.timeAttackContainer}>
              <Ionicons name="trophy" size={80} color="rgba(255,255,255,0.8)" />
              <Text style={styles.word}>{memoryResultMessage}</Text>
              
              {/* Show all words with status */}
              <View style={styles.memoryListContainer}>
                {memoryWords.map((word, index) => {
                  const isRecalled = memoryCorrectWords.includes(word);
                  return (
                    <View key={index} style={styles.memoryWordItem}>
                      <Ionicons 
                        name={isRecalled ? "checkmark-circle" : "close-circle"} 
                        size={20} 
                        color={isRecalled ? colors.success : colors.error} 
                      />
                      <Text style={styles.memoryWordText}>{word}</Text>
                      {!isRecalled && <Text style={styles.memoryMissed}>(missed)</Text>}
                    </View>
                  );
                })}
              </View>
              
              <Text style={styles.hintTimer}>Loading next round...</Text>
            </View>
          ) : mode === 'ai-hints' ? (
            <View style={styles.timeAttackContainer}>
              <Ionicons name="help-circle-outline" size={80} color="rgba(255,255,255,0.8)" />
              <Text style={styles.modeLabel}>Use the hints to guess the word!</Text>
              
              {/* AI Hints Display */}
              {loadingHints ? (
                <View style={styles.hintsContainer}>
                  <Text style={styles.hintTimer}>Loading AI hints...</Text>
                </View>
              ) : hintsShown > 0 ? (
                <View style={styles.hintsContainer}>
                  {currentHints.slice(0, hintsShown).map((hint, index) => (
                    <View key={index} style={styles.hintItem}>
                      <Ionicons name="bulb" size={16} color="rgba(255,255,255,0.9)" />
                      <Text style={styles.hintText}>{hint || ''}</Text>
                    </View>
                  ))}
                  {hintsShown < 4 && (
                    <Text style={styles.hintTimer}>Next hint coming soon...</Text>
                  )}
                </View>
              ) : (
                <View style={styles.hintsContainer}>
                  <Text style={styles.hintTimer}>First hint coming in 3 seconds...</Text>
                </View>
              )}
            </View>
          ) : mode === 'time-attack' && displayPattern === 'scrambled' ? (
            <View style={styles.timeAttackContainer}>
              <Text style={styles.modeLabel}>Unscramble the letters:</Text>
              <Text style={styles.word}>{scrambledWord}</Text>
            </View>
          ) : mode === 'time-attack' && displayPattern === 'emoji' ? (
            <View style={styles.timeAttackContainer}>
              <Text style={styles.emojiHint}>{emojiHints[currentWord] || '❓'}</Text>
              <Text style={styles.modeLabel}>What word does this emoji represent?</Text>
            </View>
          ) : mode === 'time-attack' && displayPattern === 'blanks' ? (
            <View style={styles.timeAttackContainer}>
              <Text style={styles.modeLabel}>Fill in the blanks:</Text>
              <Text style={styles.word}>{generateBlanksPattern(currentWord)}</Text>
            </View>
          ) : (
            <Text style={styles.word}>{currentWord}</Text>
          )}
        </Animated.View>

        {/* Right Side Instructions (only for multiplayer) */}
        {!isWeb && mode === 'multiplayer' && (
          <View style={styles.sideInstructionContainer}>
            <Ionicons name="phone-portrait" size={40} color="rgba(255,255,255,0.8)" />
            <Text style={styles.sideInstructionText}>Flip{'\n'}Face-Up{'\n\n'}✗ Pass</Text>
          </View>
        )}
      </View>

      {/* Single-player Input Controls */}
      {mode !== 'multiplayer' && mode !== 'practice' && !(mode === 'memory' && (memoryPhase === 'display' || memoryPhase === 'result')) && (
        <View style={styles.inputContainer}>
          {showAnswer && (
            <View style={styles.answerReveal}>
              <Text style={styles.answerLabel}>Correct Answer:</Text>
              <Text style={styles.answerText}>{currentWord}</Text>
            </View>
          )}
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={userAnswer}
              onChangeText={setUserAnswer}
              placeholder="Type your answer..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSubmitAnswer}
              editable={!showAnswer}
            />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitAnswer}
              disabled={!userAnswer.trim() || showAnswer}
            >
              <Ionicons name="checkmark-circle" size={32} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => {
              // Memory game: finish recall and show results
              if (mode === 'memory' && memoryPhase === 'recall') {
                showMemoryResults(memoryCorrectWords.length);
                return;
              }
              
              // Other modes: skip to next word
              setShowAnswer(true);
              showFeedback('pass');
              setPassed(prev => prev + 1);
              passedRef.current = passedRef.current + 1;
              if (mode === 'time-attack') setCombo(0);
              setTimeout(() => loadNextWord(), 2000);
            }}
          >
            <Text style={styles.skipButtonText}>
              {mode === 'memory' && memoryPhase === 'recall' ? 'Finish & Score' : 'Skip'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Practice Mode Controls */}
      {mode === 'practice' && (
        <View style={styles.instructionsContainer}>
          <View style={styles.webButtonsContainer}>
            <TouchableOpacity 
              style={[styles.webButton, { backgroundColor: colors.primary }]}
              onPress={loadNextWord}
            >
              <Ionicons name="arrow-forward" size={32} color={colors.white} />
              <Text style={styles.webButtonText}>Next Word</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Multiplayer Web Controls */}
      {mode === 'multiplayer' && isWeb && (
        <View style={styles.instructionsContainer}>
          <View style={styles.webButtonsContainer}>
            <TouchableOpacity 
              style={[styles.webButton, { backgroundColor: colors.success }]}
              onPress={handleCorrect}
            >
              <Ionicons name="checkmark" size={32} color={colors.white} />
              <Text style={styles.webButtonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.webButton, { backgroundColor: colors.error }]}
              onPress={handlePass}
            >
              <Ionicons name="close" size={32} color={colors.white} />
              <Text style={styles.webButtonText}>Pass</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Feedback Animation */}
      {feedbackType && (
        <Animated.View
          style={[
            styles.feedbackContainer,
            {
              opacity: feedbackAnim,
              transform: [{
                scale: feedbackAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              }],
            },
          ]}
        >
          <View
            style={[
              styles.feedbackCircle,
              { backgroundColor: feedbackType === 'correct' ? colors.success : colors.error },
            ]}
          >
            <Ionicons
              name={feedbackType === 'correct' ? 'checkmark' : 'close'}
              size={80}
              color={colors.white}
            />
          </View>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 120,
    fontWeight: typography.fontWeightExtrabold,
    color: colors.white,
  },
  countdownLabel: {
    fontSize: typography.fontSize2xl,
    color: colors.white,
    marginTop: spacing.lg,
  },
  endContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endText: {
    fontSize: typography.fontSize3xl,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    marginTop: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: spacing.md,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  timerText: {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
  },
  timerLabel: {
    fontSize: typography.fontSizeXs,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  scoreContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    marginLeft: spacing.sm,
  },
  mainContent: {
    minHeight: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  sideInstructionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  sideInstructionText: {
    fontSize: typography.fontSizeXs,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 18,
    fontWeight: typography.fontWeightSemibold,
  },
  wordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  word: {
    fontSize: 48,
    fontWeight: typography.fontWeightExtrabold,
    color: colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  instructionsContainer: {
    paddingBottom: spacing.lg,
  },
  instructionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
  },
  instructionItem: {
    alignItems: 'center',
  },
  instructionText: {
    fontSize: typography.fontSizeSm,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  webButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  webButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    minWidth: 140,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  webButtonText: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    marginLeft: spacing.sm,
  },
  feedbackContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  feedbackCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeAttackContainer: {
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  modeLabel: {
    fontSize: typography.fontSizeLg,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: typography.fontWeightSemibold,
    marginBottom: spacing.sm,
  },
  emojiHint: {
    fontSize: 120,
    marginVertical: spacing.md,
  },
  hintsContainer: {
    marginTop: spacing.xl,
    width: '100%',
    alignSelf: 'stretch',
  },
  hintItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
    width: '100%',
  },
  hintText: {
    fontSize: typography.fontSizeMd,
    color: 'rgba(255,255,255,0.95)',
    flex: 1,
    fontWeight: typography.fontWeightMedium,
    lineHeight: 22,
    flexShrink: 1,
  },
  hintTimer: {
    fontSize: typography.fontSizeSm,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
    backgroundColor: 'transparent',
  },
  answerReveal: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  answerLabel: {
    fontSize: typography.fontSizeSm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  answerText: {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSizeLg,
    color: colors.white,
    paddingVertical: spacing.md,
    fontWeight: typography.fontWeightMedium,
  },
  submitButton: {
    padding: spacing.sm,
  },
  skipButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
  },
  memoryListContainer: {
    marginTop: spacing.lg,
    width: '100%',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  memoryWordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  memoryWordText: {
    fontSize: typography.fontSizeMd,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: typography.fontWeightMedium,
    flex: 1,
  },
  memoryWordRecalled: {
    color: colors.white,
    fontWeight: typography.fontWeightBold,
  },
  memoryMissed: {
    fontSize: typography.fontSizeSm,
    color: 'rgba(255,255,255,0.5)',
    fontStyle: 'italic',
  },
});