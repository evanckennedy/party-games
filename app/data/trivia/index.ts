export { triviaCategories } from "./categories";
export type {
  TriviaCategoryId,
  TriviaDifficulty,
  TriviaQuestion,
} from "./types";

import { animalsQuestions } from "./questions/animals";
import { foodQuestions } from "./questions/food";
import { generalQuestions } from "./questions/general";
import { geographyQuestions } from "./questions/geography";
import { historyQuestions } from "./questions/history";
import { moviesQuestions } from "./questions/movies";
import { musicQuestions } from "./questions/music";
import { scienceQuestions } from "./questions/science";
import { sportsQuestions } from "./questions/sports";
import { technologyQuestions } from "./questions/technology";

export const triviaQuestions = [
  ...generalQuestions,
  ...historyQuestions,
  ...geographyQuestions,
  ...scienceQuestions,
  ...sportsQuestions,
  ...moviesQuestions,
  ...musicQuestions,
  ...foodQuestions,
  ...technologyQuestions,
  ...animalsQuestions,
];
