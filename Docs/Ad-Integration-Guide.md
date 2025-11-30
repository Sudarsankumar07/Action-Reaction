# Ad Integration & Monetization Guide

## Overview

This document outlines the complete strategy for integrating advertisements and monetizing the Action Reaction game app. The goal is to generate revenue while maintaining an excellent user experience.

---

## Revenue Strategies

### 1. Advertisement Types

#### **Banner Ads**
- **Description**: Small rectangular ads displayed at top/bottom of screen
- **Best Placement**: Home Screen, Settings Screen, Scoreboard
- **User Impact**: Low intrusion, always visible
- **Revenue**: $0.50-$2 CPM (Cost Per Mille/1000 impressions)
- **Recommendation**: Use sparingly to avoid cluttering UI

#### **Interstitial Ads**
- **Description**: Full-screen ads shown between content transitions
- **Best Placement**: 
  - After game round ends (before Scoreboard)
  - Every 3-5 completed games
  - When changing game topics/categories
- **User Impact**: Medium intrusion, brief interruption
- **Revenue**: $3-$10 CPM
- **Recommendation**: Primary revenue source, but use frequency capping

#### **Rewarded Video Ads**
- **Description**: Video ads users choose to watch for rewards
- **Best Placement**:
  - Unlock premium word packs temporarily
  - Get hints during gameplay
  - Extra time for current round
  - Unlock special themes
- **User Impact**: User-initiated, highly engaging
- **Revenue**: $10-$20 CPM
- **Recommendation**: Best user experience + highest revenue

#### **Native Ads**
- **Description**: Ads that match app's look and feel
- **Best Placement**: Word category selection screen
- **User Impact**: Very low, blends with UI
- **Revenue**: $2-$5 CPM
- **Recommendation**: Optional, for advanced implementation

---

## Recommended Ad Networks

### Primary Choice: Google AdMob

**Why AdMob?**
- ✅ Official Expo/React Native support
- ✅ Easy integration with `expo-ads-admob` or `react-native-google-mobile-ads`
- ✅ High fill rates (ads show ~95% of the time)
- ✅ Supports all ad formats (Banner, Interstitial, Rewarded)
- ✅ Reliable payouts (Google pays on time)
- ✅ Excellent documentation and support

**Setup Requirements:**
1. Create account at [admob.google.com](https://admob.google.com)
2. Register your app (Android/iOS)
3. Generate Ad Unit IDs for each ad type
4. Add App ID to `app.json`

### Alternative Ad Networks

| Network | Strengths | Best For |
|---------|-----------|----------|
| **Facebook Audience Network** | High eCPM, good fill rates | Apps with social features |
| **Unity Ads** | Gaming-focused, video specialists | Game apps, rewarded videos |
| **AppLovin MAX** | Mediation platform, multiple networks | Maximizing revenue |
| **AdColony** | Premium video ads | High-quality video inventory |
| **ironSource** | Gaming focus, good mediation | Established gaming apps |

---

## Integration Implementation

### Step 1: Install Dependencies

```bash
# For Expo managed workflow (recommended for beginners)
npx expo install expo-ads-admob

# OR for bare React Native / EAS (more control)
npm install react-native-google-mobile-ads
npx pod-install # iOS only
```

### Step 2: Configure app.json

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMobileAdsAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
      }
    },
    "ios": {
      "config": {
        "googleMobileAdsAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
      }
    }
  }
}
```

### Step 3: Initialize Ad SDK

**In App.js:**
```javascript
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

export default function App() {
  useEffect(() => {
    // Set test device for development
    setTestDeviceIDAsync('EMULATOR');
  }, []);

  // Rest of your app code
}
```

### Step 4: Create Ad Components

#### Banner Ad Component
```javascript
// src/components/BannerAd.js
import React from 'react';
import { AdMobBanner } from 'expo-ads-admob';
import { Platform } from 'react-native';

const BANNER_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-XXXXX/BANNER_IOS',
  android: 'ca-app-pub-XXXXX/BANNER_ANDROID',
});

export default function BannerAd() {
  return (
    <AdMobBanner
      bannerSize="smartBannerPortrait"
      adUnitID={BANNER_AD_UNIT_ID}
      servePersonalizedAds={true}
      onDidFailToReceiveAdWithError={(error) => console.log(error)}
    />
  );
}
```

#### Interstitial Ad Helper
```javascript
// src/services/adService.js
import { AdMobInterstitial } from 'expo-ads-admob';
import { Platform } from 'react-native';

const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-XXXXX/INTERSTITIAL_IOS',
  android: 'ca-app-pub-XXXXX/INTERSTITIAL_ANDROID',
});

let gamesPlayed = 0;
const GAMES_BEFORE_AD = 3;

export const initializeInterstitial = async () => {
  await AdMobInterstitial.setAdUnitID(INTERSTITIAL_AD_UNIT_ID);
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
};

