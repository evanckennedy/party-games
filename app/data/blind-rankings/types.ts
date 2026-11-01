export type BlindRankingCategoryId =
  | "athletes"
  | "celebrities"
  | "movies"
  | "fast-food"
  | "video-games"
  | "musicians"
  | "snacks"
  | "countries"
  | "superpowers"
  | "date-activities";

export type BlindRankingCategoryData = {
  id: BlindRankingCategoryId;
  label: string;
  items: string[];
};

export type BlindRankingCategory = Omit<BlindRankingCategoryData, "items">;

export type BlindRankingItem = {
  id: string;
  name: string;
  categoryId: BlindRankingCategoryId;
  categoryLabel: string;
};

export function createBlindRankingItems(
  category: BlindRankingCategoryData,
): BlindRankingItem[] {
  return category.items.map((name, index) => ({
    id: `${category.id}-${index + 1}`,
    name,
    categoryId: category.id,
    categoryLabel: category.label,
  }));
}
