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
