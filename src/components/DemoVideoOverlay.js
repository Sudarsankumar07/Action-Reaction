import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Full screen video configuration - maximize display
const VIDEO_ASPECT_RATIO = 16 / 9; // 1.778
const VIDEO_WIDTH_PERCENT = 0.95;  // Use 95% of screen width for maximum visibility
const MAX_HEIGHT_PERCENT = 0.7;    // Max 70% of screen height

// Calculate dimensions to fit screen while maintaining aspect ratio
const videoWidth = Math.round(SCREEN_WIDTH * VIDEO_WIDTH_PERCENT);
let videoHeight = Math.round(videoWidth / VIDEO_ASPECT_RATIO);

// Ensure height doesn't exceed max
const maxHeight = Math.round(SCREEN_HEIGHT * MAX_HEIGHT_PERCENT);
if (videoHeight > maxHeight) {
  videoHeight = maxHeight;
}

export default function DemoVideoOverlay({
  visible,
  onClose,
  onStartGame,
  soundEnabled = true,
  maxDuration = 3,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible && videoRef.current) {
      // Play video when modal opens
      videoRef.current.playAsync();
      setIsPlaying(true);

      // Auto-close after max duration (3 seconds)
      timerRef.current = setTimeout(() => {
        handleClose();
      }, maxDuration * 1000);
    } else if (!visible && videoRef.current) {
      // Pause and reset when modal closes
      videoRef.current.pauseAsync();
      videoRef.current.setPositionAsync(0);
      setIsPlaying(false);
      setCurrentTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible]);

  const handleClose = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
      await videoRef.current.setPositionAsync(0);
    }
    setIsPlaying(false);
    setCurrentTime(0);
    onClose();
  };

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
      // Clear auto-close timer when paused
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleContinueGame = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
      await videoRef.current.setPositionAsync(0);
    }
    setIsPlaying(false);
    onStartGame();
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
      setIsPlaying(status.isPlaying);
      setIsLoading(false);
      setHasError(false);

      // Auto-close when video ends
      if (status.didJustFinish) {
        handleClose();
      }
    } else if (status.error) {
      console.error('Video error:', status.error);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleVideoError = (error) => {
    console.error('Video loading error:', error);
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <StatusBar barStyle="light-content" />

        {/* Skip button - Top Right */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleClose}
          activeOpacity={0.8}
        >
          <View style={styles.skipButtonInner}>
            <Ionicons name="close" size={24} color={colors.white} />
          </View>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        {/* Video Container */}
        <View style={styles.videoContainer}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.white} />
              <Text style={styles.loadingText}>Loading video...</Text>
            </View>
          )}
          
          {hasError ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={48} color={colors.error} />
              <Text style={styles.errorText}>Video failed to load</Text>
              <Text style={styles.errorSubtext}>Continue to game to start playing</Text>
            </View>
          ) : (
            <Video
              ref={videoRef}
              source={require('../../assets/videos/how_to_play_multiplayer.mp4')}
              style={styles.video}
              useNativeControls={true}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={visible}
              isLooping={false}
              volume={soundEnabled ? 1.0 : 0}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              onError={handleVideoError}
            />
          )}
        </View>

        {/* Instruction Text */}
        <Text style={styles.instructionText}>Watch how to play!</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Pro Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsHeader}>🎮 PRO TIP 🎮</Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>1</Text>
              </View>
              <Text style={styles.tipText}>Hold phone on forehead</Text>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>2</Text>
              </View>
              <Text style={styles.tipText}>Friends act it out</Text>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>3</Text>
              </View>
              <Text style={styles.tipText}>Tilt DOWN = Correct ⬇️</Text>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>4</Text>
              </View>
              <Text style={styles.tipText}>Tilt UP = Skip ⬆️</Text>
            </View>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPause]}
            onPress={handlePlayPause}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={20} 
              color={colors.white} 
            />
            <Text style={styles.buttonText}>
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonContinue]}
            onPress={handleContinueGame}
            activeOpacity={0.8}
          >
            <Ionicons name="play-circle" size={20} color={colors.white} />
            <Text style={styles.buttonText}>Continue Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  skipButton: {
    position: 'absolute',
    top: (StatusBar.currentHeight || 0) + spacing.md,
    right: spacing.md,
    zIndex: 10,
    alignItems: 'center',
  },
  skipButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: spacing.xs,
  },
  skipButtonText: {
    fontSize: typography.fontSizeXs,
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  loadingText: {
    fontSize: typography.fontSizeMd,
    color: colors.white,
    marginTop: spacing.md,
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.error,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: typography.fontSizeSm,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
    fontWeight: typography.fontWeightSemibold,
    color: colors.white,
  },
  videoContainer: {
    width: videoWidth,
    height: videoHeight,
    backgroundColor: colors.black,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  instructionText: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightSemibold,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: spacing.md,
  },
  tipsContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: spacing.lg,
  },
  tipsHeader: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  tipsList: {
    gap: spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  tipNumberText: {
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
  },
  tipText: {
    flex: 1,
    fontSize: typography.fontSizeSm,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  buttonPause: {
    backgroundColor: colors.gray600,
  },
  buttonContinue: {
    backgroundColor: colors.success,
  },
  buttonText: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.white,
  },
});
