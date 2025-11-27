import axios from 'axios';
import { GROQ_API_KEY, GROQ_BASE_URL } from '@env';

class GroqService {
  constructor() {
    this.apiKey = GROQ_API_KEY;
    this.baseUrl = GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
    this.model = 'openai/gpt-oss-20b';
    this.maxTokens = 500;
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
      return this.generateFallbackHints(word, topic);
    }
  }

  /**
   * Build the prompt for hint generation
   */
  buildPrompt(word, topic, difficulty) {
    const difficultyInstructions = {
      easy: 'Make hints very obvious and straightforward',
      medium: 'Balance between challenging and helpful',
      hard: 'Make hints cryptic and require creative thinking'
    };

    return `Generate exactly 4 progressive hints for the word "${word}" from the category "${topic}".

REQUIREMENTS:
1. Hint 1: General category or origin clue (vague)
2. Hint 2: Include letter count and basic characteristics
3. Hint 3: First letter + detailed description
4. Hint 4: Partial word reveal with underscores (e.g., "P _ Z Z A")

RULES:
- Never use the word "${word}" itself in hints
- Each hint should progressively make it easier to guess
- Use simple, clear language
- Keep each hint under 15 words
- ${difficultyInstructions[difficulty]}

OUTPUT FORMAT (one hint per line):
1. [first hint text]
2. [second hint text]
3. [third hint text]
4. [fourth hint text with blanks]

Generate the hints now:`;
  }

  /**
   * Parse hints from LLM response
   */
  parseHints(content) {
    const hints = [];
    
    // Method 1: Try to extract numbered hints (1. 2. 3. 4.)
    const lines = content.split('\n');
    
    for (let line of lines) {
      line = line.trim();
      
      // Match patterns like "1. hint text" or "1) hint text" or "1: hint text"
      const numberedMatch = line.match(/^(\d+)[\.\):\s]+(.+)$/);
      if (numberedMatch) {
        const hintText = numberedMatch[2].trim();
        if (hintText && hints.length < 4) {
          hints.push(hintText);
        }
      }
    }

    // Method 2: If numbered pattern didn't work, try bullet points or dashes
    if (hints.length < 4) {
      hints.length = 0; // Clear previous attempts
      
      for (let line of lines) {
        line = line.trim();
        
        // Match bullet points or dashes
        const bulletMatch = line.match(/^[-•*]\s+(.+)$/);
        if (bulletMatch) {
          const hintText = bulletMatch[1].trim();
          if (hintText && hints.length < 4) {
            hints.push(hintText);
          }
        }
      }
    }

    // Method 3: If still not enough, take any non-empty lines (skip headers/labels)
    if (hints.length < 4) {
      hints.length = 0;
      
      const filteredLines = lines
        .map(l => l.trim())
        .filter(l => {
          // Skip common header/label patterns
          if (!l) return false;
          if (l.toLowerCase().includes('hint')) return false;
          if (l.toLowerCase().includes('output')) return false;
          if (l.toLowerCase().includes('format')) return false;
          if (l.match(/^(requirement|rule|guideline)/i)) return false;
          return true;
        });
      
      hints.push(...filteredLines.slice(0, 4));
    }

    return hints.slice(0, 4); // Ensure exactly 4 hints
  }

  /**
   * Generate fallback hints if LLM fails
   */
  generateFallbackHints(word, topic) {
    const categoryHints = {
      food: "It's a type of food",
      sports: "It's a sport or sports-related activity",
      movies: "It's a movie or film-related",
      animals: "It's an animal or creature",
      places: "It's a place or location",
      music: "It's music or instrument-related",
      general: "It's a common word or object",
    };

    const blanks = Array(word.length).fill('_').join(' ');
    const partial = word.split('').map((char, index) => {
      if (index === 0 || index === word.length - 1) return char;
      if (word.length > 4 && index % 2 === 0) return char;
      return '_';
    }).join(' ');

    return [
      categoryHints[topic] || "It's a common word",
      `It has ${word.length} letters: ${blanks}`,
      `Starts with "${word[0]}", think about ${topic}`,
      partial
    ];
  }
}

export default new GroqService();
