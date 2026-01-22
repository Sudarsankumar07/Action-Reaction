/**
 * Mock for expo-sensors module
 * Used in testing to simulate accelerometer and sensor functionality
 */

// Mock accelerometer data
let accelerometerListeners = [];
let mockAccelerometerData = { x: 0, y: 0, z: 0 };

const Accelerometer = {
    addListener: jest.fn((callback) => {
        accelerometerListeners.push(callback);
        return {
            remove: jest.fn(() => {
                const index = accelerometerListeners.indexOf(callback);
                if (index > -1) {
                    accelerometerListeners.splice(index, 1);
                }
            }),
        };
    }),

    removeAllListeners: jest.fn(() => {
        accelerometerListeners = [];
    }),

    setUpdateInterval: jest.fn(),

    isAvailableAsync: jest.fn(() => Promise.resolve(true)),

    // Helper for tests to simulate accelerometer data
    __simulateData: (data) => {
        mockAccelerometerData = data;
        accelerometerListeners.forEach(listener => listener(data));
    },
};

const Gyroscope = {
    addListener: jest.fn(() => ({
        remove: jest.fn(),
    })),
    removeAllListeners: jest.fn(),
    setUpdateInterval: jest.fn(),
    isAvailableAsync: jest.fn(() => Promise.resolve(true)),
};

const Magnetometer = {
    addListener: jest.fn(() => ({
        remove: jest.fn(),
    })),
    removeAllListeners: jest.fn(),
    setUpdateInterval: jest.fn(),
    isAvailableAsync: jest.fn(() => Promise.resolve(true)),
};

const Barometer = {
    addListener: jest.fn(() => ({
        remove: jest.fn(),
    })),
    removeAllListeners: jest.fn(),
    setUpdateInterval: jest.fn(),
    isAvailableAsync: jest.fn(() => Promise.resolve(false)),
};

module.exports = {
    Accelerometer,
    Gyroscope,
    Magnetometer,
    Barometer,
};
