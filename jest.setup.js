/**
 * Jest Setup - Complete mocks for Expo/React Native
 */

// Global test timeout
jest.setTimeout(10000);

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    getAllKeys: jest.fn(() => Promise.resolve([])),
    multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock Expo Linear Gradient
jest.mock('expo-linear-gradient', () => ({
    LinearGradient: 'LinearGradient',
}));

// Mock Expo Haptics
jest.mock('expo-haptics', () => ({
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    selectionAsync: jest.fn(),
    ImpactFeedbackStyle: {},
    NotificationFeedbackType: {},
}));

// Mock Expo AV
jest.mock('expo-av', () => ({
    Audio: {
        Sound: {
            createAsync: jest.fn(() => Promise.resolve({
                sound: {
                    playAsync: jest.fn(),
                    unloadAsync: jest.fn(),
                }
            })),
        },
        setAudioModeAsync: jest.fn(),
    },
}));

// Mock Expo Sensors
jest.mock('expo-sensors', () => ({
    Accelerometer: {
        addListener: jest.fn(),
        removeAllListeners: jest.fn(),
        setUpdateInterval: jest.fn(),
    },
}));

// Mock Expo Screen Orientation
jest.mock('expo-screen-orientation', () => ({
    lockAsync: jest.fn(),
    unlockAsync: jest.fn(),
    OrientationLock: {
        LANDSCAPE: 'LANDSCAPE',
        PORTRAIT_UP: 'PORTRAIT_UP',
    },
}));

// Mock Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
}));

// Mock React Native Reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn(() => Promise.resolve({
        isConnected: true,
        isInternetReachable: true,
    })),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
        setOptions: jest.fn(),
    }),
    useFocusEffect: jest.fn(),
    NavigationContainer: ({ children }) => children,
}));

console.log('✅ Jest setup complete');
