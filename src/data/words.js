// Language-specific word databases for game topics
const databases = {
  en: {
    food: [
      'Pizza', 'Burger', 'Sushi', 'Pasta', 'Tacos', 'Ice Cream', 'Chocolate',
      'Pancakes', 'Sandwich', 'Curry', 'Noodles', 'Steak', 'Salad', 'Soup',
      'Donut', 'Coffee', 'Cheese', 'Bacon', 'Avocado', 'Popcorn', 'Hot Dog',
      'Croissant', 'Waffles', 'Burrito', 'Spaghetti', 'Lasagna', 'Ramen',
      'Kebab', 'Fries', 'Cookie', 'Cake', 'Pie', 'Muffin', 'Bagel', 'Pretzel',
      'Lobster', 'Shrimp', 'Oyster', 'Salmon', 'Tuna', 'Chicken Wings',
      'BBQ Ribs', 'Mac and Cheese', 'Quesadilla', 'Nachos', 'Churros',
      'Falafel', 'Hummus', 'Pho', 'Dim Sum', 'Spring Rolls'
    ],
    
    sports: [
      'Basketball', 'Soccer', 'Tennis', 'Swimming', 'Baseball', 'Football',
      'Hockey', 'Golf', 'Volleyball', 'Cricket', 'Boxing', 'Wrestling',
      'Surfing', 'Skiing', 'Snowboarding', 'Skateboarding', 'Cycling',
      'Running', 'Marathon', 'Gymnastics', 'Yoga', 'Pilates', 'Karate',
      'Judo', 'Taekwondo', 'Fencing', 'Archery', 'Bowling', 'Darts',
      'Pool', 'Snooker', 'Rugby', 'Lacrosse', 'Badminton', 'Table Tennis',
      'Squash', 'Rock Climbing', 'Bungee Jumping', 'Skydiving', 'Diving',
      'Rowing', 'Kayaking', 'Sailing', 'Windsurfing', 'Polo', 'Rodeo',
      'Track and Field', 'Triathlon', 'Cheerleading', 'Dance'
    ],
    
    movies: [
      'Titanic', 'Avatar', 'The Avengers', 'Star Wars', 'Frozen', 'Jurassic Park',
      'The Lion King', 'Spider-Man', 'Batman', 'Superman', 'Iron Man', 'Thor',
      'Harry Potter', 'Lord of the Rings', 'Inception', 'The Matrix',
      'Forrest Gump', 'Shrek', 'Finding Nemo', 'Toy Story', 'The Godfather',
      'Jaws', 'E.T.', 'Pirates of the Caribbean', 'Transformers', 'Fast & Furious',
      'Mission Impossible', 'James Bond', 'Rocky', 'Rambo', 'Terminator',
      'Alien', 'Predator', 'Gladiator', 'The Dark Knight', 'Joker',
      'Deadpool', 'Guardians of the Galaxy', 'Black Panther', 'Wonder Woman',
      'Aquaman', 'Shazam', 'Venom', 'Kung Fu Panda', 'Madagascar', 'Despicable Me',
      'Minions', 'The Incredibles', 'Up', 'Wall-E', 'Ratatouille'
    ],
    
    animals: [
      'Dog', 'Cat', 'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Monkey',
      'Gorilla', 'Panda', 'Bear', 'Wolf', 'Fox', 'Rabbit', 'Squirrel',
      'Deer', 'Moose', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Chicken',
      'Duck', 'Goose', 'Penguin', 'Owl', 'Eagle', 'Hawk', 'Parrot',
      'Flamingo', 'Peacock', 'Swan', 'Dolphin', 'Whale', 'Shark', 'Octopus',
      'Jellyfish', 'Starfish', 'Crab', 'Lobster', 'Turtle', 'Crocodile',
      'Alligator', 'Snake', 'Lizard', 'Frog', 'Butterfly', 'Bee', 'Ant',
      'Spider', 'Ladybug', 'Dragonfly', 'Kangaroo', 'Koala', 'Platypus'
    ],
    
    places: [
      'Paris', 'London', 'New York', 'Tokyo', 'Rome', 'Dubai', 'Sydney',
      'Barcelona', 'Amsterdam', 'Venice', 'Hawaii', 'Bali', 'Maldives',
      'Iceland', 'Greece', 'Egypt', 'China', 'India', 'Brazil', 'Mexico',
      'Beach', 'Mountain', 'Desert', 'Forest', 'Lake', 'River', 'Ocean',
      'Island', 'Volcano', 'Canyon', 'Waterfall', 'Cave', 'Jungle',
      'Savanna', 'Tundra', 'Glacier', 'Park', 'Zoo', 'Museum', 'Library',
      'Theater', 'Stadium', 'Mall', 'Restaurant', 'Cafe', 'Hotel',
      'Airport', 'Train Station', 'Hospital', 'School', 'University'
    ],
    
    music: [
      'Guitar', 'Piano', 'Drums', 'Violin', 'Flute', 'Saxophone', 'Trumpet',
      'Cello', 'Harp', 'Accordion', 'Harmonica', 'Ukulele', 'Banjo',
      'Microphone', 'DJ', 'Concert', 'Festival', 'Orchestra', 'Band',
      'Singer', 'Rapper', 'Dancer', 'Rock', 'Pop', 'Jazz', 'Blues',
      'Country', 'Hip Hop', 'Classical', 'Opera', 'Reggae', 'Disco',
      'Techno', 'House', 'EDM', 'Headphones', 'Speaker', 'Radio',
      'Karaoke', 'Music Video', 'Album', 'Playlist', 'Lyrics', 'Melody',
      'Rhythm', 'Beat', 'Chorus', 'Verse', 'Symphony', 'Ballad'
    ],
    
    general: [
      'Birthday', 'Wedding', 'Party', 'Vacation', 'Camping', 'Picnic',
      'Shopping', 'Cooking', 'Baking', 'Reading', 'Writing', 'Drawing',
      'Painting', 'Photography', 'Gardening', 'Hiking', 'Jogging', 'Meditation',
      'Sleep', 'Dreaming', 'Laughing', 'Crying', 'Singing', 'Dancing',
      'Clapping', 'Waving', 'Hugging', 'Handshake', 'High Five',
      'Selfie', 'Video Call', 'Texting', 'Email', 'Internet', 'Computer',
      'Phone', 'Tablet', 'Television', 'Camera', 'Watch', 'Glasses',
      'Umbrella', 'Backpack', 'Wallet', 'Keys', 'Money', 'Credit Card',
      'Passport', 'Ticket', 'Map', 'Compass', 'Clock', 'Calendar'
    ]
  },

  ta: {
    // Tamil word lists taken from Multilingual-Design.md
    food: [
      'பிட்சா','பர்கர்','இட்லி','தோசை','சாதம்','பிரியாணி','சப்பாத்தி','பரோட்டா','வடை','போண்டா',
      'சமோசா','இனிப்பு','ஐஸ்கிரீம்','லட்டு','ஜிலேபி','கேக்','காபி','டீ','சாக்லேட்','குக்கீ',
      'புளிசாதம்','தயிர்சாதம்','பொங்கல்','உப்புமா','கிச்சடி','பாயசம்','மைசூர்பாகு','அடை',
      'அப்பளம்','பக்கோடா','ஊத்தப்பம்','பணியாரம்','முறுக்கு','நெய்அப்பம்','பஜ்ஜி','வடா',
      'ரசம்','சாம்பார்','குழம்பு','கூட்டு','பொரியல்','கீரை','பச்சடி','கோசு','மசாலா',
      'பணியாரம்','கொழுக்கட்டை','அதிரசம்','குடுமி'
    ],

    sports: [
      'கிரிக்கெட்','கால்பந்து','கூடைப்பந்து','டென்னிஸ்','பேட்மிண்டன்','ஹாக்கி','ஓட்டம்','நீச்சல்','கபடி','சதுரங்கம்',
      'வாலிபால்','கைப்பந்து','மல்யுத்தம்','குத்துச்சண்டை','வில்வித்தை','எறிபந்தாட்டம்','ஜூடோ',
      'கராத்தே','யோகா','ஜிம்','சைக்கிள்','மலையேற்றம்','கோல்ஃப்','பிலியர்ட்ஸ்','போலோ',
      'பந்தயம்','ஸ்கேட்டிங்','சர்ஃபிங்','நீர்வீழ்ச்சி','பாராசூட்','ஹைகிங்','நடைபயிற்சி'
    ],

    movies: [
      'பாகுபலி','2.0','ரோபோ','என்தன்','தங்கமகன்','விஸ்வாசம்','அஜீத்','விஜய்','ரஜினி','கமல்',
      'அனிருத்','விக்ரம்','சூர்யா','தனுஷ்','சிவகார்த்திகேயன்','ஜெயம்ரவி','விஷ்ணு','கார்த்தி',
      'சிவாஜி','பாஷா','முதல்வன்','அந்நியன்','தசாவதாரம்','விருமாண்டி','தேவர்மகன்','நாயகன்',
      'தில்லானா','குதிரைவால்','காளா','கபாலி','பேட்ட','மெர்சல்','பிகில்','மாஸ்டர்',
      'விக்ரம்வேதா','ஜானா','ரோஜா','புதியவர்பூமி','காதலன்','இந்தியன்','முதலன்','அரசன்'
    ],

    animals: [
      'நாய்','பூனை','சிங்கம்','புலி','யானை','குதிரை','மாடு','ஆடு','கோழி','வாத்து',
      'கரடி','குரங்கு','கழுதை','ஒட்டகம்','மான்','முயல்','எலி','பன்றி','நரி','ஓநாய்',
      'ஜிராஃப்','வரிக்குதிரை','காண்டாமிருகம்','சிறுத்தை','சிங்கம்','பாண்டா','கங்காரு',
      'கொரில்லா','செம்பன்சி','டால்பின்','திமிங்கலம்','சுறா','ஆமை','முதலை','பாம்பு',
      'பல்லி','தவளை','தேனீ','பட்டாம்பூச்சி','எறும்பு','சிலந்தி','தேள்','கொசு','ஈ',
      'கடற்பாம்பு','நண்டு','இறால்','மீன்','கிளி','மயில்','காகம்','புறா','கழுகு'
    ],

    places: [
      'சென்னை','மதுரை','கோயம்புத்தூர்','திருச்சி','தஞ்சாவூர்','திருநெல்வேலி','காஞ்சிபுரம்','திருப்பதி','ரமேஸ்வரம்','கன்னியாகுமரி',
      'சேலம்','ஈரோடு','வேலூர்','திருப்பூர்','நாகர்கோவில்','கும்பகோணம்','கரூர்','தூத்துக்குடி',
      'நெல்லை','மணலி','சிதம்பரம்','திருவண்ணாமலை','பாண்டிச்சேரி','மும்பை','டெல்லி','கொல்கத்தா',
      'பெங்களூர்','ஹைதராபாத்','அஹமதாபாத்','புனே','ஜெய்ப்பூர்','கோவா','கேரளா','கர்நாடகா',
      'ஆந்திரா','தெலுங்கானா','ஓடிசா','பீகார்','உத்தரப்பிரதேசம்','மகாராஷ்டிரா','குஜராத்',
      'கடற்கரை','மலை','காடு','நதி','ஏரி','கிணறு','குளம்','அருவி','தீவு','பள்ளத்தாக்கு'
    ],

    music: [
      'கிட்டார்','வயலின்','வீணை','மிருதங்கம்','தவில்','நாதஸ்வரம்','கடம்','டோலக்','பெரியமேளம்',
      'ஹார்மோனியம்','புல்லாங்குழல்','உடுக்கு','தம்புரா','சித்தார்','பாண்டோ','தபலா',
      'கச்சேரி','பாடல்','இசை','ராகம்','தாளம்','கீர்த்தனை','கருநாடக','திரைப்படம்','கானா',
      'பாரம்பரிய','நாட்டுப்புற','கோவில்','பக்தி','குத்து','கும்மி','தப்பாட்டம்','ஓயிலாட்டம்'
    ],

    general: [
      'பிறந்தநாள்','திருமணம்','விழா','விடுமுறை','பள்ளி','வீடு','அலுவலகம்','மழை','வெயில்','காற்று',
      'குடும்பம்','நண்பன்','உறவு','அம்மா','அப்பா','தாத்தா','பாட்டி','அண்ணன்','தம்பி','அக்கா',
      'தங்கை','மாமா','அத்தை','சித்தி','பெரியப்பா','சின்னம்மா','மருமகன்','மருமகள்',
      'புத்தகம்','பேனா','பென்சில்','காகிதம்','பலகை','நாற்காலி','மேஜை','கதவு','ஜன்னல்',
      'விளக்கு','மின்விசிறி','தொலைக்காட்சி','கைபேசி','கணினி','மடிக்கணினி','வானொலி',
      'கார்','பேருந்து','ரயில்','விமானம்','மிதிவண்டி','பைக்','ரிக்ஷா','வண்டி','படகு',
      'சாலை','பாலம்','கட்டடம்','கோபுரம்','கோவில்','தேவாலயம்','மசூதி','மருத்துவமனை'
    ]
  }
};

// Get random word from a topic for a given language
export const getRandomWord = (topic, usedWords = [], lang = 'en') => {
  const db = databases[lang] || databases.en;
  const words = db[topic] || db.general;
  const availableWords = words.filter(word => !usedWords.includes(word));

  if (availableWords.length === 0) {
    return null; // All words used
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
};

// Get all topics for a language
export const getAllTopics = (lang = 'en') => {
  const db = databases[lang] || databases.en;
  return Object.keys(db);
};

// Get word count for a topic and language
export const getWordCount = (topic, lang = 'en') => {
  const db = databases[lang] || databases.en;
  return db[topic]?.length || 0;
};
