import { actionCharadesPrompts } from "./actions";
import { animalCharadesPrompts } from "./animals";
import { funnyAndAbsurdCharadesPrompts } from "./funny-and-absurd";
import { jobCharadesPrompts } from "./jobs";
import { movieAndTvCharadesPrompts } from "./movies-and-tv";
import { objectCharadesPrompts } from "./objects";
import { situationCharadesPrompts } from "./situations";
import { sportsCharadesPrompts } from "./sports";

export type { CharadesCategory, CharadesPrompt } from "./types";

export const charadesPrompts = [
  ...actionCharadesPrompts,
  ...animalCharadesPrompts,
  ...jobCharadesPrompts,
  ...sportsCharadesPrompts,
  ...objectCharadesPrompts,
  ...movieAndTvCharadesPrompts,
  ...situationCharadesPrompts,
  ...funnyAndAbsurdCharadesPrompts,
];
