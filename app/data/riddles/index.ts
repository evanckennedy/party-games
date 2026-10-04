import { easyRiddles } from "./easy";
import { hardRiddles } from "./hard";
import { mediumRiddles } from "./medium";

export type { Riddle, RiddleDifficulty } from "./types";

export const riddles = [...easyRiddles, ...mediumRiddles, ...hardRiddles];
