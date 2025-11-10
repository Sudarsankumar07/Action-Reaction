import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/CommonComponents';
import { colors, typography, spacing, borderRadius, topicConfig } from '../theme';

const { width } = Dimensions.get('window');

export default function ScoreboardScreen({ route, navigation }) {
  const { score, passed, total, topic } = route.params;
  const config = topicConfig[topic];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

  const getMessage = () => {
    if (accuracy >= 80) return '🔥 Amazing!';
    if (accuracy >= 60) return '🌟 Great Job!';
    if (accuracy >= 40) return '👍 Good Work!';
    return '💪 Keep Practicing!';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={config.gradient} style={styles.gradient}>
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="trophy" size={64} color={colors.white} />
          </View>
          <Text style={styles.title}>Round Complete!</Text>
          <Text style={styles.subtitle}>{getMessage()}</Text>
        </Animated.View>

        {/* Stats Card */}
        <Animated.View
          style={[
            styles.statsCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.mainStat}>
            <Text style={styles.mainStatNumber}>{score}</Text>
            <Text style={styles.mainStatLabel}>Correct Answers</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.success }]}>
                <Ionicons name="checkmark" size={24} color={colors.white} />
              </View>
              <Text style={styles.statNumber}>{score}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.error }]}>
                <Ionicons name="close" size={24} color={colors.white} />
              </View>
              <Text style={styles.statNumber}>{passed}</Text>
              <Text style={styles.statLabel}>Passed</Text>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.primary }]}>
                <Ionicons name="list" size={24} color={colors.white} />
              </View>
              <Text style={styles.statNumber}>{total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.accuracyContainer}>
            <Text style={styles.accuracyLabel}>Accuracy</Text>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', `${accuracy}%`],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.accuracyText}>{accuracy}%</Text>
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View
          style={[
            styles.actions,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Button
            title="Play Again"
            onPress={() => navigation.replace('Game', { topic })}
            gradient={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)']}
            style={styles.button}
            icon={<Ionicons name="refresh" size={24} color={colors.white} />}
          />
          
          <Button
            title="Change Topic"
            onPress={() => navigation.navigate('Home')}
            variant="outline"
            style={[styles.button, styles.outlineButton]}
          />

          <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
            variant="ghost"
            style={styles.button}
            icon={<Ionicons name="settings-outline" size={20} color={colors.white} />}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: typography.fontSize3xl,
    fontWeight: typography.fontWeightExtrabold,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSizeLg,
    color: 'rgba(255,255,255,0.9)',
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  mainStat: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  mainStatNumber: {
    fontSize: typography.fontSize6xl,
    fontWeight: typography.fontWeightExtrabold,
    color: colors.primary,
  },
  mainStatLabel: {
    fontSize: typography.fontSizeLg,
    color: colors.gray600,
    marginTop: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statNumber: {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightBold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSizeSm,
    color: colors.gray600,
  },
  accuracyContainer: {
    paddingVertical: spacing.md,
  },
  accuracyLabel: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.gray700,
    marginBottom: spacing.sm,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: borderRadius.full,
  },
  accuracyText: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.primary,
    textAlign: 'center',
  },
  actions: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  button: {
    marginBottom: spacing.md,
  },
  outlineButton: {
    borderColor: colors.white,
    borderWidth: 2,
  },
});
