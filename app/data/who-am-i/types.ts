export type WhoAmICategoryId =
  | "actors"
  | "musicians"
  | "athletes"
  | "historical-figures"
  | "politicians"
  | "comedians"
  | "fictional-characters";

export type WhoAmICategory = {
  id: WhoAmICategoryId;
  label: string;
};

export type WhoAmIIdentity = {
  id: string;
  category: WhoAmICategoryId;
  categoryLabel: string;
  name: string;
};

export function createWhoAmIIdentities(
  category: WhoAmICategory,
  names: string[],
): WhoAmIIdentity[] {
  return names.map((name, index) => ({
    id: `${category.id}-${index + 1}`,
    category: category.id,
    categoryLabel: category.label,
    name,
  }));
}
