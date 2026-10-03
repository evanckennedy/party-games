export type TierPresetGroup =
  | "Food"
  | "Entertainment"
  | "Sports"
  | "Random / General";

export type TierPreset = {
  id: string;
  group: TierPresetGroup;
  title: string;
  items: string[];
};
