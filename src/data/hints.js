// Custom clues and hints for each word

export const customClues = {
  // Food
  'Pizza': 'an Italian dish with cheese and tomato sauce',
  'Burger': 'a sandwich with a meat patty between buns',
  'Sushi': 'Japanese dish with rice and raw fish',
  'Pasta': 'Italian noodles in various shapes',
  'Tacos': 'Mexican food in folded tortillas',
  'Ice Cream': 'frozen dessert, sweet and creamy',
  'Chocolate': 'sweet brown candy made from cocoa',
  'Pancakes': 'flat cakes cooked on a griddle',
  'Sandwich': 'food between two slices of bread',
  'Curry': 'spicy dish popular in India',
  'Noodles': 'long thin strips of pasta',
  'Steak': 'thick slice of meat',
  'Salad': 'mixed vegetables, often with dressing',
  'Soup': 'liquid food served hot',
  'Donut': 'fried dough with a hole in the middle',
  'Coffee': 'hot caffeinated drink',
  'Cheese': 'dairy product made from milk',
  'Bacon': 'crispy strips of pork',
  'Avocado': 'green fruit used in guacamole',
  'Popcorn': 'popped corn kernels, movie snack',
  
  // Sports
  'Basketball': 'played with an orange ball and hoops',
  'Soccer': 'the world\'s most popular sport with a round ball',
  'Tennis': 'racket sport played on a court',
  'Swimming': 'moving through water',
  'Baseball': 'bat and ball sport with bases',
  'Football': 'tackle sport with an oval ball',
  'Hockey': 'played on ice with sticks and a puck',
  'Golf': 'hitting a small ball into holes',
  'Volleyball': 'hitting a ball over a net',
  'Cricket': 'bat and ball sport popular in England',
  'Boxing': 'fighting sport with gloves',
  'Wrestling': 'grappling combat sport',
  'Surfing': 'riding ocean waves on a board',
  
  // Movies
  'Titanic': 'ship disaster romance film',
  'Avatar': 'blue aliens on Pandora',
  'The Avengers': 'Marvel superhero team',
  'Star Wars': 'space saga with Jedi and Sith',
  'Frozen': 'Disney film about ice queen Elsa',
  'Jurassic Park': 'dinosaurs brought back to life',
  'The Lion King': 'Disney film about Simba',
  'Spider-Man': 'web-slinging superhero',
  'Batman': 'dark knight of Gotham',
  'Harry Potter': 'young wizard at Hogwarts',
  'Inception': 'dreams within dreams',
  'The Matrix': 'reality is a simulation',
  
  // Animals
  'Dog': 'man\'s best friend, barks',
  'Cat': 'meows and purrs, likes to nap',
  'Lion': 'king of the jungle',
  'Tiger': 'large striped cat',
  'Elephant': 'largest land animal with trunk',
  'Giraffe': 'tallest animal with long neck',
  'Zebra': 'horse with black and white stripes',
  'Monkey': 'primate that swings in trees',
  'Panda': 'black and white bear from China',
  'Bear': 'large furry animal that hibernates',
  'Dolphin': 'intelligent marine mammal',
  'Whale': 'largest animal in the ocean',
  'Shark': 'predatory fish with sharp teeth',
  
  // Places
  'Paris': 'city with the Eiffel Tower',
  'London': 'capital of England with Big Ben',
  'New York': 'city that never sleeps',
  'Tokyo': 'capital of Japan',
  'Rome': 'ancient city with the Colosseum',
  'Dubai': 'city with the Burj Khalifa',
  'Beach': 'sandy shore by the ocean',
  'Mountain': 'tall natural elevation',
  'Desert': 'hot sandy landscape',
  'Forest': 'dense area with many trees',
  
  // Music
  'Guitar': 'stringed instrument with six strings',
  'Piano': 'keyboard instrument with 88 keys',
  'Drums': 'percussion instrument you hit',
  'Violin': 'stringed instrument played with bow',
  'Flute': 'wind instrument you blow into',
  'Saxophone': 'brass instrument used in jazz',
  'Trumpet': 'brass instrument with valves',
  'Microphone': 'device to amplify your voice',
  'Concert': 'live music performance',
  'DJ': 'plays recorded music at events',
};

