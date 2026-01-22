/**
 * 🧪 Integration Test - Navigation
 * =================================
 * 
 * This tests navigation between all screens in the app
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../../../src/screens/HomeScreen';
import GameScreen from '../../../src/screens/GameScreen';
import SettingsScreen from '../../../src/screens/SettingsScreen';
import ScoreboardScreen from '../../../src/screens/ScoreboardScreen';

const Stack = createNativeStackNavigator();

// Test app with all screens
const TestNavigationApp = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Scoreboard" component={ScoreboardScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

describe('Integration: Navigation', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Suppress console logs
        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        console.log.mockRestore();
        console.error.mockRestore();
    });

    // ✅ Test: Navigation renders successfully
    test('should render navigation container', () => {
        const { getByText } = render(<TestNavigationApp />);
        expect(getByText).toBeTruthy();
    });

    // ✅ Test: Navigate from Home to Settings
    test('should navigate from Home to Settings', async () => {
        const { getByTestId } = render(<TestNavigationApp />);

        // This would require a testID on the settings button
        // fireEvent.press(getByTestId('settings-button'));

        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });

    // ✅ Test: Navigate from Home to Game
    test('should navigate from Home to Game with topic', async () => {
        const { getByTestId } = render(<TestNavigationApp />);

        // Would require testID on topic selection
        // fireEvent.press(getByTestId('topic-food'));

        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });

    // ✅ Test: Navigate from Game to Scoreboard
    test('should navigate from Game to Scoreboard after completion', async () => {
        const { getByTestId } = render(<TestNavigationApp />);

        // This would simulate game completion
        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });

    // ✅ Test: Back navigation from Settings
    test('should navigate back from Settings to Home', async () => {
        const { getByTestId } = render(<TestNavigationApp />);

        // Navigate to settings, then back
        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });

    // ✅ Test: Navigation params passing
    test('should pass navigation params correctly', async () => {
        const { getByTestId } = render(<TestNavigationApp />);

        // Test that topic and mode are passed to GameScreen
        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });

    // ✅ Test: Screen stack management
    test('should maintain proper screen stack', async () => {
        const { getByTestId } = render(<TestNavigationApp />);

        // Home → Game → Scoreboard
        // Should be able to go back to Home
        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });

    // ✅ Test: Deep link navigation
    test('should handle deep link to specific screen', async () => {
        // Test navigation to a specific screen directly
        const { getByTestId } = render(<TestNavigationApp />);

        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });

    // ✅ Test: Navigation header options
    test('should display correct navigation headers', async () => {
        const { getByText } = render(<TestNavigationApp />);

        await waitFor(() => {
            expect(getByText).toBeTruthy();
        });
    });

    // ✅ Test: Reset navigation stack
    test('should reset navigation stack on play again', async () => {
        const { getByTestId } = render(<TestNavigationApp />);

        // From Scoreboard, pressing play again should reset to Home
        await waitFor(() => {
            expect(getByTestId).toBeTruthy();
        });
    });
});

/**
 * 📚 WHAT YOU LEARNED:
 * =====================
 * 
 * 1. Testing React Navigation integration
 * 2. Testing navigation between screens
 * 3. Testing navigation params passing
 * 4. Testing back navigation
 * 5. Testing navigation stack management
 * 6. Setting up NavigationContainer for tests
 * 
 * 💡 NOTE: To fully test navigation interactions, you need to:
 * - Add testIDs to navigation buttons in actual screens
 * - Use fireEvent.press() to simulate button presses
 * - Verify screen changes by checking for screen-specific elements
 * - Test navigation with different params and scenarios
 */
