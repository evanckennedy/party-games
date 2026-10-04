import { adventuresPrompts } from "./adventures";
import { ambitionAndWorkPrompts } from "./ambition-and-work";
import { everydayAnticsPrompts } from "./everyday-antics";
import { friendGroupPrompts } from "./friend-group";
import { questionableChoicesPrompts } from "./questionable-choices";
import { socialChaosPrompts } from "./social-chaos";

export type { MostLikelyPrompt } from "./types";

export const mostLikelyPrompts = [
  ...socialChaosPrompts,
  ...questionableChoicesPrompts,
  ...friendGroupPrompts,
  ...ambitionAndWorkPrompts,
  ...adventuresPrompts,
  ...everydayAnticsPrompts,
];
