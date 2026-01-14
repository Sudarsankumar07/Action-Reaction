import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGH_SCORE_KEY = '@high_scores';

/**
 * High Score Service
 * Manages persistent high scores for different game modes
 */

/**
 * Get high score for a specific game mode
 * @param {string} mode - Game mode (multiplayer, time-attack, ai-hints, memory, practice)
 * @returns {Promise<number>} The high score for that mode
 */
export const getHighScore = async (mode) => {
    try {
        const scoresJson = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        if (!scoresJson) return 0;

        const scores = JSON.parse(scoresJson);
        return scores[mode] || 0;
    } catch (error) {
        console.error('Error getting high score:', error);
        return 0;
    }
};

/**
 * Save high score for a specific game mode (only if it's higher than current)
 * @param {string} mode - Game mode
 * @param {number} score - Score achieved
 * @returns {Promise<{isNewRecord: boolean, previousHigh: number, newHigh: number}>}
 */
export const saveHighScore = async (mode, score) => {
    try {
        const scoresJson = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        const scores = scoresJson ? JSON.parse(scoresJson) : {};

        const previousHigh = scores[mode] || 0;
        const isNewRecord = score > previousHigh;

        if (isNewRecord) {
            scores[mode] = score;
            await AsyncStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
        }

        return {
            isNewRecord,
            previousHigh,
            newHigh: isNewRecord ? score : previousHigh,
        };
    } catch (error) {
        console.error('Error saving high score:', error);
        return {
            isNewRecord: false,
            previousHigh: 0,
            newHigh: score,
        };
    }
};

/**
 * Get all high scores
 * @returns {Promise<Object>} All high scores by mode
 */
export const getAllHighScores = async () => {
    try {
        const scoresJson = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        return scoresJson ? JSON.parse(scoresJson) : {};
    } catch (error) {
        console.error('Error getting all high scores:', error);
        return {};
    }
};

/**
 * Clear all high scores (for testing or reset)
 * @returns {Promise<void>}
 */
export const clearHighScores = async () => {
    try {
        await AsyncStorage.removeItem(HIGH_SCORE_KEY);
    } catch (error) {
        console.error('Error clearing high scores:', error);
    }
};
