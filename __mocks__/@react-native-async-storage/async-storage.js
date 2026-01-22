/**
 * Mock for @react-native-async-storage/async-storage
 * Used in testing to simulate AsyncStorage functionality
 */

let mockStorage = {};

const AsyncStorage = {
    setItem: jest.fn((key, value) => {
        mockStorage[key] = value;
        return Promise.resolve();
    }),

    getItem: jest.fn((key) => {
        return Promise.resolve(mockStorage[key] || null);
    }),

    removeItem: jest.fn((key) => {
        delete mockStorage[key];
        return Promise.resolve();
    }),

    mergeItem: jest.fn((key, value) => {
        const existingValue = mockStorage[key];
        if (existingValue) {
            const existingObject = JSON.parse(existingValue);
            const newObject = JSON.parse(value);
            mockStorage[key] = JSON.stringify({ ...existingObject, ...newObject });
        } else {
            mockStorage[key] = value;
        }
        return Promise.resolve();
    }),

    clear: jest.fn(() => {
        mockStorage = {};
        return Promise.resolve();
    }),

    getAllKeys: jest.fn(() => {
        return Promise.resolve(Object.keys(mockStorage));
    }),

    multiGet: jest.fn((keys) => {
        const result = keys.map(key => [key, mockStorage[key] || null]);
        return Promise.resolve(result);
    }),

    multiSet: jest.fn((keyValuePairs) => {
        keyValuePairs.forEach(([key, value]) => {
            mockStorage[key] = value;
        });
        return Promise.resolve();
    }),

    multiRemove: jest.fn((keys) => {
        keys.forEach(key => {
            delete mockStorage[key];
        });
        return Promise.resolve();
    }),

    // Helper method for tests to reset storage
    __resetMockStorage: () => {
        mockStorage = {};
    },

    // Helper method for tests to get current storage state
    __getMockStorage: () => {
        return { ...mockStorage };
    },
};

module.exports = AsyncStorage;
