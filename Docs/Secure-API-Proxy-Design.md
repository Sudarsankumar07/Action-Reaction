# Secure API Proxy Design Document

## 🔒 Overview

This document outlines the design for securely hosting the Groq API key on a backend server instead of storing it in the mobile app's `.env` file. This approach follows security best practices by keeping sensitive API keys on the server side.

---

## ❌ Current Problem

### Security Risks with Current Approach:

```
┌─────────────────────────────────────────────────────────┐
│                    CURRENT FLOW                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Mobile App (.env)          Groq API                   │
│   ┌──────────────┐          ┌──────────────┐           │
│   │ GROQ_API_KEY │ ──────►  │ api.groq.com │           │
│   │ (EXPOSED!)   │          │              │           │
│   └──────────────┘          └──────────────┘           │
│                                                         │
│   ⚠️ API key bundled in app binary                     │
│   ⚠️ Can be extracted via reverse engineering          │
│   ⚠️ Key theft leads to unauthorized usage & billing   │
│   ⚠️ No rate limiting per user                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Issues:**
1. **API Key Exposure** - `.env` files get bundled into the app, making keys extractable
2. **No Usage Control** - Can't monitor or limit per-user API calls
3. **Direct Billing Risk** - Stolen keys can rack up your Groq API bill
4. **No Request Validation** - Malicious requests can be sent directly to Groq

---

## ✅ Proposed Solution: Backend Proxy Server

### New Architecture:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SECURE FLOW                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Mobile App              Proxy Server              Groq API            │
│   ┌──────────┐           ┌──────────────┐         ┌──────────────┐     │
│   │ No API   │  ──────►  │ Your Server  │ ──────► │ api.groq.com │     │
│   │ Key!     │  Request  │ (API Key     │ Request │              │     │
│   │          │  ◄──────  │  stored here)│ ◄────── │              │     │
│   └──────────┘  Response └──────────────┘ Response└──────────────┘     │
│                                                                         │
│   ✅ API key never leaves server                                        │
│   ✅ Rate limiting per device/user                                      │
│   ✅ Request validation & sanitization                                  │
│   ✅ Usage monitoring & analytics                                       │
│   ✅ Can disable access instantly if needed                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Design

### 1. Proxy Server API Endpoint

**Base URL:** `https://your-server.com/api` (to be configured)

**Endpoint:** `POST /hints/generate`

#### Request Format:
```json
{
  "word": "Pizza",
  "topic": "food",
  "difficulty": "medium",
  "language": "en"
}
```

#### Response Format:
```json
{
  "success": true,
  "hints": [
    "Italian dish often shared at parties and gatherings",
    "Popular round food with cheese and tomato base",
    "Starts with P, 5 letters, sliced Italian bread",
    "P_ZZ_, delivered in boxes"
  ],
  "cached": false
}
```

#### Error Response:
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

---

### 2. Hosting Options (Ranked by Ease & Cost)

| Option | Pros | Cons | Cost | Complexity |
|--------|------|------|------|------------|
| **Vercel (Recommended)** | Free tier, serverless, easy deploy | Limited to Node.js | Free (hobby) | ⭐ Easy |
| **Railway** | Simple, auto-deploy from GitHub | 500 hours/month free | Free → $5/mo | ⭐ Easy |
| **Render** | Free tier, managed hosting | Cold starts on free tier | Free → $7/mo | ⭐ Easy |
| **AWS Lambda + API Gateway** | Scalable, pay-per-use | Complex setup | ~$0.01/10K requests | ⭐⭐⭐ Hard |
| **DigitalOcean App Platform** | Simple, predictable pricing | No free tier | $5/mo | ⭐⭐ Medium |
| **Cloudflare Workers** | Ultra-fast, global edge | Different API style | Free (100K req/day) | ⭐⭐ Medium |

### Recommended: **Vercel Serverless Functions**
- Free tier: 100GB bandwidth, 100K function invocations/month
- Zero configuration deployment
- Automatic HTTPS
- GitHub integration for CI/CD

