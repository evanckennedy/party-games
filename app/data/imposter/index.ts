import animalsCategory from "./categories/animals";
import foodCategory from "./categories/food";
import jobsCategory from "./categories/jobs";
import moviesCategory from "./categories/movies";
import musicCategory from "./categories/music";
import placesCategory from "./categories/places";
import sportsCategory from "./categories/sports";
import type { Category } from "./types";

export { type Category, type ImposterMode } from "./types";

export const categories: Category[] = [
  animalsCategory,
  foodCategory,
  moviesCategory,
  sportsCategory,
  placesCategory,
  musicCategory,
  jobsCategory,
];
