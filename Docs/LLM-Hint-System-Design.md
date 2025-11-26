# 🤖 LLM-Powered AI Hint System Design

## Overview

This document outlines the design for integrating **Groq API** (LLM-powered microservice) into the Action Reaction game's AI Hint System. The goal is to dynamically generate intelligent, context-aware hints and clues using Large Language Models instead of pre-written static hints.

---

## 🎯 Problem Statement

**Current System Limitations:**
- Static, pre-written hints for each word
- Limited hint variety and creativity
- Manual maintenance of hint database
- Predictable patterns after multiple plays
- No contextual awareness or difficulty adaptation

**Desired Solution:**
- Dynamic hint generation using AI
- Creative, varied clues for the same word
- Automatic scaling to new words without manual coding
- Adaptive difficulty based on player performance
- Natural language clues that feel human-like

---

## 🏗️ Architecture Design

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                  React Native App                        │
│  ┌────────────────────────────────────────────────┐     │
│  │         GameScreen (AI Hints Mode)             │     │
│  │  - Word Selection                              │     │
│  │  - Hint Request Trigger                        │     │
│  │  - Hint Display UI                             │     │
│  │  - Answer Validation                           │     │
│  └──────────────┬─────────────────────────────────┘     │
└─────────────────┼─────────────────────────────────────┘
                  │
                  │ HTTP Request (Word + Context)
                  ▼
┌─────────────────────────────────────────────────────────┐
│           Hint Generation Microservice                   │
│  ┌────────────────────────────────────────────────┐     │
│  │  API Layer (Express.js / Node.js)              │     │
│  │  - /api/generate-hints                         │     │
│  │  - Request validation                          │     │
│  │  - Response formatting                         │     │
│  └──────────────┬─────────────────────────────────┘     │
│                 │                                         │
│  ┌──────────────▼─────────────────────────────────┐     │
│  │  LLM Service (Groq API Integration)            │     │
│  │  - Prompt Engineering                          │     │
│  │  - API Key Management                          │     │
│  │  - Response Parsing                            │     │
│  │  - Error Handling                              │     │
│  └──────────────┬─────────────────────────────────┘     │
│                 │                                         │
│  ┌──────────────▼─────────────────────────────────┐     │
│  │  Cache Layer (Optional)                        │     │
│  │  - Redis / In-Memory Cache                     │     │
│  │  - Store generated hints                       │     │
│  │  - Reduce API calls                            │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────┼─────────────────────────────────────┘
                  │
                  │ Groq API Call
                  ▼
┌─────────────────────────────────────────────────────────┐
│              Groq API (LLM Provider)                     │
│  - Model: llama-3.1-70b-versatile                       │
│  - Fast inference                                        │
│  - Free tier available                                   │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 API Design

### Microservice Endpoint

**Base URL:** `https://your-service.com/api` or `http://localhost:3000/api` (development)

#### 1. Generate Hints Endpoint

**Request:**
```http
POST /api/generate-hints
Content-Type: application/json
Authorization: Bearer <APP_SECRET_KEY>

{
  "word": "Pizza",
  "topic": "food",
  "difficulty": "medium",
  "hintsCount": 4,
  "previousHints": [], // Optional: avoid repetition
  "playerLevel": 5, // Optional: adapt difficulty
  "language": "en" // Future: multilingual support
}
```

**Response:**
```json
{
  "success": true,
  "word": "Pizza",
  "hints": [
    {
      "level": 1,
      "hint": "This popular dish originated in Italy",
      "difficulty": "easy",
      "timestamp": "2025-11-27T10:30:00Z"
    },
    {
      "level": 2,
      "hint": "It has 5 letters and is often round",
      "difficulty": "medium",
      "timestamp": "2025-11-27T10:30:01Z"
    },
    {
      "level": 3,
      "hint": "Starts with 'P', topped with cheese and tomato sauce",
      "difficulty": "medium",
      "timestamp": "2025-11-27T10:30:02Z"
    },
    {
      "level": 4,
      "hint": "P _ Z Z A",
      "difficulty": "easy",
      "timestamp": "2025-11-27T10:30:03Z"
    }
  ],
  "metadata": {
    "model": "llama-3.1-70b-versatile",
    "tokensUsed": 156,
    "cached": false,
    "generationTime": 1200
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API rate limit exceeded. Using fallback hints.",
    "fallbackHints": [...]
  }
}
```

