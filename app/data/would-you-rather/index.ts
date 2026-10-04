import { everydayPrompts } from "./everyday";
import { foodPrompts } from "./food";
import { friendGroupPrompts } from "./friends";
import { powersPrompts } from "./powers";
import { travelPrompts } from "./travel";
import { workSchoolPrompts } from "./work-school";

export type { WouldYouRatherPrompt } from "./types";

export const wouldYouRatherPrompts = [
  ...everydayPrompts,
  ...foodPrompts,
  ...powersPrompts,
  ...friendGroupPrompts,
  ...workSchoolPrompts,
  ...travelPrompts,
];
