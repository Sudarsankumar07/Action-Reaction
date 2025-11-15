# Multilingual Design - Action-Reaction App

## Overview
This document outlines the design for implementing multilingual support in the Action-Reaction game, starting with Tamil (தமிழ்) language support.

---

## Architecture Design

### 1. Language Structure
```
src/
  locales/
    en.js          # English translations
    ta.js          # Tamil translations
    index.js       # Language manager
  contexts/
    LanguageContext.js  # React Context for language
```

### 2. Language Context Pattern
- Use React Context API to manage language state globally
- Store selected language in AsyncStorage for persistence
- Provide easy switching between languages

---

## Implementation Plan

### Phase 1: Setup Language Files
1. Create translation files for each language
2. Include all UI text, labels, and word databases
3. Create language switcher component

### Phase 2: Update Components
1. Wrap app with LanguageContext Provider
2. Replace hardcoded text with translation keys
3. Add language selector in Settings screen

### Phase 3: Word Database Translation
1. Translate word categories for each topic
2. Ensure equal word count across languages
3. Test gameplay in both languages

---

## Translation Files Structure

### English (en.js)
```javascript
export default {
  // Navigation & Screens
  home: "Home",
  game: "Game",
  scoreboard: "Scoreboard",
  settings: "Settings",
  
  // Home Screen
  selectTopic: "Select a Topic",
  startGame: "Start Game",
  
  // Game Screen
  correct: "Correct",
  pass: "Pass",
  timeLeft: "seconds",
  
  // Topics
  topics: {
    food: "Food",
    sports: "Sports",
    movies: "Movies",
    animals: "Animals",
    places: "Places",
    general: "General"
  }
}
```

### Tamil (ta.js)
```javascript
export default {
  // Navigation & Screens
  home: "முகப்பு",
  game: "விளையாட்டு",
  scoreboard: "மதிப்பெண் பலகை",
  settings: "அமைப்புகள்",
  
  // Home Screen
  selectTopic: "தலைப்பைத் தேர்ந்தெடுக்கவும்",
  startGame: "விளையாட்டைத் தொடங்கு",
  
  // Game Screen
  correct: "சரி",
  pass: "தவிர்",
  timeLeft: "விநாடிகள்",
  flipDown: "கீழே புரட்டு",
  flipUp: "மேலே புரட்டு",
  getReady: "தயாராகுங்கள்!",
  timesUp: "நேரம் முடிந்தது!",
  
  // Scoreboard
  roundComplete: "சுற்று முடிந்தது!",
  correctAnswers: "சரியான பதில்கள்",
  accuracy: "துல்லியம்",
  playAgain: "மீண்டும் விளையாடு",
  changeTopic: "தலைப்பை மாற்று",
  
  // Topics
  topics: {
    food: "உணவு",
    sports: "விளையாட்டு",
    movies: "திரைப்படங்கள்",
    animals: "விலங்குகள்",
    places: "இடங்கள்",
    general: "பொதுவானது"
  },
  
  // Messages
  amazing: "அற்புதம்!",
  greatJob: "நன்றாக செய்தீர்கள்!",
  goodWork: "நல்ல வேலை!",
  keepPracticing: "தொடர்ந்து பயிற்சி செய்யுங்கள்!",
  
  // Settings
  language: "மொழி",
  selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
  difficulty: "சிரமம்",
  soundEffects: "ஒலி விளைவுகள்",
  vibration: "அதிர்வு",
  about: "பற்றி"
}
```

---

## Word Database in Tamil

### Food (உணவு)
```javascript
food: [
  'பிட்சா',           // Pizza
  'பர்கர்',           // Burger
  'இட்லி',           // Idli
  'தோசை',            // Dosa
  'சாதம்',           // Rice
  'பிரியாணி',         // Biryani
  'சப்பாத்தி',        // Chapathi
  'பரோட்டா',          // Parotta
  'வடை',             // Vada
  'போண்டா',          // Bonda
  'சமோசா',           // Samosa
  'இனிப்பு',          // Sweet
  'ஐஸ்கிரீம்',        // Ice Cream
  'லட்டு',           // Laddu
  'ஜிலேபி',          // Jalebi
  'கேக்',            // Cake
  'காபி',            // Coffee
  'டீ',              // Tea
  'சாக்லேட்',         // Chocolate
  'குக்கீ'            // Cookie
]
```

### Sports (விளையாட்டு)
```javascript
sports: [
  'கிரிக்கெட்',        // Cricket
  'கால்பந்து',         // Football
  'கூடைப்பந்து',       // Basketball
  'டென்னிஸ்',         // Tennis
  'பேட்மிண்டன்',       // Badminton
  'ஹாக்கி',           // Hockey
  'ஓட்டம்',           // Running
  'நீச்சல்',          // Swimming
  'கபடி',            // Kabaddi
  'சதுரங்கம்',         // Chess
  'வலம்புரி',          // Volleyball
  'குத்துச்சண்டை',      // Boxing
  'குஸ்தி',           // Wrestling
  'கால்பந்து',         // Soccer
  'ஜூடோ',            // Judo
  'கராத்தே',          // Karate
  'யோகா',            // Yoga
  'சைக்கிள்',         // Cycling
  'மேஜைடென்னிஸ்',      // Table Tennis
  'ஜிம்னாஸ்டிக்ஸ்'     // Gymnastics
]
```