---

## 🧠 LLM Prompt Engineering

### Prompt Template

```javascript
const HINT_GENERATION_PROMPT = `
You are a creative game hint generator for a word-guessing game called "Action Reaction".

TASK: Generate 4 progressive hints for the word "${word}" from the category "${topic}".

REQUIREMENTS:
1. Hint 1 (Easiest): General category or origin clue
2. Hint 2 (Medium): Include letter count and basic characteristics
3. Hint 3 (Medium-Hard): First letter + detailed description
4. Hint 4 (Easy): Partial word reveal with blanks (e.g., "P _ Z Z A")

RULES:
- Make hints creative and engaging
- Avoid using the word itself
- Each hint should progressively make it easier to guess
- Use simple, clear language
- Keep hints concise (under 15 words)
- Don't reveal the answer until hint 4

CONTEXT:
- Topic: ${topic}
- Word: ${word}
- Difficulty Level: ${difficulty}
- Player Level: ${playerLevel}

OUTPUT FORMAT (JSON):
{
  "hints": [
    "hint 1 text",
    "hint 2 text", 
    "hint 3 text",
    "hint 4 text"
  ]
}

Generate the hints now:
`;
```

### Advanced Prompt Features

**Difficulty Adaptation:**
```javascript
const adaptPromptByDifficulty = (word, difficulty, playerLevel) => {
  const difficultyInstructions = {
    easy: "Make hints very obvious and straightforward",
    medium: "Balance between challenging and helpful",
    hard: "Make hints cryptic and require creative thinking",
    expert: "Use riddles, wordplay, and abstract clues"
  };
  
  const levelAdjustment = playerLevel > 10 
    ? "The player is experienced, make hints more challenging"
    : "The player is new, make hints more helpful";
    
  return `${basePrompt}\n${difficultyInstructions[difficulty]}\n${levelAdjustment}`;
};
```

---

## 🔧 Microservice Implementation Design

### Technology Stack

**Backend Framework:**
- **Node.js + Express.js** (Fast, lightweight)
- **Alternative:** Python + FastAPI (if ML features needed)

**LLM Integration:**
- **Groq API Client** (Official SDK)
- **Fallback:** OpenAI API, Anthropic Claude (if Groq is down)

**Caching:**
- **Redis** (Production)
- **Node-Cache** (Development/Simple deployments)

**Hosting Options:**
- **Vercel** (Serverless functions - Free tier)
- **Railway** (Full backend - Free tier)
- **Render** (Free tier with auto-sleep)
- **Self-hosted VPS** (DigitalOcean, AWS EC2)

### File Structure

```
hint-microservice/
├── src/
│   ├── index.js                 # Express app entry
│   ├── routes/
│   │   └── hints.js             # Hint generation routes
│   ├── services/
│   │   ├── groqService.js       # Groq API integration
│   │   ├── promptService.js     # Prompt engineering
│   │   └── cacheService.js      # Cache management
│   ├── middleware/
│   │   ├── auth.js              # API key validation
│   │   └── rateLimiter.js       # Rate limiting
│   ├── utils/
│   │   ├── validator.js         # Input validation
│   │   └── logger.js            # Logging utility
│   └── config/
│       └── config.js            # Environment variables
├── tests/
│   ├── hints.test.js
│   └── groq.test.js
├── .env.example
├── package.json
└── README.md
```

---

## 🔐 Security & API Key Management

### Environment Variables

