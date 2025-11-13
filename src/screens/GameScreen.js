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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, topicConfig, borderRadius } from '../theme';
import { getRandomWord } from '../data/words';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function GameScreen({ route, navigation }) {
  const { topic } = route.params;
  const config = topicConfig[topic];

  // Game state
  const [currentWord, setCurrentWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gameEnded, setGameEnded] = useState(false);

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

  // Lock to landscape on mount
  useEffect(() => {
    async function lockOrientation() {
      if (!isWeb) {
        try {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
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
  }, []);

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
      // Start timer
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

      // Start accelerometer
      _subscribe();

      return () => {
        clearInterval(timerInterval);
        _unsubscribe();
      };
    }
  }, [gameStarted, gameEnded]);

  const startGame = () => {
    setGameStarted(true);
    loadNextWord();
    
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

  const loadNextWord = () => {
    setUsedWords(prevUsedWords => {
      console.log('Used words count:', prevUsedWords.length, 'Words:', prevUsedWords);
      const word = getRandomWord(topic, prevUsedWords);
      if (word) {
        console.log('Next word:', word);
        setCurrentWord(word);
        
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
        
        const newUsedWords = [...prevUsedWords, word];
        console.log('Updated used words:', newUsedWords.length);
        return newUsedWords; // Add word to used list
      } else {
        // No more words
        console.log('No more words available! Ending game.');
        endGame();
        return prevUsedWords;
      }
    });
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
    setScore(prevScore => {
      const newScore = prevScore + 1;
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

      {/* Top Row: Timer and Score */}
      <View style={styles.topRow}>
        <View style={styles.timerContainer}>
          <View style={[styles.timerCircle, { borderColor: 'rgba(255,255,255,0.3)' }]}>
            <Text style={styles.timerText}>{timeLeft}</Text>
          </View>
          <Text style={styles.timerLabel}>seconds</Text>
        </View>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Ionicons name="close-circle" size={20} color={colors.white} />
            <Text style={styles.scoreText}>{passed}</Text>
          </View>
        </View>
      </View>

      {/* Main Content Area: Instructions, Word, Instructions */}
      <View style={styles.mainContent}>
        {/* Left Side Instructions */}
        {!isWeb && (
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
          <Text style={styles.word}>{currentWord}</Text>
        </Animated.View>

        {/* Right Side Instructions */}
        {!isWeb && (
          <View style={styles.sideInstructionContainer}>
            <Ionicons name="phone-portrait" size={40} color="rgba(255,255,255,0.8)" />
            <Text style={styles.sideInstructionText}>Flip{'\n'}Face-Up{'\n\n'}✗ Pass</Text>
          </View>
        )}
      </View>

      {/* Web Button Controls */}
      {isWeb && (
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
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
  },
  word: {
    fontSize: 60,
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
});
