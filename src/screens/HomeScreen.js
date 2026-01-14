import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, TopicCard } from '../components/CommonComponents';
import { colors, typography, spacing, borderRadius, shadows, topicConfig } from '../theme';
import { getAllTopics, getWordCount } from '../data/words';
import { useLanguage } from '../contexts/LanguageContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [selectedMode, setSelectedMode] = useState('multiplayer'); // 'multiplayer' or 'singleplayer'

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
    ]).start();
  }, []);

  const handleTopicSelect = (topic) => {
    navigation.navigate('Game', { topic, mode: selectedMode });
  };

  const { language } = useLanguage();
  const topics = getAllTopics(language);

  // Single player game modes
  const singlePlayerModes = [
    {
      id: 'ai-hints',
      name: 'AI Hint System',
      description: 'Play solo with progressive hints',
      icon: 'bulb-outline',
      gradient: ['#6366f1', '#8b5cf6'],
    },
    {
      id: 'time-attack',
      name: 'Time Attack',
      description: 'Speed challenge with scrambled words',
      icon: 'flash-outline',
      gradient: ['#f59e0b', '#f97316'],
    },
    {
      id: 'memory',
      name: 'Memory Challenge',
      description: 'Test your recall abilities',
      icon: 'fitness-outline',
      gradient: ['#8b5cf6', '#7c3aed'],
    },
    {
      id: 'practice',
      name: 'Practice Mode',
      description: 'Learn new words without pressure',
      icon: 'book-outline',
      gradient: ['#10b981', '#059669'],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.gradient}
      >
        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header with Settings Button */}
          <View style={styles.header}>
            <Animated.View style={[styles.settingsButtonContainer, { opacity: fadeAnim }]}>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
                activeOpacity={0.7}
              >
                <Ionicons name="settings-outline" size={20} color={colors.white} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              style={[
                styles.headerContent,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={styles.logoContainer}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="flash" size={48} color={colors.white} />
                </View>
              </View>
              <Text style={styles.title}>Action Reaction</Text>
              <Text style={styles.subtitle}>
                Hold your phone on your forehead{'\n'}Let others act it out!{'\n'}Charades 
              </Text>
            </Animated.View>
          </View>

          {/* Topics Section with White Background */}
          <Animated.View 
            style={[
              styles.topicsContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Mode Selection Tabs */}
            <View style={styles.modeTabsContainer}>
            <TouchableOpacity
              style={[
                styles.modeTab,
                selectedMode === 'multiplayer' && styles.modeTabActive,
              ]}
              onPress={() => setSelectedMode('multiplayer')}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="people" 
                size={20} 
                color={selectedMode === 'multiplayer' ? colors.white : colors.gray600} 
              />
              <Text style={[
                styles.modeTabText,
                selectedMode === 'multiplayer' && styles.modeTabTextActive,
              ]}>
                Multiplayer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeTab,
                selectedMode === 'singleplayer' && styles.modeTabActive,
              ]}
              onPress={() => setSelectedMode('singleplayer')}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="person" 
                size={20} 
                color={selectedMode === 'singleplayer' ? colors.white : colors.gray600} 
              />
              <Text style={[
                styles.modeTabText,
                selectedMode === 'singleplayer' && styles.modeTabTextActive,
              ]}>
                Single Player
              </Text>
            </TouchableOpacity>

            
          </View>

          <View style={styles.topicsHeader}>
            <Text style={styles.sectionTitle}>
              {selectedMode === 'multiplayer' ? 'Choose Your Topic' : 'Choose Game Mode'}
            </Text>
            <Text style={styles.sectionSubtitle}>
              {selectedMode === 'multiplayer' 
                ? 'Select a category to start the fun!' 
                : 'Pick a single-player challenge!'}
            </Text>
          </View>

          <View style={styles.topicsContent}>
            {selectedMode === 'multiplayer' ? (
              // Multiplayer Topics
              <>
                {topics.map((topic, index) => (
                  <Animated.View
                    key={topic}
                    style={{
                      opacity: fadeAnim,
                      transform: [{
                        translateX: Animated.multiply(slideAnim, new Animated.Value(index % 2 === 0 ? -1 : 1))
                      }]
                    }}
                  >
                    <TopicCard
                      topic={topic}
                      topicConfig={topicConfig[topic]}
                      onPress={() => handleTopicSelect(topic)}
                      style={styles.topicCard}
                    />
                  </Animated.View>
                ))}

                {/* Footer */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    🎮 {topics.reduce((sum, topic) => sum + getWordCount(topic, language), 0)}+ words across {topics.length} categories
                  </Text>
                </View>
              </>
            ) : (
              // Single Player Modes
              <>
                {singlePlayerModes.map((mode, index) => (
                  <Animated.View
                    key={mode.id}
                    style={{
                      opacity: fadeAnim,
                      transform: [{
                        translateX: Animated.multiply(slideAnim, new Animated.Value(index % 2 === 0 ? -1 : 1))
                      }]
                    }}
                  >
                    <TouchableOpacity
                      style={styles.singlePlayerCard}
                      onPress={() => navigation.navigate('Game', { mode: mode.id, topic: 'general' })}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={mode.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.singlePlayerCardGradient}
                      >
                        <View style={styles.singlePlayerCardIcon}>
                          <Ionicons name={mode.icon} size={32} color={colors.white} />
                        </View>
                        <View style={styles.singlePlayerCardContent}>
                          <Text style={styles.singlePlayerCardTitle}>{mode.name}</Text>
                          <Text style={styles.singlePlayerCardDescription}>{mode.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.7)" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                ))}

                {/* Footer */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    🎯 {singlePlayerModes.length} single-player modes available
                  </Text>
                </View>
              </>
            )}
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight || spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: typography.fontSize4xl,
    fontWeight: typography.fontWeightExtrabold,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSizeMd,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  settingsButtonContainer: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.md,
    zIndex: 10,
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  topicsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingTop: spacing.md,
  },
  modeTabsContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  modeTabActive: {
    backgroundColor: colors.primary,
    ...shadows.sm,
  },
  modeTabText: {
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightSemibold,
    color: colors.gray600,
  },
  modeTabTextActive: {
    color: colors.white,
  },
  modeTabSettings: {
    width: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
    marginLeft: spacing.xs,
    backgroundColor: 'transparent',
  },
  topicsHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightBold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: typography.fontSizeMd,
    color: colors.gray600,
  },
  topicsContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  topicCard: {
    marginBottom: spacing.md,
  },
  footer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizeSm,
    color: colors.gray500,
    textAlign: 'center',
  },
  singlePlayerCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  singlePlayerCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  singlePlayerCardIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singlePlayerCardContent: {
    flex: 1,
  },
  singlePlayerCardTitle: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  singlePlayerCardDescription: {
    fontSize: typography.fontSizeSm,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },

});



