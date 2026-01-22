/**
 * 🧪 BEGINNER'S GUIDE TO TESTING
 * ==============================
 * 
 * This file tests the hints.js utility functions.
 * Each test follows the AAA pattern:
 * 
 * 1. ARRANGE - Setup test data
 * 2. ACT - Call the function being tested
 * 3. ASSERT - Check if result is correct
 * 
 * Run tests: npm test hints.test.js
 */

import {
    scrambleWord,
    generateBlanksPattern,
    calculateScore,
    getEmojiForWord
} from '../../../src/data/hints';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST 1: Testing scrambleWord function
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('scrambleWord', () => {
    // ✅ Test: Should scramble letters
    test('should scramble the letters of a word', () => {
        // ARRANGE: Prepare test data
        const word = 'hello';

        // ACT: Call the function
        const result = scrambleWord(word);

        // ASSERT: Check expectations
        expect(result).toBeDefined(); // Result exists
        expect(result.length).toBe(word.length); // Same length
        expect(typeof result).toBe('string'); // Is a string
    });

    // ✅ Test: Should not return original word
    test('should not return the original word', () => {
        const word = 'testing';
        const result = scrambleWord(word);

        // For words longer than 1 char, should be scrambled
        if (word.length > 1) {
            // Note: There's a small chance it could match by random
            // In production, we'd run this multiple times
            expect(result).not.toBe(word);
        }
    });

    // ✅ Test: Should handle single character
    test('should handle single character words', () => {
        const word = 'a';
        const result = scrambleWord(word);

        expect(result).toBe(word); // Single char can't be scrambled
    });

    // ✅ Test: Should maintain same characters
    test('should contain all original characters', () => {
        const word = 'react';
        const result = scrambleWord(word);

        // Split into arrays and sort to compare
        const originalChars = word.split('').sort();
        const scrambledChars = result.split('').sort();

        expect(scrambledChars).toEqual(originalChars);
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST 2: Testing generateBlanksPattern function
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('generateBlanksPattern', () => {
    // ✅ Test: Should create pattern with blanks
    test('should create a pattern with blanks and revealed letters', () => {
        const word = 'hello';
        const result = generateBlanksPattern(word);

        expect(result).toBeDefined();
        expect(result).toContain('_'); // Has blanks
        expect(result.length).toBeGreaterThan(0);
    });

    // ✅ Test: Should always show first letter
    test('should always reveal the first letter', () => {
        const word = 'pizza';
        const result = generateBlanksPattern(word);

        // First character should be 'p' (first letter of 'pizza')
        expect(result.charAt(0)).toBe(word.charAt(0));
    });

    // ✅ Test: Should handle Tamil text
    test('should handle Tamil text correctly', () => {
        const tamilWord = 'பூ';
        const result = generateBlanksPattern(tamilWord);

        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST 3: Testing calculateScore function  
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('calculateScore', () => {
    // ✅ Test: Hint level 1 = 10 points
    test('should return 10 points for hint level 1', () => {
        const score = calculateScore(1);
        expect(score).toBe(10);
    });

    // ✅ Test: Hint level 2 = 8 points
    test('should return 8 points for hint level 2', () => {
        const score = calculateScore(2);
        expect(score).toBe(8);
    });

    // ✅ Test: Hint level 3 = 6 points
    test('should return 6 points for hint level 3', () => {
        const score = calculateScore(3);
        expect(score).toBe(6);
    });

    // ✅ Test: Hint level 4 = 4 points
    test('should return 4 points for hint level 4', () => {
        const score = calculateScore(4);
        expect(score).toBe(4);
    });

    // ✅ Test: Invalid hint level = 0 points
    test('should return 0 for invalid hint levels', () => {
        expect(calculateScore(0)).toBe(0);
        expect(calculateScore(5)).toBe(0);
        expect(calculateScore(-1)).toBe(0);
        expect(calculateScore(null)).toBe(0);
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST 4: Testing getEmojiForWord function
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('getEmojiForWord', () => {
    // ✅ Test: Should return emoji for known word
    test('should return emoji hint for known English word', () => {
        const emoji = getEmojiForWord('pizza', 'en');
        expect(emoji).toBeDefined();
        expect(emoji).toBeTruthy();
        expect(typeof emoji).toBe('string');
    });

    // ✅ Test: Should return emoji for Tamil word
    test('should return emoji hint for known Tamil word', () => {
        const emoji = getEmojiForWord('பூ', 'ta');
        expect(emoji).toBeDefined();
        expect(emoji).toBeTruthy();
    });

    // ✅ Test: Should handle unknown words
    test('should return default emoji for unknown word', () => {
        const emoji = getEmojiForWord('unknownword123', 'en');
        expect(emoji).toBeDefined();
        // Should return some default emoji
        expect(emoji.length).toBeGreaterThan(0);
    });

    // ✅ Test: Should default to English language
    test('should use English as default language', () => {
        const emoji = getEmojiForWord('apple');
        expect(emoji).toBeDefined();
    });
});

/**
 * 📚 WHAT YOU LEARNED:
 * =====================
 * 
 * 1. describe() - Groups related tests together
 * 2. test() or it() - Individual test case
 * 3. expect() - Assertion to check results
 * 4. toBe() - Checks exact equality
 * 5. toEqual() - Checks deep equality (for objects/arrays)
 * 6. toBeDefined() - Checks value exists
 * 7. toContain() - Checks if string/array contains value
 * 
 * 🎯 NEXT STEPS:
 * ==============
 * 1. Run: npm test hints.test.js
 * 2. See all tests pass ✅
 * 3. Try breaking a function to see test fail ❌
 * 4. Fix it and see test pass again ✅
 */