---

### 3. Server Implementation (Node.js/Express)

```
project-structure/
├── api/
│   └── hints/
│       └── generate.js      # Serverless function
├── lib/
│   ├── groqClient.js        # Groq API wrapper
│   ├── rateLimiter.js       # Rate limiting logic
│   └── validation.js        # Input validation
├── .env                     # Server-side secrets (NOT in repo)
├── vercel.json              # Vercel configuration
└── package.json
```

#### Core Proxy Logic:
```javascript
// api/hints/generate.js (Vercel Serverless Function)
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY  // Stored securely on server
});

export default async function handler(req, res) {
  // 1. Validate request origin (optional: add app verification)
  // 2. Rate limit check
  // 3. Validate input
  // 4. Call Groq API
  // 5. Return hints
}
```

---

### 4. Security Features

#### A. Rate Limiting
```javascript
const rateLimit = {
  windowMs: 60 * 1000,     // 1 minute window
  maxRequests: 10,         // Max 10 requests per minute per IP
  message: "Too many requests, please try again later"
};
```

#### B. Input Validation
```javascript
const validateRequest = (body) => {
  const { word, topic, difficulty } = body;
  
  // Validate word
  if (!word || typeof word !== 'string' || word.length > 50) {
    throw new Error('Invalid word');
  }
  
  // Validate topic
  const validTopics = ['food', 'sports', 'movies', 'animals', 'places', 'music', 'general'];
  if (!validTopics.includes(topic)) {
    throw new Error('Invalid topic');
  }
  
  // Validate difficulty
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (!validDifficulties.includes(difficulty)) {
    throw new Error('Invalid difficulty');
  }
  
  return true;
};
```

#### C. CORS Configuration
```javascript
// Only allow requests from your app's domain
const corsOptions = {
  origin: [
    'https://your-app-domain.com',  // Production
    'http://localhost:19006',        // Expo Web Dev
  ],
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'X-App-Version']
};
```

#### D. Request Authentication (Optional)
```javascript
// Simple app verification using a shared secret
const verifyAppRequest = (req) => {
  const appSecret = req.headers['x-app-secret'];
  return appSecret === process.env.APP_SECRET;
};
```

---

### 5. Mobile App Changes

#### Current groqService.js → New proxyService.js

**Before (Direct Groq Call):**
```javascript
// ❌ API key exposed in app
import { GROQ_API_KEY } from '@env';

const response = await axios.post(
  'https://api.groq.com/openai/v1/chat/completions',
  { ... },
  { headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` } }
);
```

**After (Proxy Call):**
```javascript
// ✅ No API key in app
import { PROXY_BASE_URL } from '@env';

const response = await axios.post(
  `${PROXY_BASE_URL}/api/hints/generate`,
  { word, topic, difficulty, language },
  { 
    headers: { 
      'Content-Type': 'application/json',
      'X-App-Version': '1.0.0'  // Optional: for tracking
    },
    timeout: 15000
  }
);
```

#### Updated .env File:
```env
# OLD (Remove these)
# GROQ_API_KEY=gsk_xxxxx
# GROQ_BASE_URL=https://api.groq.com/openai/v1

# NEW (Add this)
PROXY_BASE_URL=https://your-server.vercel.app
```

---

### 6. Caching Strategy

#### Server-Side Cache (Redis/In-Memory)
```javascript
// Cache hints to reduce Groq API calls
const cacheKey = `hints:${word}:${topic}:${language}`;
const cachedHints = await cache.get(cacheKey);

if (cachedHints) {
  return { success: true, hints: cachedHints, cached: true };
}

