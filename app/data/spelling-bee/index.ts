import { easySpellingBeeWords } from "./easy";
import { hardSpellingBeeWords } from "./hard";
import { mediumSpellingBeeWords } from "./medium";

export type { SpellingBeeDifficulty, SpellingBeeWord } from "./types";

export const spellingBeeWords = [
  ...easySpellingBeeWords,
  ...mediumSpellingBeeWords,
  ...hardSpellingBeeWords,
];
