export type RiddleDifficulty = "easy" | "medium" | "hard";

export type Riddle = {
  id: string;
  difficulty: RiddleDifficulty;
  prompt: string;
  answer: string;
};

export function createRiddleSet(
  difficulty: RiddleDifficulty,
  entries: [prompt: string, answer: string][],
): Riddle[] {
  return entries.map(([prompt, answer], index) => ({
    id: `${difficulty}-${index + 1}`,
    difficulty,
    prompt,
    answer,
  }));
}