```bash
# .env file
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
APP_SECRET_KEY=your-app-secret-for-client-auth
REDIS_URL=redis://localhost:6379
NODE_ENV=production
PORT=3000
RATE_LIMIT_MAX=100  # requests per 15 minutes
CACHE_TTL=3600      # 1 hour in seconds
```

### Security Measures

1. **API Key Protection:**
   - Store Groq API key only on server
   - Never expose to React Native app
   - Use app-level authentication for requests

2. **Request Authentication:**
   ```javascript
   // Client sends request with app secret
   headers: {
     'Authorization': 'Bearer <APP_SECRET_KEY>',
     'Content-Type': 'application/json'
   }
   ```

3. **Rate Limiting:**
   - Limit requests per user/IP
   - Prevent abuse of free Groq tier
   - Implement exponential backoff

4. **Input Validation:**
   - Sanitize word inputs
   - Validate topic categories
   - Prevent prompt injection attacks

---

## 💾 Caching Strategy

### Why Cache?

- **Reduce API Costs:** Groq free tier has limits
- **Faster Response:** Instant hints for repeated words
- **Reliability:** Fallback when API is down
- **Better UX:** No loading delays

### Cache Design

```javascript
// Cache Key Structure
const cacheKey = `hints:${word}:${topic}:${difficulty}:v1`;

// Cache Entry
{
  word: "Pizza",
  topic: "food",
  difficulty: "medium",
  hints: [...],
  generatedAt: "2025-11-27T10:30:00Z",
  expiresAt: "2025-11-28T10:30:00Z",
  usageCount: 5
}
```

### Cache Invalidation

- **TTL-based:** Expire after 24 hours (allow fresh hints)
- **Version-based:** Invalidate when prompt template changes
- **Manual:** Admin endpoint to clear specific words

---

## 📊 Data Flow Diagram

### Hint Generation Flow

```
User Opens Game (AI Hints Mode)
        ↓
  Select Word: "Pizza"
        ↓
  ┌─────────────────────────┐
  │  Check Local Cache      │
  │  (Optional)             │
  └────────┬────────────────┘
           │ Cache Miss
           ▼
  ┌─────────────────────────┐
  │  Call Microservice      │
  │  POST /api/generate-hints│
  └────────┬────────────────┘
           │
           ▼
  ┌─────────────────────────┐
  │  Microservice           │
  │  1. Validate Request    │
  │  2. Check Server Cache  │
  └────────┬────────────────┘
           │
           ├─ Cache Hit ──────────┐
           │                      │
           ├─ Cache Miss          │
           │         ↓            │
           │  ┌──────────────┐   │
           │  │ Call Groq API│   │
           │  └──────┬───────┘   │
           │         ↓            │
           │  ┌──────────────┐   │
           │  │Parse Response│   │
           │  └──────┬───────┘   │
           │         ↓            │
           │  ┌──────────────┐   │
           │  │ Store in Cache   │
           │  └──────┬───────┘   │
           │         ↓            │
           └─────────┴────────────┘
                     ↓
           ┌─────────────────────┐
           │ Return Hints to App │
           └────────┬────────────┘
                    ↓
           ┌─────────────────────┐
           │  Display Hints      │
           │  Progressively      │
           │  (3s, 8s, 13s, 18s) │
           └─────────────────────┘
```

---

## 🎮 Game Integration

### React Native Client Code Structure

