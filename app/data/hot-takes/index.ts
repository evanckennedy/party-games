import { cultureAndTechnologyHotTakes } from "./culture-and-technology";
import { everydayLifeHotTakes } from "./everyday-life";
import { funnyAndAbsurdHotTakes } from "./funny-and-absurd";
import { philosophyHotTakes } from "./philosophy";
import { relationshipHotTakes } from "./relationships";
import { workAndMoneyHotTakes } from "./work-and-money";

export type { HotTake } from "./types";

export const hotTakes = [
  ...relationshipHotTakes,
  ...workAndMoneyHotTakes,
  ...cultureAndTechnologyHotTakes,
  ...everydayLifeHotTakes,
  ...philosophyHotTakes,
  ...funnyAndAbsurdHotTakes,
];
