// Language-specific word databases for game topics
const databases = {
  en: {
    food: [
      // Easy - Common Indian Street Foods & Basics
      'Samosa', 'Dosa', 'Idli', 'Vada', 'Biryani', 'Butter Chicken', 'Paneer Tikka',
      'Chole Bhature', 'Pani Puri', 'Vada Pav', 'Upma', 'Poha', 'Dhokla', 'Rasgulla',
      'Gulab Jamun', 'Jalebi', 'Ladoo', 'Kheer', 'Pizza', 'Burger', 'Pasta', 'Noodles',
      'Sandwich', 'Ice Cream', 'Chocolate', 'Coffee', 'Tea', 'Paratha', 'Roti', 'Naan',
      'Chapati', 'Rice', 'Dal', 'Curry', 'Chutney', 'Pickle', 'Masala', 'Spice',
      'Sugar', 'Salt', 'Oil', 'Ghee', 'Butter', 'Milk', 'Yogurt', 'Cheese', 'Bread',
      'Egg', 'Chicken', 'Mutton', 'Fish', 'Vegetable', 'Fruit', 'Juice', 'Water',
      
      // Medium - Regional Indian Dishes
      'Hyderabadi Biryani', 'Chettinad Chicken', 'Rajma Chawal', 'Dal Makhani',
      'Palak Paneer', 'Aloo Gobi', 'Baingan Bharta', 'Sarson ka Saag', 'Kadhi Pakora',
      'Pav Bhaji', 'Misal Pav', 'Aloo Tikki', 'Chaat', 'Dahi Vada', 'Pakora',
      'Momos', 'Spring Rolls', 'Dim Sum', 'Sushi', 'Tacos', 'Wraps', 'Fried Rice',
      'Manchurian', 'Chilli Chicken', 'Hakka Noodles', 'Spring Roll', 'Wonton',
      'Thukpa', 'Chowmein', 'Fried Noodles', 'Paneer Butter Masala', 'Chicken Tikka Masala',
      'Fish Curry', 'Prawn Curry', 'Egg Curry', 'Mutton Curry', 'Keema', 'Pulao',
      'Khichdi', 'Dahi', 'Lassi', 'Buttermilk', 'Sharbat', 'Ras Malai', 'Cham Cham', 'Sandesh', 'Peda', 'Burfi', 'Halwa', 'Kaju Katli',
      'Mathura Pedas', 'Motichoor Ladoo', 'Besan Ladoo', 'Coconut Ladoo', 'Rava Ladoo',
      
      // Hard - Authentic Regional & International Specialties
      'Rogan Josh', 'Gushtaba', 'Yakhni Pulao', 'Nihari', 'Haleem', 'Korma',
      'Malpua', 'Imarti', 'Petha', 'Mysore Pak', 'Mawa Barfi', 'Kalakand',
      'Shrikhand', 'Basundi', 'Phirni', 'Kulfi', 'Kesar Pista',
      'Gajar ka Halwa', 'Moong Dal Halwa', 'Suji Halwa', 'Sheera', 'Uttapam',
      'Appam', 'Stew', 'Puttu', 'Kadala Curry', 'Erissery', 'Avial', 'Thoran',
      'Koottu Curry', 'Sambar', 'Rasam', 'Puli Kootal', 'Kuzhambu', 'Vathakuzhambu',
      'Mor Kuzhambu', 'Morkuzhambu', 'Thengai Paal Kuzhambu', 'Chettinad Kuzhambu',
      'Varutharacha Kuzhambu', 'Manchatti Kuzhambu', 'Kara Kuzhambu', 'Ennai Kathirikai',
      'Poriyal', 'Kootu', 'Thuvaiyal', 'Chutney', 'Sambar Powder', 'Rasam Powder',
      
      // International Foods with Indian Twist
      'Steak', 'Salmon', 'Tuna', 'Shrimp', 'Lobster', 'Crab', 'Calamari', 'Sashimi',
      'Tempura', 'Pad Thai', 'Tom Yum', 'Pho', 'Banh Mi', 'Kebab', 'Falafel',
      'Hummus', 'Shawarma', 'Doner', 'Gyro', 'Paella', 'Risotto', 'Carbonara',
      'Alfredo', 'Fettuccine', 'Ravioli', 'Gnocchi', 'Cannoli', 'Tiramisu',
      'Croissant', 'Baguette', 'Bagel', 'Pretzel', 'Waffles', 'Pancakes', 'French Toast',
      'Quesadilla', 'Nachos', 'Enchiladas', 'Tamales', 'Empanadas', 'Ceviche',
      'Churros', 'Flan', 'Tres Leches', 'Dulce de Leche', 'Brigadeiro', 'Acarajé',
      'Feijoada', 'Moqueca', 'Coxinha', 'Pão de Queijo', 'Quindim',
      'Romeu e Julieta', 'Vatapá', 'Caruru', 'Tapioca', 'Pamonha'
    ],

sports: [
      // Easy - Popular Sports in India & Globally
      'Cricket', 'Football', 'Hockey', 'Badminton', 'Tennis', 'Kabaddi', 'Kho Kho',
      'Chess', 'Carrom', 'Wrestling', 'Boxing', 'Basketball', 'Volleyball', 'Table Tennis',
      'Swimming', 'Running', 'Cycling', 'Yoga', 'Gymnastics', 'Athletics', 'Archery',
      'Bowling', 'Billiards', 'Snooker', 'Pool', 'Darts', 'Golf', 'Squash', 'Rugby',
      'Baseball', 'Soccer', 'American Football', 'Racing', 'Formula 1', 'MotoGP',
      'Horse Riding', 'Polo', 'Shooting', 'Fencing', 'Judo', 'Karate', 'Taekwondo',
      
      // Medium - Regional & Olympic Sports
      'Soccer', 'Baseball', 'American Football', 'Rugby', 'Golf', 'Squash', 'Fencing',
      'Judo', 'Karate', 'Taekwondo', 'Wushu', 'Mallakhamb', 'Kalaripayattu', 'Silambam',
      'Polo', 'Horse Riding', 'Shooting', 'Weightlifting', 'Bodybuilding', 'Powerlifting',
      'Crossfit', 'Calisthenics', 'Parkour', 'Skateboarding', 'Roller Skating', 'Ice Skating',
      'Surfing', 'Windsurfing', 'Kitesurfing', 'Wakeboarding', 'Water Skiing', 'Rowing',
      'Kayaking', 'Canoeing', 'Sailing', 'Yachting', 'Dragon Boat Racing', 'Curling',
      'Biathlon', 'Luge', 'Skeleton', 'Bobsleigh', 'Nordic Skiing', 'Alpine Skiing',
      'Freestyle Skiing', 'Snowboarding', 'Ice Hockey', 'Figure Skating', 'Speed Skating',
      
      // Hard - Adventure & Specialized Sports
      'Formula 1', 'MotoGP', 'Rally Racing', 'Drag Racing', 'NASCAR', 'IndyCar',
      'Rock Climbing', 'Mountaineering', 'Bungee Jumping', 'Skydiving', 'Paragliding', 'Hang Gliding',
      'Scuba Diving', 'Snorkeling', 'Deep Sea Diving', 'Cave Diving', 'Ice Diving',
      'Free Diving', 'Spear Fishing', 'Underwater Hockey', 'Underwater Rugby',
      'Extreme Ironing', 'Quidditch', 'Bossaball', 'Footvolley', 'Teqball', 'Spikeball',
      'Disc Golf', 'Frisbee', 'Boomerang Throwing', 'Knife Throwing', 'Axe Throwing',
      'Log Rolling', 'Tug of War', 'Cabers', 'Hammer Throw', 'Discus Throw', 'Javelin Throw',
      'Pole Vault', 'High Jump', 'Long Jump', 'Triple Jump', 'Hurdles', 'Steeplechase',
      
      // Traditional & Cultural Sports
      'Gilli Danda', 'Lattu', 'Pithu', 'Kancha', 'Lagori', 'Atya Patya', 'Langdi',
      'Malkhamb', 'Thoda', 'Jallikattu', 'Bull Racing', 'Boat Racing', 'Mukna',
      'Kalaripayattu', 'Silambam', 'Mallakhamb', 'Thang Ta', 'Huyen Langvon', 'Muay Thai',
      'Capoeira', 'Krav Maga', 'Aikido', 'Kendo', 'Iaido', 'Jodo', 'Naginata',
      'Sumo Wrestling', 'Arm Wrestling', 'Oil Wrestling', 'Greco-Roman Wrestling',
      'Freestyle Wrestling', 'Beach Wrestling', 'Sambo', 'Jujutsu', 'Hapkido',
      
      // Fitness & Combat Sports
      'MMA', 'Kickboxing', 'Muay Thai', 'Capoeira', 'Krav Maga', 'Aikido', 'Kendo',
      'Sumo Wrestling', 'Arm Wrestling', 'Fencing', 'Fencing', 'Sword Fighting', 'Tai Chi',
      'Qigong', 'Pilates', 'Aerobics', 'Zumba', 'Jazzercise', 'Step Aerobics',
      'Spinning', 'Boot Camp', 'Insanity', 'P90X', 'Beachbody', 'CrossFit Games',
      'Olympic Weightlifting', 'Powerlifting', 'Strongman', 'Highland Games',
      'Armwrestling', 'Thumb Wrestling', 'Rock Paper Scissors', 'Tug of War',
      
      // Team & Ball Sports
      'Handball', 'Netball', 'Sepak Takraw', 'Tchoukball', 'Bossaball', 'Beach Volleyball',
      'Futsal', 'Street Hockey', 'Roller Hockey', 'Underwater Hockey', 'Broomball', 'Floorball',
      'Ringette', 'Sledge Hockey', 'Powerchair Football', 'Wheelchair Basketball',
      'Wheelchair Rugby', 'Goalball', 'Torball', 'Beep Baseball', 'Showdown',
      'Test Cricket', 'ODI', 'T20', 'IPL', 'BPL', 'PSL', 'BBL',
      'CPL', 'WBBL', 'WT20', 'World Cup', 'Ashes', 'Ranji Trophy', 'Duleep Trophy'
    ],

movies: [
      // Easy - Bollywood Blockbusters
      'Dangal', 'Bahubali', 'RRR', '3 Idiots', 'PK', 'Bajrangi Bhaijaan', 'Sultan',
      'Dhoom', 'Kick', 'Chennai Express', 'Krrish', 'Om Shanti Om', 'Maine Pyar Kiya',
      'Hum Aapke Hain Koun', 'Dilwale Dulhania Le Jayenge', 'Kuch Kuch Hota Hai', 'Kabhi Khushi Kabhie Gham',
      'Dil Se', 'Raja Hindustani', 'Border', 'LOC Kargil', 'Gadar', 'Shabaash Mithu',
      'Azhar', 'M.S. Dhoni', '83', 'Jersey', 'The Zoya Factor',
      
      // Easy - Kollywood Blockbusters
      'Baahubali', '2.0', 'Vikram', 'Ponniyin Selvan', 'Master', 'Kaathi', 'Jai Bhim',
      'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal',
      'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog',
      'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal',
      'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog',
      'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal',
      
      // Easy - Hollywood Popular
      'Avatar', 'Titanic', 'The Avengers', 'Star Wars', 'Frozen', 'Joker', 'Parasite',
      'Black Panther', 'Wonder Woman', 'Spider-Man', 'Batman', 'Iron Man', 'Thor',
      'Harry Potter', 'Lord of the Rings', 'The Lion King', 'Toy Story', 'Finding Nemo',
      'Shrek', 'Minions', 'The Incredibles', 'Up', 'Wall-E', 'Ratatouille',
      'Moana', 'Coco', 'Zootopia', 'Inside Out', 'Soul', 'Luca', 'Turning Red',
      'Lightyear', 'The Little Mermaid', 'Beauty and the Beast', 'Aladdin', 'The Jungle Book',
      
      // Medium - Bollywood Classics & Recent
      'Lagaan', 'Gadar', 'Gully Boy', 'Uri', 'War', 'Tanhaji', 'Thugs of Hindostan',
      'Sanju', 'Raazi', 'Neerja', 'Airlift', 'Bhaag Milkha Bhaag', 'Mary Kom',
      'Paan Singh Tomar', 'Kahaani', 'Vicky Donor', 'Barfi', 'Piku', 'English Vinglish',
      'Taare Zameen Par', 'Chak De India', 'Bhaag Milkha Bhaag', 'MS Dhoni', '83',
      'The Kashmir Files', 'The Kerala Story', 'Gadar 2', 'Jawan', 'Pathaan', 'Tiger 3',
      'Animal', 'Dunki', 'Salaam Venky', 'Zindagi Na Milegi Dobara', 'Wake Up Sid',
      'Love Sex Aur Dhokha', 'Udaan', 'Shaitaan', 'Khosla Ka Ghosla', 'Oye Lucky! Lucky Oye',
      'Hate Story', 'Ragini MMS', '1920', 'Raaz', 'Murder', 'Jism', 'Murder', 'Jism 2',
      
      // Medium - Kollywood Classics & Recent
      'Kantara', 'KGF', 'Pushpa', 'RRR', 'Mahanati', 'Sairat', 'Fidaa', 'Arjun Reddy',
      'Malli Raava', 'Jersey', 'Eega', 'Magadheera', 'Anniyan', 'Vikram Vedha', 'Kaithi',
      'Asuran', 'Super Deluxe', 'Vikram', 'Putham Pudhu Kaalai', 'Sita Ramam', 'RRR',
      'RRR', 'Major', 'Jathi Ratnalu', 'Coffee with Kadhal', 'Oh My Dog', 'Master',
      'Kaathi', 'Jai Bhim', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal',
      'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog',
      
      // Medium - Hollywood Classics
      'The Godfather', 'Pulp Fiction', 'The Shawshank Redemption', 'Forrest Gump', 'Inception',
      'The Matrix', 'Gladiator', 'Terminator', 'Alien', 'Predator', 'Jaws', 'E.T.',
      'Pirates of the Caribbean', 'Transformers', 'Fast & Furious', 'Mission Impossible',
      'James Bond', 'Rocky', 'Rambo', 'Deadpool', 'Guardians of the Galaxy',
      'Aquaman', 'Shazam', 'Venom', 'Kung Fu Panda', 'Madagascar', 'Despicable Me',
      'Ice Age', 'Rio', 'How to Train Your Dragon', 'Tangled', 'Brave', 'Big Hero 6',
      
      // Hard - Regional Cinema
      'Kantara', 'KGF', 'Pushpa', 'RRR', 'Baahubali', 'Mahanati', 'Sairat',
      'Fidaa', 'Arjun Reddy', 'Malli Raava', 'Jersey', 'Eega', 'Magadheera',
      'Anniyan', 'Vikram Vedha', 'Kaithi', 'Asuran', 'Super Deluxe', 'Vikram',
      'Putham Pudhu Kaalai', 'Sita Ramam', 'RRR', 'RRR', 'Major', 'Jathi Ratnalu',
      'Sillu Karuppatti', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal',
      'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog',
      'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal', 'Oh My Dog', 'Coffee with Kadhal',
      
      // Hard - International Cinema
      'Parasite', 'The Handmaiden', 'Oldboy', 'Train to Busan', 'The Wailing',
      'Rashomon', 'Seven Samurai', 'Tokyo Story', 'Ugetsu', 'Yojimbo',
      'Amores Perros', 'Y Tu Mamá También', 'Pan\'s Labyrinth', 'The Shape of Water',
      'Amélie', 'The Intouchables', 'La Haine', 'Breathless', 'The 400 Blows',
      'Cinema Paradiso', 'Life is Beautiful', 'The Bicycle Thief', '8½', 'La Dolce Vita',
      'Andrei Rublev', 'Solaris', 'Stalker', 'The Mirror', 'Ivan\'s Childhood',
      'Wings of Desire', 'Run Lola Run', 'Good Bye Lenin!', 'The Lives of Others',
      
      // Classic Indian Cinema
      'Mother India', 'Mughal-e-Azam', 'Sholay', 'Deewar', 'Zanjeer', 'Don',
      'Sholay', 'Anand', 'Abhimaan', 'Guddi', 'Upkar', 'Purab Aur Paschim',
      'Guide', 'Sahib Bibi Aur Ghulam', 'Kaagaz Ke Phool', 'Madhumati', 'Chaudhvin Ka Chand',
      'Pyaasa', 'Kagaz Ke Phool', 'Sujata', 'Parakh', 'Dhool Ka Phool', 'Naya Daur',
      'Do Bigha Zamin', 'Pather Panchali', 'Aparajito', 'The World of Apu', 'Charulata',
      
      // Contemporary Indie Films
      'The Lunchbox', 'Barfi', 'Vicky Donor', 'Shahid', 'Court', 'Newton', 'Gangs of Wasseypur',
      'Delhi Belly', 'Vicky Donor', 'Kai Po Che', 'Zindagi Na Milegi Dobara', 'Wake Up Sid',
      'Love Sex Aur Dhokha', 'Udaan', 'Shaitaan', 'Khosla Ka Ghosla', 'Oye Lucky! Lucky Oye',
      'Hate Story', 'Ragini MMS', '1920', 'Raaz', 'Murder', 'Jism', 'Murder', 'Jism 2',
      'Ragini MMS 2', 'Alone', 'Phone Bhoot', 'Lust Stories', 'Sacred Games', 'Mirzapur',
      
      // Animation & Family
      'Mulan', 'Moana', 'Coco', 'Zootopia', 'Frozen 2', 'Toy Story 4', 'Incredibles 2',
      'Finding Dory', 'Inside Out', 'Soul', 'Luca', 'Turning Red', 'Lightyear',
      'The Little Mermaid', 'Beauty and the Beast', 'Aladdin', 'The Jungle Book', 'Cinderella',
      'The Princess and the Frog', 'Tangled', 'Brave', 'Big Hero 6', 'Wreck-It Ralph',
      'Ralph Breaks the Internet', 'Onward', 'Jungle Cruise', 'The Mitchells vs. the Machines',
      
      // Action & Thriller
      'John Wick', 'The Dark Knight', 'The Raid', 'The Night Comes for Us', 'The Man from Nowhere',
      'Oldboy', 'The Handmaiden', 'The Wailing', 'Train to Busan', 'Peninsula', 'The Outlaws',
      'Dhoom 2', 'War', 'Ek Tha Tiger', 'Tiger Zinda Hai', 'War', 'Pathaan',
      'Jawan', 'Tiger 3', 'Animal', 'KGF Chapter 2', 'Pushpa: The Rise', 'Pushpa: The Rule',
      'Salaam Venky', 'Dunki', 'Animal', 'Jawan', 'Pathaan', 'Tiger 3', 'War 2'
    ],

    animals: [
      // Easy - Common Pets & Farm Animals
      'Dog', 'Cat', 'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Monkey',
      'Gorilla', 'Panda', 'Bear', 'Wolf', 'Fox', 'Rabbit', 'Squirrel',
      'Deer', 'Moose', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Chicken',
      'Duck', 'Goose', 'Penguin', 'Owl', 'Eagle', 'Hawk', 'Parrot',
      'Goldfish', 'Hamster', 'Guinea Pig', 'Ferret', 'Hedgehog', 'Chinchilla',
      'Budgie', 'Canary', 'Lovebird', 'Cockatiel', 'African Grey', 'Macaw',
      
      // Medium - Wild Animals & Birds
      'Flamingo', 'Peacock', 'Swan', 'Dolphin', 'Whale', 'Shark', 'Octopus',
      'Jellyfish', 'Starfish', 'Crab', 'Lobster', 'Turtle', 'Crocodile',
      'Alligator', 'Snake', 'Lizard', 'Frog', 'Butterfly', 'Bee', 'Ant',
      'Spider', 'Ladybug', 'Dragonfly', 'Kangaroo', 'Koala', 'Platypus',
      'Wombat', 'Tasmanian Devil', 'Quokka', 'Wallaby', 'Echidna', 'Sugar Glider',
      'Meerkat', 'Fennec Fox', 'Red Panda', 'Sloth', 'Armadillo', 'Pangolin',
      'Okapi', 'Aardvark', 'Pangolin', 'Narwhal', 'Beluga Whale', 'Orca',
      
      // Hard - Exotic & Endangered Animals
      'Komodo Dragon', 'Saltwater Crocodile', 'Giant Squid', 'Colossal Squid',
      'Giant Pacific Octopus', 'Blue Whale', 'Sperm Whale', 'Humpback Whale',
      'Fin Whale', 'Bowhead Whale', 'Right Whale', 'Sei Whale', 'Minke Whale',
      'Vaquita', 'Saola', 'Bermuda Petrel', 'Chacoan Peccary', 'Platypus',
      'Takahe', 'Bermuda Petrel', 'Chacoan Peccary', 'Giant Panda', 'Snow Leopard',
      'Amur Leopard', 'Javan Rhino', 'Sumatran Rhino', 'Black Rhino', 'White Rhino',
      'Mountain Gorilla', 'Cross River Gorilla', 'Bornean Orangutan', 'Sumatran Orangutan',
      'Tapanuli Orangutan', 'Indus River Dolphin', 'Ganges River Dolphin', 'Irawaddy Dolphin',
      'Hawksbill Sea Turtle', 'Leatherback Sea Turtle', 'Loggerhead Sea Turtle', 'Green Sea Turtle',
      'Olive Ridley Sea Turtle', 'Yangtze Finless Porpoise', 'Baiji', 'Vaquita'
    ],

    places: [
      // Easy - Famous Cities & Countries
      'Paris', 'London', 'New York', 'Tokyo', 'Rome', 'Dubai', 'Sydney',
      'Barcelona', 'Amsterdam', 'Venice', 'Hawaii', 'Bali', 'Maldives',
      'Iceland', 'Greece', 'Egypt', 'China', 'India', 'Brazil', 'Mexico',
      'Canada', 'Australia', 'Germany', 'Italy', 'Spain', 'France', 'Japan',
      'South Korea', 'Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'Vietnam',
      'Philippines', 'Hong Kong', 'Taiwan', 'Switzerland', 'Austria', 'Netherlands',
      
      // Medium - Natural Places & Landmarks
      'Beach', 'Mountain', 'Desert', 'Forest', 'Lake', 'River', 'Ocean',
      'Island', 'Volcano', 'Canyon', 'Waterfall', 'Cave', 'Jungle',
      'Savanna', 'Tundra', 'Glacier', 'Park', 'Zoo', 'Museum', 'Library',
      'Theater', 'Stadium', 'Mall', 'Restaurant', 'Cafe', 'Hotel',
      'Airport', 'Train Station', 'Hospital', 'School', 'University',
      'Temple', 'Church', 'Mosque', 'Castle', 'Palace', 'Monument', 'Statue',
      'Bridge', 'Tower', 'Skyscraper', 'Market', 'Bazaar', 'Shopping Center',
      
      // Hard - Indian Cities & Places
      'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune',
      'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore',
      'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
      'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot',
      'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad',
      'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur',
      'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati',
      'Chandigarh', 'Solapur', 'Hubballi-Dharwad', 'Bareilly', 'Moradabad', 'Mysore',
      'Gurgaon', 'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem',
      'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Bikaner',
      'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad', 'Kochi',
      'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Rourkela',
      'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain',
      'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli-Miraj', 'Mangalore',
      'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Tiruppur',
      'Davanagere', 'Kozhikode', 'Akola', 'Kurnool', 'Bokaro Steel City', 'Rajahmundry',
      'Ballari', 'Agartala', 'Bhagalpur', 'Latur', 'Dhule', 'Korba', 'Bhilwara',
      'Brahmapur', 'Mysore', 'Muzaffarpur', 'Ahmednagar', 'Kollam', 'Raghunathganj',
      'Bilaspur', 'Shahjahanpur', 'Thrissur', 'Alwar', 'Kakinada', 'Nizamabad',
      'Parbhani', 'Tumkur', 'Khammam', 'Ozhukarai', 'Bihar Sharif', 'Panipat',
      'Darbhanga', 'Bally', 'Aizawl', 'Dewas', 'Ichalkaranji', 'Karnal', 'Bathinda',
      'Jalna', 'Eluru', 'Kirari Suleman Nagar', 'Barasat', 'Purnia', 'Satna',
      'Mau', 'Sonipat', 'Farrukhabad', 'Sagar', 'Rourkela', 'Durg', 'Imphal',
      'Ratlam', 'Hapur', 'Arrah', 'Karimnagar', 'Anantapur', 'Etawah', 'Ambernath',
      'North Dumdum', 'Bharatpur', 'Begusarai', 'New Delhi', 'Gandhinagar', 'Kavali'
    ],

    music: [
      // Easy - Instruments & Basic Terms
      'Guitar', 'Piano', 'Drums', 'Violin', 'Flute', 'Saxophone', 'Trumpet',
      'Cello', 'Harp', 'Accordion', 'Harmonica', 'Ukulele', 'Banjo',
      'Microphone', 'DJ', 'Concert', 'Festival', 'Orchestra', 'Band',
      'Singer', 'Rapper', 'Dancer', 'Rock', 'Pop', 'Jazz', 'Blues',
      'Country', 'Hip Hop', 'Classical', 'Opera', 'Reggae', 'Disco',
      'Techno', 'House', 'EDM', 'Headphones', 'Speaker', 'Radio',
      'Karaoke', 'Music Video', 'Album', 'Playlist', 'Lyrics', 'Melody',
      'Rhythm', 'Beat', 'Chorus', 'Verse', 'Symphony', 'Ballad',
      
      // Medium - Indian Music & Artists
      'Tabla', 'Sitar', 'Sarod', 'Veena', 'Mridangam', 'Ghatam', 'KanJira',
      'Carnatic', 'Hindustani', 'Bharatanatyam', 'Kathakali', 'Kuchipudi', 'Odissi',
      'Raga', 'Tala', 'Swara', 'Alap', 'Jor', 'Jhala', 'Gamakam', 'Kampitam',
      'A.R. Rahman', 'Ilaiyaraaja', 'M.S. Viswanathan', 'K.V. Mahadevan', 'R.D. Burman',
      'Lata Mangeshkar', 'Asha Bhosle', 'Kishore Kumar', 'Mohammed Rafi', 'Mukesh',
      'Hemant Kumar', 'Geeta Dutt', 'Shamshad Begum', 'Suraiya', 'Noor Jehan',
      'K.L. Saigal', 'Talat Mahmood', 'Manna Dey', 'Bhupinder Singh', 'S.D. Burman',
      
      // Hard - International Music & Advanced Terms
      'Counterpoint', 'Polyphony', 'Monophony', 'Homophony', 'Heterophony',
      'Serialism', 'Aleatoric', 'Microtonal', 'Spectral', 'Minimalism',
      'Beethoven', 'Mozart', 'Bach', 'Chopin', 'Debussy', 'Stravinsky', 'Bartók',
      'Schoenberg', 'Berg', 'Webern', 'Messiaen', 'Boulez', 'Stockhausen', 'Cage',
      'Miles Davis', 'John Coltrane', 'Charlie Parker', 'Louis Armstrong', 'Duke Ellington',
      'Thelonious Monk', 'Bill Evans', 'Herbie Hancock', 'Chick Corea', 'Keith Jarrett',
      'Bob Dylan', 'Joan Baez', 'Woody Guthrie', 'Pete Seeger', 'Arlo Guthrie',
      'Led Zeppelin', 'Pink Floyd', 'The Beatles', 'Rolling Stones', 'Queen', 'AC/DC',
      'Michael Jackson', 'Madonna', 'Prince', 'David Bowie', 'Elvis Presley',
      'Whitney Houston', 'Aretha Franklin', 'Ray Charles', 'Stevie Wonder', 'Marvin Gaye',
      'Bob Marley', 'Peter Tosh', 'Bunny Wailer', 'Toots Hibbert', 'Black Uhuru',
      'Fela Kuti', 'Afrobeat', 'Highlife', 'Juju', 'Palm Wine', 'Soukous',
      'Rai', 'Chaabi', 'Gnawa', 'Andalusian', 'Flamenco', 'Salsa', 'Merengue',
      'Cumbia', 'Tango', 'Bossa Nova', 'Samba', 'Forró', 'Frevo', 'Maracatu',
      'Reggaeton', 'Bachata', 'Zouk', 'Compas', 'Kadans', 'Rumba', 'Son',
      'Bolero', 'Mambo', 'Chachacha', 'Guaracha', 'Punto', 'Tamborera'
    ],

    general: [
      // Easy - Daily Activities & Emotions
      'Birthday', 'Wedding', 'Party', 'Vacation', 'Camping', 'Picnic',
      'Shopping', 'Cooking', 'Baking', 'Reading', 'Writing', 'Drawing',
      'Painting', 'Photography', 'Gardening', 'Hiking', 'Jogging', 'Meditation',
      'Sleep', 'Dreaming', 'Laughing', 'Crying', 'Singing', 'Dancing',
      'Clapping', 'Waving', 'Hugging', 'Handshake', 'High Five',
      'Selfie', 'Video Call', 'Texting', 'Email', 'Internet', 'Computer',
      'Phone', 'Tablet', 'Television', 'Camera', 'Watch', 'Glasses',
      'Umbrella', 'Backpack', 'Wallet', 'Keys', 'Money', 'Credit Card',
      'Passport', 'Ticket', 'Map', 'Compass', 'Clock', 'Calendar',
      'Mirror', 'Soap', 'Shampoo', 'Toothbrush', 'Towel', 'Pillow', 'Blanket',
      
      // Medium - Social & Professional Activities
      'Meeting', 'Interview', 'Presentation', 'Conference', 'Seminar', 'Workshop',
      'Training', 'Class', 'Lecture', 'Exam', 'Test', 'Quiz', 'Homework',
      'Project', 'Assignment', 'Report', 'Essay', 'Thesis', 'Research', 'Study',
      'Library', 'Bookstore', 'Coffee Shop', 'Restaurant', 'Bar', 'Club', 'Cinema',
      'Theater', 'Concert', 'Festival', 'Fair', 'Exhibition', 'Museum', 'Gallery',
      'Park', 'Garden', 'Beach', 'Mountain', 'Lake', 'River', 'Forest', 'Desert',
      'City', 'Town', 'Village', 'Street', 'Road', 'Highway', 'Bridge', 'Tunnel',
      'Building', 'House', 'Apartment', 'Office', 'Factory', 'Shop', 'Market', 'Mall',
      
      // Hard - Abstract Concepts & Advanced Terms
      'Democracy', 'Monarchy', 'Republic', 'Dictatorship', 'Communism', 'Socialism',
      'Capitalism', 'Liberalism', 'Conservatism', 'Feminism', 'Patriotism', 'Nationalism',
      'Globalization', 'Modernization', 'Industrialization', 'Urbanization', 'Digitalization',
      'Sustainability', 'Environment', 'Ecology', 'Biodiversity', 'Climate Change',
      'Global Warming', 'Pollution', 'Recycling', 'Conservation', 'Preservation',
      'Innovation', 'Invention', 'Discovery', 'Exploration', 'Adventure', 'Journey',
      'Quest', 'Mission', 'Goal', 'Objective', 'Target', 'Aim', 'Purpose', 'Intention',
      'Motivation', 'Inspiration', 'Creativity', 'Imagination', 'Fantasy', 'Reality',
      'Truth', 'Lie', 'Honesty', 'Integrity', 'Trust', 'Faith', 'Hope', 'Love',
      'Hate', 'Fear', 'Courage', 'Bravery', 'Strength', 'Weakness', 'Power', 'Control',
      'Freedom', 'Liberty', 'Justice', 'Equality', 'Rights', 'Duties', 'Responsibilities',
      'Ethics', 'Morality', 'Values', 'Principles', 'Beliefs', 'Religion', 'Spirituality',
      'Philosophy', 'Psychology', 'Sociology', 'Anthropology', 'History', 'Geography',
      'Science', 'Technology', 'Mathematics', 'Literature', 'Art', 'Music', 'Dance',
      'Theater', 'Film', 'Television', 'Radio', 'Newspaper', 'Magazine', 'Book',
      'Internet', 'Social Media', 'Communication', 'Language', 'Culture', 'Tradition',
      'Custom', 'Habit', 'Routine', 'Schedule', 'Time Management', 'Productivity',
      'Efficiency', 'Effectiveness', 'Quality', 'Quantity', 'Success', 'Failure',
      'Achievement', 'Progress', 'Development', 'Growth', 'Change', 'Transformation'
    ]
  },

  ta: {
    // Tamil word lists taken from Multilingual-Design.md
    food: [
      // Easy - Common Tamil Foods
      'பிட்சா', 'பர்கர்', 'இட்லி', 'தோசை', 'சாதம்', 'பிரியாணி', 'சப்பாத்தி', 'பரோட்டா', 'வடை', 'போண்டா',
      'சமோசா', 'இனிப்பு', 'ஐஸ்கிரீம்', 'லட்டு', 'ஜிலேபி', 'கேக்', 'காபி', 'டீ', 'சாக்லேட்', 'குக்கீ',
      'புளிசாதம்', 'தயிர்சாதம்', 'பொங்கல்', 'உப்புமா', 'கிச்சடி', 'பாயசம்', 'மைசூர்பாகு', 'அடை',
      'அப்பளம்', 'பக்கோடா', 'ஊத்தப்பம்', 'பணியாரம்', 'முறுக்கு', 'நெய்அப்பம்', 'பஜ்ஜி', 'வடா',
      'ரசம்', 'சாம்பார்', 'குழம்பு', 'கூட்டு', 'பொரியல்', 'கீரை', 'பச்சடி', 'கோசு', 'மசாலா',
      'பணியாரம்', 'கொழுக்கட்டை', 'அதிரசம்', 'குடுமி', 'உளுந்து', 'பருப்பு', 'கடலை', 'கீரை',
      
      // Medium - Regional Tamil Dishes
      'சென்னை சமையல்', 'தஞ்சாவூர் உணவு', 'மதுரை உணவு', 'கோயம்புத்தூர் உணவு', 'திருநெல்வேலி உணவு',
      'கன்னியாகுமரி உணவு', 'காஞ்சிபுரம் உணவு', 'வேலூர் உணவு', 'திருப்பூர் உணவு', 'சேலம் உணவு',
      'ஈரோடு உணவு', 'திருச்சி உணவு', 'கரூர் உணவு', 'பெரம்பலூர் உணவு', 'நாமக்கல் உணவு',
      'தர்மபுரி உணவு', 'கிருஷ்ணகிரி உணவு', 'அரியலூர் உணவு', 'திண்டுக்கல் உணவு', 'கரூர் உணவு',
      'புதுக்கோட்டை உணவு', 'சிவகங்கை உணவு', 'ராமநாதபுரம் உணவு', 'விருதுநகர் உணவு', 'தேனி உணவு',
      'மதுரை உணவு', 'தென்காசி உணவு', 'தூத்துக்குடி உணவு', 'திருநெல்வேலி உணவு', 'கன்னியாகுமரி உணவு',
      'நாகர்கோவில் உணவு', 'கும்பகோணம் உணவு', 'மயிலாடுதுறை உணவு', 'நாகப்பட்டினம் உணவு', 'தஞ்சாவூர் உணவு',
      'திருவாரூர் உணவு', 'நாகை உணவு', 'மயிலாடுதுறை உணவு', 'காரைக்கால் உணவு', 'புதுச்சேரி உணவு',
      
      // Hard - Traditional Tamil Sweets & Specialties
      'அதிரசம்', 'கொழுக்கட்டை', 'பணியாரம்', 'முறுக்கு', 'நெய்அப்பம்', 'உளுந்து வடை', 'பருப்பு வடை',
      'கடலை வடை', 'கீரை வடை', 'பொரியல்', 'கோசு', 'பச்சடி', 'குழம்பு', 'கூட்டு', 'சாம்பார்',
      'ரசம்', 'புளிசாதம்', 'தயிர்சாதம்', 'பொங்கல்', 'உப்புமா', 'கிச்சடி', 'பாயசம்', 'மைசூர்பாகு',
      'அடை', 'அப்பளம்', 'பக்கோடா', 'ஊத்தப்பம்', 'பஜ்ஜி', 'வடா', 'சமோசா', 'இனிப்பு',
      'ஐஸ்கிரீம்', 'லட்டு', 'ஜிலேபி', 'கேக்', 'காபி', 'டீ', 'சாக்லேட்', 'குக்கீ',
      'பிட்சா', 'பர்கர்', 'நூடுல்ஸ்', 'பாஸ்தா', 'சாண்ட்விச்', 'பர்கர்', 'பிரெட்', 'பட்டர்',
      'சீஸ்', 'மில்க்', 'யோகர்ட்', 'க்ரீம்', 'ஐஸ்', 'சர்க்கரை', 'உப்பு', 'மசாலா', 'மிளகு',
      'கர்ப்பூரம்', 'கற்பூரம்', 'வெந்தயம்', 'சீரகம்', 'கொத்தமல்லி', 'புதினா', 'கற்பூரவல்லி',
      'துளசி', 'கரிசலாங்கண்ணி', 'முருங்கை', 'பாகற்காய்', 'பீர்க்கங்காய்', 'வாழைக்காய்', 'முலாம்பழம்',
      'பலாப்பழம்', 'மாம்பழம்', 'சப்போட்டா', 'கீரை', 'முளைக்கீரை', 'பொன்னாங்கண்ணி', 'முளை'
    ],

    sports: [
      // Easy - Popular Sports in Tamil Nadu
      'கிரிக்கெட்', 'கால்பந்து', 'கூடைப்பந்து', 'டென்னிஸ்', 'பேட்மிண்டன்', 'ஹாக்கி', 'ஓட்டம்', 'நீச்சல்', 'கபடி', 'சதுரங்கம்',
      'வாலிபால்', 'கைப்பந்து', 'மல்யுத்தம்', 'குத்துச்சண்டை', 'வில்வித்தை', 'எறிபந்தாட்டம்', 'ஜூடோ',
      'கராத்தே', 'யோகா', 'ஜிம்', 'சைக்கிள்', 'மலையேற்றம்', 'கோல்ஃப்', 'பிலியர்ட்ஸ்', 'போலோ',
      'பந்தயம்', 'ஸ்கேட்டிங்', 'சர்ஃபிங்', 'நீர்வீழ்ச்சி', 'பாராசூட்', 'ஹைகிங்', 'நடைபயிற்சி',
      'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி',
      
      // Medium - Traditional Tamil Sports
      'சிலம்பாட்டம்', 'காலரிப்பயத்தியல்', 'மல்லகம்பம்', 'வல்வெட்டி', 'எருமைப் பந்தயம்', 'குதிரைப் பந்தயம்',
      'மாட்டுப் பந்தயம்', 'படகுப் பந்தயம்', 'கைக்கோளாட்டம்', 'பொம்மலாட்டம்', 'கும்மி', 'கரகாட்டம்',
      'பாம்பாட்டி', 'தெருக்கூத்து', 'நாட்டியம்', 'பரதநாட்டியம்', 'கதகளி', 'குச்சிப்புடி', 'ஒயிலாட்டம்',
      'தப்பாட்டம்', 'கரகம்', 'லட்டு', 'பித்து', 'காஞ்சா', 'லகோரி', 'அட்டியபட்டி', 'லாங்டி',
      'மல்லகம்பம்', 'தோடா', 'ஜல்லிக்கட்டு', 'எருமைப் பந்தயம்', 'படகுப் பந்தயம்', 'முக்னா',
      'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி',
      
      // Hard - International Sports with Tamil Context
      'ஃபார்முலா ஒன்', 'மோட்டோ ஜிபி', 'ராலி ரேசிங்', 'டிராக் ரேசிங்', 'நாஸ்கார்', 'இண்டிகார்',
      'பாறை ஏறுதல்', 'மலை ஏறுதல்', 'பங்கி ஜம்பிங்', 'வான்வழி தாவுதல்', 'பாராகிளைடிங்', 'ஹாங் கிளைடிங்',
      'ஸ்கூபா டைவிங்', 'ஸ்னார்கெல்லிங்', 'ஆழ்கடல் டைவிங்', 'கேவ் டைவிங்', 'ஐஸ் டைவிங்',
      'ஃப்ரீ டைவிங்', 'ஸ்பியார் ஃபிஷிங்', 'அண்டர்வாட்டர் ஹாக்கி', 'அண்டர்வாட்டர் ரக்பி',
      'எக்ஸ்ட்ரீம் ஐர்னிங்', 'குவிடிட்ச்', 'பாஸ்ஸபால்', 'ஃபுட்வால்லே', 'டெக்பால்', 'ஸ்பைக்பால்',
      'டிஸ்க் கோல்ஃப்', 'ஃபிரிஸ்பீ', 'பூமராங் எறிதல்', 'கத்தி எறிதல்', 'கோடரி எறிதல்',
      'லாக் ரோலிங்', 'டக் ஆஃப் வார்', 'கேபர்ஸ்', 'ஹாமர் த்ரோ', 'டிஸ்கஸ் த்ரோ', 'ஜாவலின் த்ரோ',
      'போல் வால்ட்', 'ஹை ஜம்ப்', 'லாங் ஜம்ப்', 'டிரிபிள் ஜம்ப்', 'ஹர்டில்ஸ்', 'ஸ்டீப்பிள்சேஸ்',
      'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி'
    ],

    movies: [
      // Easy - Popular Tamil Movies
      'பாகுபலி', '2.0', 'விக்ரம்', 'பொன்னியின் செல்வன்', 'மாஸ்டர்', 'காதி', 'ஜெய்பீம்',
      'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்',
      'ஓ மை டாக்', 'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்', 'ஓ மை டாக்',
      'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்',
      'ஓ மை டாக்', 'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்', 'ஓ மை டாக்',
      'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்', 'ஓ மை டாக்', 'காஃபி வித் காதல்',
      
      // Medium - Classic Tamil Movies
      'காந்தன்', '2.0', 'ரோபோ', 'எந்தன்', 'தங்கமகன்', 'விஸ்வாசம்', 'அஜீத்', 'விஜய்', 'ரஜினி', 'கமல்',
      'அனிருத்', 'இளையராஜா', 'விக்ரம்', 'சூர்யா', 'தனுஷ்', 'சிவகார்த்திகேயன்', 'ஜெயம்ரவி', 'விஷ்ணு', 'கார்த்தி',
      'சிவாஜி', 'பாஷா', 'முதல்வன்', 'அந்நியன்', 'தசாவதாரம்', 'விருமாண்டி', 'தேவர்மகன்', 'நாயகன்',
      'தில்லானா', 'குதிரைவால்', 'காளா', 'கபாலி', 'பேட்ட', 'மெர்சல்', 'பிகில்', 'மாஸ்டர்',
      'விக்ரம்வேதா', 'ஜானா', 'ரோஜா', 'புதியவர்பூமி', 'காதலன்', 'இந்தியன்', 'முதலன்', 'அரசன்',
      'பார்த்திபன் கன்மூழி', 'சின்னத்தம்பி பெரியதம்பி', 'தம்பி', 'பொன்மகன்', 'நாட்டாமை', 'பொன்னியன் செல்வன்',
      
      // Hard - Regional Tamil Cinema
      'காந்தன்', 'மணிகண்டன்', 'பார்த்திபன் கன்மூழி', 'சின்னத்தம்பி பெரியதம்பி', 'தம்பி', 'நாட்டாமை', 'பொன்னியன் செல்வன்',
      'சூர்யவம்சம்', 'வால்மீகி', 'இராமானுஜன்', 'பேட்ட', 'மெர்சல்', 'பிகில்', 'மாஸ்டர்',
      'விக்ரம்வேதா', 'ஜானா', 'ரோஜா', 'புதியவர்பூமி', 'காதலன்', 'இந்தியன்', 'முதலன்', 'அரசன்',
      'தில்லானா', 'குதிரைவால்', 'காளா', 'எந்திரன்', 'ரோபோ', '2.0', 'எந்தன்', 'தங்கமகன்',
      'விஸ்வாசம்', 'அஜீத்', 'விஜய்', 'ரஜினி', 'கமல்', 'அனிருத்', 'இளையராஜா', 'விக்ரம்',
      'சூர்யா', 'தனுஷ்', 'சிவகார்த்திகேயன்', 'ஜெயம்ரவி', 'விஷ்ணு', 'கார்த்தி', 'சிவாஜி',
      'பாஷா', 'முதல்வன்', 'அந்நியன்', 'தசாவதாரம்', 'விருமாண்டி', 'தேவர்மகன்', 'நாயகன்', 'காந்தன்', 'மணிகண்டன்', 'பார்த்திபன் கன்மூழி', 'சின்னத்தம்பி பெரியதம்பி', 'தம்பி',
      'நாட்டாமை', 'பொன்னியன் செல்வன்', 'சூர்யவம்சம்', 'வால்மீகி', 'இராமானுஜன்'
    ],

    animals: [
      // Easy - Common Animals in Tamil
      'நாய்', 'பூனை', 'சிங்கம்', 'புலி', 'யானை', 'குதிரை', 'மாடு', 'ஆடு', 'கோழி', 'வாத்து',
      'கரடி', 'குரங்கு', 'கழுதை', 'ஒட்டகம்', 'மான்', 'முயல்', 'எலி', 'பன்றி', 'நரி', 'ஓநாய்',
      'ஜிராஃப்', 'வரிக்குதிரை', 'காண்டாமிருகம்', 'சிறுத்தை', 'சிங்கம்', 'பாண்டா', 'கங்காரு',
      'கொரில்லா', 'செம்பன்சி', 'டால்பின்', 'திமிங்கலம்', 'சுறா', 'ஆமை', 'முதலை', 'பாம்பு',
      'பல்லி', 'தவளை', 'தேனீ', 'பட்டாம்பூச்சி', 'எறும்பு', 'சிலந்தி', 'தேள்', 'கொசு', 'ஈ',
      'கடற்பாம்பு', 'நண்டு', 'இறால்', 'மீன்', 'கிளி', 'மயில்', 'காகம்', 'புறா', 'கழுகு',
      
      // Medium - Wild & Exotic Animals
      'புலி', 'சிங்கம்', 'யானை', 'கரடி', 'ஒட்டகம்', 'ஜிராஃப்', 'வரிக்குதிரை', 'காண்டாமிருகம்',
      'சிறுத்தை', 'பாண்டா', 'கங்காரு', 'கொரில்லா', 'செம்பன்சி', 'டால்பின்', 'திமிங்கலம்',
      'சுறா', 'ஆமை', 'முதலை', 'பாம்பு', 'பல்லி', 'தவளை', 'தேனீ', 'பட்டாம்பூச்சி',
      'எறும்பு', 'சிலந்தி', 'தேள்', 'கொசு', 'ஈ', 'கடற்பாம்பு', 'நண்டு', 'இறால்',
      'மீன்', 'கிளி', 'மயில்', 'காகம்', 'புறா', 'கழுகு', 'அணில்', 'கோவி', 'கொக்கு',
      'வாத்து', 'நாரை', 'பருந்து', 'கழுகு', 'கருடன்', 'அன்னம்', 'சேவல்', 'கோழி',
      
      // Hard - Rare & Endangered Animals
      'புலி', 'சிங்கம்', 'யானை', 'கரடி', 'ஒட்டகம்', 'ஜிராஃப்', 'வரிக்குதிரை', 'காண்டாமிருகம்',
      'சிறுத்தை', 'பாண்டா', 'கங்காரு', 'கொரில்லா', 'செம்பன்சி', 'டால்பின்', 'திமிங்கலம்',
      'சுறா', 'ஆமை', 'முதலை', 'பாம்பு', 'பல்லி', 'தவளை', 'தேனீ', 'பட்டாம்பூச்சி',
      'எறும்பு', 'சிலந்தி', 'தேள்', 'கொசு', 'ஈ', 'கடற்பாம்பு', 'நண்டு', 'இறால்',
      'மீன்', 'கிளி', 'மயில்', 'காகம்', 'புறா', 'கழுகு', 'அணில்', 'கோவி', 'கொக்கு',
      'வாத்து', 'நாரை', 'பருந்து', 'கழுகு', 'கருடன்', 'அன்னம்', 'சேவல்', 'கோழி',
      'கொண்டைக்கடத்தி', 'மயில்', 'தோகை', 'கழுகு', 'பருந்து', 'கருடன்', 'அன்னம்'
    ],

    places: [
      // Easy - Major Tamil Nadu Cities
      'சென்னை', 'மதுரை', 'கோயம்புத்தூர்', 'திருச்சி', 'தஞ்சாவூர்', 'திருநெல்வேலி', 'காஞ்சிபுரம்', 'திருப்பதி', 'ரமேஸ்வரம்', 'கன்னியாகுமரி',
      'சேலம்', 'ஈரோடு', 'வேலூர்', 'திருப்பூர்', 'நாகர்கோவில்', 'கும்பகோணம்', 'கரூர்', 'தூத்துக்குடி',
      'நெல்லை', 'மணலி', 'சிதம்பரம்', 'திருவண்ணாமலை', 'பாண்டிச்சேரி', 'மும்பை', 'டெல்லி', 'கொல்கத்தா',
      'பெங்களூர்', 'ஹைதராபாத்', 'அஹமதாபாத்', 'புனே', 'ஜெய்ப்பூர்', 'கோவா', 'கேரளா', 'கர்நாடகா',
      'ஆந்திரா', 'தெலுங்கானா', 'ஓடிசா', 'பீகார்', 'உத்தரப்பிரதேசம்', 'மகாராஷ்டிரா', 'குஜராத்',
      
      // Medium - Tamil Nadu Districts & Landmarks
      'கடற்கரை', 'மலை', 'காடு', 'நதி', 'ஏரி', 'கிணறு', 'குளம்', 'அருவி', 'தீவு', 'பள்ளத்தாக்கு',
      'திருப்பதி', 'பழனி', 'பழநி', 'மதுரை', 'மீனாட்சி அம்மன் கோவில்', 'திருச்செந்தூர்', 'ஸ்ரீரங்கம்',
      'திருவனந்தபுரம்', 'கன்னியாகுமரி', 'காப்பி', 'தேநீர்', 'மிளகு', 'கற்பூரம்', 'வெந்தயம்', 'சீரகம்',
      'கொத்தமல்லி', 'புதினா', 'கற்பூரவல்லி', 'துளசி', 'கரிசலாங்கண்ணி', 'முருங்கை', 'பாகற்காய்',
      'பீர்க்கங்காய்', 'வாழைக்காய்', 'முலாம்பழம்', 'பலாப்பழம்', 'மாம்பழம்', 'சப்போட்டா', 'கீரை',
      
      // Hard - Historical & Cultural Places
      'திருப்பதி', 'பழனி', 'பழநி', 'மதுரை', 'மீனாட்சி அம்மன் கோவில்', 'திருச்செந்தூர்', 'ஸ்ரீரங்கம்',
      'திருவனந்தபுரம்', 'கன்னியாகுமரி', 'காப்பி', 'தேநீர்', 'மிளகு', 'கற்பூரம்', 'வெந்தயம்', 'சீரகம்',
      'கொத்தமல்லி', 'புதினா', 'கற்பூரவல்லி', 'துளசி', 'கரிசலாங்கண்ணி', 'முருங்கை', 'பாகற்காய்',
      'பீர்க்கங்காய்', 'வாழைக்காய்', 'முலாம்பழம்', 'பலாப்பழம்', 'மாம்பழம்', 'சப்போட்டா', 'கீரை',
      'முளைக்கீரை', 'பொன்னாங்கண்ணி', 'முளை', 'கீரை', 'முளைக்கீரை', 'பொன்னாங்கண்ணி', 'முளை',
      'கீரை', 'முளைக்கீரை', 'பொன்னாங்கண்ணி', 'முளை', 'கீரை', 'முளைக்கீரை', 'பொன்னாங்கண்ணி', 'முளை'
    ],

    music: [
      // Easy - Tamil Music Instruments & Basics
      'கிட்டார்', 'வயலின்', 'வீணை', 'மிருதங்கம்', 'தவில்', 'நாதஸ்வரம்', 'கடம்', 'டோலக்', 'பெரியமேளம்',
      'ஹார்மோனியம்', 'புல்லாங்குழல்', 'உடுக்கு', 'தம்புரா', 'சித்தார்', 'பாண்டோ', 'தபலா',
      'கச்சேரி', 'பாடல்', 'இசை', 'ராகம்', 'தாளம்', 'கீர்த்தனை', 'கருநாடக', 'திரைப்படம்', 'கானா',
      'பாரம்பரிய', 'நாட்டுப்புற', 'கோவில்', 'பக்தி', 'குத்து', 'கும்மி', 'தப்பாட்டம்', 'ஓயிலாட்டம்',
      
      // Medium - Tamil Music Artists & Styles
      'இளையராஜா', 'அரிஜித் சிங்', 'அனிருத் ரவிச்சந்தர்', 'ஜி.வி. பிரகாஷ் குமார்', 'எஸ்.தமன்',
      'வித்யாசாகர்', 'ஹரிஸ் ஜெயராஜ்', 'இமான்', 'டி.எம்.கிருஷ்ணா', 'கே.வி. மகாதேவன்',
      'எம்.எஸ். விஸ்வநாதன்', 'ஆர்.டி. பர்மன்', 'லதா மங்கேஷ்கர்', 'ஆஷா போஸ்லே', 'கிஷோரே குமார்',
      'முகேஷ்', 'ஹேமந்த் குமார்', 'கே.எல். சைகல்', 'தலாத் மஹ்மூத்', 'மன்னா தேய்',
      'எஸ்.டி. பர்மன்', 'பி.பி.கே. சலோனே', 'ராஜ்கபூர்', 'முகேஷ்', 'கிஷோரே குமார்',
      
      // Hard - Advanced Tamil Music Concepts
      'கருநாடக இசை', 'கர்நாடக சங்கீதம்', 'ஹிந்துஸ்தானி இசை', 'பாரம்பரிய இசை', 'நாட்டுப்புற இசை',
      'கோவில் இசை', 'பக்தி இசை', 'குத்து', 'கும்மி', 'தப்பாட்டம்', 'ஓயிலாட்டம்', 'கரகாட்டம்',
      'பாம்பாட்டி', 'தெருக்கூத்து', 'நாட்டியம்', 'பரதநாட்டியம்', 'கதகளி', 'குச்சிப்புடி', 'ஒயிலாட்டம்',
      'தப்பாட்டம்', 'கரகம்', 'லட்டு', 'பித்து', 'காஞ்சா', 'லகோரி', 'அட்டியபட்டி', 'லாங்டி',
      'மல்லகம்பம்', 'தோடா', 'ஜல்லிக்கட்டு', 'எருமைப் பந்தயம்', 'படகுப் பந்தயம்', 'முக்னா',
      'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி', 'கபடி'
    ],

    general: [
      // Easy - Daily Tamil Words
      'பிறந்தநாள்', 'திருமணம்', 'விழா', 'விடுமுறை', 'பள்ளி', 'வீடு', 'அலுவலகம்', 'மழை', 'வெயில்', 'காற்று',
      'நண்பர்கள்', 'மகிழ்ச்சி', 'சந்தோஷம்', 'சிரிப்பு', 'அழுகை', 'கோபம்', 'அன்பு', 'பயம்', 'ஆச்சரியம்',
      'புத்தகம்', 'பேனா', 'பென்சில்', 'காகிதம்', 'பலகை', 'நாற்காலி', 'மேஜை', 'கதவு', 'ஜன்னல்',
      'விளக்கு', 'மின்விசிறி', 'தொலைக்காட்சி', 'கைபேசி', 'கணினி', 'மடிக்கணினி', 'வானொலி',
      'கார்', 'பேருந்து', 'ரயில்', 'விமானம்', 'மிதிவண்டி', 'பைக்', 'ரிக்ஷா', 'வண்டி', 'படகு',
      'சாலை', 'பாலம்', 'கட்டடம்', 'கோபுரம்', 'கோவில்', 'தேவாலயம்', 'மசூதி', 'மருத்துவமனை',
      
      // Medium - Tamil Culture & Activities
      'பூ', 'மரம்', 'இலை', 'வானம்', 'நட்சத்திரம்', 'சந்திரன்', 'சூரியன்', 'மேகம்', 'மின்னல்', 'வானவில்',
      'தண்ணீர்', 'நெருப்பு', 'பனி', 'உப்பு', 'சர்க்கரை', 'எண்ணெய்', 'தங்கம்', 'வெள்ளி', 'வைரம்',
      'காலை', 'மதியம்', 'மாலை', 'இரவு', 'நேற்று', 'இன்று', 'நாளை', 'வாரம்', 'மாதம்', 'ஆண்டு',
      'உணவு', 'ஜலம்', 'உறக்கம்', 'வேலை', 'ஓய்வு', 'பயணம்', 'படிப்பு', 'கல்வி', 'கலைய', 'இலக்கியம்',
      'இசை', 'நடனம்', 'நாடகம்', 'சினிமா', 'தொலைக்காட்சி', 'வானொலி', 'பத்திரிகை', 'இணையம்',
      
      // Hard - Advanced Tamil Concepts
      'ஜனநாயகம்', 'முடியரசு', 'குடியரசு', 'அடித்தளம்', 'கம்யூனிசம்', 'சோஷலிசம்',
      'கேபிடலிசம்', 'லிபரலிசம்', 'கன்சர்வேடிவ்', 'பெமினிசம்', 'பேட்ரியாட்டிசம்', 'நேஷனலிசம்',
      'குளோபலைசேஷன்', 'மாடர்னைசேஷன்', 'இண்டஸ்ட்ரியலைசேஷன்', 'அர்பனைசேஷன்', 'டிஜிடலைசேஷன்',
      'சஸ்டைனபிலிட்டி', 'என்வைரான்மென்ட்', 'எகாலஜி', 'பயோடைவர்சிட்டி', 'கிளைமேட் சேஞ்ச்',
      'குளோபல் வார்மிங்', 'பால்லூஷன்', 'ரிசைக்கிளிங்', 'கன்சர்வேஷன்', 'ப்ரெஸர்வேஷன்',
      'இன்னோவேஷன்', 'இன்வென்ஷன்', 'டிஸ்கவரி', 'எக்ஸ்ப்ளோரேஷன்', 'அட்வென்ச்சர்', 'க்வெஸ்ட்',
      'மிஷன்', 'கோல்', 'ஆப்ஜெக்டிவ்', 'டார்கெட்', 'ஏம்', 'பர்ப்பஸ்', 'இன்டென்ஷன்', 'மோட்டிவேஷன்',
      'இன்ஸ்பிரேஷன்', 'க்ரியேடிவிட்டி', 'இமேஜினேஷன்', 'ஃபேன்டஸி', 'ரியாலிட்டி', 'ட்ரூத்',
      'லை', 'ஹானஸ்டி', 'இன்டெக்ரிட்டி', 'ட்ரஸ்ட்', 'ஃபெய்த்', 'ஹோப்', 'லவ்', 'ஹேட்',
      'ஃபியர்', 'கரேஜ்', 'பிரேவரி', 'ஸ்ட்ரெங்க்த்', 'வீக்னஸ்', 'பவர்', 'கன்ட்ரோல்', 'ஃப்ரீடம்',
      'லிபர்டி', 'ஜஸ்டிஸ்', 'இக்வாலிட்டி', 'ரைட்ஸ்', 'டியூடிஸ்', 'எதிக்ஸ்', 'மாராலிட்டி', 'வேல்யூஸ்',
      'பிரின்சிபிள்ஸ்', 'பெலிஃப்ஸ்', 'ரிலிஜன்', 'ஸ்பிரிடுவாலிட்டி', 'ஃபிலாஸஃபி', 'ப்ஸைகாலஜி', 'சோஷியாலஜி',
      'அன்த்ரோபாலஜி', 'ஹிஸ்டரி', 'ஜியாக்ரஃபி', 'சயின்ஸ்', 'டெக்னாலஜி', 'மேதமேடிக்ஸ்', 'லிட்டரேச்சர்',
      'ஆர்ட்', 'மியூசிக்', 'டான்ஸ்', 'தியேட்டர்', 'ஃபிலிம்', 'டெலிவிஷன்', 'ரேடியோ', 'நியூஸ்பேப்பர்',
      'மேகசின்', 'புக்', 'இன்டர்நெட்', 'சோஷியல் மீடியா', 'கம்யூனிகேஷன்', 'லாங்குவேஜ்', 'கல்ச்சர்',
      'டிராடிஷன்', 'கஸ்டம்', 'ஹேபிட்', 'ரூட்டின்', 'ஸ்கெட்யூல்', 'டைம் மேனேஜ்மென்ட்', 'ப்ராடக்டிவிட்டி',
      'எஃபிஷியன்சி', 'எஃபெக்டிவ்னஸ்', 'குவாலிட்டி', 'குவான்டிட்டி', 'சக்சஸ்', 'ஃபெயிலியர்',
      'அசீவ்மென்ட்', 'ப்ராக்ரஸ்', 'டெவலப்மென்ட்', 'க்ரோத்', 'சேஞ்ச்', 'டிரான்ஸ்ஃபார்மேஷன்'
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
