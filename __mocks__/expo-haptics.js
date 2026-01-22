/**
 * Mock for expo-haptics module
 * Used in testing to simulate haptic feedback functionality
 */

const ImpactFeedbackStyle = {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
    Soft: 'soft',
    Rigid: 'rigid',
};

const NotificationFeedbackType = {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
};

const impactAsync = jest.fn((style) => Promise.resolve());

const notificationAsync = jest.fn((type) => Promise.resolve());

const selectionAsync = jest.fn(() => Promise.resolve());

module.exports = {
    ImpactFeedbackStyle,
    NotificationFeedbackType,
    impactAsync,
    notificationAsync,
    selectionAsync,
};
