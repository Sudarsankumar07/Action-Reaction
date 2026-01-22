/**
 * 🧪 Context Tests: LanguageContext
 * =================================
 * 
 * Testing React Context is special - we need to test:
 * 1. Provider - Does it provide values?
 * 2. Consumer - Can components use the context?
 * 3. Functions - Do context functions work?
 */

import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageProvider, useLanguage } from '../../src/contexts/LanguageContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

// Test component that uses the context
const TestComponent = () => {
    const { language, switchLanguage, t } = useLanguage();

    return (
        <>
            <Text testID="current-language">{language}</Text>
            <Text testID="translated-text">{t('home.title')}</Text>
            <Text onPress={() => switchLanguage('ta')} testID="switch-button">
                Switch
            </Text>
        </>
    );
};

describe('LanguageContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        AsyncStorage.getItem.mockResolvedValue(null);
    });

    // ✅ Test: Provider Renders Children
    test('should render children components', () => {
        const { getByText } = render(
            <LanguageProvider>
                <Text>Test Child</Text>
            </LanguageProvider>
        );

        expect(getByText('Test Child')).toBeTruthy();
    });

    // ✅ Test: Default Language is English
    test('should default to English language', async () => {
        const { getByTestID } = render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        await waitFor(() => {
            const languageText = getByTestID('current-language');
            expect(languageText.props.children).toBe('en');
        });
    });

    // ✅ Test: Load Saved Language from AsyncStorage
    test('should load saved language from AsyncStorage', async () => {
        // Mock AsyncStorage to return Tamil
        AsyncStorage.getItem.mockResolvedValue('ta');

        const { getByTestID } = render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        await waitFor(() => {
            const languageText = getByTestID('current-language');
            expect(languageText.props.children).toBe('ta');
        });

        expect(AsyncStorage.getItem).toHaveBeenCalledWith('app_language');
    });

    // ✅ Test: Switch Language
    test('should switch language when switchLanguage is called', async () => {
        const { getByTestID } = render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        // Initial language should be English
        await waitFor(() => {
            expect(getByTestID('current-language').props.children).toBe('en');
        });

        // Switch to Tamil
        const switchButton = getByTestID('switch-button');
        await act(async () => {
            switchButton.props.onPress();
        });

        // Language should be Tamil now
        await waitFor(() => {
            expect(getByTestID('current-language').props.children).toBe('ta');
        });

        // Should save to AsyncStorage
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('app_language', 'ta');
    });

    // ✅ Test: Translation Function (t)
    test('should translate keys correctly', async () => {
        const { getByTestID } = render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        await waitFor(() => {
            const translatedText = getByTestID('translated-text');
            // Should show English translation
            expect(translatedText.props.children).toBeDefined();
            expect(typeof translatedText.props.children).toBe('string');
        });
    });

    // ✅ Test: Multiple Context Consumers
    test('should provide same context to multiple consumers', async () => {
        const Consumer1 = () => {
            const { language } = useLanguage();
            return <Text testID="consumer1">{language}</Text>;
        };

        const Consumer2 = () => {
            const { language } = useLanguage();
            return <Text testID="consumer2">{language}</Text>;
        };

        const { getByTestID } = render(
            <LanguageProvider>
                <Consumer1 />
                <Consumer2 />
            </LanguageProvider>
        );

        await waitFor(() => {
            const lang1 = getByTestID('consumer1').props.children;
            const lang2 = getByTestID('consumer2').props.children;
            expect(lang1).toBe(lang2);
            expect(lang1).toBe('en');
        });
    });

    // ✅ Test: Handle AsyncStorage Errors
    test('should handle AsyncStorage errors gracefully', async () => {
        // Mock AsyncStorage error
        AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

        const { getByTestID } = render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );

        // Should still default to English
        await waitFor(() => {
            expect(getByTestID('current-language').props.children).toBe('en');
        });
    });

    // ✅ Test: Translation Fallback
    test('should return key when translation missing', async () => {
        const TestTranslation = () => {
            const { t } = useLanguage();
            return <Text testID="missing-key">{t('non.existent.key')}</Text>;
        };

        const { getByTestID } = render(
            <LanguageProvider>
                <TestTranslation />
            </LanguageProvider>
        );

        await waitFor(() => {
            const text = getByTestID('missing-key').props.children;
            // Should return the key itself as fallback
            expect(text).toContain('non.existent.key');
        });
    });
});

/**
 * 🎓 CONTEXT TESTING CONCEPTS LEARNED:
 * ====================================
 * 
 * 1. waitFor() - Wait for async updates
 * 2. act() - Wrap state updates
 * 3. Provider pattern testing
 * 4. Multiple consumers
 * 5. AsyncStorage mocking
 * 6. Error handling testing
 * 7. Default values testing
 * 8. State persistence testing
 * 
 * 💡 KEY PATTERNS:
 * ===============
 * - Always wrap context tests in Provider
 * - Use waitFor for async operations
 * - Test both success and error paths
 * - Test multiple consumers share state
 * - Mock external dependencies (AsyncStorage)
 * 
 * 🧪 TESTING STRATEGY:
 * ===================
 * 1. Test Provider renders children
 * 2. Test default state
 * 3. Test state changes
 * 4. Test persistence
 * 5. Test error handling
 * 6. Test edge cases
 */