```javascript
// src/services/hintService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-service.com/api';
const APP_SECRET = 'your-app-secret'; // Store securely

class HintService {
  async generateHints(word, topic, difficulty = 'medium') {
    try {
      // 1. Check local cache first (optional)
      const cachedHints = await this.getCachedHints(word, topic);
      if (cachedHints) {
        return cachedHints;
      }

      // 2. Call microservice
      const response = await axios.post(
        `${API_BASE_URL}/generate-hints`,
        {
          word,
          topic,
          difficulty,
          hintsCount: 4
        },
        {
          headers: {
            'Authorization': `Bearer ${APP_SECRET}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 seconds
        }
      );

      if (response.data.success) {
        // 3. Cache locally
        await this.cacheHints(word, topic, response.data.hints);
        return response.data.hints;
      }

      throw new Error('Failed to generate hints');

    } catch (error) {
      console.error('Hint generation error:', error);
      
      // 4. Fallback to static hints
      return this.getFallbackHints(word, topic);
    }
  }

  async getCachedHints(word, topic) {
    const key = `hints_${word}_${topic}`;
    const cached = await AsyncStorage.getItem(key);
    if (cached) {
      const data = JSON.parse(cached);
      // Check if not expired (24 hours)
      if (Date.now() - data.timestamp < 86400000) {
        return data.hints;
      }
    }
    return null;
  }

  async cacheHints(word, topic, hints) {
    const key = `hints_${word}_${topic}`;
    await AsyncStorage.setItem(key, JSON.stringify({
      hints,
      timestamp: Date.now()
    }));
  }

  getFallbackHints(word, topic) {
    // Use existing static hints system as fallback
    return generateHints(word, topic); // From hints.js
  }
}

export default new HintService();
```

### GameScreen Integration

```javascript
// In GameScreen.js - loadNextWord function

const loadNextWord = async () => {
  const word = getRandomWord(topic, usedWords);
  setCurrentWord(word);
  
  if (mode === 'ai-hints') {
    // Show loading state
    setHintsLoading(true);
    
    try {
      // Fetch AI-generated hints
      const aiHints = await HintService.generateHints(word, topic, 'medium');
      setCurrentHints(aiHints.map(h => h.hint || h));
      setHintsLoading(false);
    } catch (error) {
      // Fallback to static hints
      const staticHints = generateHints(word, topic);
      setCurrentHints(staticHints);
      setHintsLoading(false);
    }
  }
};
```

---

## 💰 Cost Analysis

### Groq API Pricing (as of 2025)

**Free Tier:**
- 30 requests per minute
- 6,000 tokens per minute
- ~14,400 requests per day
- Perfect for development and small user base

**Estimated Usage:**
- Avg hints per word: 4 hints
- Avg tokens per hint generation: 150 tokens
- Games per day (100 users): ~500 games
- Words per game: ~10 words
- **Total API calls/day:** 5,000 calls
- **Well within free tier limits**

**Scaling Strategy:**
- Cache heavily (reduce 80% of API calls)
- Pre-generate hints for popular words
- Implement rate limiting per user
- Upgrade to paid tier only if needed

---

## 🚀 Deployment Strategy

### Phase 1: Development
- Local microservice on localhost:3000
- Test Groq API integration
- Validate prompt engineering
- No caching (test fresh responses)

### Phase 2: Testing
- Deploy to Vercel/Railway (free tier)
- Add Redis caching
- Test with beta users
- Monitor API usage and costs

### Phase 3: Production
- Production deployment with CDN
- Full caching strategy
- Monitoring and analytics
- Automatic fallback system

---

## 📈 Performance Optimization

### Response Time Targets

- **Without Cache:** < 2 seconds
- **With Cache:** < 100ms
- **Fallback:** < 50ms (instant static hints)

### Optimization Techniques

1. **Parallel Processing:**
   - Generate all 4 hints in one API call
   - Avoid sequential hint generation

2. **Streaming (Future):**
   - Stream hints as they're generated
   - Show hint 1 while generating hint 2

3. **Batch Pre-generation:**
   - Pre-generate hints for top 100 words
   - Run as cron job during low-traffic hours

4. **Compression:**
   - Gzip responses
   - Reduce payload size

---

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Test prompt generation
test('Generate hints for Pizza', async () => {
  const hints = await groqService.generateHints('Pizza', 'food');
  expect(hints).toHaveLength(4);
  expect(hints[0]).not.toContain('Pizza');
});
```

### Integration Tests
```javascript
// Test full API flow
test('POST /api/generate-hints returns valid hints', async () => {
  const response = await request(app)
    .post('/api/generate-hints')
    .send({ word: 'Pizza', topic: 'food' })
    .expect(200);
    
  expect(response.body.success).toBe(true);
  expect(response.body.hints).toHaveLength(4);
});
```

