/**
 * Mock for expo-av module
 * Used in testing to simulate audio functionality
 */

const mockSound = {
    playAsync: jest.fn(() => Promise.resolve({ status: 'playing' })),
    pauseAsync: jest.fn(() => Promise.resolve({ status: 'paused' })),
    stopAsync: jest.fn(() => Promise.resolve({ status: 'stopped' })),
    unloadAsync: jest.fn(() => Promise.resolve()),
    setPositionAsync: jest.fn(() => Promise.resolve()),
    setRateAsync: jest.fn(() => Promise.resolve()),
    setVolumeAsync: jest.fn(() => Promise.resolve()),
    getStatusAsync: jest.fn(() => Promise.resolve({
        isLoaded: true,
        isPlaying: false,
        durationMillis: 1000,
        positionMillis: 0,
    })),
};

const Audio = {
    Sound: class MockSound {
        static createAsync = jest.fn(() => Promise.resolve({
            sound: mockSound,
            status: {
                isLoaded: true,
            },
        }));

        playAsync = mockSound.playAsync;
        pauseAsync = mockSound.pauseAsync;
        stopAsync = mockSound.stopAsync;
        unloadAsync = mockSound.unloadAsync;
    },

    setAudioModeAsync: jest.fn(() => Promise.resolve()),

    // Audio recording mode constants
    INTERRUPTION_MODE_IOS_DO_NOT_MIX: 0,
    INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS: 1,
    INTERRUPTION_MODE_ANDROID_DO_NOT_MIX: 1,
    INTERRUPTION_MODE_ANDROID_DUCK_OTHERS: 2,
};

const Video = {
    // Mock Video component if needed
};

module.exports = {
    Audio,
    Video,
};