// Category hints for each topic
export const categoryHints = {
  food: "It's a type of food",
  sports: "It's a sport or sports-related activity",
  movies: "It's a movie or film-related",
  animals: "It's an animal or creature",
  places: "It's a place or location",
  music: "It's music or instrument-related",
  general: "It's a common word or object",
};

// Generate hints for a word
export const generateHints = (word, topic) => {
  const hints = [];
  
  // Hint 1: Category
  hints.push(categoryHints[topic] || "It's a common word");
  
  // Hint 2: Letter count with blanks
  const blanks = Array(word.length).fill('_').join(' ');
  hints.push(`It has ${word.length} letters: ${blanks}`);
  
  // Hint 3: First letter + custom clue
  const clue = customClues[word] || "A word in this category";
  hints.push(`Starts with "${word[0]}", ${clue}`);
  
  // Hint 4: Partial reveal (show first, last, and some middle letters)
  const partial = word.split('').map((char, index) => {
    if (index === 0 || index === word.length - 1) return char;
    if (word.length > 4 && index % 2 === 0) return char;
    return '_';
  }).join(' ');
  hints.push(partial);
  
  return hints;
};

// Scramble a word
export const scrambleWord = (word) => {
  const wordArray = word.split('');
  const scrambled = [...wordArray];
  
  // Fisher-Yates shuffle
  for (let i = scrambled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
  }
  
  // Make sure it's actually scrambled (not the same as original)
  if (scrambled.join('') === word && word.length > 1) {
    return scrambleWord(word); // Try again
  }
  
  return scrambled.join('');
};

// Generate fill in the blanks pattern
export const generateBlanksPattern = (word) => {
  return word.split('').map((char, index) => {
    if (index === 0) return char; // Always show first letter
    if (index % 3 === 0) return char; // Show every 3rd letter
    return '_';
  }).join(' ');
};

// Emoji mapping for words
export const emojiHints = {
  // Food
  'Pizza': '🍕',
  'Burger': '🍔',
  'Sushi': '🍣',
  'Pasta': '🍝',
  'Tacos': '🌮',
  'Ice Cream': '🍦',
  'Chocolate': '🍫',
  'Pancakes': '🥞',
  'Sandwich': '🥪',
  'Curry': '🍛',
  'Noodles': '🍜',
  'Steak': '🥩',
  'Salad': '🥗',
  'Soup': '🍲',
  'Donut': '🍩',
  'Coffee': '☕',
  'Cheese': '🧀',
  'Bacon': '🥓',
  'Avocado': '🥑',
  'Popcorn': '🍿',
  
  // Sports
  'Basketball': '🏀',
  'Soccer': '⚽',
  'Tennis': '🎾',
  'Swimming': '🏊',
  'Baseball': '⚾',
  'Football': '🏈',
  'Hockey': '🏒',
  'Golf': '⛳',
  'Volleyball': '🏐',
  'Cricket': '🏏',
  'Boxing': '🥊',
  'Surfing': '🏄',
  'Skiing': '⛷️',
  
  // Animals
  'Dog': '🐕',
  'Cat': '🐱',
  'Lion': '🦁',
  'Tiger': '🐯',
  'Elephant': '🐘',
  'Giraffe': '🦒',
  'Zebra': '🦓',
  'Monkey': '🐵',
  'Panda': '🐼',
  'Bear': '🐻',
  'Dolphin': '🐬',
  'Whale': '🐋',
  'Shark': '🦈',
  'Penguin': '🐧',
  'Owl': '🦉',
  'Eagle': '🦅',
  
  // Music
  'Guitar': '🎸',
  'Piano': '🎹',
  'Drums': '🥁',
  'Violin': '🎻',
  'Saxophone': '🎷',
  'Trumpet': '🎺',
  'Microphone': '🎤',
  'Concert': '🎵',
};

// Calculate score based on hints used and time
export const calculateScore = (hintsUsed, timeSpent, isCorrect) => {
  if (!isCorrect) return 0;
  
  const basePoints = 10;
  const hintBonus = Math.max(0, (4 - hintsUsed) * 2); // 8, 6, 4, 2, 0
  const speedBonus = timeSpent < 10 ? 5 : timeSpent < 15 ? 3 : 0;
  
  return basePoints + hintBonus + speedBonus;
};