// If not cached, call Groq and cache result
const hints = await generateFromGroq(word, topic);
await cache.set(cacheKey, hints, { ex: 86400 }); // 24 hour expiry
```

---

## 📊 Request Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        COMPLETE REQUEST FLOW                             │
└──────────────────────────────────────────────────────────────────────────┘

     MOBILE APP                    PROXY SERVER                  GROQ API
         │                              │                            │
         │  1. POST /api/hints/generate │                            │
         │  { word, topic, difficulty } │                            │
         │─────────────────────────────►│                            │
         │                              │                            │
         │                              │ 2. Validate Request        │
         │                              │    - Check rate limit      │
         │                              │    - Validate inputs       │
         │                              │                            │
         │                              │ 3. Check Cache             │
         │                              │    - If cached, return ────┼──► SKIP
         │                              │                            │
         │                              │ 4. Call Groq API           │
         │                              │    (with server-side key)  │
         │                              │───────────────────────────►│
         │                              │                            │
         │                              │◄───────────────────────────│
         │                              │ 5. Parse & Cache Response  │
         │                              │                            │
         │◄─────────────────────────────│                            │
         │  6. Return Hints             │                            │
         │  { success, hints, cached }  │                            │
         │                              │                            │
```

---

## 🚀 Implementation Phases

### Phase 1: Server Setup (Vercel)
- [ ] Create Vercel project
- [ ] Set up serverless function structure
- [ ] Add GROQ_API_KEY to Vercel environment variables
- [ ] Implement basic proxy endpoint

### Phase 2: Security Layer
- [ ] Add input validation
- [ ] Implement rate limiting (in-memory for start)
- [ ] Configure CORS
- [ ] Add request logging

### Phase 3: Mobile App Integration
- [ ] Create new `proxyService.js`
- [ ] Update `.env` with PROXY_BASE_URL
- [ ] Update `hintService.js` to use proxy
- [ ] Test with fallback to static hints

### Phase 4: Optimization
- [ ] Add Redis caching (optional)
- [ ] Implement retry logic
- [ ] Add monitoring/analytics
- [ ] Error tracking (Sentry optional)

---

## 💰 Cost Analysis

### Free Tier Limits (Vercel):
- **100,000** serverless function invocations/month
- **100GB** bandwidth/month
- Unlimited projects

### Estimated Usage:
- Average user: ~50 hint requests/session
- 1000 daily active users = 50,000 requests/day
- Monthly: ~1.5M requests (would need Pro plan: $20/month)

### For Small User Base (< 3,000 requests/day):
- **$0/month** on Vercel free tier ✅

---

## 🔐 Environment Variables (Server)

```env
# Server .env (NEVER commit to git)
GROQ_API_KEY=gsk_your_actual_key_here
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_MAX_TOKENS=200

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10

# Optional: App verification
APP_SECRET=your_random_secret_for_app_verification

# Optional: Redis (for caching)
REDIS_URL=redis://your-redis-url
```

---

## ✅ Benefits Summary

| Aspect | Before (Direct API) | After (Proxy) |
|--------|---------------------|---------------|
| **API Key Security** | ❌ Exposed in app | ✅ Hidden on server |
| **Rate Limiting** | ❌ None | ✅ Per IP/user |
| **Cost Control** | ❌ Anyone can use key | ✅ Server controls usage |
| **Monitoring** | ❌ Limited | ✅ Full request logs |
| **Kill Switch** | ❌ Must update app | ✅ Disable server endpoint |
| **Caching** | ⚠️ Client-only | ✅ Server + client |

---

## 📋 Next Steps

Once you approve this design:

1. **Choose hosting platform** (Vercel recommended)
2. **I'll create the server code** with all security features
3. **Deploy to hosting** (I'll provide step-by-step guide)
4. **Update mobile app** to use the proxy endpoint
5. **Remove old GROQ_API_KEY** from mobile `.env`

---

## Questions to Consider

1. **Hosting preference?** (Vercel, Railway, Render, etc.)
2. **Need user authentication?** (optional - adds complexity)
3. **Expected user volume?** (helps choose right tier)
4. **Multiple languages support?** (Tamil, English - for caching keys)

---

*Document Version: 1.0*  
*Created: January 12, 2026*  
*Author: GitHub Copilot*
