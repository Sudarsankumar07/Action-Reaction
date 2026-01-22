import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  gradient,
  style,
  testID
}) => {
  const getButtonStyle = () => {
    const styles = [buttonStyles.base];

    if (size === 'sm') styles.push(buttonStyles.sm);
    if (size === 'lg') styles.push(buttonStyles.lg);

    if (disabled) {
      styles.push(buttonStyles.disabled);
    } else {
      switch (variant) {
        case 'primary':
          styles.push(buttonStyles.primary);
          break;
        case 'secondary':
          styles.push(buttonStyles.secondary);
          break;
        case 'outline':
          styles.push(buttonStyles.outline);
          break;
        case 'ghost':
          styles.push(buttonStyles.ghost);
          break;
      }
    }

    if (style) styles.push(style);
    return styles;
  };

  const getTextStyle = () => {
    const styles = [buttonStyles.text];

    if (size === 'sm') styles.push(buttonStyles.textSm);
    if (size === 'lg') styles.push(buttonStyles.textLg);

    if (disabled) {
      styles.push(buttonStyles.textDisabled);
    } else {
      switch (variant) {
        case 'outline':
        case 'ghost':
          styles.push(buttonStyles.textOutline);
          break;
      }
    }

    return styles;
  };

  const content = (
    <>
      {icon && <View style={buttonStyles.icon}>{icon}</View>}
      <Text style={getTextStyle()}>{title}</Text>
    </>
  );

  if (gradient && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        testID={testID || `${variant}-button`}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={getButtonStyle()}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID || `${variant}-button`}
    >
      {content}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    backgroundColor: colors.gray300,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontSize: typography.fontSizeMd,
    fontWeight: typography.fontWeightSemibold,
    color: colors.white,
  },
  textSm: {
    fontSize: typography.fontSizeSm,
  },
  textLg: {
    fontSize: typography.fontSizeLg,
  },
  textOutline: {
    color: colors.primary,
  },
  textDisabled: {
    color: colors.gray500,
  },
  icon: {
    marginRight: spacing.sm,
  },
});

export const Card = ({ children, style, gradient }) => {
  if (gradient) {
    return (
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[cardStyles.base, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[cardStyles.base, style]}>
      {children}
    </View>
  );
};

const cardStyles = StyleSheet.create({
  base: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.lg,
  },
});

export const TopicCard = ({ topic, topicConfig, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[topicCardStyles.container, style]}
    >
      <LinearGradient
        colors={topicConfig.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={topicCardStyles.gradient}
      >
        <View style={topicCardStyles.content}>
          <View style={topicCardStyles.iconContainer}>
            <Ionicons name={topicConfig.icon} size={32} color={colors.white} />
          </View>
          <Text style={topicCardStyles.title}>{topicConfig.name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Import Ionicons at the top of actual component files
import { Ionicons } from '@expo/vector-icons';

const topicCardStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  gradient: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
  },
});
