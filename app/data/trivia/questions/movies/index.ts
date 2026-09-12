import { moviesEasyQuestions } from "./easy";
import { moviesMediumQuestions } from "./medium";
import { moviesHardQuestions } from "./hard";

export const moviesQuestions = [
  ...moviesEasyQuestions,
  ...moviesMediumQuestions,
  ...moviesHardQuestions,
];
