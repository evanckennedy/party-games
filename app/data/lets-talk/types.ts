export type LetsTalkCategoryId =
  | "getting-to-know-you"
  | "fun-and-lighthearted"
  | "deep-and-philosophical"
  | "relationships-and-dating"
  | "values-and-beliefs"
  | "bold-and-uncomfortable";

export type LetsTalkCategory = {
  id: LetsTalkCategoryId;
  label: string;
};

export type LetsTalkQuestion = {
  id: string;
  categoryId: LetsTalkCategoryId;
  categoryLabel: string;
  question: string;
};

export function createLetsTalkQuestions(
  category: LetsTalkCategory,
  questions: string[],
): LetsTalkQuestion[] {
  return questions.map((question, index) => ({
    id: `${category.id}-${index + 1}`,
    categoryId: category.id,
    categoryLabel: category.label,
    question,
  }));
}
