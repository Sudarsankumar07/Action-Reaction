/**
 * 🧪 Testing highScoreService.js
 * ===============================
 * 
 * This tests AsyncStorage operations for high scores.
 * We'll MOCK AsyncStorage so tests don't use real storage.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHighScore, saveHighScore, clearHighScores } from '../../../src/services/highScoreService';

// Mock AsyncStorage (fake storage for testing)
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
}));

describe('highScoreService', () => {
    // Reset mocks before each test (start fresh)
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getHighScore', () => {
        // ✅ Test: Should return 0 when no score saved
        test('should return 0 when no high score exists', async () => {
            // ARRANGE: Mock AsyncStorage to return null
            AsyncStorage.getItem.mockResolvedValue(null);

            // ACT: Get high score
            const score = await getHighScore('time-attack');

            // ASSERT: Should be 0
            expect(score).toBe(0);
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('@high_scores');
        });

        // ✅ Test: Should return saved score
        test('should return saved high score for mode', async () => {
            // ARRANGE: Mock saved scores
            const savedScores = JSON.stringify({
                'time-attack': 42,
                'ai-hints': 15,
            });
            AsyncStorage.getItem.mockResolvedValue(savedScores);

            // ACT
            const score = await getHighScore('time-attack');

            // ASSERT
            expect(score).toBe(42);
        });

        // ✅ Test: Should handle errors gracefully
        test('should return 0 on error', async () => {
            // ARRANGE: Mock error
            AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

            // ACT
            const score = await getHighScore('time-attack');

            // ASSERT: Should return 0, not crash
            expect(score).toBe(0);
        });
    });

    describe('saveHighScore', () => {
        // ✅ Test: Should save new record
        test('should save new high score when higher than previous', async () => {
            // ARRANGE: No previous scores
            AsyncStorage.getItem.mockResolvedValue(null);
            AsyncStorage.setItem.mockResolvedValue(undefined);

            // ACT: Save score of 50
            const result = await saveHighScore('time-attack', 50);

            // ASSERT
            expect(result.isNewRecord).toBe(true);
            expect(result.newHigh).toBe(50);
            expect(result.previousHigh).toBe(0);
            expect(AsyncStorage.setItem).toHaveBeenCalled();
        });

        // ✅ Test: Should NOT save if score is lower
        test('should not update when score is lower than previous', async () => {
            // ARRANGE: Previous high score = 100
            const savedScores = JSON.stringify({ 'time-attack': 100 });
            AsyncStorage.getItem.mockResolvedValue(savedScores);

            // ACT: Try to save 50 (lower)
            const result = await saveHighScore('time-attack', 50);

            // ASSERT: Not a new record
            expect(result.isNewRecord).toBe(false);
            expect(result.previousHigh).toBe(100);
            expect(result.newHigh).toBe(100); // Stays at 100
        });

        // ✅ Test: Should update when score is higher
        test('should update when score beats previous high', async () => {
            // ARRANGE: Previous = 50
            const savedScores = JSON.stringify({ 'time-attack': 50 });
            AsyncStorage.getItem.mockResolvedValue(savedScores);
            AsyncStorage.setItem.mockResolvedValue(undefined);

            // ACT: Save 75 (higher)
            const result = await saveHighScore('time-attack', 75);

            // ASSERT: New record!
            expect(result.isNewRecord).toBe(true);
            expect(result.previousHigh).toBe(50);
            expect(result.newHigh).toBe(75);
        });
    });

    describe('clearHighScores', () => {
        // ✅ Test: Should clear storage
        test('should remove high scores from storage', async () => {
            // ARRANGE
            AsyncStorage.removeItem.mockResolvedValue(undefined);

            // ACT
            await clearHighScores();

            // ASSERT
            expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@high_scores');
        });
    });
});

/**
 * 🎓 ADVANCED CONCEPTS LEARNED:
 * =============================
 * 
 * 1. jest.mock() - Replace real module with fake one
 * 2. mockResolvedValue() - Fake async return value
 * 3. mockRejectedValue() - Fake async error
 * 4. beforeEach() - Run before each test
 * 5. toHaveBeenCalled() - Check if function was called
 * 6. async/await - Test async functions
 * 
 * 💡 WHY MOCK?
 * We don't want tests to actually save to real AsyncStorage:
 * - Tests would be slow
 * - Tests would interfere with each other
 * - Tests wouldn't work on CI servers
 */
