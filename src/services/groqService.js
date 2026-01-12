import axios from 'axios';
import { PROXY_BASE_URL, APP_SECRET } from '@env';

class GroqService {
  constructor() {
    this.proxyUrl = PROXY_BASE_URL || 'https://action-reaction-api.vercel.app';
    this.appSecret = APP_SECRET || 'your-super-secret-key-change-this';
  }

  /**
   * Generate AI-powered hints for a word via secure proxy
   * @param {string} word - The word to generate hints for
   * @param {string} topic - The topic/category of the word
   * @param {string} difficulty - Difficulty level (easy, medium, hard)
   * @param {string} language - Language code (en, ta)
   * @returns {Promise<Array<string>>} Array of 4 progressive hints
   */
  async generateHints(word, topic, difficulty = 'medium', language = 'en') {
    try {
      console.log('Calling secure proxy for word:', word);
      console.log('Using proxy URL:', this.proxyUrl);
      console.log('APP_SECRET loaded:', this.appSecret ? 'Yes (' + this.appSecret.substring(0, 5) + '...)' : 'No');
      
      const response = await axios.post(
        `${this.proxyUrl}/api/hints/generate`,
        {
          word,
          topic,
          difficulty,
          language,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-App-Secret': this.appSecret,
          },
          timeout: 15000,
        }
      );

      console.log('Proxy Response:', response.data);
      
      if (response.data.success && response.data.hints?.length === 4) {
        return response.data.hints;
      } else {
        console.warn('Invalid response from proxy, using fallback');
        return this.generateFallbackHints(word, topic);
      }
    } catch (error) {
      console.error('Proxy API Error:', error.message);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      return this.generateFallbackHints(word, topic);
    }
  }

  /**
   * Generate fallback hints if proxy fails
   * Following the same difficulty progression with relatable clues
   * Each hint limited to 10 words maximum
   */
  generateFallbackHints(word, topic) {
    const customClues = {
      'Wedding': 'special ceremony, most people experience once in lifetime',
      'Birthday': 'annual celebration of the day you were born',
      'Party': 'social gathering with friends, music, and fun',
      'Vacation': 'time off work to relax and travel',
      'Camping': 'sleeping outdoors in tents, near nature',
      'Picnic': 'outdoor meal on blanket, usually in park',
      'Shopping': 'buying things at stores or online',
      'Cooking': 'preparing food by heating and mixing ingredients',
      'Reading': 'looking at words in books or screens',
      'Phone': 'device for calling and texting people',
      'Computer': 'electronic device for work and browsing internet',
      'Tablet': 'flat touchscreen device for reading and apps',
      'Camera': 'device that captures photos and videos',
      'Selfie': 'photo you take of yourself with phone',
      'Internet': 'worldwide network connecting computers and phones',
      'Email': 'electronic messages sent through internet',
      'Money': 'currency used to buy things',
      'Calendar': 'shows days, months, and helps plan events',
    };

    const firstLetter = word[0].toUpperCase();
    
    const partial = word.split('').map((char, index) => {
      if (index === 0 || index === word.length - 1) return char.toUpperCase();
      if (word.length > 5 && index % 2 === 1) return char.toUpperCase();
      return '_';
    }).join(' ');

    let firstHint = customClues[word];
    
    if (!firstHint) {
      const topicHints = {
        food: 'something delicious people love to eat',
        sports: 'popular activity people play or watch',
        movies: 'famous film people watch and enjoy',
        animals: 'living creature found in nature',
        places: 'location people visit or know about',
        music: 'related to songs, sounds, or instruments',
        general: 'common word people use in daily life',
      };
      firstHint = topicHints[topic] || 'common word you know well';
    }

    return [
      firstHint,
      `A ${topic} word, has ${word.length} letters`,
      `Starts with "${firstLetter}", ${word.length}-letter ${topic} word`,
      `${partial}`
    ];
  }
}

export default new GroqService();
