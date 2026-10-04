export type MostLikelyPrompt = {
  id: string;
  category: string;
  prompt: string;
};

export function createMostLikelyPromptSet(
  categoryId: string,
  category: string,
  prompts: string[],
): MostLikelyPrompt[] {
  return prompts.map((prompt, index) => ({
    id: `${categoryId}-${index + 1}`,
    category,
    prompt,
  }));
}
