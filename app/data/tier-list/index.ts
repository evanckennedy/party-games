import { entertainmentPresets } from "./presets/entertainment";
import { foodPresets } from "./presets/food";
import { randomGeneralPresets } from "./presets/random-general";
import { sportsPresets } from "./presets/sports";

export type { TierPreset, TierPresetGroup } from "./types";

export const tierPresets = [
  ...foodPresets,
  ...entertainmentPresets,
  ...sportsPresets,
  ...randomGeneralPresets,
];
