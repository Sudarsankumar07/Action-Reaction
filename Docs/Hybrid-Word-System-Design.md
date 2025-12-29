# Hybrid Word System Design 🌐

## Overview

This document outlines the architecture for a **hybrid word management system** that seamlessly switches between local word database (`words.js`) and online word API (WordsAPI) based on network connectivity, with smart notifications for AI hint game mode.

---

## 🎯 Objectives

1. **Unlimited Words**: Use WordsAPI when online for fresh, unlimited content
2. **Offline Support**: Fallback to `words.js` when offline (300+ words)
3. **Smart Notifications**: Alert users in AI Hints mode when offline
4. **Seamless UX**: Auto-detect and switch without user intervention
5. **Performance**: Cache API responses for improved speed

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Game Screen                          │
│                                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │  Network Status Banner (AI Hints Mode Only)    │   │
│  │  "⚠️ You're offline. Turn on internet for     │   │
│  │   AI-powered hints!"                           │   │
│  └────────────────────────────────────────────────┘   │
│                                                          │
│              ↓ Request Word ↓                          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│              Word Service (NEW)                         │
│  - Check network status (NetInfo)                       │
│  - Route to appropriate source                          │
│  - Handle caching and fallbacks                         │
└─────────────────────────────────────────────────────────┘
                        ↓
           ┌────────────┴────────────┐
           ↓                         ↓
┌──────────────────┐      ┌──────────────────┐
│   ONLINE MODE    │      │  OFFLINE MODE    │
│                  │      │                  │
│  WordsAPI        │      │  words.js        │
│  - Random words  │      │  - 300+ words    │
│  - By category   │      │  - 7 topics      │
│  - Definitions   │      │  - 2 languages   │
│  - Synonyms      │      │                  │
│                  │      │                  │
│  Cache Results   │      │  Direct Access   │
│  (24hr expiry)   │      │                  │
└──────────────────┘      └──────────────────┘
```

---

## 📡 Network Detection Strategy

### Implementation
```javascript
import NetInfo from '@react-native-community/netinfo';

// Real-time network monitoring
const [isOnline, setIsOnline] = useState(true);
const [connectionType, setConnectionType] = useState('unknown');

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsOnline(state.isConnected && state.isInternetReachable);
    setConnectionType(state.type);
  });
  return () => unsubscribe();
}, []);
```

### Detection Logic
- **Online**: `isConnected && isInternetReachable`
- **Offline**: Either condition fails
- **Unknown**: Initial state (assume offline for safety)

---

## 🌐 WordsAPI Integration

### API Details
- **Base URL**: `https://wordsapiv1.p.rapidapi.com/words/`
- **Authentication**: RapidAPI Key (stored in `.env`)
- **Rate Limit**: 2,500 requests/day (Free tier)
- **Response Time**: ~200-500ms

### Endpoints to Use

#### 1. Random Word by Topic
```
GET /words/?random=true&hasDetails=typeOf&typeOf={category}
```
Example: `typeOf=food` → Returns random food-related word

#### 2. Word Details (for AI hints)
```
GET /words/{word}
```
Returns: definition, synonyms, examples, pronunciation

#### 3. Category Mapping
| Game Topic | WordsAPI Parameter |
|------------|-------------------|
| food       | food, dish        |
| sports     | sport, game       |
| movies     | film, movie       |
| animals    | animal, mammal    |
| places     | place, location   |
| music      | music, instrument |
| general    | random (no filter)|

### Request Example
```javascript
const fetchWordFromAPI = async (topic) => {
  const apiKey = process.env.WORDS_API_KEY;
  const category = TOPIC_MAPPING[topic];
  
  try {
    const response = await axios.get(
      `https://wordsapiv1.p.rapidapi.com/words/`,
      {
        params: {
          random: true,
          hasDetails: 'typeOf',
          typeOf: category
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        },
        timeout: 5000 // 5-second timeout
      }
    );
    return response.data.word;
  } catch (error) {
    console.log('API failed, falling back to local words');
    return null; // Fallback to words.js
  }
};
```

---

## 💾 Caching Strategy

### AsyncStorage Schema
```json
{
  "cachedWords_food": [
    { "word": "Spaghetti", "timestamp": 1704001234567, "source": "api" },
    { "word": "Risotto", "timestamp": 1704001245678, "source": "api" }
  ],
  "cachedWords_sports": [...],
  "lastAPICallTime_food": 1704001234567,
  "apiCallCount": 125
}
```

### Cache Rules
1. **Expiry**: 24 hours per word
2. **Max Size**: 50 words per topic
3. **Cleanup**: Remove oldest when limit reached
4. **Priority**: API words used before local words

---

## 🔔 Notification System (AI Hints Mode Only)

### When to Show Notification
- **Game Mode**: AI Hints mode ONLY
- **Network Status**: Offline (no internet)
- **Display**: Top banner with warning icon

### Design Specifications

#### Banner Component
```javascript
<OfflineBanner visible={gameMode === 'aiHints' && !isOnline}>
  <Icon name="warning" color="#FFA500" />
  <Text>⚠️ You're offline. Turn on internet for AI-powered hints!</Text>
  <TouchableOpacity onPress={openSettings}>
    <Text>Enable Wi-Fi →</Text>
  </TouchableOpacity>
