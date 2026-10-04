import { absurdUnhingedClaims } from "./categories/absurd-unhinged";
import { everydayLifeClaims } from "./categories/everyday-life";
import { entertainmentClaims } from "./categories/entertainment";
import { foodClaims } from "./categories/food";
import { lifestyleClaims } from "./categories/lifestyle";
import { moneyWorkClaims } from "./categories/money-work";
import { relationshipClaims } from "./categories/relationships-dating";
import { schoolEducationClaims } from "./categories/school-education";
import { societyClaims } from "./categories/society";
import { sportsClaims } from "./categories/sports";
import { technologyClaims } from "./categories/technology";
import type { DebateCategory, DebateClaim } from "./types";

export type {
  DebateCategoryChoice,
  DebateCategoryId,
  DebateClaim,
} from "./types";

export const debateCategories: DebateCategory[] = [
  { id: "relationships-dating", label: "Relationships & Dating", icon: "💬" },
  { id: "society", label: "Society", icon: "🏙️" },
  { id: "money-work", label: "Money & Work", icon: "💼" },
  { id: "lifestyle", label: "Lifestyle", icon: "🌿" },
  { id: "technology", label: "Technology", icon: "📱" },
  { id: "school-education", label: "School & Education", icon: "🎓" },
  { id: "food", label: "Food", icon: "🍕" },
  { id: "sports", label: "Sports", icon: "🏆" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "everyday-life", label: "Everyday Life", icon: "🧾" },
  { id: "absurd-unhinged", label: "Absurd / Unhinged", icon: "🌀" },
];

export const debateClaims: DebateClaim[] = [
  ...relationshipClaims,
  ...societyClaims,
  ...moneyWorkClaims,
  ...lifestyleClaims,
  ...technologyClaims,
  ...schoolEducationClaims,
  ...foodClaims,
  ...sportsClaims,
  ...entertainmentClaims,
  ...everydayLifeClaims,
  ...absurdUnhingedClaims,
];
