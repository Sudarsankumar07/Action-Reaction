// Language-specific word databases for game topics
const databases = {
  en: {
    food: [
      'Pizza','Burger','Sushi','Pasta','Tacos','Ice Cream','Chocolate','Pancakes','Sandwich','Curry',
      'Noodles','Steak','Salad','Soup','Donut','Coffee','Cheese','Bacon','Avocado','Popcorn',
      'Hot Dog','Croissant','Waffles','Burrito','Spaghetti','Lasagna','Ramen','Kebab','Fries','Cookie',
      'Cake','Pie','Muffin','Bagel','Pretzel','Lobster','Shrimp','Oyster','Salmon','Tuna',
      'Chicken Wings','BBQ Ribs','Mac and Cheese','Quesadilla','Nachos','Churros','Falafel','Hummus','Pho','Dim Sum'
    ],

    sports: [
      'Basketball','Soccer','Tennis','Swimming','Baseball','Football','Hockey','Golf','Volleyball','Cricket',
      'Boxing','Wrestling','Surfing','Skiing','Snowboarding','Skateboarding','Cycling','Running','Marathon','Gymnastics',
      'Yoga','Pilates','Karate','Judo','Taekwondo','Fencing','Archery','Bowling','Darts','Pool'
    ],

    movies: [
      'Titanic','Avatar','The Avengers','Star Wars','Frozen','Jurassic Park','The Lion King','Spider-Man','Batman','Superman',
      'Iron Man','Thor','Harry Potter','Lord of the Rings','Inception','The Matrix','Forrest Gump','Shrek','Finding Nemo','Toy Story'
    ],

    animals: [
      'Dog','Cat','Lion','Tiger','Elephant','Giraffe','Zebra','Monkey','Panda','Bear',
      'Wolf','Fox','Rabbit','Squirrel','Deer','Horse','Cow','Pig','Sheep','Goat'
    ],

    places: [
      'Paris','London','New York','Tokyo','Rome','Dubai','Sydney','Barcelona','Amsterdam','Venice',
      'Hawaii','Bali','Maldives','Iceland','Greece','Egypt','China','India','Brazil','Mexico'
    ],

    music: [
      'Guitar','Piano','Drums','Violin','Flute','Saxophone','Trumpet','Cello','Harp','Ukulele',
      'Banjo','Microphone','DJ','Concert','Festival','Orchestra','Band','Singer','Rapper','Dancer'
    ],

    general: [
      'Birthday','Wedding','Party','Vacation','Camping','Picnic','Shopping','Cooking','Baking','Reading',
      'Writing','Drawing','Painting','Photography','Gardening','Hiking','Jogging','Meditation','Sleep','Dreaming'
    ]
  },

  ta: {
    // Tamil word lists taken from Multilingual-Design.md
    food: [
      'பிட்சா','பர்கர்','இட்லி','தோசை','சாதம்','பிரியாணி','சப்பாத்தி','பரோட்டா','வடை','போண்டா',
      'சಮோசா','இனிப்பு','ஐஸ்கிரீம்','லட்டு','ஜிலேபி','கேக்','காபி','டீ','சாக்லேட்','குக்கீ'
    ],

    sports: [
      'கிரிக்கெட்','கால்பந்து','கூடைப்பந்து','டென்னிஸ்','பேட்மிண்டன்','ஹாக்கி','ஓட்டம்','நீச்சல்','கபடி','சதுரங்கம்'
    ],

    movies: [
      'பாகுபலி','2.0','ரோபோ','என்தன்','தங்கமகன்','விஸ்வாசம்','அஜீத்','விஜய்','ரஜினி','கமல்'
    ],

    animals: [
      'நாய்','பூனை','சிங்கம்','புலி','யானை','குதிரை','மாடு','ஆடு','கோழி','வாத்து'
    ],

    places: [
      'சென்னை','மதுரை','கோயம்புத்தூர்','திருச்சி','தஞ்சாவூர்','திருநெல்வேலி','காஞ்சிபுரம்','திருப்பதி','ரமேஸ்வரம்','கன்னியாகுமரி'
    ],

    general: [
      'பிறந்தநாள்','திருமணம்','விழா','விடுமுறை','பள்ளி','வீடு','அலுவலகம்','மழை','வெயில்','காற்று'
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
