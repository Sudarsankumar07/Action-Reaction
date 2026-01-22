/**
 * 🧪 Testing hintService.js - Hint Service with Caching
 * =======================================================
 * 
 * This tests the hint service that manages AI hints, caching, and fallbacks
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import hintService from '../../../src/services/hintService';
import groqService from '../../../src/services/groqService';
import { generateHints as generateStaticHints } from '../../../src/data/hints';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-native-community/netinfo');
jest.mock('../../../src/services/groqService');
jest.mock('../../../src/data/hints');

describe('HintService', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Reset AsyncStorage mock
        AsyncStorage.getItem.mockResolvedValue(null);
        AsyncStorage.setItem.mockResolvedValue();
        AsyncStorage.removeItem.mockResolvedValue();
        AsyncStorage.getAllKeys.mockResolvedValue([]);
        AsyncStorage.multiRemove.mockResolvedValue();

        // Suppress console logs during tests
        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'warn').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        console.log.mockRestore();
        console.warn.mockRestore();
        console.error.mockRestore();
    });

    describe('isOnline', () => {
        // ✅ Test: Should return true when connected and internet reachable
        test('should return true when device is online', async () => {
            NetInfo.fetch.mockResolvedValue({
                isConnected: true,
                isInternetReachable: true,
            });

            const result = await hintService.isOnline();
            expect(result).toBe(true);
        });

        // ✅ Test: Should return false when offline
        test('should return false when device is offline', async () => {
            NetInfo.fetch.mockResolvedValue({
                isConnected: false,
                isInternetReachable: false,
            });

            const result = await hintService.isOnline();
            expect(result).toBe(false);
        });

        // ✅ Test: Should handle null isInternetReachable (web platform)
        test('should handle null isInternetReachable on web platform', async () => {
            NetInfo.fetch.mockResolvedValue({
                isConnected: true,
                isInternetReachable: null,
            });

            const result = await hintService.isOnline();
            expect(result).toBe(true);
        });

        // ✅ Test: Should handle NetInfo errors
        test('should return false on NetInfo error', async () => {
            NetInfo.fetch.mockRejectedValue(new Error('NetInfo error'));

            const result = await hintService.isOnline();
            expect(result).toBe(false);
        });
    });

    describe('getHints', () => {
        // ✅ Test: Should use static hints when useAI is false
        test('should use static hints when useAI is false', async () => {
            const mockHints = ['Static 1', 'Static 2', 'Static 3', 'Static 4'];
            generateStaticHints.mockReturnValue(mockHints);

            const result = await hintService.getHints('pizza', 'food', false);

            expect(generateStaticHints).toHaveBeenCalledWith('pizza', 'food', 'en');
            expect(result).toEqual(mockHints);
        });

        // ✅ Test: Should generate fresh AI hints when online
        test('should generate fresh AI hints when online and useAI is true', async () => {
            const mockAIHints = ['AI 1', 'AI 2', 'AI 3', 'AI 4'];

            NetInfo.fetch.mockResolvedValue({
                isConnected: true,
                isInternetReachable: true,
            });

            groqService.generateHints.mockResolvedValue(mockAIHints);

            const result = await hintService.getHints('burger', 'food', true, 'en');

            expect(groqService.generateHints).toHaveBeenCalledWith('burger', 'food', 'medium', 'en');
            expect(result).toEqual(mockAIHints);
        });

        // ✅ Test: Should cache AI hints after generation
        test('should cache AI hints after successful generation', async () => {
            const mockAIHints = ['AI 1', 'AI 2', 'AI 3', 'AI 4'];

            NetInfo.fetch.mockResolvedValue({
                isConnected: true,
                isInternetReachable: true,
            });

            groqService.generateHints.mockResolvedValue(mockAIHints);

            await hintService.getHints('pizza', 'food', true);

            expect(AsyncStorage.setItem).toHaveBeenCalled();
            const cacheKey = AsyncStorage.setItem.mock.calls[0][0];
            expect(cacheKey).toContain('ai_hints_');
            expect(cacheKey).toContain('pizza');
        });

        // ✅ Test: Should use cached hints when offline
        test('should use cached hints when offline', async () => {
            const cachedHints = ['Cached 1', 'Cached 2', 'Cached 3', 'Cached 4'];
            const cacheData = {
                word: 'pizza',
                topic: 'food',
                hints: cachedHints,
                language: 'en',
                timestamp: Date.now(),
            };

            NetInfo.fetch.mockResolvedValue({
                isConnected: false,
                isInternetReachable: false,
            });

            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(cacheData));

            const result = await hintService.getHints('pizza', 'food', true);

            expect(result).toEqual(cachedHints);
        });

        // ✅ Test: Should use static hints when offline and no cache
        test('should use static hints when offline and no cache available', async () => {
            const mockStaticHints = ['Static 1', 'Static 2', 'Static 3', 'Static 4'];

            NetInfo.fetch.mockResolvedValue({
                isConnected: false,
                isInternetReachable: false,
            });

            AsyncStorage.getItem.mockResolvedValue(null);
            generateStaticHints.mockReturnValue(mockStaticHints);

            const result = await hintService.getHints('pizza', 'food', true);

            expect(generateStaticHints).toHaveBeenCalled();
            expect(result).toEqual(mockStaticHints);
        });

        // ✅ Test: Should fallback to static hints on AI error
        test('should fallback to static hints when AI generation fails', async () => {
            const mockStaticHints = ['Static 1', 'Static 2', 'Static 3', 'Static 4'];

            NetInfo.fetch.mockResolvedValue({
                isConnected: true,
                isInternetReachable: true,
            });

            groqService.generateHints.mockRejectedValue(new Error('API Error'));
            AsyncStorage.getItem.mockResolvedValue(null);
            generateStaticHints.mockReturnValue(mockStaticHints);

            const result = await hintService.getHints('pizza', 'food', true);

            expect(result).toEqual(mockStaticHints);
        });

        // ✅ Test: Should support Tamil language
        test('should support Tamil language hints', async () => {
            const mockTamilHints = ['தமிழ் 1', 'தமிழ் 2', 'தமிழ் 3', 'தமிழ் 4'];

            NetInfo.fetch.mockResolvedValue({
                isConnected: true,
                isInternetReachable: true,
            });

            groqService.generateHints.mockResolvedValue(mockTamilHints);

            const result = await hintService.getHints('பூ', 'food', true, 'ta');

            expect(groqService.generateHints).toHaveBeenCalledWith('பூ', 'food', 'medium', 'ta');
            expect(result).toEqual(mockTamilHints);
        });
    });

    describe('getCachedHints', () => {
        // ✅ Test: Should return cached hints if valid
        test('should return cached hints if not expired', async () => {
            const cachedHints = ['Hint 1', 'Hint 2', 'Hint 3', 'Hint 4'];
            const cacheData = {
                word: 'pizza',
                topic: 'food',
                hints: cachedHints,
                timestamp: Date.now() - (1000 * 60 * 60), // 1 hour ago
            };

            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(cacheData));

            const result = await hintService.getCachedHints('pizza', 'food');

            expect(result).toEqual(cachedHints);
        });

        // ✅ Test: Should return null for expired cache
        test('should remove and return null for expired cache', async () => {
            const cacheData = {
                word: 'pizza',
                hints: ['Old 1', 'Old 2', 'Old 3', 'Old 4'],
                timestamp: Date.now() - (1000 * 60 * 60 * 25), // 25 hours ago
            };

            AsyncStorage.getItem.mockResolvedValue(JSON.stringify(cacheData));

            const result = await hintService.getCachedHints('pizza', 'food');

            expect(result).toBeNull();
            expect(AsyncStorage.removeItem).toHaveBeenCalled();
        });

        // ✅ Test: Should return null when no cache exists
        test('should return null when no cache exists', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);

            const result = await hintService.getCachedHints('pizza', 'food');

            expect(result).toBeNull();
        });
    });

    describe('getCacheKey', () => {
        // ✅ Test: Should generate correct cache key
        test('should generate correct cache key format', () => {
            const key = hintService.getCacheKey('Pizza', 'food', 'en');

            expect(key).toBe('ai_hints_en_food_pizza');
        });

        // ✅ Test: Should handle Tamil language
        test('should include language in cache key', () => {
            const key = hintService.getCacheKey('பூ', 'food', 'ta');

            expect(key).toContain('ta');
            expect(key).toContain('food');
        });
    });

    describe('clearCache', () => {
        // ✅ Test: Should clear all hint caches
        test('should clear all cached hints', async () => {
            AsyncStorage.getAllKeys.mockResolvedValue([
                'ai_hints_en_food_pizza',
                'ai_hints_en_sports_soccer',
                'other_key',
            ]);

            await hintService.clearCache();

            expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
                'ai_hints_en_food_pizza',
                'ai_hints_en_sports_soccer',
            ]);
        });

        // ✅ Test: Should handle empty cache
        test('should handle empty cache gracefully', async () => {
            AsyncStorage.getAllKeys.mockResolvedValue([]);

            await hintService.clearCache();

            expect(AsyncStorage.multiRemove).not.toHaveBeenCalled();
        });
    });

    describe('getCacheStats', () => {
        // ✅ Test: Should return cache statistics
        test('should return correct cache statistics', async () => {
            AsyncStorage.getAllKeys.mockResolvedValue([
                'ai_hints_en_food_pizza',
                'ai_hints_en_sports_soccer',
                'other_key',
            ]);

            const stats = await hintService.getCacheStats();

            expect(stats.totalCached).toBe(2);
            expect(stats.cacheKeys).toHaveLength(2);
        });

        // ✅ Test: Should handle errors
        test('should handle errors gracefully', async () => {
            AsyncStorage.getAllKeys.mockRejectedValue(new Error('Storage error'));

            const stats = await hintService.getCacheStats();

            expect(stats.totalCached).toBe(0);
            expect(stats.cacheKeys).toEqual([]);
        });
    });
});

/**
 * 📚 WHAT YOU LEARNED:
 * =====================
 * 
 * 1. Mocking async operations with mockResolvedValue/mockRejectedValue
 * 2. Testing caching logic with time-based expiration
 * 3. Testing online/offline scenarios
 * 4. Testing fallback mechanisms
 * 5. Testing multi-language support
 * 6. beforeEach/afterEach for test isolation
 */
