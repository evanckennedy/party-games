import { athletesCategory } from "./athletes";
import { celebritiesCategory } from "./celebrities";
import { countriesCategory } from "./countries";
import { dateActivitiesCategory } from "./date-activities";
import { fastFoodCategory } from "./fast-food";
import { moviesCategory } from "./movies";
import { musiciansCategory } from "./musicians";
import { snacksCategory } from "./snacks";
import { superpowersCategory } from "./superpowers";
import { videoGamesCategory } from "./video-games";
import {
  createBlindRankingItems,
  type BlindRankingCategoryData,
} from "./types";

export type {
  BlindRankingCategory,
  BlindRankingCategoryId,
  BlindRankingItem,
} from "./types";

const categoryData: BlindRankingCategoryData[] = [
  athletesCategory,
  celebritiesCategory,
  moviesCategory,
  fastFoodCategory,
  videoGamesCategory,
  musiciansCategory,
  snacksCategory,
  countriesCategory,
  superpowersCategory,
  dateActivitiesCategory,
];

export const blindRankingCategories = categoryData.map(
  ({ id, label }) => ({ id, label }),
);

export const blindRankingItems = categoryData.flatMap(
  createBlindRankingItems,
);