### Load Tests
- Simulate 100 concurrent users
- Test rate limiting
- Verify cache performance

---

## 🔄 Fallback & Error Handling

### Failure Scenarios

1. **Groq API Down:**
   - Use cached hints if available
   - Fall back to static hints system
   - Show "Offline Mode" indicator

2. **Rate Limit Exceeded:**
   - Queue requests
   - Temporarily use static hints
   - Notify user of slight delay

3. **Invalid Response:**
   - Retry with exponential backoff
   - Parse alternative formats
   - Fall back to static hints

4. **Network Timeout:**
   - 10-second timeout
   - Immediate fallback
   - Cache for offline play

---

## 📱 User Experience Enhancements

### Loading States

```
┌─────────────────────────────┐
│  Generating AI Hints...     │
│  ⏳ Please wait             │
└─────────────────────────────┘
```

### Quality Indicators

```
┌─────────────────────────────┐
│  💡 Hint 1 (AI-Generated)   │
│  This dish originated...    │
│  ⭐ Quality: High           │
└─────────────────────────────┘
```

### Settings Toggle

```
Settings > AI Hints
[ ] Use AI-Generated Hints (requires internet)
[x] Use Static Hints (offline-ready)
```

---

## 🔮 Future Enhancements

### Advanced Features

1. **Adaptive Difficulty:**
   - Track player success rate
   - Adjust hint difficulty dynamically
   - Personalized hint styles

2. **Multilingual Support:**
   - Generate hints in multiple languages
   - Cross-language word games

3. **Voice Hints:**
   - Text-to-speech for generated hints
   - Audio clues for accessibility

4. **Custom Topics:**
   - User-created word packs
   - AI generates hints for any word

5. **Hint Variations:**
   - Multiple hint sets per word
   - Never see the same hints twice

6. **Competitive Mode:**
   - Harder AI hints for challenges
   - Leaderboards based on hint count

---

## 📋 Implementation Checklist

### Microservice Setup
- [ ] Initialize Node.js project
- [ ] Install dependencies (Express, Groq SDK, Redis)
- [ ] Set up environment variables
- [ ] Create API routes
- [ ] Implement Groq integration
- [ ] Add caching layer
- [ ] Write unit tests
- [ ] Deploy to hosting platform

### React Native Integration
- [ ] Create HintService class
- [ ] Add AsyncStorage caching
- [ ] Update GameScreen to use service
- [ ] Add loading states
- [ ] Implement fallback system
- [ ] Add error handling
- [ ] Test offline mode

### Security & Performance
- [ ] Implement API authentication
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure CDN
- [ ] Optimize prompts
- [ ] Load test

---

## 📊 Success Metrics

### Key Performance Indicators (KPIs)

1. **API Performance:**
   - Average response time < 2s
   - 99% uptime
   - Cache hit rate > 70%

2. **User Experience:**
   - Hint quality rating > 4/5
   - Reduced fallback usage < 10%
   - Player retention increase

3. **Cost Efficiency:**
   - Stay within free tier limits
   - API calls reduced by caching
   - Server costs < $5/month

---

## 🎯 Summary

This LLM-powered AI Hint System design provides:

✅ **Dynamic, Creative Hints** - AI generates unique clues every time  
✅ **Scalable Architecture** - Microservice handles growth  
✅ **Cost-Effective** - Free tier + caching keeps costs near zero  
✅ **Reliable** - Multiple fallback layers ensure smooth gameplay  
✅ **Secure** - API keys protected, request validation  
✅ **Future-Proof** - Easy to extend with new features  

**Next Steps:**
1. Set up Groq API account and get API key
2. Build microservice MVP (Phase 1)
3. Test locally with React Native app
4. Deploy and gather user feedback
5. Iterate and improve

---

*Document Version: 1.0*  
*Created: November 27, 2025*  
*Author: Design Team*
