export type DebateCategoryId =
  | "relationships-dating"
  | "society"
  | "money-work"
  | "lifestyle"
  | "technology"
  | "school-education"
  | "food"
  | "sports"
  | "entertainment"
  | "everyday-life"
  | "absurd-unhinged";

export type DebateCategoryChoice = DebateCategoryId | "random";

export type DebateCategory = {
  id: DebateCategoryId;
  label: string;
  icon: string;
};

export type DebateClaim = {
  id: string;
  category: DebateCategoryId;
  categoryLabel: string;
  statement: string;
};

export function createDebateClaims(
  category: DebateCategoryId,
  categoryLabel: string,
  statements: string[],
): DebateClaim[] {
  return statements.map((statement, index) => ({
    id: `${category}-${index + 1}`,
    category,
    categoryLabel,
    statement,
  }));
}