export const showInterstitialIfReady = async () => {
  gamesPlayed++;
  
  if (gamesPlayed >= GAMES_BEFORE_AD) {
    const isReady = await AdMobInterstitial.getIsReadyAsync();
    if (isReady) {
      await AdMobInterstitial.showAdAsync();
      gamesPlayed = 0;
      // Preload next ad
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    }
  }
};
```

#### Rewarded Video Ad Helper
```javascript
// src/services/rewardedAdService.js
import { AdMobRewarded } from 'expo-ads-admob';
import { Platform } from 'react-native';

const REWARDED_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-XXXXX/REWARDED_IOS',
  android: 'ca-app-pub-XXXXX/REWARDED_ANDROID',
});

export const initializeRewardedAd = async () => {
  await AdMobRewarded.setAdUnitID(REWARDED_AD_UNIT_ID);
  await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
};

export const showRewardedAd = async (onReward) => {
  const isReady = await AdMobRewarded.getIsReadyAsync();
  
  if (isReady) {
    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', onReward);
    await AdMobRewarded.showAdAsync();
    AdMobRewarded.removeAllListeners();
    // Preload next ad
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
    return true;
  }
  return false;
};
```

---

## Strategic Ad Placement

### Home Screen
```
┌─────────────────────────┐
│   Action Reaction       │
│   [App Logo]            │
│                         │
│   [Play Button]         │
│   [Scoreboard]          │
│   [Settings]            │
│                         │
│ ┌─────────────────────┐ │
│ │   Banner Ad         │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

**Implementation:**
- Banner ad at bottom
- No interstitials (home is entry point)

### Game Screen
```
┌─────────────────────────┐
│   Timer: 60s            │
│   Score: 5              │
│                         │
│   ┌─────────────────┐   │
│   │                 │   │
│   │   PIZZA         │   │
│   │  (forehead)     │   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
│   NO ADS HERE!          │
└─────────────────────────┘
```

**Implementation:**
- **NO ADS during active gameplay**
- Maintains immersion and user experience
- Critical for party game flow

### Scoreboard Screen
```
┌─────────────────────────┐
│   Round Complete! 🎉    │
│                         │
│   Score: 12/15          │
│   Time: 60s             │
│                         │
│   [Play Again]          │
│   [Watch Ad for Bonus]  │ ← Rewarded
│   [Home]                │
│                         │
│ ┌─────────────────────┐ │
│ │  Banner Ad          │ │
│ └─────────────────────┘ │
└─────────────────────────┘

(After 3 games: Show Interstitial before this screen)
```

**Implementation:**
- Interstitial before screen (every 3rd game)
- Banner at bottom
- Optional rewarded video for bonus content

### Settings Screen
```
┌─────────────────────────┐
│ ┌─────────────────────┐ │
│ │   Banner Ad         │ │
│ └─────────────────────┘ │
│                         │
│   Volume: [====|---]    │
│   Haptics: [ON]         │
│   Language: English     │
│                         │
│   [Remove Ads - $2.99]  │ ← IAP
└─────────────────────────┘
```

**Implementation:**
- Banner at top
- Option to remove ads via IAP

---

## Frequency Capping Rules

### Interstitial Ads
- **Minimum time between ads**: 120 seconds
- **Frequency**: Every 3-5 completed games
- **Never show**:
  - During active gameplay
  - On first app launch
  - Within 2 minutes of last ad
  - During tutorial or onboarding

### Banner Ads
- **Always visible** on: Home, Settings, Scoreboard
- **Never show** on: Active Game Screen
- **Refresh rate**: 30-60 seconds (automatic)

### Rewarded Ads
- **User-initiated only**
- **No cooldown** (user chooses when)
- **Clear reward description** before showing

---

## Revenue Projections

### Assumptions
- 10,000 Daily Active Users (DAU)
- 5 game rounds per user per day
- 50,000 game sessions/day

### Ad Impression Breakdown

| Ad Type | Impressions/Day | CPM | Daily Revenue | Monthly Revenue |
|---------|----------------|-----|---------------|-----------------|
| Banner (Home) | 30,000 | $1.50 | $45 | $1,350 |
| Banner (Scoreboard) | 50,000 | $1.50 | $75 | $2,250 |
| Interstitial | 16,666 (every 3rd) | $6.00 | $100 | $3,000 |
| Rewarded (5% take rate) | 2,500 | $15.00 | $37.50 | $1,125 |
| **TOTAL** | - | - | **$257.50** | **$7,725** |

### Scaling Projections

| DAU | Monthly Revenue (Ads Only) |
|-----|---------------------------|
| 1,000 | $770 |
| 10,000 | $7,725 |
| 50,000 | $38,625 |
| 100,000 | $77,250 |

