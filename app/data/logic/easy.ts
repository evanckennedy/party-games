import { createLogicChallenges } from "./types";

export const easyLogicChallenges = createLogicChallenges("easy", [
  {
    category: "Deduction",
    title: "The Four Seats",
    prompt:
      "Ada, Ben, Cal, and Dee sit in a row of four seats. Ben sits immediately to Ada's right. Dee sits somewhere to Ada's left. Cal is not at either end. What is the seating order from left to right?",
    hint: "Ada cannot be in the first or last seat. Try the remaining positions for Cal.",
    solution: "Dee, Cal, Ada, Ben.",
    explanation:
      "Ada cannot be first because Dee must be to her left, and cannot be fourth because Ben sits to her right. If Ada were second, Cal would have to sit at an end. So Ada is third and Ben fourth; Cal takes the only non-end seat left, and Dee is first.",
  },
  {
    category: "Deduction",
    title: "The Four Cards",
    prompt:
      "Four cards show A, D, 4, and 7. Each card has a letter on one side and a number on the other. You must check the rule: “If a card has a vowel on one side, it has an even number on the other.” Which card or cards must you turn over to test the rule?",
    hint: "Look for a card that could disprove the rule, not just one that could support it.",
    solution: "Turn over A and 7.",
    explanation:
      "A must have an even number on the back. The 7 must not have a vowel on the back, or it would break the rule. D does not need to be even, because the rule says nothing about consonants. The 4 could have a vowel or consonant and either way would not disprove the rule.",
  },
  {
    category: "Deduction",
    title: "The Picnic Orders",
    prompt:
      "Ava, Ben, and Cy each chose a different drink—tea, cocoa, or lemonade—and a different snack—an apple, a muffin, or a cookie. Ava chose tea. The person who chose tea had a muffin. Ben chose an apple. The cocoa drinker had a cookie. Who chose each drink and snack?",
    hint: "Ava's drink tells you her snack. Then use Ben's snack to narrow down his drink.",
    solution:
      "Ava chose tea and a muffin; Ben chose lemonade and an apple; Cy chose cocoa and a cookie.",
    explanation:
      "Ava chose tea, so she had the muffin. Ben has the apple, so he is not the cocoa drinker, whose snack is a cookie. Ben also cannot have tea, which Ava has, so Ben chose lemonade. Cy is left with cocoa and the cookie.",
  },
  {
    category: "Deduction",
    title: "The Three Signs",
    prompt:
      "A key is hidden in exactly one of three boxes: A, B, or C. A says, “The key is in B.” B says, “The key is not in B.” C says, “The key is not in A.” Exactly one sign is true. Which box holds the key?",
    hint: "Test each possible box and count how many signs would be true.",
    solution: "Box A.",
    explanation:
      "If the key is in A, only B's sign is true. If it is in B, A's and C's signs are true. If it is in C, B's and C's signs are true. Only A leaves exactly one true sign.",
  },
]);
