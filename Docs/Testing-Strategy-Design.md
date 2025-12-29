# Testing Strategy and Design Document
## Action-Reaction Game Application

**Created:** December 18, 2025  
**Version:** 1.0  
**Application Type:** React Native (Expo) Word Guessing Game

---

## Table of Contents
1. [Application Overview](#application-overview)
2. [Testing Approach Recommendation](#testing-approach-recommendation)
3. [Proposed Testing Stack](#proposed-testing-stack)
4. [Testing Layers](#testing-layers)
5. [Unit Testing Strategy](#unit-testing-strategy)
6. [Integration Testing Strategy](#integration-testing-strategy)
7. [Component Testing Strategy](#component-testing-strategy)
8. [E2E Testing Strategy](#e2e-testing-strategy)
9. [Test Coverage Goals](#test-coverage-goals)
10. [Testing Implementation Plan](#testing-implementation-plan)
11. [CI/CD Integration](#cicd-integration)
12. [Folder Structure](#folder-structure)

---

## Application Overview

**Action-Reaction** is a React Native word-guessing game built with Expo that includes:
- Multi-language support (English, Tamil)
- Multiple game modes (Multiplayer, Single Player with AI hints, Memory Challenge, Time Attack)
- Accelerometer-based controls (phone flip to pass)
- AsyncStorage for persistence
- External API integration (Groq AI for hints)
- Audio/haptic feedback
- Navigation with React Navigation

---

## Testing Approach Recommendation

### Recommended Testing Pyramid:
```
        /\
       /E2E\          10% - Critical user flows
      /______\
     /        \
    / Integr.  \      20% - Component interactions & API
   /____________\
  /              \
 /   Unit Tests   \   70% - Business logic, utilities, services
/__________________\
```

### Why This Stack?

For React Native/Expo applications, I recommend:

1. **Jest** - Already configured in Expo projects, excellent for unit tests
2. **React Native Testing Library** - Component testing with user-centric approach
3. **Detox** (optional) - E2E testing for real device behavior
4. **MSW (Mock Service Worker)** - API mocking for reliable tests

---

## Proposed Testing Stack

### Core Testing Framework
```json
{
  "jest": "^29.7.0",
  "@testing-library/react-native": "^12.4.0",
  "@testing-library/jest-native": "^5.4.3",
  "react-test-renderer": "19.1.0"
}
```

### Additional Testing Tools
```json
{
  "@testing-library/react-hooks": "^8.0.1",
  "jest-expo": "~52.0.0",
  "msw": "^2.0.0",
  "detox": "^20.14.0" // Optional for E2E
}
```

### Mocking Libraries
```json
{
  "@react-native-async-storage/async-storage": "mock available",
  "react-native-reanimated": "mock required",
  "expo-av": "manual mock required",
  "expo-sensors": "manual mock required"
}
```

---

## Testing Layers

### 1. Unit Tests (70% of tests)
- **Target:** Pure functions, utilities, data transformations
- **Files to Test:**
  - `src/data/hints.js` (scrambleWord, generateHints, calculateScore)
  - `src/data/words.js` (getRandomWord, getAllTopics, getWordCount)
  - `src/services/groqService.js` (API logic, error handling)
  - `src/services/hintService.js` (hint generation logic)

### 2. Component Tests (20% of tests)
- **Target:** React components, hooks, context
- **Files to Test:**
  - `src/components/CommonComponents.js` (Button, TopicCard)
  - `src/contexts/LanguageContext.js` (context provider, hooks)
  - Screen components (isolated rendering, user interactions)

### 3. Integration Tests (10% of tests)
- **Target:** Feature workflows, navigation, state management
- **Scenarios:**
  - Complete game flow (start → play → end → scoreboard)
  - Language switching across screens
  - Settings persistence
  - API integration with mocked responses

---

## Unit Testing Strategy

### 1. Data/Utility Functions (`src/data/hints.js`)

**Test Cases:**
```javascript
describe('hints.js utilities', () => {
  describe('scrambleWord', () => {
    ✓ should scramble letters of a word
    ✓ should not return original word
    ✓ should maintain same length
    ✓ should handle single character words
    ✓ should handle uppercase/lowercase
  });

  describe('generateBlanksPattern', () => {
    ✓ should create pattern with blanks and revealed letters
    ✓ should reveal correct percentage of letters
    ✓ should keep spaces intact for multi-word phrases
  });

  describe('calculateScore', () => {
    ✓ should return 10 points for hint level 1
    ✓ should return 8 points for hint level 2
    ✓ should return 6 points for hint level 3
    ✓ should return 4 points for hint level 4
    ✓ should return 0 for invalid hint levels or incorrect answers
    ✓ should ignore timeSpent parameter in scoring
  });

  describe('emojiHints', () => {
    ✓ should return emoji hint for known word
    ✓ should return default emoji for unknown word
  });
});
```

### 2. Word Database (`src/data/words.js`)

**Test Cases:**
```javascript
describe('words.js functions', () => {
  describe('getRandomWord', () => {
    ✓ should return word from specified topic
    ✓ should return word for specified language
    ✓ should exclude used words
    ✓ should return null when no words available
    ✓ should handle invalid topic gracefully
  });

  describe('getAllTopics', () => {
    ✓ should return all topics for language
    ✓ should return english topics by default
    ✓ should handle unsupported language
  });

  describe('getWordCount', () => {
    ✓ should return correct count for topic
    ✓ should return 0 for invalid topic
  });
});
```

### 3. Services (`src/services/groqService.js`)

**Test Cases:**
```javascript
describe('GroqService', () => {
  describe('generateHints', () => {
    ✓ should call API with correct parameters
    ✓ should return array of 4 hints on success
    ✓ should handle API errors gracefully
    ✓ should timeout after 15 seconds
    ✓ should cache hints for same word
    ✓ should format response correctly
  });

  describe('error handling', () => {
    ✓ should return fallback hints on network error
    ✓ should retry on temporary failures
    ✓ should log errors appropriately
  });
});
```

---

## Component Testing Strategy

### 1. Common Components (`src/components/CommonComponents.js`)

**Test Cases:**
```javascript
describe('Button Component', () => {
  ✓ should render with title
  ✓ should call onPress when pressed
  ✓ should apply correct variant styles
  ✓ should be disabled when disabled prop is true
  ✓ should render with icon if provided
  ✓ should apply custom gradient colors
});

describe('TopicCard Component', () => {
  ✓ should render topic name
  ✓ should display word count
  ✓ should call onPress with topic
  ✓ should render correct icon
  ✓ should apply gradient colors
});
```

### 2. Language Context (`src/contexts/LanguageContext.js`)

**Test Cases:**
```javascript
describe('LanguageContext', () => {
  ✓ should provide default language (en)
  ✓ should load saved language from AsyncStorage
  ✓ should switch language and save to storage
  ✓ should translate keys correctly
  ✓ should handle nested translation keys
  ✓ should return fallback for missing keys
  ✓ should handle invalid language codes
});
```

### 3. Screen Components

#### HomeScreen Tests
```javascript
describe('HomeScreen', () => {
  ✓ should render title and description
  ✓ should display all game topics
  ✓ should navigate to Game screen on topic select
  ✓ should navigate to Settings on settings button press
  ✓ should show mode selector (multiplayer/singleplayer)
  ✓ should display correct word counts per topic
  ✓ should animate on mount
});
```

#### GameScreen Tests
```javascript
describe('GameScreen', () => {
  ✓ should start countdown on mount
  ✓ should display current word after countdown
  ✓ should update score on correct answer
  ✓ should handle pass action (accelerometer)
  ✓ should end game when timer reaches zero
  ✓ should navigate to Scoreboard on game end
  ✓ should load timer settings from AsyncStorage
  ✓ should handle single player mode correctly
  ✓ should display hints progressively
  ✓ should play audio feedback (when enabled)
});
```

#### SettingsScreen Tests
```javascript
describe('SettingsScreen', () => {
  ✓ should render all setting options
  ✓ should save timer preference to AsyncStorage
  ✓ should toggle sound setting
  ✓ should switch language
  ✓ should navigate back on back button
  ✓ should display current settings correctly
});
```

#### ScoreboardScreen Tests
```javascript
describe('ScoreboardScreen', () => {
  ✓ should display final score
  ✓ should display pass count
  ✓ should calculate and show accuracy
  ✓ should save high score to AsyncStorage
  ✓ should navigate to Home on play again
  ✓ should show performance message based on score
});
```

---

## Integration Testing Strategy

### 1. Complete Game Flow
```javascript
describe('Complete Game Flow Integration', () => {
  ✓ should complete full game from home to scoreboard
  ✓ should persist score in scoreboard history
  ✓ should maintain language selection across screens
  ✓ should apply timer settings to game
});
```

### 2. AsyncStorage Integration
```javascript
describe('AsyncStorage Integration', () => {
  ✓ should persist and retrieve language preference
  ✓ should persist and retrieve timer settings
  ✓ should persist and retrieve sound settings
  ✓ should persist and retrieve high scores
});
```

### 3. API Integration (with mocks)
```javascript
describe('Groq API Integration', () => {
  ✓ should fetch hints for single player mode
  ✓ should fall back to local hints on API failure
  ✓ should cache API responses
  ✓ should handle slow network gracefully
});
```

---

## E2E Testing Strategy

### Critical User Journeys (Detox)

**Test Cases:**
```javascript
describe('E2E: Critical User Flows', () => {
  ✓ User can start and complete a multiplayer game
  ✓ User can start and complete a single player game
  ✓ User can change language and see translated content
  ✓ User can adjust timer and it applies to game
  ✓ User can flip phone to pass (accelerometer)
  ✓ User can view scoreboard history
  ✓ Settings persist across app restarts
});
```

**Note:** Detox tests require additional setup and real devices/emulators. Consider implementing only if resources permit.

---

## Test Coverage Goals

### Minimum Coverage Targets:
- **Overall Code Coverage:** 80%
- **Business Logic (utilities, services):** 95%
- **Components:** 75%
- **Screens:** 60%
- **Context/Hooks:** 90%

### Coverage Reports:
```bash
npm test -- --coverage
```

Should track:
- Statements
- Branches
- Functions
- Lines

---

## Testing Implementation Plan

### Phase 1: Setup & Unit Tests (Week 1)
1. Install testing dependencies
2. Configure Jest for React Native
3. Setup test file structure
4. Write unit tests for:
   - `hints.js`
   - `words.js`
   - `groqService.js`
   - `hintService.js`

### Phase 2: Component Tests (Week 2)
1. Setup React Native Testing Library
2. Create mocks for native modules
3. Write tests for:
   - CommonComponents
   - LanguageContext
   - Basic screen rendering

### Phase 3: Integration Tests (Week 3)
1. Setup MSW for API mocking
2. Write integration tests for:
   - Complete game flows
   - Navigation
   - AsyncStorage persistence

### Phase 4: E2E Tests (Optional - Week 4)
1. Setup Detox
2. Configure for iOS/Android
3. Write critical path E2E tests

### Phase 5: CI/CD Integration (Week 5)
1. Configure GitHub Actions / GitLab CI
2. Add automated test runs on PR
3. Setup coverage reporting
4. Add pre-commit hooks

---

## CI/CD Integration

### GitHub Actions Example:
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run test:integration
      - uses: codecov/codecov-action@v3
```

---

## Folder Structure

```
Action-Reaction/
├── __tests__/                    # Test files
│   ├── unit/
│   │   ├── data/
│   │   │   ├── hints.test.js
│   │   │   └── words.test.js
│   │   └── services/
│   │       ├── groqService.test.js
│   │       └── hintService.test.js
│   ├── components/
│   │   ├── CommonComponents.test.js
│   │   └── __snapshots__/
│   ├── contexts/
│   │   └── LanguageContext.test.js
│   ├── screens/
│   │   ├── HomeScreen.test.js
│   │   ├── GameScreen.test.js
│   │   ├── SettingsScreen.test.js
│   │   └── ScoreboardScreen.test.js
│   ├── integration/
│   │   ├── gameFlow.test.js
│   │   ├── navigation.test.js
│   │   └── persistence.test.js
│   └── e2e/                     # Detox tests (optional)
│       └── criticalFlows.test.js
├── __mocks__/                   # Manual mocks
│   ├── expo-av.js
│   ├── expo-sensors.js
│   ├── expo-haptics.js
│   └── @react-native-async-storage/
│       └── async-storage.js
├── jest.config.js
├── jest.setup.js
└── .detoxrc.json               # Detox config (optional)
```

---

## Test File Naming Convention

- Unit tests: `fileName.test.js`
- Integration tests: `featureName.integration.test.js`
- E2E tests: `flowName.e2e.test.js`
- Mock files: `__mocks__/moduleName.js`

---

## Additional Testing Recommendations

### 1. Snapshot Testing
- Use sparingly for complex UI components
- Review snapshots carefully during code review
- Update snapshots only when intentional changes occur

### 2. Performance Testing
- Test game performance with `react-native-performance`
- Monitor memory usage during long game sessions
- Test with low-end devices

### 3. Accessibility Testing
- Use `@testing-library/react-native` accessibility queries
- Test screen reader compatibility
- Ensure all interactive elements are accessible

### 4. Manual Testing Checklist
- [ ] Phone flip detection (accelerometer)
- [ ] Audio playback quality
- [ ] Haptic feedback strength
- [ ] UI responsiveness on different screen sizes
- [ ] Network conditions (slow 3G, offline)
- [ ] Battery impact during gameplay

---

## Tools & Resources

### Testing Tools:
- **Jest**: https://jestjs.io/
- **React Native Testing Library**: https://callstack.github.io/react-native-testing-library/
- **Detox**: https://wix.github.io/Detox/
- **MSW**: https://mswjs.io/

### Learning Resources:
- Kent C. Dodds - Testing JavaScript
- React Native Testing Library Docs
- Expo Testing Guide

---

## Success Metrics

### Definition of Done for Testing:
- [ ] 80%+ code coverage achieved
- [ ] All critical paths have integration tests
- [ ] CI/CD pipeline runs tests automatically
- [ ] No flaky tests in test suite
- [ ] Test execution time < 5 minutes
- [ ] Documentation updated with testing guidelines

---

## Next Steps

**After reviewing this design document, we can:**

1. **Install Dependencies** - Add testing libraries to package.json
2. **Configure Jest** - Setup jest.config.js and jest.setup.js
3. **Create Mock Files** - Setup mocks for native modules
4. **Write First Tests** - Start with unit tests for utilities
5. **Setup CI Pipeline** - Automate test execution
6. **Iterate & Improve** - Continuously improve test coverage

---

## Questions to Consider

Before implementation, please decide:

1. **Do you want E2E testing with Detox?** (adds complexity but valuable)
2. **What's your priority?** (Unit → Component → Integration → E2E)
3. **CI/CD platform?** (GitHub Actions, GitLab CI, CircleCI?)
4. **Coverage enforcement?** (Block PRs if coverage drops?)
5. **Testing on real devices?** (or emulators only?)

---

**Document Version:** 1.0  
**Last Updated:** December 18, 2025  
**Author:** GitHub Copilot  
**Status:** Ready for Review
