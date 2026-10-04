import { createMostLikelyPromptSet } from "./types";

export const questionableChoicesPrompts = createMostLikelyPromptSet(
  "questionable-choices",
  "Questionable Choices",
  [
    "say 'watch this' right before making a situation worse",
    "ignore a warning sign because it seems overly dramatic",
    "buy something expensive because an online review said 'life-changing'",
    "confidently give directions while also being completely lost",
    "send a risky text and then immediately turn their phone off",
    "try to fix a problem with a tutorial they stopped watching halfway through",
    "make a bad decision sound responsible by calling it a 'calculated risk'",
    "stay in a clearly bad situation because leaving now would be awkward",
    "double down on being wrong because they already made a speech about it",
    "say 'it'll probably be fine' moments before it is not fine",
  ],
);
