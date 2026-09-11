import type { TriviaCategoryId } from "./types";

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
