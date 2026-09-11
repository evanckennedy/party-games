export type ImposterMode = "classic" | "undercover";

export type Category = {
  id: string;
  label: string;
  icon: string;
  words: string[];
};

export const categories: Category[] = [
  {
    id: "animals",
    label: "Animals",
    icon: "🐙",
    words: [
      "Penguin",
      "Giraffe",
      "Octopus",
      "Dolphin",
      "Kangaroo",
      "Flamingo",
      "Cheetah",
    ],
  },
  {
    id: "food",
    label: "Food & Drink",
    icon: "🍜",
    words: [
      "Pizza",
      "Sushi",
      "Pancakes",
      "Popcorn",
      "Tacos",
      "Lemonade",
      "Ice cream",
    ],
  },
  {
    id: "movies",
    label: "Movies & TV",
    icon: "🎬",
    words: [
      "Jurassic Park",
      "The Office",
      "Toy Story",
      "Wednesday",
      "The Matrix",
      "Shrek",
      "Stranger Things",
    ],
  },
  {
    id: "sports",
    label: "Sports",
    icon: "🏀",
    words: [
      "Basketball",
      "Surfing",
      "Tennis",
      "Boxing",
      "Golf",
      "Skateboarding",
      "Swimming",
    ],
  },
  {
    id: "places",
    label: "Places",
    icon: "🗺️",
    words: [
      "Airport",
      "Amusement park",
      "Library",
      "Beach",
      "Museum",
      "Camping site",
      "Supermarket",
    ],
  },
  {
    id: "music",
    label: "Music",
    icon: "🎸",
    words: [
      "Karaoke",
      "Drum solo",
      "Music festival",
      "Opera",
      "DJ booth",
      "Boy band",
      "Jazz club",
    ],
  },
  {
    id: "jobs",
    label: "Jobs",
    icon: "🧑‍🍳",
    words: [
      "Detective",
      "Astronaut",
      "Chef",
      "Magician",
      "Teacher",
      "Firefighter",
      "Stunt double",
    ],
  },
];

export const scenesPrompts = [
  "Things you should never say at a wedding.",
  "The worst possible person to sit beside on a 12-hour flight.",
  "Things you might hear from a very unqualified doctor.",
  "If accountants were professional wrestlers.",
  "Unexpected things to find in your grandma's basement.",
  "Things you should never say when meeting your partner's parents.",
  "The worst possible things to hear from your rideshare driver.",
  "People who would make terrible lifeguards.",
  "Things a haunted house tour guide should probably not admit.",
  "If your pet secretly ran a small business.",
  "Things you might hear at the world's least relaxing spa.",
  "The worst theme for a children's birthday party.",
  "Unexpected products advertised during the evening news.",
  "If superheroes had to work ordinary office jobs.",
  "Things a time traveler would misunderstand about today.",
  "People you never want as your escape room teammate.",
];

export type TriviaCategoryId =
  | "general"
  | "history"
  | "geography"
  | "science"
  | "sports"
  | "movies"
  | "music"
  | "food"
  | "technology"
  | "animals";

export type TriviaDifficulty = "easy" | "medium" | "hard";

export type TriviaQuestion = {
  category: TriviaCategoryId;
  categoryLabel: string;
  difficulty: TriviaDifficulty;
  question: string;
  answer: string;
};

export const triviaCategories: {
  id: TriviaCategoryId;
  label: string;
  icon: string;
}[] = [
  { id: "general", label: "General Knowledge", icon: "💡" },
  { id: "history", label: "History", icon: "🏛️" },
  { id: "geography", label: "Geography", icon: "🌍" },
  { id: "science", label: "Science", icon: "🔬" },
  { id: "sports", label: "Sports", icon: "🏅" },
  { id: "movies", label: "Movies & TV", icon: "🎬" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "food", label: "Food & Drink", icon: "🍽️" },
  { id: "technology", label: "Technology", icon: "💻" },
  { id: "animals", label: "Animals", icon: "🦊" },
];