*Note: Actual revenue varies by geography, ad quality, and seasonality*

---

## Additional Monetization Strategies

### In-App Purchases (IAP)

#### Premium Word Packs
- **Price**: $0.99-$1.99 per pack
- **Content**: 100-200 themed words
- **Examples**:
  - Movies & TV Shows Pack
  - Sports & Athletes Pack
  - Science & Technology Pack
  - Pop Culture Pack
  - Custom Regional Packs (e.g., Bollywood)

#### Ad Removal
- **Price**: $2.99-$4.99 (one-time)
- **Value Proposition**: "Enjoy uninterrupted gameplay"
- **Conversion Rate**: Expect 1-3% of users

#### Theme Bundles
- **Price**: $1.99
- **Content**: Custom colors, fonts, animations
- **Appeal**: Visual customization

#### Power-Ups
- **Extra Time**: $0.99 (5 uses)
- **Hint System**: $1.99 (unlimited for 30 days)
- **Skip Cooldown**: $0.99 (10 uses)

### Subscription Model (Optional)

#### Monthly Plan
- **Price**: $2.99/month
- **Includes**:
  - Remove all ads
  - All word packs (current + future)
  - Exclusive themes
  - Priority support

#### Annual Plan
- **Price**: $19.99/year (~33% savings)
- **Same benefits as monthly**
- **Better retention and LTV**

### Recommended Hybrid Model

**Free Tier:**
- 5 free word packs (50-75 words each)
- Banner ads on Home/Scoreboard
- Interstitial every 3 games
- Access to rewarded videos for temporary unlocks

**Premium Tier (One-time $4.99):**
- Remove all ads
- 10 premium word packs
- All future packs included
- Exclusive themes

**Individual Packs ($1.49 each):**
- For users who want specific themes without full premium

---

## Implementation Checklist

### Pre-Launch
- [ ] Create AdMob account
- [ ] Register Android app in AdMob
- [ ] Register iOS app in AdMob
- [ ] Generate Ad Unit IDs (Banner, Interstitial, Rewarded)
- [ ] Install ad dependencies
- [ ] Configure `app.json` with AdMob App IDs
- [ ] Create ad components/services
- [ ] Implement ad placement in screens
- [ ] Add frequency capping logic
- [ ] Test with AdMob test IDs
- [ ] Implement analytics tracking for ad events

### Testing Phase
- [ ] Test banner ads on all screens
- [ ] Test interstitial frequency (3-game rule)
- [ ] Test rewarded video flow and rewards
- [ ] Test ad failure scenarios (no fill)
- [ ] Test ad placement on different screen sizes
- [ ] Verify ads don't show during gameplay
- [ ] Check ad loading performance
- [ ] Test with real AdMob IDs (in production mode)

### Legal & Compliance
- [ ] Create Privacy Policy (required for AdMob)
- [ ] Add Privacy Policy link in app
- [ ] Implement GDPR consent (for EU users)
- [ ] Implement COPPA compliance (if targeting children)
- [ ] Add "Ad Choices" icon/link
- [ ] Terms of Service for IAP (if implemented)
- [ ] Add data collection disclosure in app stores

### Launch
- [ ] Replace test Ad Unit IDs with production IDs
- [ ] Submit app to Google Play Store
- [ ] Submit app to Apple App Store
- [ ] Set up payment info in AdMob
- [ ] Enable mediation (optional, for advanced)
- [ ] Monitor ad performance in AdMob dashboard
- [ ] Track conversion rates and revenue

---

## Best Practices

### User Experience
✅ **Never interrupt active gameplay** - Ads should only appear between sessions
✅ **Respect user time** - 2+ minutes between interstitials minimum
✅ **Provide value with rewarded ads** - Make rewards meaningful
✅ **Test extensively** - Poorly implemented ads cause crashes
✅ **Optimize load times** - Preload interstitials and rewarded ads
✅ **Graceful degradation** - Handle ad load failures smoothly

### Technical
✅ **Use test IDs during development** - Avoid invalid traffic
✅ **Preload ads** - Request next ad after showing current one
✅ **Error handling** - Catch and log ad failures
✅ **Analytics** - Track impressions, clicks, revenue
✅ **Memory management** - Remove event listeners after use
✅ **Network conditions** - Handle offline scenarios

### Revenue Optimization
✅ **A/B test ad placements** - Find optimal frequency
✅ **Monitor fill rates** - Switch networks if needed
✅ **Seasonal adjustments** - CPM varies by time of year
✅ **Geographic targeting** - Some regions pay more
✅ **Ad mediation** - Use AppLovin MAX to maximize revenue
✅ **Balance ads with IAP** - Don't over-monetize

### Compliance
✅ **Privacy Policy** - Mandatory for ad networks
✅ **User consent** - GDPR/CCPA for personalized ads
✅ **Child safety** - COPPA if targeting under 13
✅ **Transparent pricing** - Clear IAP costs
✅ **No deceptive practices** - Honest ad placement

