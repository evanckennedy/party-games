import { createLogicChallenges } from "./types";

export const mediumLogicChallenges = createLogicChallenges("medium", [
  {
    category: "Probability",
    title: "The Game Show Doors",
    prompt:
      "A prize is equally likely to be behind any of three doors. You choose one. The host, who knows where the prize is, opens one of the other doors to show a goat, then offers you the unopened door instead. Is switching more likely to win?",
    hint: "Your first choice was wrong two times out of three.",
    solution: "Yes. Switching wins with probability two-thirds.",
    explanation:
      "Your original door has a one-third chance of hiding the prize. The other two doors together have a two-thirds chance. Since the host always opens a goat door, that entire two-thirds chance transfers to the one remaining unopened door. Switching wins whenever your first choice was wrong.",
  },
  {
    category: "Probability",
    title: "A Room Full of Birthdays",
    prompt:
      "In a group of 23 people, is it more likely than not that at least two people share a birthday? Ignore leap years and assume birthdays are equally likely on any of the 365 days.",
    hint: "Instead of counting matching pairs, first calculate the chance that every birthday is different.",
    solution: "Yes. The chance of a shared birthday is about 50.7%.",
    explanation:
      "The chance that all birthdays are different is (365/365) × (364/365) × … × (343/365), about 49.3%. The complementary chance of at least one shared birthday is therefore about 50.7%.",
  },
  {
    category: "Deduction",
    title: "The Stolen Trophy",
    prompt:
      "One of Ada, Ben, Cara, and Dee stole a trophy. Each makes one statement:\nAda: “Ben or Cara did it.”\nBen: “Ada or Dee did it.”\nCara: “Ben did not do it.”\nDee: “Cara did it.”\nExactly one statement is true. Who stole the trophy?",
    hint: "Test each suspect in turn, then count how many statements would be true.",
    solution: "Ben stole the trophy.",
    explanation:
      "If Ben did it, Ada's statement is true and the other three are false. If Ada or Dee did it, two statements are true. If Cara did it, three statements are true. Only Ben makes exactly one statement true.",
  },
  {
    category: "Deduction",
    title: "The Three-Digit Code",
    prompt:
      "A safe has a three-digit code with no repeated digits. These clues are exact:\n682 — one digit is correct and in the right place.\n614 — one digit is correct but in the wrong place.\n206 — two digits are correct, both in the wrong places.\n738 — no digit is in the code.\n780 — one digit is correct but in the wrong place.\nWhat is the code?",
    hint: "The 7, 3, and 8 are eliminated first. Use the last clue to place 0 before deciding where 2 belongs.",
    solution: "042.",
    explanation:
      "From 738, 7, 3, and 8 are absent. In 780, the only possible correct digit is 0, and it is not in the third position. In 206, 0 is also misplaced, so it cannot be second either; it must be first. The two correct digits in 206 are 2 and 0, so 6 is absent. In 682, the one correctly placed digit must therefore be 2 in the third position. Of the digits in 614, 6 is absent and 1 cannot be in the middle because the clue says the correct digit is misplaced. So 4 is the middle digit.",
  },
  {
    category: "Probability",
    title: "The Two Dice Bets",
    prompt:
      "Which is more likely: rolling a six at least once in four rolls of one fair die, or rolling double six at least once in 24 rolls of two fair dice?",
    hint: "For each bet, calculate the chance of never getting the target result, then subtract from 1.",
    solution:
      "Rolling a six in four single-die rolls is slightly more likely.",
    explanation:
      "The chance of no six in four rolls is (5/6)^4, so the chance of at least one six is about 51.8%. The chance of no double six in 24 two-dice rolls is (35/36)^24, so the chance of at least one double six is about 49.1%.",
  },
  {
    category: "Strategy & Optimization",
    title: "The Pile of 37 Tokens",
    prompt:
      "Two players take turns removing 1, 2, 3, 4, or 5 tokens from a pile of 37. The player who takes the last token wins. If both play perfectly, can the first player guarantee a win?",
    hint: "Try to leave your opponent a multiple of 6, then make each pair of turns remove 6 tokens.",
    solution: "Yes. The first player should remove 1 token.",
    explanation:
      "Removing 1 leaves 36, a multiple of 6. After the other player removes k tokens (1–5), remove 6−k. Each pair of turns removes 6, so the first player eventually takes the last token.",
  },
]);
