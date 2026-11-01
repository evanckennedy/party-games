export type HotTakeCategory =
  | "Relationships"
  | "Work & Money"
  | "Culture & Technology"
  | "Everyday Life"
  | "Philosophy"
  | "Funny & Absurd";

export type HotTake = {
  id: string;
  category: HotTakeCategory;
  statement: string;
};

export function createHotTakeSet(
  category: HotTakeCategory,
  statements: string[],
): HotTake[] {
  return statements.map((statement, index) => ({
    id: `${category.toLowerCase().replace(/[^a-z]+/g, "-")}-${index + 1}`,
    category,
    statement,
  }));
}