</OfflineBanner>
```

#### Visual Properties
- **Position**: Top of screen (below status bar)
- **Color**: Orange background (#FFF3CD)
- **Icon**: Warning triangle
- **Animation**: Slide down from top
- **Auto-hide**: No (stays visible while offline)
- **Dismissible**: Yes (X button)

#### Banner States
| Scenario | Display |
|----------|---------|
| AI Hints + Online | ✅ No banner |
| AI Hints + Offline | ⚠️ Show warning |
| Other modes + Offline | ℹ️ Small indicator (optional) |
| Other modes + Online | ✅ No banner |

---

## 🔄 Word Selection Flow

### Priority Logic
```
1. CHECK NETWORK
   ├─ Online? 
   │  ├─ YES → Try WordsAPI
   │  │         ├─ Success? → Return API word
   │  │         └─ Failed? → Use cached words
   │  └─ NO → Skip to step 2
   │
2. CHECK CACHE
   ├─ Has valid cached words?
   │  ├─ YES → Return random cached word
   │  └─ NO → Go to step 3
   │
3. USE LOCAL DATABASE (words.js)
   └─ Filter unused words → Return random word
```

### Pseudocode
```javascript
const getNextWord = async (topic, usedWords, gameMode) => {
  let word = null;
  
  // Step 1: Try API if online
  if (isOnline) {
    word = await fetchFromAPI(topic);
    if (word) {
      await cacheWord(topic, word);
      return word;
    }
  }
  
  // Step 2: Try cache
  word = await getFromCache(topic, usedWords);
  if (word) return word;
  
  // Step 3: Fallback to local
  word = getFromLocalDB(topic, usedWords);
  
  // Handle exhausted words
  if (!word && gameMode === 'aiHints' && !isOnline) {
    showOfflineNotification();
  }
  
  return word || getFallbackWord();
};
```

---

## 📊 Usage Tracking

### Metrics to Track (AsyncStorage)
```json
{
  "wordStats": {
    "apiWordsPlayed": 45,
    "localWordsPlayed": 23,
    "totalGamesPlayed": 68,
    "apiCallsFailed": 3,
    "offlineGamesPlayed": 12
  }
}
```

### Benefits
- Monitor API usage vs free tier limit
- Optimize cache size
- Debug connectivity issues
- Show stats in Settings screen

---

## 🎮 Game Mode Considerations

### Multiplayer Mode
- **API Usage**: Low priority (speed matters)
- **Fallback**: Instant local words
- **Notification**: None (works fine offline)

### AI Hints Mode
- **API Usage**: High priority (needs hints)
- **Fallback**: Local + cached hints
- **Notification**: ⚠️ Show if offline

### Time Attack Mode
- **API Usage**: Medium priority
- **Fallback**: Local words (already has emoji mapping)
- **Notification**: Optional small indicator

### Memory Challenge
- **API Usage**: Low priority
- **Fallback**: Always use local (predictable words)
- **Notification**: None

### Practice Mode
- **API Usage**: High priority (learning focus)
- **Fallback**: Local + cached
- **Notification**: ℹ️ Info message

---

## 🚨 Error Handling

### API Errors
| Error | Fallback Action |
|-------|----------------|
| 429 (Rate Limit) | Use cache → local words |
| 401 (Auth Failed) | Log error, use local words |
| Timeout | Use cache → local words |
| Network Error | Switch to offline mode |
| Invalid Response | Skip word, try again |

### User Messaging
- **Silent Fallback**: In most cases (seamless UX)
- **Visible Alert**: Only for AI Hints + Offline + No Cache

---

## 🔐 Security & Performance

### API Key Protection
```javascript
// .env file
WORDS_API_KEY=your_rapidapi_key_here
WORDS_API_RATE_LIMIT=2500
```

### Request Optimization
1. **Debouncing**: Prevent rapid consecutive calls
2. **Batch Fetching**: Get 5-10 words at once
3. **Prefetching**: Load next word during gameplay
4. **Timeout**: 5-second max wait for API

### Error Logging
```javascript
if (__DEV__) {
  console.log('[WordService] API call failed:', error);
} else {
  // Send to analytics (future enhancement)
}
```

---

## 📱 User Settings (Future Enhancement)

### Settings Screen Options
```
Word Source Preference:
  ○ Auto (Smart - Recommended)
  ○ Always Online (Requires Internet)
  ○ Always Offline (Local Only)

