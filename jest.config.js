/**
 * Jest Configuration - React Native Compatible
 */

module.exports = {
    preset: 'react-native',

    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/?(*.)+(spec|test).js'
    ],

    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],

    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/**/__tests__/**',
    ],

    testPathIgnorePatterns: [
        '/node_modules/',
        '/android/',
        '/ios/',
    ],

    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],

    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },

    testEnvironment: 'node',
};
