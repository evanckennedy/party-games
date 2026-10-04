export type YesAndScene = {
  id: string;
  category: string;
  setup: string;
};

export function createSceneSet(
  categoryId: string,
  category: string,
  setups: string[],
): YesAndScene[] {
  return setups.map((setup, index) => ({
    id: `${categoryId}-${index + 1}`,
    category,
    setup,
  }));
}
