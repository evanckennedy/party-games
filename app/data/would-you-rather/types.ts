export type WouldYouRatherPrompt = {
  id: string;
  category: string;
  firstChoice: string;
  secondChoice: string;
};

export function createPromptSet(
  categoryId: string,
  category: string,
  choices: [firstChoice: string, secondChoice: string][],
): WouldYouRatherPrompt[] {
  return choices.map(([firstChoice, secondChoice], index) => ({
    id: `${categoryId}-${index + 1}`,
    category,
    firstChoice,
    secondChoice,
  }));
}
