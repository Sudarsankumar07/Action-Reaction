import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Button } from '../components/CommonComponents';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    vibrationEnabled: true,
    sensitivity: 1.5,
    timerDuration: 60,
  });
  const [showCustomTimeModal, setShowCustomTimeModal] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState('');

  // Load saved timer setting on mount
  useEffect(() => {
    loadTimerSetting();
  }, []);

  const loadTimerSetting = async () => {
    try {
      const savedTimer = await AsyncStorage.getItem('game_timer');
      if (savedTimer) {
        const timerValue = parseInt(savedTimer, 10);
        setSettings(prev => ({ ...prev, timerDuration: timerValue }));
      }
    } catch (error) {
      console.error('Error loading timer setting:', error);
    }
  };

  const updateSetting = async (key, value) => {
    setSettings({ ...settings, [key]: value });
    
    // Save timer duration to AsyncStorage
    if (key === 'timerDuration') {
      try {
        await AsyncStorage.setItem('game_timer', value.toString());
      } catch (error) {
        console.error('Error saving timer setting:', error);
      }
    }
  };

  const handleCustomTime = async () => {
    const customTime = parseInt(customTimeInput, 10);
    if (customTime && customTime > 0 && customTime <= 600) {
      await updateSetting('timerDuration', customTime);
      setShowCustomTimeModal(false);
      setCustomTimeInput('');
    }
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
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Game Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Settings</Text>
          
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
              <TouchableOpacity
                style={[
                  styles.customTimeButton,
                  !timerOptions.includes(settings.timerDuration) && styles.customTimeButtonActive,
                ]}
                onPress={() => setShowCustomTimeModal(true)}
              >
                <Ionicons 
                  name="create-outline" 
                  size={16} 
                  color={!timerOptions.includes(settings.timerDuration) ? colors.white : colors.primary} 
                />
                <Text
                  style={[
                    styles.customTimeButtonText,
                    !timerOptions.includes(settings.timerDuration) && styles.customTimeButtonTextActive,
                  ]}
                >
                  {!timerOptions.includes(settings.timerDuration) 
                    ? `${settings.timerDuration}s` 
                    : 'Custom'}
                </Text>
              </TouchableOpacity>
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
          <Text style={styles.sectionTitle}>Feedback</Text>
          
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

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.card}>
            <View style={styles.aboutItem}>
              <Ionicons name="information-circle" size={24} color={colors.primary} />
              <View style={styles.aboutText}>
                <Text style={styles.aboutLabel}>Version</Text>
                <Text style={styles.aboutValue}>1.0.0</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.aboutItem}>
              <Ionicons name="code-slash" size={24} color={colors.primary} />
              <View style={styles.aboutText}>
                <Text style={styles.aboutLabel}>Built With</Text>
                <Text style={styles.aboutValue}>React Native & Expo</Text>
              </View>
            </View>

            <View style={styles.divider} />

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
        <View style={styles.section}>
          <Button
            title="Back to Home"
            onPress={() => navigation.navigate('Home')}
            gradient={[colors.primary, colors.primaryDark]}
            icon={<Ionicons name="home" size={20} color={colors.white} />}
          />
        </View>
      </ScrollView>

      {/* Custom Time Modal */}
      <Modal
        visible={showCustomTimeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCustomTimeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="time-outline" size={32} color={colors.primary} />
              <Text style={styles.modalTitle}>Custom Timer</Text>
            </View>
            
            <Text style={styles.modalDescription}>
              Enter duration in seconds (1-600)
            </Text>
            
            <TextInput
              style={styles.modalInput}
              value={customTimeInput}
              onChangeText={setCustomTimeInput}
              placeholder="e.g., 45"
              placeholderTextColor={colors.gray400}
              keyboardType="numeric"
              maxLength={3}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setShowCustomTimeModal(false);
                  setCustomTimeInput('');
                }}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleCustomTime}
              >
                <Text style={styles.modalButtonTextConfirm}>Set Timer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  customTimeButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  customTimeButtonActive: {
    backgroundColor: colors.primary,
  },
  customTimeButtonText: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.primary,
  },
  customTimeButtonTextActive: {
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    ...shadows.lg,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightBold,
    color: colors.gray900,
    marginTop: spacing.sm,
  },
  modalDescription: {
    fontSize: typography.fontSizeMd,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalInput: {
    borderWidth: 2,
    borderColor: colors.gray300,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    fontSize: typography.fontSizeLg,
    color: colors.gray900,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: colors.gray200,
  },
  modalButtonConfirm: {
    backgroundColor: colors.primary,
  },
  modalButtonTextCancel: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.gray700,
  },
  modalButtonTextConfirm: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.white,
  },
});
