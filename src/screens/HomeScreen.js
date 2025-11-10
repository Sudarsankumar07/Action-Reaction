import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, TopicCard } from '../components/CommonComponents';
import { colors, typography, spacing, borderRadius, shadows, topicConfig } from '../theme';
import { getAllTopics, getWordCount } from '../data/words';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

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
    navigation.navigate('Game', { topic });
  };

  const topics = getAllTopics();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
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
              Hold your phone on your forehead{'\n'}Let others act it out!
            </Text>
          </Animated.View>

          {/* Settings Button */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Button
              title=""
              icon={<Ionicons name="settings-outline" size={24} color={colors.white} />}
              variant="ghost"
              size="sm"
              onPress={() => navigation.navigate('Settings')}
              style={styles.settingsButton}
            />
          </Animated.View>
        </View>

        {/* Topics Section */}
        <Animated.View 
          style={[
            styles.topicsContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.topicsHeader}>
            <Text style={styles.sectionTitle}>Choose Your Topic</Text>
            <Text style={styles.sectionSubtitle}>
              Select a category to start the fun!
            </Text>
          </View>

          <ScrollView 
            style={styles.topicsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.topicsContent}
          >
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
                🎮 {topics.reduce((sum, topic) => sum + getWordCount(topic), 0)}+ words across {topics.length} categories
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
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
  settingsButton: {
    position: 'absolute',
    top: StatusBar.currentHeight || spacing.xl,
    right: spacing.lg,
  },
  topicsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingTop: spacing.xl,
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
  topicsList: {
    flex: 1,
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
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizeSm,
    color: colors.gray500,
    textAlign: 'center',
  },
});
