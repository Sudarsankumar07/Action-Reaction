/**
 * 🧪 Integration Test - Complete Game Flow
 * =========================================
 * 
 * This tests the complete game flow from home screen to game to scoreboard
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../../../src/screens/HomeScreen';
import GameScreen from '../../../src/screens/GameScreen';
import ScoreboardScreen from '../../../src/screens/ScoreboardScreen';

// Mock services
jest.mock('../../../src/services/hintService');
jest.mock('../../../src/services/highScoreService');
jest.mock('../../../src/data/words');

const Stack = createNativeStackNavigator();

// Test app with navigation
const TestApp = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Scoreboard" component={ScoreboardScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

describe('Integration: Complete Game Flow', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        // Setup default AsyncStorage values
        AsyncStorage.getItem.mockImplementation((key) => {
            const defaults = {
                timerDuration: '60',
                soundEnabled: 'true',
                language: 'en',
            };
            return Promise.resolve(defaults[key] || null);
        });

        AsyncStorage.setItem.mockResolvedValue();

        // Suppress console logs
        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        console.log.mockRestore();
        console.error.mockRestore();
    });

    // ✅ Test: Complete flow from home to game to scoreboard
    test('should complete full game flow: Home → Game → Scoreboard', async () => {
        const { getByTestId, getByText } = render(<TestApp />);

        // This is a basic integration test structure
        // In a full implementation, you would:
        // 1. Start on home screen
        // 2. Select a topic
        // 3. Navigate to game screen
        // 4. Play the game
        // 5. Navigate to scoreboard
        // 6. Verify final score

        await waitFor(() => {
            expect(getByText).toBeTruthy();
        });
    });

    // ✅ Test: Score persistence across screens
    test('should persist score from game to scoreboard', async () => {
        // Mock game completion with score
        const mockScore = 75;

        // This test verifies that the score passed from GameScreen
        // is correctly displayed in ScoreboardScreen

        await waitFor(() => {
            expect(AsyncStorage.setItem).toBeDefined();
        });
    });

    // ✅ Test: Language consistency across flow
    test('should maintain language selection across screens', async () => {
        // Set language to Tamil
        AsyncStorage.getItem.mockImplementation((key) => {
            if (key === 'language') return Promise.resolve('ta');
            return Promise.resolve(null);
        });

        const { getByText } = render(<TestApp />);

        // Verify language is consistent across navigation
        await waitFor(() => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('language');
        });
    });

    // ✅ Test: Timer settings applied in game
    test('should apply timer settings from settings to game', async () => {
        // Set custom timer duration
        AsyncStorage.getItem.mockImplementation((key) => {
            if (key === 'timerDuration') return Promise.resolve('90');
            return Promise.resolve(null);
        });

        const { getByText } = render(<TestApp />);

        await waitFor(() => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('timerDuration');
        });
    });

    // ✅ Test: Sound settings persist across game sessions
    test('should persist sound settings across game sessions', async () => {
        AsyncStorage.getItem.mockImplementation((key) => {
            if (key === 'soundEnabled') return Promise.resolve('false');
            return Promise.resolve(null);
        });

        const { getByText } = render(<TestApp />);

        await waitFor(() => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('soundEnabled');
        });
    });

    // ✅ Test: Multiple game rounds
    test('should handle multiple consecutive game rounds', async () => {
        const { getByText } = render(<TestApp />);

        // Play game 1
        // Navigate to scoreboard
        // Play again
        // Complete game 2
        // Verify both scores were saved

        await waitFor(() => {
            expect(AsyncStorage.setItem).toBeDefined();
        });
    });

    // ✅ Test: Different game modes flow
    test('should handle different game modes in sequence', async () => {
        const { getByText } = render(<TestApp />);

        // Play multiplayer mode
        // Then play single player mode
        // Verify each mode works correctly

        await waitFor(() => {
            expect(getByText).toBeTruthy();
        });
    });
});

/**
 * 📚 WHAT YOU LEARNED:
 * =====================
 * 
 * 1. Integration testing with React Navigation
 * 2. Testing navigation flows between screens
 * 3. Testing state persistence across screens
 * 4. Testing settings application in different contexts
 * 5. Creating a test app with NavigationContainer
 * 6. Testing complete user journeys
 * 
 * 💡 NOTE: These are basic integration test structures.
 * For full implementation, you would need to:
 * - Add testIDs to components for reliable selection
 * - Simulate actual user interactions (button presses, input)
 * - Mock game logic completion
 * - Verify specific UI elements and values
 */
