export type CharadesCategory =
  | "Actions"
  | "Animals"
  | "Jobs"
  | "Sports"
  | "Objects"
  | "Movies & TV"
  | "Situations"
  | "Funny & Absurd";

export type CharadesPrompt = {
  id: string;
  category: CharadesCategory;
  prompt: string;
};

export function createCharadesPrompts(
  category: CharadesCategory,
  prompts: string[],
): CharadesPrompt[] {
  return prompts.map((prompt, index) => ({
    id: `${category.toLowerCase().replace(/[^a-z]+/g, "-")}-${index + 1}`,
    category,
    prompt,
  }));
}
