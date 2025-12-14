import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Button } from '../components/CommonComponents';
import { useLanguage } from '../contexts/LanguageContext';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function SettingsScreen({ navigation }) {
  const { t, language, setLanguage } = useLanguage();

  const [settings, setSettings] = useState({
    soundEnabled: true,
    vibrationEnabled: true,
    sensitivity: 1.5,
    timerDuration: 60,
  });

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const timerOptions = [30, 60, 90, 120];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.header}
      >
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="settings" size={32} color={colors.white} />
          </View>
          <Text style={styles.headerTitle}>{t('settings', 'Settings')}</Text>
          <Text style={styles.headerSubtitle}>{t('settingsLabels.selectLanguage', 'Customize your experience')}</Text>

          {/* Inline language selector in header for immediate visibility */}
          <View style={styles.languageRow}>
            <TouchableOpacity
              style={[styles.languageButton, language === 'en' && styles.languageButtonActive]}
              onPress={() => setLanguage('en')}
            >
              <Text style={[styles.languageButtonText, language === 'en' && styles.languageButtonTextActive]}> {t('labels.english', 'English')} </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.languageButton, language === 'ta' && styles.languageButtonActive]}
              onPress={() => setLanguage('ta')}
            >
              <Text style={[styles.languageButtonText, language === 'ta' && styles.languageButtonTextActive]}> {t('labels.tamil', 'தமிழ் (Tamil)')} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Visible language selector card (guaranteed to be visible) */}
      <View style={[styles.section, { paddingHorizontal: spacing.lg }]}> 
        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <TouchableOpacity
            style={[styles.languageButton, language === 'en' && styles.languageButtonActive]}
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.languageButtonText, language === 'en' && styles.languageButtonTextActive]}>{t('labels.english', 'English')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.languageButton, language === 'ta' && styles.languageButtonActive]}
            onPress={() => setLanguage('ta')}
          >
            <Text style={[styles.languageButtonText, language === 'ta' && styles.languageButtonTextActive]}>{t('labels.tamil', 'தமிழ் (Tamil)')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Game Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settingsLabels.difficulty', 'Game Settings')}</Text>
          
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primary }]}>
                  <Ionicons name="time-outline" size={20} color={colors.white} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Timer Duration</Text>
                  <Text style={styles.settingDescription}>
                    Set game round duration
                  </Text>
                </View>
              </View>
              <View style={styles.timerOptions}>
                {timerOptions.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.timerOption,
                      settings.timerDuration === duration && styles.timerOptionActive,
                    ]}
                    onPress={() => updateSetting('timerDuration', duration)}
                  >
                    <Text
                      style={[
                        styles.timerOptionText,
                        settings.timerDuration === duration && styles.timerOptionTextActive,
                      ]}
                    >
                      {duration}s
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}>
                  <Ionicons name="options-outline" size={20} color={colors.white} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Flip Sensitivity</Text>
                  <Text style={styles.settingDescription}>
                    Adjust motion detection: {settings.sensitivity.toFixed(1)}
                  </Text>
                </View>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={3.0}
                step={0.1}
                value={settings.sensitivity}
                onValueChange={(value) => updateSetting('sensitivity', value)}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.gray300}
                thumbTintColor={colors.primary}
              />
            </View>
          </View>
        </View>

        {/* Feedback Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settingsLabels.soundEffects', 'Feedback')}</Text>
          
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: colors.warning }]}>
                  <Ionicons name="volume-high" size={20} color={colors.white} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Sound Effects</Text>
                  <Text style={styles.settingDescription}>
                    Play sounds during gameplay
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={(value) => updateSetting('soundEnabled', value)}
                trackColor={{ false: colors.gray300, true: colors.primaryLight }}
                thumbColor={settings.soundEnabled ? colors.primary : colors.gray400}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: colors.success }]}>
                  <Ionicons name="phone-portrait-outline" size={20} color={colors.white} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Haptic Feedback</Text>
                  <Text style={styles.settingDescription}>
                    Vibrate on actions
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.vibrationEnabled}
                onValueChange={(value) => updateSetting('vibrationEnabled', value)}
                trackColor={{ false: colors.gray300, true: colors.primaryLight }}
                thumbColor={settings.vibrationEnabled ? colors.primary : colors.gray400}
              />
            </View>
          </View>
        </View>

        {/* How to Play Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Play</Text>
          
          <View style={styles.card}>
            <View style={styles.aboutItem}>
              <Ionicons name="bulb" size={24} color={colors.primary} />
              <View style={styles.aboutText}>
                <Text style={styles.aboutLabel}>How to Play</Text>
                <Text style={styles.aboutDescription}>
                  Hold phone to forehead • Others act out the word • Flip down for correct • Flip up to pass
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {/* Language Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settingsLabels.language', 'Language')}</Text>
          <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <TouchableOpacity
              style={[styles.timerOption, language === 'en' && styles.timerOptionActive]}
              onPress={() => setLanguage('en')}
            >
              <Text style={[styles.timerOptionText, language === 'en' && styles.timerOptionTextActive]}>{t('labels.english', 'English')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.timerOption, language === 'ta' && styles.timerOptionActive]}
              onPress={() => setLanguage('ta')}
            >
              <Text style={[styles.timerOptionText, language === 'ta' && styles.timerOptionTextActive]}>{t('labels.tamil', 'தமிழ் (Tamil)')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Button
            title={t('labels.backToHome', 'Back to Home')}
            onPress={() => navigation.navigate('Home')}
            gradient={[colors.primary, colors.primaryDark]}
            icon={<Ionicons name="home" size={20} color={colors.white} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    paddingTop: StatusBar.currentHeight || spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize3xl,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.fontSizeMd,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  languageRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
    width: '100%',
    justifyContent: 'center',
  },
  languageButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  languageButtonActive: {
    backgroundColor: colors.white,
  },
  languageButtonText: {
    color: colors.white,
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
  },
  languageButtonTextActive: {
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },
  settingItem: {
    paddingVertical: spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.fontSizeSm,
    color: colors.gray600,
  },
  timerOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  timerOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray100,
    alignItems: 'center',
  },
  timerOptionActive: {
    backgroundColor: colors.primary,
  },
  timerOptionText: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.gray700,
  },
  timerOptionTextActive: {
    color: colors.white,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: spacing.md,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  aboutText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  aboutLabel: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  aboutValue: {
    fontSize: typography.fontSizeSm,
    color: colors.gray600,
  },
  aboutDescription: {
    fontSize: typography.fontSizeSm,
    color: colors.gray600,
    lineHeight: 20,
  },
});
