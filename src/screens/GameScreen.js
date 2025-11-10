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

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const feedbackAnim = useRef(new Animated.Value(0)).current;
  const [feedbackType, setFeedbackType] = useState(null);

  // Accelerometer state
  const [subscription, setSubscription] = useState(null);
  const lastAction = useRef(Date.now());
  const sensitivity = 1.5; // Can be adjusted from settings

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
    const word = getRandomWord(topic, usedWords);
    if (word) {
      setCurrentWord(word);
      setUsedWords([...usedWords, word]);
      
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
    } else {
      // No more words
      endGame();
    }
  };

  const handleCorrect = () => {
    const now = Date.now();
    if (now - lastAction.current < 1000) return; // Debounce
    lastAction.current = now;

    setScore(score + 1);
    showFeedback('correct');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    loadNextWord();
  };

  const handlePass = () => {
    const now = Date.now();
    if (now - lastAction.current < 1000) return; // Debounce
    lastAction.current = now;

    setPassed(passed + 1);
    showFeedback('pass');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    loadNextWord();
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
    setGameEnded(true);
    _unsubscribe();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    setTimeout(() => {
      navigation.replace('Scoreboard', {
        score,
        passed,
        total: score + passed,
        topic,
      });
    }, 1000);
  };

  const _subscribe = () => {
    // Don't use accelerometer on web
    if (isWeb) return;
    
    Accelerometer.setUpdateInterval(100);
    
    const sub = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      
      // Detect flip down (correct) - phone moved down significantly
      if (y > sensitivity) {
        handleCorrect();
      }
      // Detect flip up (pass) - phone moved up significantly
      else if (y < -sensitivity) {
        handlePass();
      }
    });
    
    setSubscription(sub);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
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
      
      {/* Timer */}
      <View style={styles.timerContainer}>
        <View style={[styles.timerCircle, { borderColor: 'rgba(255,255,255,0.3)' }]}>
          <Text style={styles.timerText}>{timeLeft}</Text>
        </View>
        <Text style={styles.timerLabel}>seconds</Text>
      </View>

      {/* Score */}
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

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        {isWeb ? (
          // Web: Show button controls
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
        ) : (
          // Mobile: Show flip instructions
          <View style={styles.instructionRow}>
            <View style={styles.instructionItem}>
              <Ionicons name="arrow-down" size={32} color="rgba(255,255,255,0.8)" />
              <Text style={styles.instructionText}>Flip Down{'\n'}Correct ✓</Text>
            </View>
            <View style={styles.instructionItem}>
              <Ionicons name="arrow-up" size={32} color="rgba(255,255,255,0.8)" />
              <Text style={styles.instructionText}>Flip Up{'\n'}Pass ✗</Text>
            </View>
          </View>
        )}
      </View>

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
    justifyContent: 'space-between',
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
  timerContainer: {
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || spacing.xl,
    paddingVertical: spacing.lg,
  },
  timerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  timerText: {
    fontSize: typography.fontSize3xl,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
  },
  timerLabel: {
    fontSize: typography.fontSizeSm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    marginLeft: spacing.sm,
  },
  wordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  word: {
    fontSize: typography.fontSize6xl,
    fontWeight: typography.fontWeightExtrabold,
    color: colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  instructionsContainer: {
    paddingBottom: spacing.xl,
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
