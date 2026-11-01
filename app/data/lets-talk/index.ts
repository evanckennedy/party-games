import { boldAndUncomfortableQuestions } from "./bold-and-uncomfortable";
import { deepAndPhilosophicalQuestions } from "./deep-and-philosophical";
import { funAndLightheartedQuestions } from "./fun-and-lighthearted";
import { gettingToKnowYouQuestions } from "./getting-to-know-you";
import { relationshipsAndDatingQuestions } from "./relationships-and-dating";
import { valuesAndBeliefsQuestions } from "./values-and-beliefs";
import type { LetsTalkCategory, LetsTalkQuestion } from "./types";

export type {
  LetsTalkCategoryId,
  LetsTalkQuestion,
} from "./types";

export const letsTalkCategories: LetsTalkCategory[] = [
  { id: "getting-to-know-you", label: "Getting to Know You" },
  { id: "fun-and-lighthearted", label: "Fun & Lighthearted" },
  { id: "deep-and-philosophical", label: "Deep & Philosophical" },
  { id: "relationships-and-dating", label: "Relationships & Dating" },
  { id: "values-and-beliefs", label: "Values & Beliefs" },
  { id: "bold-and-uncomfortable", label: "Bold & Uncomfortable" },
];

export const letsTalkQuestions: LetsTalkQuestion[] = [
  ...gettingToKnowYouQuestions,
  ...funAndLightheartedQuestions,
  ...deepAndPhilosophicalQuestions,
  ...relationshipsAndDatingQuestions,
  ...valuesAndBeliefsQuestions,
  ...boldAndUncomfortableQuestions,
];
