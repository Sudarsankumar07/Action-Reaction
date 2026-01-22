/**
 * 🧪 Testing words.js - Word Database Functions
 * ==============================================
 * 
 * This tests the random word selection and database queries.
 */

import { getRandomWord, getAllTopics, getWordCount } from '../../../src/data/words';

describe('getRandomWord', () => {
    // ✅ Test: Should return a word
    test('should return a word from specified topic', () => {
        const word = getRandomWord('food', [], 'en');

        expect(word).toBeDefined();
        expect(typeof word).toBe('string');
        expect(word.length).toBeGreaterThan(0);
    });

    // ✅ Test: Should exclude used words
    test('should exclude words from usedWords array', () => {
        const usedWords = ['pizza', 'burger'];
        const word = getRandomWord('food', usedWords, 'en');

        // Word should NOT be in usedWords
        expect(usedWords).not.toContain(word);
    });

    // ✅ Test: Should handle invalid topic
    test('should handle invalid topic gracefully', () => {
        const word = getRandomWord('invalidtopic', [], 'en');

        // Should either return null or a fallback word
        expect(word === null || typeof word === 'string').toBe(true);
    });

    // ✅ Test: Should work with Tamil language
    test('should return Tamil word when language is "ta"', () => {
        const word = getRandomWord('food', [], 'ta');

        expect(word).toBeDefined();
        expect(typeof word).toBe('string');
    });

    // ✅ Test: Should return null when no words available
    test('should return null when all words are used', () => {
        // Get all words from a topic first
        const topic = 'food';
        const allWords = [];

        // Try to get words until we get null (all used)
        let word;
        let attempts = 0;
        do {
            word = getRandomWord(topic, allWords, 'en');
            if (word) allWords.push(word);
            attempts++;
        } while (word && attempts < 1000); // Safety limit

        // Now all words should be used
        const result = getRandomWord(topic, allWords, 'en');
        expect(result).toBeNull();
    });
});

describe('getAllTopics', () => {
    // ✅ Test: Should return array of topics
    test('should return an array of topics', () => {
        const topics = getAllTopics('en');

        expect(Array.isArray(topics)).toBe(true);
        expect(topics.length).toBeGreaterThan(0);
    });

    // ✅ Test: Should return English topics by default
    test('should return English topics when no language specified', () => {
        const topics = getAllTopics();

        expect(Array.isArray(topics)).toBe(true);
        expect(topics).toContain('food');
        expect(topics).toContain('sports');
    });

    // ✅ Test: Should return Tamil topics
    test('should return Tamil topics for "ta" language', () => {
        const topics = getAllTopics('ta');

        expect(Array.isArray(topics)).toBe(true);
        expect(topics.length).toBeGreaterThan(0);
    });

    // ✅ Test: Topics should be strings
    test('all topics should be strings', () => {
        const topics = getAllTopics('en');

        topics.forEach(topic => {
            expect(typeof topic).toBe('string');
        });
    });
});

describe('getWordCount', () => {
    // ✅ Test: Should return number
    test('should return word count for valid topic', () => {
        const count = getWordCount('food', 'en');

        expect(typeof count).toBe('number');
        expect(count).toBeGreaterThan(0);
    });

    // ✅ Test: Should return 0 for invalid topic
    test('should return 0 for invalid topic', () => {
        const count = getWordCount('invalidtopic', 'en');

        expect(count).toBe(0);
    });

    // ✅ Test: Should work with Tamil
    test('should return count for Tamil topics', () => {
        const count = getWordCount('food', 'ta');

        expect(typeof count).toBe('number');
        expect(count).toBeGreaterThanOrEqual(0);
    });
});

/**
 * 🎓 NEW CONCEPTS YOU LEARNED:
 * ============================
 * 
 * 1. toBeNull() - Checks if value is null
 * 2. toBeGreaterThan() - Checks if number is greater
 * 3. Array.isArray() - Checks if value is an array
 * 4. forEach() - Test every item in an array
 * 5. Safety limits - Prevent infinite loops in tests
 */