### Movies (திரைப்படங்கள்)
```javascript
movies: [
  'பாகுபலி',          // Bahubali
  '2.0',             // 2.0
  'ரோபோ',            // Robot
  'என்தன்',          // Enthiran
  'தங்கமகன்',         // Thangamagan
  'விஸ்வாசம்',        // Viswasam
  'அஜீத்',           // Ajith
  'விஜய்',           // Vijay
  'ரஜினி',           // Rajini
  'கமல்',            // Kamal
  'சிவாஜி',          // Sivaji
  'அவதார்',          // Avatar
  'டைட்டானிக்',       // Titanic
  'ஸ்பைடர்மேன்',      // Spider-Man
  'அயர்ன்மேன்',       // Iron Man
  'அவெஞ்சர்ஸ்',       // Avengers
  'ஜுராசிக் பார்க்',   // Jurassic Park
  'லயன் கிங்',       // Lion King
  'ஃப்ரோசன்',         // Frozen
  'டாய் ஸ்டோரி'       // Toy Story
]
```

### Animals (விலங்குகள்)
```javascript
animals: [
  'நாய்',            // Dog
  'பூனை',           // Cat
  'சிங்கம்',          // Lion
  'புலி',            // Tiger
  'யானை',           // Elephant
  'குதிரை',          // Horse
  'மாடு',            // Cow
  'ஆடு',            // Goat
  'கோழி',           // Chicken
  'வாத்து',          // Duck
  'கழுதை',           // Donkey
  'குரங்கு',          // Monkey
  'முயல்',           // Rabbit
  'எலி',            // Mouse
  'பாம்பு',          // Snake
  'முதலை',          // Crocodile
  'ஆமை',            // Turtle
  'தவளை',           // Frog
  'மீன்',           // Fish
  'சுறா'             // Shark
]
```

### Places (இடங்கள்)
```javascript
places: [
  'சென்னை',          // Chennai
  'மதுரை',           // Madurai
  'கோயம்புத்தூர்',     // Coimbatore
  'திருச்சி',         // Trichy
  'தஞ்சாவூர்',        // Thanjavur
  'திருநெல்வேலி',      // Tirunelveli
  'காஞ்சிபுரம்',      // Kanchipuram
  'திருப்பதி',        // Tirupati
  'ரமேஸ்வரம்',        // Rameswaram
  'கன்னியாகுமரி',      // Kanyakumari
  'ஊட்டி',           // Ooty
  'கொடைக்கானல்',      // Kodaikanal
  'பள்ளிக்கூடம்',      // School
  'மருத்துவமனை',       // Hospital
  'கோயில்',          // Temple
  'சர்ச்',           // Church
  'மசூதி',           // Mosque
  'கடற்கரை',         // Beach
  'மலை',            // Mountain
  'நதி'              // River
]
```

### General (பொதுவானது)
```javascript
general: [
  'பிறந்தநாள்',        // Birthday
  'திருமணம்',          // Wedding
  'விழா',            // Party
  'விடுமுறை',          // Holiday
  'பள்ளி',           // School
  'வீடு',            // Home
  'அலுவலகம்',         // Office
  'மழை',             // Rain
  'வெயில்',          // Sun
  'காற்று',          // Wind
  'நெருப்பு',         // Fire
  'நீர்',            // Water
  'மரம்',            // Tree
  'பூ',             // Flower
  'புத்தகம்',         // Book
  'பேனா',            // Pen
  'மொபைல்',          // Mobile
  'கணினி',           // Computer
  'தொலைக்காட்சி',      // Television
  'இசை'              // Music
]
```

---

## Usage Example

```javascript
import { useLanguage } from '../contexts/LanguageContext';

function HomeScreen() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <View>
      <Text>{t('selectTopic')}</Text>
      <Button title={t('startGame')} />
    </View>
  );
}
```

---

## Language Switcher Component

```javascript
// Settings Screen - Language Selector
<View>
  <Text>{t('language')}</Text>
  <Picker
    selectedValue={language}
    onValueChange={(value) => setLanguage(value)}
  >
    <Picker.Item label="English" value="en" />
    <Picker.Item label="தமிழ் (Tamil)" value="ta" />
  </Picker>
</View>
```

---

## Future Languages

### Planned Support:
- **Hindi** (हिन्दी)
- **Telugu** (తెలుగు)
- **Kannada** (ಕನ್ನಡ)
- **Malayalam** (മലയാളം)
- **Spanish** (Español)
- **French** (Français)

---

## Testing Checklist

- [ ] All UI text translates correctly
- [ ] Tamil characters display properly on all devices
- [ ] Word database has equal word counts
- [ ] Language persists after app restart
- [ ] No layout issues with longer Tamil text
- [ ] Font supports Tamil Unicode characters
- [ ] Gameplay works smoothly in Tamil
- [ ] Settings allow easy language switching

---

## Technical Notes

### Font Support
- Use system fonts that support Tamil Unicode (U+0B80 to U+0BFF)
- Test on both iOS and Android devices
- Consider custom Tamil fonts for better aesthetics

### Text Direction
- Tamil is Left-to-Right (LTR) - same as English
- No RTL considerations needed

### Performance
- Lazy load language files
- Cache translations in memory
- Use React Context to avoid prop drilling

---

## Implementation Priority

1. ✅ Create translation files (en.js, ta.js)
2. ✅ Setup LanguageContext
3. ✅ Update word database with Tamil words
4. ⏳ Update all screen components
5. ⏳ Add language selector in Settings
6. ⏳ Test on real devices
7. ⏳ Add more languages

---

**Created:** November 13, 2025  
**Status:** Design Complete, Ready for Implementation  
**Next Step:** Create language files and context
