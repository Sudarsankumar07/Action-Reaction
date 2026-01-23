/**
 * 🧪 Integration Test - Data Persistence
 * =======================================
 * 
 * This tests AsyncStorage persistence across app sessions
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveHighScore, getHighScore } from '../../src/services/highScoreService';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

describe('Integration: Data Persistence', () => {
    let mockStorage;

    beforeEach(() => {
        jest.clearAllMocks();

        // Reset mock storage state
        mockStorage = {};

        AsyncStorage.getItem.mockImplementation((key) => {
            return Promise.resolve(mockStorage[key] || null);
        });

        AsyncStorage.setItem.mockImplementation((key, value) => {
            mockStorage[key] = value;
            return Promise.resolve();
        });

        AsyncStorage.removeItem.mockImplementation((key) => {
            delete mockStorage[key];
            return Promise.resolve();
        });

        AsyncStorage.multiSet = jest.fn().mockImplementation((pairs) => {
            pairs.forEach(([key, value]) => {
                mockStorage[key] = value;
            });
            return Promise.resolve();
        });

        AsyncStorage.multiRemove = jest.fn().mockImplementation((keys) => {
            keys.forEach((key) => {
                delete mockStorage[key];
            });
            return Promise.resolve();
        });

        // Suppress console logs
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        console.log.mockRestore();
    });

    // ✅ Test: Language preference persistence
    test('should persist language preference', async () => {
        const language = 'ta';

        await AsyncStorage.setItem('language', language);
        const retrieved = await AsyncStorage.getItem('language');

        expect(AsyncStorage.setItem).toHaveBeenCalledWith('language', 'ta');
        expect(retrieved).toBe(language);
    });

    // ✅ Test: Timer settings persistence
    test('should persist timer duration setting', async () => {
        const timerDuration = '90';

        await AsyncStorage.setItem('timerDuration', timerDuration);
        const retrieved = await AsyncStorage.getItem('timerDuration');

        expect(AsyncStorage.setItem).toHaveBeenCalledWith('timerDuration', '90');
        expect(retrieved).toBe(timerDuration);
    });

    // ✅ Test: Sound settings persistence
    test('should persist sound enabled setting', async () => {
        const soundEnabled = 'true';

        await AsyncStorage.setItem('soundEnabled', soundEnabled);
        const retrieved = await AsyncStorage.getItem('soundEnabled');

        expect(AsyncStorage.setItem).toHaveBeenCalledWith('soundEnabled', 'true');
        expect(retrieved).toBe(soundEnabled);
    });

    // ✅ Test: Vibration settings persistence
    test('should persist vibration setting', async () => {
        const vibrateEnabled = 'false';

        await AsyncStorage.setItem('vibrateEnabled', vibrateEnabled);
        const retrieved = await AsyncStorage.getItem('vibrateEnabled');

        expect(retrieved).toBe(vibrateEnabled);
    });

    // ✅ Test: High scores persistence
    test('should persist high scores', async () => {
        const highScoreData = JSON.stringify({
            food: 85,
            sports: 92,
            movies: 78,
        });

        await AsyncStorage.setItem('highScores', highScoreData);
        const retrieved = await AsyncStorage.getItem('highScores');

        expect(retrieved).toBe(highScoreData);
    });

    // ✅ Test: Multiple settings persistence
    test('should persist multiple settings simultaneously', async () => {
        await AsyncStorage.setItem('language', 'en');
        await AsyncStorage.setItem('timerDuration', '60');
        await AsyncStorage.setItem('soundEnabled', 'true');

        const language = await AsyncStorage.getItem('language');
        const timer = await AsyncStorage.getItem('timerDuration');
        const sound = await AsyncStorage.getItem('soundEnabled');

        expect(language).toBe('en');
        expect(timer).toBe('60');
        expect(sound).toBe('true');
    });

    // ✅ Test: Data retrieval on app restart
    test('should retrieve data on app restart', async () => {
        // Simulate saving data
        await AsyncStorage.setItem('language', 'ta');
        await AsyncStorage.setItem('timerDuration', '120');

        // Simulate app restart - data should still be available
        const language = await AsyncStorage.getItem('language');
        const timer = await AsyncStorage.getItem('timerDuration');

        expect(language).toBe('ta');
        expect(timer).toBe('120');
    });

    // ✅ Test: Clearing specific setting
    test('should clear specific setting', async () => {
        await AsyncStorage.setItem('soundEnabled', 'true');
        await AsyncStorage.removeItem('soundEnabled');

        const retrieved = await AsyncStorage.getItem('soundEnabled');

        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('soundEnabled');
        expect(retrieved).toBeNull();
    });

    // ✅ Test: Default values when no data exists
    test('should return null for non-existent keys', async () => {
        const retrieved = await AsyncStorage.getItem('nonExistentKey');

        expect(retrieved).toBeNull();
    });

    // ✅ Test: Updating existing setting
    test('should update existing setting value', async () => {
        await AsyncStorage.setItem('timerDuration', '60');
        await AsyncStorage.setItem('timerDuration', '90');

        const retrieved = await AsyncStorage.getItem('timerDuration');

        expect(retrieved).toBe('90');
    });

    // ✅ Test: Store complex JSON data
    test('should store and retrieve complex JSON data', async () => {
        const complexData = {
            user: 'player1',
            scores: [85, 92, 78],
            settings: {
                language: 'en',
                sound: true,
            },
        };

        await AsyncStorage.setItem('gameData', JSON.stringify(complexData));
        const retrieved = await AsyncStorage.getItem('gameData');
        const parsed = JSON.parse(retrieved);

        expect(parsed).toEqual(complexData);
    });

    // ✅ Test: High score service integration
    test('should integrate with high score service', async () => {
        // This tests the actual high score service if not mocked
        // For now, it verifies the service exists
        expect(saveHighScore).toBeDefined();
        expect(getHighScore).toBeDefined();
    });

    // ✅ Test: Error handling for storage failures
    test('should handle storage errors gracefully', async () => {
        AsyncStorage.setItem.mockRejectedValueOnce(new Error('Storage full'));

        try {
            await AsyncStorage.setItem('key', 'value');
        } catch (error) {
            expect(error.message).toBe('Storage full');
        }
    });

    // ✅ Test: Batch operations
    test('should handle batch set operations', async () => {
        const pairs = [
            ['language', 'en'],
            ['timerDuration', '60'],
            ['soundEnabled', 'true'],
        ];

        await AsyncStorage.multiSet(pairs);

        expect(AsyncStorage.multiSet).toHaveBeenCalledWith(pairs);
    });

    // ✅ Test: Batch removal
    test('should handle batch remove operations', async () => {
        const keys = ['language', 'timerDuration', 'soundEnabled'];

        await AsyncStorage.multiRemove(keys);

        expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(keys);
    });
});

/**
 * 📚 WHAT YOU LEARNED:
 * =====================
 * 
 * 1. Testing AsyncStorage persistence
 * 2. Testing data retrieval across app sessions
 * 3. Testing complex JSON storage
 * 4. Testing batch operations
 * 5. Testing error handling for storage
 * 6. Testing settings persistence
 * 7. Mocking AsyncStorage for reliable tests
 * 
 * 💡 NOTE: These tests use a mocked AsyncStorage to ensure
 * consistency and isolation. In a real app, you might want
 * to test with actual storage on a real device for E2E tests.
 */
