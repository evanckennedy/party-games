import { adventureScenes } from "./scenes/adventures";
import { everydayScenes } from "./scenes/everyday";
import { fantasySciFiScenes } from "./scenes/fantasy-sci-fi";
import { workplaceScenes } from "./scenes/workplace";

export type { YesAndScene } from "./types";

export const yesAndScenes = [
  ...everydayScenes,
  ...fantasySciFiScenes,
  ...adventureScenes,
  ...workplaceScenes,
];