[ ] Prefetch words when on Wi-Fi
[ ] Show connection status
[ ] Limit API calls to Wi-Fi only
```

---

## 📂 File Structure

### New Files to Create
```
src/
├── services/
│   ├── wordService.js        (NEW - Main word management)
│   ├── wordsAPIService.js    (NEW - API integration)
│   ├── wordCacheService.js   (NEW - Caching logic)
│   └── groqService.js         (EXISTING)
│
├── components/
│   └── OfflineBanner.js      (NEW - Notification component)
│
├── data/
│   └── words.js               (EXISTING - Fallback database)
│
└── utils/
    └── networkUtils.js        (NEW - Network helpers)
```

---

## 🧪 Testing Checklist

### Scenarios to Test
- ✅ Online → Offline transition (mid-game)
- ✅ Offline → Online transition
- ✅ API rate limit exceeded
- ✅ Slow network (timeout)
- ✅ Invalid API key
- ✅ Cache expiry during gameplay
- ✅ All 300+ local words exhausted
- ✅ Banner shows only in AI Hints mode
- ✅ Banner dismissible
- ✅ Multiple game mode switches

---

## 🚀 Implementation Phases

### Phase 1: Core Integration (Week 1)
1. ✅ Create `wordService.js`
2. ✅ Integrate WordsAPI
3. ✅ Add network detection
4. ✅ Implement fallback logic

### Phase 2: Caching (Week 2)
1. ✅ Build cache service
2. ✅ Add expiry mechanism
3. ✅ Optimize storage

### Phase 3: Notifications (Week 3)
1. ✅ Create `OfflineBanner` component
2. ✅ Integrate into GameScreen
3. ✅ Add conditional rendering

### Phase 4: Testing & Polish (Week 4)
1. ✅ Test all scenarios
2. ✅ Performance optimization
3. ✅ Documentation

---

## 📊 Expected Outcomes

### Before (Current State)
- 300+ words total
- Words repeat after exhaustion
- No online enhancement
- No connectivity awareness

### After (With Hybrid System)
- **Unlimited words** when online
- **300+ fallback** when offline
- **Smart notifications** for AI mode
- **Seamless UX** with auto-switching
- **Better engagement** (fresh content)

---

## 💡 Alternative Considerations

### Why WordsAPI?
✅ Free tier (2,500 requests/day = ~80 games)
✅ Category filtering
✅ Word metadata (for future hints)
✅ Well-documented

### Why Not Datamuse/Random Word API?
- Limited category filtering
- No word metadata
- Less reliable uptime

### Why Not Full AI Generation (Groq)?
- Higher API costs
- Slower response time
- Already used for hints (double cost)
- WordsAPI more specialized for this use case

---

## 🎯 Success Metrics

### User Experience
- **Goal**: 95% of online users never see repeated words
- **Goal**: Offline mode works seamlessly (no crashes)
- **Goal**: Notification shows within 1 second of going offline

### Technical Performance
- **Goal**: API response < 500ms
- **Goal**: Fallback switch < 100ms
- **Goal**: Cache hit rate > 30%
- **Goal**: Zero crashes due to network changes

---

## 📝 Notes & Considerations

### API Rate Limit Management
- Free tier: 2,500 requests/day
- Average game: 10-30 words
- Safe usage: ~80 games/day
- Solution: Cache aggressively, batch fetch

### Multilingual Support
- WordsAPI: English only
- Future: Integrate language-specific APIs
- Fallback: Current `words.js` has Tamil support

### Monetization Potential
- Premium tier: Unlimited API calls
- Remove ads for premium users
- Custom word pack downloads

---

## ✅ Ready to Implement

This design provides a complete blueprint for:
1. **Hybrid word system** (online + offline)
2. **Smart notifications** (AI mode specific)
3. **Seamless UX** (auto-switching)
4. **Scalable architecture** (easy to extend)

**Next Step**: Proceed with implementation starting with Phase 1 (Core Integration).
