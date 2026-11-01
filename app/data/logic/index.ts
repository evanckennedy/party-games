import { easyLogicChallenges } from "./easy";
import { hardLogicChallenges } from "./hard";
import { mediumLogicChallenges } from "./medium";

export type {
  LogicCategory,
  LogicChallenge,
  LogicDifficulty,
} from "./types";

export const logicChallenges = [
  ...easyLogicChallenges,
  ...mediumLogicChallenges,
  ...hardLogicChallenges,
];
