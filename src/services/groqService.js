import axios from 'axios';
import { GROQ_API_KEY, GROQ_BASE_URL } from '@env';

class GroqService {
  constructor() {
    this.apiKey = GROQ_API_KEY;
    this.baseUrl = GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
    this.model = 'llama-3.3-70b-versatile'; // Updated to latest supported model
    this.maxTokens = 200; // Reduced - we only need 4 short hints
    this.temperature = 0.7;
  }

  /**
   * Generate AI-powered hints for a word
   * @param {string} word - The word to generate hints for
   * @param {string} topic - The topic/category of the word
   * @param {string} difficulty - Difficulty level (easy, medium, hard)
   * @returns {Promise<Array<string>>} Array of 4 progressive hints
   */
  async generateHints(word, topic, difficulty = 'medium') {
    try {
      const prompt = this.buildPrompt(word, topic, difficulty);
      
      console.log('Calling Groq API for word:', word);
      
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a creative game hint generator for a word-guessing game. Generate progressive hints that help players guess words without revealing them directly.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          temperature: this.temperature,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000, // 15 seconds
        }
      );

      console.log('Groq API Response Status:', response.status);
      console.log('Groq API Response Data:', JSON.stringify(response.data, null, 2));
      
      const content = response.data.choices[0].message.content;
      console.log('Raw LLM Response:', content);
      
      const hints = this.parseHints(content);
      console.log('Parsed hints:', hints, 'Count:', hints.length);
      
      if (hints.length === 4) {
        return hints;
      } else {
        console.warn(`Invalid hint count from LLM: ${hints.length}/4, using fallback`);
        return this.generateFallbackHints(word, topic);
      }
    } catch (error) {
      console.error('Groq API Error:', error.message);
      if (error.response) {
        console.error('API Response Error:', error.response.data);
      }
      return this.generateFallbackHints(word, topic);
    }
  }

  /**
   * Build the prompt for hint generation
   */
  buildPrompt(word, topic, difficulty) {
    return `Generate exactly 4 hints for the word "${word}" from category "${topic}".

DIFFICULTY LEVELS:
1. HARD: Indirect but relatable (what it's used for, where found) - MAX 10 WORDS
2. MODERATE: Clear category, main characteristics - MAX 10 WORDS  
3. EASY: First letter + length + specific details - MAX 10 WORDS
4. VERY EASY: Partial letters (e.g. "P_ZZ_") + obvious clue - MAX 10 WORDS

RULES:
- Never use the word "${word}"
- Each hint under 10 words
- Number each hint (1. 2. 3. 4.)
- Make it relatable and fun to guess

EXAMPLE for "Pizza":
1. Italian dish often shared at parties and gatherings
2. Popular round ${topic} with cheese and tomato base
3. Starts with P, 5 letters, sliced Italian bread
4. P_ZZ_, delivered in boxes

Now generate 4 hints for "${word}":`;
  }

  /**
   * Parse hints from LLM response
   */
  parseHints(content) {
    const hints = [];
    
    console.log('=== PARSING LLM RESPONSE ===');
    console.log('Raw content:', content);
    console.log('Content length:', content.length);
    
    // Split by lines and clean up
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    console.log('Total lines:', lines.length);
    console.log('Lines:', JSON.stringify(lines, null, 2));
    
    // Try different patterns to extract hints
    for (let i = 0; i < lines.length && hints.length < 4; i++) {
      const line = lines[i];
      
      // Skip obvious header lines
      if (line.length < 5 ||
          /^(HINT|Hint|hint)\s*\d/i.test(line) ||
          /^(HARD|MODERATE|EASY|VERY EASY|Cryptic|Clear|Direct)/i.test(line) ||
          line.toLowerCase().includes('generate') ||
          line.toLowerCase().includes('example') ||
          line.toLowerCase().includes('word to guess') ||
          line.toLowerCase().includes('category:')) {
        console.log(`Skipping header line ${i}:`, line);
        continue;
      }
      
      // Pattern 1: "1. hint text" or "1) hint text" or "1: hint text"
      let match = line.match(/^(\d+)[\.\):\-]\s*(.+)$/);
      if (match && match[2].trim().length > 5) {
        const hintText = match[2].trim();
        hints.push(hintText);
        console.log(`Extracted hint ${hints.length} (numbered):`, hintText);
        continue;
      }
      
      // Pattern 2: "- hint text" or "• hint text"
      match = line.match(/^[-•*]\s+(.+)$/);
      if (match && match[1].trim().length > 5) {
        const hintText = match[1].trim();
        hints.push(hintText);
        console.log(`Extracted hint ${hints.length} (bullet):`, hintText);
        continue;
      }
      
      // Pattern 3: Plain text line (no numbering)
      if (line.length > 10 && !line.includes(':') && hints.length < 4) {
        hints.push(line);
        console.log(`Extracted hint ${hints.length} (plain):`, line);
      }
    }
    
    console.log('Final extracted hints count:', hints.length);
    console.log('Final hints:', hints);
    console.log('=== END PARSING ===');
    
    return hints.slice(0, 4); // Ensure exactly 4 hints
  }

  /**
   * Generate fallback hints if LLM fails
   * Following the same difficulty progression with relatable clues
   * Each hint limited to 10 words maximum
   */
  generateFallbackHints(word, topic) {
    // Import custom clues from hints.js
    const customClues = {
      // General category words with relatable first hints
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
    
    // Create partial reveal showing some letters
    const partial = word.split('').map((char, index) => {
      if (index === 0 || index === word.length - 1) return char.toUpperCase();
      if (word.length > 5 && index % 2 === 1) return char.toUpperCase();
      return '_';
    }).join(' ');

    // Get word-specific clue or create a generic one
    let firstHint = customClues[word];
    
    if (!firstHint) {
      // Generic hints based on topic if no custom clue
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
      // Hint 1: HARD - Word-specific, relatable context (max 10 words)
      firstHint,
      
      // Hint 2: MODERATE - Category + letter count (max 10 words)
      `A ${topic} word, has ${word.length} letters`,
      
      // Hint 3: EASY - First letter + direct hint (max 10 words)
      `Starts with "${firstLetter}", ${word.length}-letter ${topic} word`,
      
      // Hint 4: VERY EASY - Partial reveal (max 10 words)
      `${partial}`
    ];
  }
}

export default new GroqService();