---

## Common Pitfalls to Avoid

❌ **Too many ads** - Users will uninstall if overwhelmed
❌ **Ads during gameplay** - Ruins party game experience
❌ **No frequency capping** - Showing ads too often
❌ **Poor ad placement** - Blocking important UI elements
❌ **Not testing** - Crashes from ad SDK integration
❌ **Using production IDs in dev** - Gets account banned (invalid traffic)
❌ **No privacy policy** - App will be rejected
❌ **Forcing rewarded ads** - Should always be user choice
❌ **No fallback** - Not handling ad load failures
❌ **Ignoring analytics** - Not tracking what works

---

## Privacy Policy Requirements

You **must** have a privacy policy to use AdMob. Include:

1. **What data is collected**
   - Device identifiers (Advertising ID)
   - Usage data (screens viewed, time spent)
   - Location (if using location-based ads)

2. **How data is used**
   - Serving personalized ads
   - Analytics and app improvement
   - Fraud prevention

3. **Third-party services**
   - Google AdMob
   - Analytics services
   - Any other SDKs

4. **User rights**
   - How to opt out of personalized ads
   - How to request data deletion
   - Contact information

**Tools to Generate Privacy Policy:**
- [App Privacy Policy Generator](https://app-privacy-policy-generator.firebaseapp.com/)
- [TermsFeed](https://www.termsfeed.com/privacy-policy-generator/)
- [FreePrivacyPolicy.com](https://www.freeprivacypolicy.com/)

---

## Test Ad Unit IDs (Development Only)

Use these during development to avoid invalid traffic:

```javascript
// Banner
const TEST_BANNER_AD = Platform.select({
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-3940256099942544/6300978111',
});

// Interstitial
const TEST_INTERSTITIAL_AD = Platform.select({
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
});

// Rewarded
const TEST_REWARDED_AD = Platform.select({
  ios: 'ca-app-pub-3940256099942544/1712485313',
  android: 'ca-app-pub-3940256099942544/5224354917',
});
```

**⚠️ Important**: Replace with your real Ad Unit IDs before publishing!

---

## Monitoring & Analytics

### Key Metrics to Track

1. **Ad Performance**
   - Impressions per DAU
   - Click-through rate (CTR)
   - eCPM (effective cost per mille)
   - Fill rate
   - Revenue per DAU

2. **User Behavior**
   - Rewarded ad completion rate
   - IAP conversion rate
   - Retention (Day 1, Day 7, Day 30)
   - Session length
   - Games per session

3. **Revenue**
   - Daily ad revenue
   - IAP revenue
   - Total ARPU (Average Revenue Per User)
   - LTV (Lifetime Value)

### Tools
- **AdMob Dashboard** - Ad performance and revenue
- **Google Analytics for Firebase** - User behavior
- **App Store/Play Console** - Downloads and ratings
- **RevenueCat** (optional) - IAP management and analytics

---

## Next Steps

1. **Read this guide thoroughly**
2. **Create AdMob account** and register your app
3. **Install dependencies** and configure `app.json`
4. **Implement ad components** (start with banners)
5. **Test with test Ad Unit IDs**
6. **Create Privacy Policy**
7. **Test thoroughly** on real devices
8. **Switch to production Ad Unit IDs**
9. **Submit to app stores**
10. **Monitor performance** and optimize

---

## Resources

### Official Documentation
- [Expo AdMob](https://docs.expo.dev/versions/latest/sdk/admob/)
- [React Native Google Mobile Ads](https://docs.page/invertase/react-native-google-mobile-ads)
- [AdMob Help Center](https://support.google.com/admob/)
- [AdMob Policy Center](https://support.google.com/admob/answer/6128543)

### Learning Resources
- [AdMob Best Practices](https://admob.google.com/home/resources/best-practices/)
- [Mobile Ad Optimization Guide](https://developers.google.com/admob/android/optimize)

### Legal
- [GDPR Compliance](https://support.google.com/admob/answer/9012903)
- [COPPA Compliance](https://support.google.com/admob/answer/6223431)

---

## Conclusion

Monetizing Action Reaction through ads is highly viable given its party game nature and replay value. The key is balancing revenue generation with user experience:

- **Keep gameplay ad-free** for maximum enjoyment
- **Use interstitials sparingly** (every 3+ games)
- **Embrace rewarded videos** for user choice
- **Consider IAP** for power users who want ad-free experience

With proper implementation, you can expect **$500-$2,000/month** at 5,000 DAU, scaling significantly as your user base grows.

**Remember**: Great user experience leads to better retention, which leads to higher revenue. Don't over-monetize early on. Build a loyal user base first, then optimize monetization.

Good luck! 🚀