export const triviaQuestions: TriviaQuestion[] = [
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "easy",
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "easy",
    question: "How many sides does a hexagon have?",
    answer: "Six",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "easy",
    question: "What is the primary language spoken in Brazil?",
    answer: "Portuguese",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "medium",
    question: "What is the only mammal capable of true flight?",
    answer: "A bat",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "medium",
    question: "What is the smallest prime number?",
    answer: "Two",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "medium",
    question: "Which instrument measures atmospheric pressure?",
    answer: "A barometer",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "hard",
    question: "What is the name of the world’s oldest surviving epic poem?",
    answer: "The Epic of Gilgamesh",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "hard",
    question:
      "What is the only letter that does not appear in the name of any US state?",
    answer: "Q",
  },
  {
    category: "general",
    categoryLabel: "General Knowledge",
    difficulty: "hard",
    question: "What is the SI base unit of luminous intensity?",
    answer: "The candela",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "easy",
    question: "Which ancient civilization built the pyramids at Giza?",
    answer: "The ancient Egyptians",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "easy",
    question: "Who was the first president of the United States?",
    answer: "George Washington",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "easy",
    question: "The Titanic sank in which year?",
    answer: "1912",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "medium",
    question: "Who was the first person to walk on the Moon?",
    answer: "Neil Armstrong",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "medium",
    question: "Which empire was ruled by Genghis Khan?",
    answer: "The Mongol Empire",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "medium",
    question: "Which city was buried by Mount Vesuvius in AD 79?",
    answer: "Pompeii",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "hard",
    question:
      "The Rosetta Stone helped scholars decipher which ancient writing system?",
    answer: "Egyptian hieroglyphs",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "hard",
    question: "Which treaty formally ended World War I?",
    answer: "The Treaty of Versailles",
  },
  {
    category: "history",
    categoryLabel: "History",
    difficulty: "hard",
    question:
      "Who was the last active ruler of ancient Egypt’s Ptolemaic Kingdom?",
    answer: "Cleopatra VII",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "easy",
    question: "What is the capital city of France?",
    answer: "Paris",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "easy",
    question: "Which is the largest ocean on Earth?",
    answer: "The Pacific Ocean",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "easy",
    question: "On which continent is the Sahara Desert?",
    answer: "Africa",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "medium",
    question: "Which country has the longest coastline in the world?",
    answer: "Canada",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "medium",
    question: "What is the capital of New Zealand?",
    answer: "Wellington",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "medium",
    question: "Which river flows through the city of Budapest?",
    answer: "The Danube",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "hard",
    question:
      "What is the only country that borders both the Caspian Sea and the Persian Gulf?",
    answer: "Iran",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "hard",
    question: "What is the deepest lake in the world?",
    answer: "Lake Baikal",
  },
  {
    category: "geography",
    categoryLabel: "Geography",
    difficulty: "hard",
    question:
      "Which two countries share the longest international land border?",
    answer: "Canada and the United States",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "easy",
    question: "What gas do plants absorb from the atmosphere?",
    answer: "Carbon dioxide",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "easy",
    question: "How many bones are in the adult human body?",
    answer: "206",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "easy",
    question: "What force pulls objects toward the Earth?",
    answer: "Gravity",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "medium",
    question: "What is the chemical symbol for gold?",
    answer: "Au",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "medium",
    question: "What is the largest organ in the human body?",
    answer: "The skin",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "medium",
    question: "What type of blood cells help the body fight infection?",
    answer: "White blood cells",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "hard",
    question:
      "What is the name of the process by which a solid changes directly into a gas?",
    answer: "Sublimation",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "hard",
    question: "Which particle in an atom has a negative electrical charge?",
    answer: "The electron",
  },
  {
    category: "science",
    categoryLabel: "Science",
    difficulty: "hard",
    question:
      "What is the name of the boundary around a black hole beyond which light cannot escape?",
    answer: "The event horizon",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "easy",
    question: "How many rings are on the Olympic flag?",
    answer: "Five",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "easy",
    question: "How many points is a free throw worth in basketball?",
    answer: "One",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "easy",
    question: "In which sport would you use a racket and a shuttlecock?",
    answer: "Badminton",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "medium",
    question: "In tennis, what term means a score of zero?",
    answer: "Love",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "medium",
    question: "How long is an Olympic swimming pool?",
    answer: "50 metres",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "medium",
    question: "Which country hosted the 2016 Summer Olympics?",
    answer: "Brazil",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "hard",
    question: "Which country has won the most men’s FIFA World Cups?",
    answer: "Brazil",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "hard",
    question:
      "In golf, what is the term for three strokes under par on a hole?",
    answer: "An albatross",
  },
  {
    category: "sports",
    categoryLabel: "Sports",
    difficulty: "hard",
    question: "Which athlete won the first modern Olympic marathon in 1896?",
    answer: "Spyridon Louis",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "easy",
    question: "What is the name of the cowboy toy in Toy Story?",
    answer: "Woody",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "easy",
    question: "What is the name of the snowman in Frozen?",
    answer: "Olaf",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "easy",
    question: "Which TV sitcom follows six friends living in New York City?",
    answer: "Friends",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "medium",
    question: "Which film features the quote, ‘I’ll be back’?",
    answer: "The Terminator",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "medium",
    question: "Who directed the film Jaws?",
    answer: "Steven Spielberg",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "medium",
    question: "In The Matrix, which pill does Neo take?",
    answer: "The red pill",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "hard",
    question: "Which 1954 film won the first Academy Award for Best Picture?",
    answer: "Wings",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "hard",
    question:
      "Which actor played both Dr. Strangelove and the title character in Spartacus?",
    answer: "Peter Sellers",
  },
  {
    category: "movies",
    categoryLabel: "Movies & TV",
    difficulty: "hard",
    question:
      "What was the first feature-length animated film released by Disney?",
    answer: "Snow White and the Seven Dwarfs",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "easy",
    question: "How many strings does a standard guitar have?",
    answer: "Six",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "easy",
    question: "Which instrument has black and white keys?",
    answer: "A piano",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "easy",
    question: "What is the name for a song sung by two people?",
    answer: "A duet",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "medium",
    question: "Which singer released the album 21?",
    answer: "Adele",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "medium",
    question: "Which band recorded the album The Dark Side of the Moon?",
    answer: "Pink Floyd",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "medium",
    question: "Which singer is known as the ‘King of Pop’?",
    answer: "Michael Jackson",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "hard",
    question: "Which composer wrote The Four Seasons?",
    answer: "Antonio Vivaldi",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "hard",
    question: "Which jazz musician was nicknamed ‘Satchmo’?",
    answer: "Louis Armstrong",
  },
  {
    category: "music",
    categoryLabel: "Music",
    difficulty: "hard",
    question: "What is the relative minor key of C major?",
    answer: "A minor",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "easy",
    question: "What fruit is traditionally used to make guacamole?",
    answer: "Avocado",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "easy",
    question: "What type of pasta is shaped like small grains of rice?",
    answer: "Orzo",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "easy",
    question: "Which drink is made from fermented grapes?",
    answer: "Wine",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "medium",
    question: "What is the main ingredient in hummus?",
    answer: "Chickpeas",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "medium",
    question: "Which spice gives many curries their yellow colour?",
    answer: "Turmeric",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "medium",
    question: "What cheese is traditionally used in a Greek salad?",
    answer: "Feta",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "hard",
    question:
      "What is the Japanese term for a chef’s knife used for slicing sashimi?",
    answer: "Yanagiba",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "hard",
    question:
      "Which Italian dessert is traditionally made with coffee-soaked ladyfingers and mascarpone?",
    answer: "Tiramisu",
  },
  {
    category: "food",
    categoryLabel: "Food & Drink",
    difficulty: "hard",
    question:
      "Which French sauce is traditionally made from egg yolks, butter, and lemon juice?",
    answer: "Hollandaise",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "easy",
    question: "What does ‘www’ stand for in a web address?",
    answer: "World Wide Web",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "easy",
    question:
      "What device is commonly used to move a pointer on a computer screen?",
    answer: "A mouse",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "easy",
    question: "What does the ‘app’ in smartphone app stand for?",
    answer: "Application",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "medium",
    question: "What does CPU stand for?",
    answer: "Central processing unit",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "medium",
    question: "What does HTTP stand for?",
    answer: "Hypertext Transfer Protocol",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "medium",
    question: "In computing, what does RAM allow a device to access quickly?",
    answer: "Data currently in use",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "hard",
    question: "Which programming language was created by Guido van Rossum?",
    answer: "Python",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "hard",
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
  },
  {
    category: "technology",
    categoryLabel: "Technology",
    difficulty: "hard",
    question:
      "What mathematical structure is commonly used to model relationships in a social network?",
    answer: "A graph",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "easy",
    question: "What is the fastest land animal?",
    answer: "The cheetah",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "easy",
    question: "What is a baby dog called?",
    answer: "A puppy",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "easy",
    question: "Which animal is known for producing wool?",
    answer: "A sheep",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "medium",
    question: "What is a group of crows commonly called?",
    answer: "A murder",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "medium",
    question:
      "Which bird is famous for being unable to fly but able to run very fast?",
    answer: "The ostrich",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "medium",
    question: "What is the largest species of shark?",
    answer: "The whale shark",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "hard",
    question:
      "Which animal has fingerprints that can resemble human fingerprints?",
    answer: "The koala",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "hard",
    question: "Which mammal is known to have the longest pregnancy?",
    answer: "The elephant",
  },
  {
    category: "animals",
    categoryLabel: "Animals",
    difficulty: "hard",
    question: "What is the only species of bird known to fly backwards?",
    answer: "The hummingbird",
  },
];
