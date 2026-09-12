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

export function buildTriviaQuestions(
  category: TriviaCategoryId,
  categoryLabel: string,
  difficulty: TriviaDifficulty,
  entries: [question: string, answer: string][],
): TriviaQuestion[] {
  return entries.map(([question, answer]) => ({
    category,
    categoryLabel,
    difficulty,
    question,
    answer,
  }));
}
