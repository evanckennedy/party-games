export type SpellingBeeDifficulty = "easy" | "medium" | "hard";

export type SpellingBeeWord = {
  id: string;
  difficulty: SpellingBeeDifficulty;
  word: string;
  definition: string;
  example: string;
  origin: string;
  acceptedSpellings?: string[];
};

type SpellingBeeEntry = Omit<SpellingBeeWord, "id" | "difficulty">;

export function createSpellingBeeWords(
  difficulty: SpellingBeeDifficulty,
  entries: SpellingBeeEntry[],
): SpellingBeeWord[] {
  return entries.map((entry, index) => ({
    id: `${difficulty}-${index + 1}`,
    difficulty,
    ...entry,
  }));
}
