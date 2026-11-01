export type LogicDifficulty = "easy" | "medium" | "hard";

export type LogicCategory =
  | "Deduction"
  | "Strategy & Optimization"
  | "Patterns & Sequences"
  | "Probability"
  | "Constraints"
  | "Lateral Thinking"
  | "Classic Logic";

export type LogicChallenge = {
  id: string;
  difficulty: LogicDifficulty;
  category: LogicCategory;
  title: string;
  prompt: string;
  hint: string;
  solution: string;
  explanation: string;
};

type LogicChallengeEntry = Omit<LogicChallenge, "id" | "difficulty">;

export function createLogicChallenges(
  difficulty: LogicDifficulty,
  entries: LogicChallengeEntry[],
): LogicChallenge[] {
  return entries.map((entry, index) => ({
    id: `${difficulty}-${index + 1}`,
    difficulty,
    ...entry,
  }));
}
