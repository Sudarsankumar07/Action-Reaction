import AsyncStorage from '@react-native-async-storage/async-storage';
import groqService from './groqService';
import { generateHints as generateStaticHints } from '../data/hints';

class HintService {
  constructor() {
    this.cachePrefix = 'ai_hints_';
    this.cacheExpiryHours = 24;
  }

  /**
   * Get hints for a word (with caching and fallback)
   * @param {string} word - The word to get hints for
   * @param {string} topic - The topic/category
   * @param {boolean} useAI - Whether to use AI or static hints
   * @returns {Promise<Array<string>>} Array of hints
   */
  async getHints(word, topic, useAI = true) {
    if (!useAI) {
      // Use static hints
      return generateStaticHints(word, topic);
    }

    try {
      // 1. Check cache first
      const cachedHints = await this.getCachedHints(word, topic);
      if (cachedHints) {
        console.log('Using cached AI hints for:', word);
        return cachedHints;
      }

      // 2. Generate new hints using AI
      console.log('Generating new AI hints for:', word);
      const aiHints = await groqService.generateHints(word, topic, 'medium');
      
      // 3. Cache the hints
      await this.cacheHints(word, topic, aiHints);
      
      return aiHints;
    } catch (error) {
      console.error('Error getting AI hints:', error);
      // Fallback to static hints
      return generateStaticHints(word, topic);
    }
  }

  /**
   * Get cached hints if available and not expired
   */
  async getCachedHints(word, topic) {
    try {
      const key = this.getCacheKey(word, topic);
      const cached = await AsyncStorage.getItem(key);
      
      if (cached) {
        const data = JSON.parse(cached);
        const expiryTime = this.cacheExpiryHours * 60 * 60 * 1000;
        
        // Check if not expired
        if (Date.now() - data.timestamp < expiryTime) {
          return data.hints;
        } else {
          // Remove expired cache
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error reading cache:', error);
    }
    
    return null;
  }

  /**
   * Cache hints for a word
   */
  async cacheHints(word, topic, hints) {
    try {
      const key = this.getCacheKey(word, topic);
      const data = {
        word,
        topic,
        hints,
        timestamp: Date.now(),
      };
      
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error caching hints:', error);
    }
  }

  /**
   * Generate cache key
   */
  getCacheKey(word, topic) {
    return `${this.cachePrefix}${topic}_${word.toLowerCase()}`;
  }

  /**
   * Clear all cached hints
   */
  async clearCache() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const hintKeys = keys.filter(key => key.startsWith(this.cachePrefix));
      
      if (hintKeys.length > 0) {
        await AsyncStorage.multiRemove(hintKeys);
        console.log(`Cleared ${hintKeys.length} cached hints`);
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const hintKeys = keys.filter(key => key.startsWith(this.cachePrefix));
      
      const stats = {
        totalCached: hintKeys.length,
        cacheKeys: hintKeys,
      };
      
      return stats;
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { totalCached: 0, cacheKeys: [] };
    }
  }
}

export default new HintService();
