/**
 * 🧪 Testing groqService.js - AI Hint Generation Service
 * ========================================================
 * 
 * This tests the Groq API service for hint generation
 */

import axios from 'axios';
import groqService from '../../../src/services/groqService';

// Mock axios
jest.mock('axios');

describe('GroqService', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Suppress console logs during tests
        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'warn').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        // Restore console
        console.log.mockRestore();
        console.warn.mockRestore();
        console.error.mockRestore();
    });

    describe('generateHints', () => {
        // ✅ Test: Should call API with correct parameters
        test('should call proxy API with correct parameters', async () => {
            const mockHints = ['Hint 1', 'Hint 2', 'Hint 3', 'Hint 4'];
            const mockResponse = {
                data: {
                    success: true,
                    hints: mockHints,
                },
            };

            axios.post.mockResolvedValue(mockResponse);

            const word = 'pizza';
            const topic = 'food';
            const difficulty = 'medium';
            const language = 'en';

            const result = await groqService.generateHints(word, topic, difficulty, language);

            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/api/hints/generate'),
                {
                    word,
                    topic,
                    difficulty,
                    language,
                },
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'X-App-Secret': expect.any(String),
                    }),
                    timeout: 15000,
                })
            );

            expect(result).toEqual(mockHints);
        });

        // ✅ Test: Should return array of 4 hints on success
        test('should return array of 4 hints on successful API call', async () => {
            const mockHints = ['Hint 1', 'Hint 2', 'Hint 3', 'Hint 4'];
            axios.post.mockResolvedValue({
                data: {
                    success: true,
                    hints: mockHints,
                },
            });

            const result = await groqService.generateHints('burger', 'food');

            expect(result).toHaveLength(4);
            expect(Array.isArray(result)).toBe(true);
        });

        // ✅ Test: Should handle API errors gracefully
        test('should return fallback hints on API error', async () => {
            axios.post.mockRejectedValue(new Error('Network error'));

            const result = await groqService.generateHints('pizza', 'food');

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result).toHaveLength(4);
        });

        // ✅ Test: Should handle timeout
        test('should use timeout of 15 seconds', async () => {
            axios.post.mockResolvedValue({
                data: {
                    success: true,
                    hints: ['H1', 'H2', 'H3', 'H4'],
                },
            });

            await groqService.generateHints('word', 'topic');

            expect(axios.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(Object),
                expect.objectContaining({
                    timeout: 15000,
                })
            );
        });

        // ✅ Test: Should use fallback on invalid response
        test('should use fallback hints when response is invalid', async () => {
            axios.post.mockResolvedValue({
                data: {
                    success: false,
                    hints: null,
                },
            });

            const result = await groqService.generateHints('word', 'topic');

            expect(result).toHaveLength(4);
            expect(Array.isArray(result)).toBe(true);
        });

        // ✅ Test: Should handle response with wrong number of hints
        test('should use fallback when hints array is wrong length', async () => {
            axios.post.mockResolvedValue({
                data: {
                    success: true,
                    hints: ['H1', 'H2'], // Only 2 hints instead of 4
                },
            });

            const result = await groqService.generateHints('word', 'topic');

            expect(result).toHaveLength(4);
        });
    });

    describe('generateFallbackHints', () => {
        // ✅ Test: Should generate fallback hints
        test('should generate 4 fallback hints', () => {
            const result = groqService.generateFallbackHints('pizza', 'food');

            expect(result).toHaveLength(4);
            expect(Array.isArray(result)).toBe(true);
        });

        // ✅ Test: Should include word length in hints
        test('should include word length information in hints', () => {
            const word = 'testing';
            const result = groqService.generateFallbackHints(word, 'general');

            const hasLengthInfo = result.some(hint =>
                hint.includes(word.length.toString())
            );
            expect(hasLengthInfo).toBe(true);
        });

        // ✅ Test: Should include first letter hint
        test('should include first letter in hints', () => {
            const word = 'pizza';
            const result = groqService.generateFallbackHints(word, 'food');

            const hasFirstLetter = result.some(hint =>
                hint.includes(word[0].toUpperCase())
            );
            expect(hasFirstLetter).toBe(true);
        });

        // ✅ Test: Should use custom clues when available
        test('should use custom clues for known words', () => {
            const result = groqService.generateFallbackHints('Wedding', 'general');

            expect(result[0]).toContain('special ceremony');
        });

        // ✅ Test: Should handle unknown words
        test('should handle unknown words with topic-based hints', () => {
            const result = groqService.generateFallbackHints('unknownword', 'sports');

            expect(result).toBeDefined();
            expect(result).toHaveLength(4);
        });

        // ✅ Test: Should progressively reveal more information
        test('should provide progressive hints with increasing detail', () => {
            const word = 'example';
            const result = groqService.generateFallbackHints(word, 'general');

            // Last hint should be most revealing (partial word)
            const lastHint = result[3];
            expect(lastHint).toContain('_'); // Contains blanks
            expect(lastHint).toMatch(/[A-Z]/); // Contains revealed letters
        });
    });

    describe('error handling', () => {
        // ✅ Test: Should handle network errors
        test('should handle network errors gracefully', async () => {
            axios.post.mockRejectedValue(new Error('ECONNREFUSED'));

            const result = await groqService.generateHints('word', 'topic');

            expect(result).toBeDefined();
            expect(result).toHaveLength(4);
        });

        // ✅ Test: Should handle 500 server errors
        test('should handle server errors with fallback', async () => {
            axios.post.mockRejectedValue({
                response: {
                    status: 500,
                    data: { error: 'Internal server error' },
                },
            });

            const result = await groqService.generateHints('word', 'topic');

            expect(result).toBeDefined();
            expect(result).toHaveLength(4);
        });

        // ✅ Test: Should handle 401 authentication errors
        test('should handle authentication errors', async () => {
            axios.post.mockRejectedValue({
                response: {
                    status: 401,
                    data: { error: 'Unauthorized' },
                },
            });

            const result = await groqService.generateHints('word', 'topic');

            expect(result).toBeDefined();
            expect(result).toHaveLength(4);
        });
    });
});

/**
 * 📚 WHAT YOU LEARNED:
 * =====================
 * 
 * 1. jest.mock() - Mock external dependencies
 * 2. beforeEach() - Setup before each test
 * 3. afterEach() - Cleanup after each test
 * 4. mockResolvedValue() - Mock successful async calls
 * 5. mockRejectedValue() - Mock async errors
 * 6. toHaveBeenCalledWith() - Check function call arguments
 * 7. expect.objectContaining() - Partial object matching
 * 8. expect.stringContaining() - Partial string matching
 */
