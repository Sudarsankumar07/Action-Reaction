// Professional color palette
export const colors = {
  // Primary colors
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  
  // Secondary colors
  secondary: '#8b5cf6',
  secondaryDark: '#7c3aed',
  secondaryLight: '#a78bfa',
  
  // Status colors
  success: '#10b981',
  successDark: '#059669',
  successLight: '#34d399',
  
  error: '#ef4444',
  errorDark: '#dc2626',
  errorLight: '#f87171',
  
  warning: '#f59e0b',
  warningDark: '#d97706',
  warningLight: '#fbbf24',
  
  // Neutral colors
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Background colors
  background: '#ffffff',
  backgroundDark: '#0f172a',
  backgroundLight: '#f8fafc',
  
  // Topic colors
  food: '#f59e0b',
  sports: '#3b82f6',
  movies: '#8b5cf6',
  animals: '#10b981',
  places: '#ef4444',
  music: '#ec4899',
  general: '#6366f1',
};

// Typography
export const typography = {
  fontSizeXs: 12,
  fontSizeSm: 14,
  fontSizeMd: 16,
  fontSizeLg: 18,
  fontSizeXl: 20,
  fontSize2xl: 24,
  fontSize3xl: 30,
  fontSize4xl: 36,
  fontSize5xl: 48,
  fontSize6xl: 60,
  fontSize7xl: 72,
  
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemibold: '600',
  fontWeightBold: '700',
  fontWeightExtrabold: '800',
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Topic configurations
export const topicConfig = {
  food: {
    name: 'Food',
    color: colors.food,
    gradient: ['#f59e0b', '#f97316'],
    icon: 'fast-food',
  },
  sports: {
    name: 'Sports',
    color: colors.sports,
    gradient: ['#3b82f6', '#2563eb'],
    icon: 'basketball',
  },
  movies: {
    name: 'Movies',
    color: colors.movies,
    gradient: ['#8b5cf6', '#7c3aed'],
    icon: 'film',
  },
  animals: {
    name: 'Animals',
    color: colors.animals,
    gradient: ['#10b981', '#059669'],
    icon: 'paw',
  },
  places: {
    name: 'Places',
    color: colors.places,
    gradient: ['#ef4444', '#dc2626'],
    icon: 'earth',
  },
  music: {
    name: 'Music',
    color: colors.music,
    gradient: ['#ec4899', '#db2777'],
    icon: 'musical-notes',
  },
  general: {
    name: 'General',
    color: colors.general,
    gradient: ['#6366f1', '#4f46e5'],
    icon: 'bulb',
  },
};
