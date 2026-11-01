import { createLogicChallenges } from "./types";

export const hardLogicChallenges = createLogicChallenges("hard", [
  {
    category: "Constraints",
    title: "The Line of One Hundred Hats",
    prompt:
      "One hundred people stand in a line, each wearing a red or blue hat. Everyone can see the hats in front of them, but not their own or anyone behind them. Starting at the back, each person must say “red” or “blue”; everyone can hear earlier answers. They may agree on a strategy beforehand. What strategy guarantees the most people guess their own hat colour correctly?",
    hint: "The first answer can communicate information about the total number of red hats ahead, even if the first speaker's own guess is wrong.",
    solution:
      "The first person says a colour to encode whether the number of red hats they see is odd or even. Each person after them uses that parity, the visible hats, and earlier answers to determine their own hat. At least 99 people are correct.",
    explanation:
      "Agree that the first person says “red” if they see an odd number of red hats and “blue” if they see an even number. Their answer is a parity signal, so their own hat may be wrong. The next person can count the red hats they see and compare that count with the announced parity to infer their own hat. Each later person also accounts for the hats already identified by earlier speakers. Thus everyone after the first guesses correctly, guaranteeing 99 correct.",
  },
  {
    category: "Strategy & Optimization",
    title: "Two Eggs, One Hundred Floors",
    prompt:
      "You have two identical eggs and a 100-floor building. An egg may break when dropped from a high enough floor, and if it survives it can be reused. There is some highest safe floor. What is the fewest drops you need to guarantee finding it in the worst case?",
    hint: "Make the first egg's drop intervals shrink by one floor each time.",
    solution: "14 drops in the worst case.",
    explanation:
      "With 14 drops, test floors 14, 27, 39, 50, and so on, reducing the interval by one each time. If the first egg breaks, use the second egg to check each floor in the last interval, with the remaining drops. The largest number of floors covered is 14 + 13 + … + 1 = 105, enough for 100 floors. With only 13 drops, the maximum is 13 + … + 1 = 91, which is not enough.",
  },
  {
    category: "Constraints",
    title: "The Hundred Prisoners and the Boxes",
    prompt:
      "One hundred prisoners are numbered 1–100. In a room are 100 closed boxes, each hiding one different prisoner number in a random arrangement. Each prisoner may open at most 50 boxes to find their own number. They cannot communicate once the process begins. If even one prisoner fails, everyone loses. Beforehand, they may agree on a strategy. Can they do better than having everyone pick 50 boxes at random?",
    hint: "Treat the number inside a box as the next box to open, creating linked loops.",
    solution:
      "Yes. Each prisoner starts with the box bearing their own number, then opens the box whose number they just found, following that chain for up to 50 boxes.",
    explanation:
      "The arrangement forms loops: each box points to the box labelled with the number it contains. Following a chain eventually returns to its start. Every prisoner succeeds exactly when their loop is no longer than 50. The group wins unless the random arrangement contains a loop longer than 50, which happens far less often than everyone independently guessing correctly. This strategy gives the group about a 31% chance, compared with about (1/2)^100 for independent random choices.",
  },
  {
    category: "Deduction",
    title: "The Prisoners and the Light",
    prompt:
      "One hundred prisoners are kept apart. Each day, one prisoner is taken to a room with a single light switch, initially off. The order is unpredictable, and some prisoners may be called many times before another is called once, but everyone is guaranteed to keep getting called. They can agree on a plan beforehand but cannot communicate afterward. How can one prisoner eventually know that all 100 have visited the room?",
    hint: "Choose one prisoner to count signals. The others need a personal rule that limits how many times each can signal.",
    solution:
      "Choose one prisoner as the counter. Each of the other 99 turns the light on exactly twice in their lifetime, but only when they find it off. The counter turns it off whenever they find it on and counts each such signal. When the counter has counted 198 signals, everyone has visited.",
    explanation:
      "Each non-counter can create at most two signals, and creates both only after being in the room. Since the switch starts off, every signal is a light the counter can later turn off and count exactly once. Once the counter has counted 198 signals, all 99 other prisoners must each have supplied their two signals, so all have visited. This assumes every prisoner continues to be called eventually.",
  },
  {
    category: "Deduction",
    title: "The Blue-Eyed Islanders",
    prompt:
      "On an island, everyone is a perfect logician and can see everyone else's eye colour, but cannot see their own. No one discusses eye colour. If someone deduces that they have blue eyes, they must leave the island at midnight. A visitor publicly announces, “At least one person here has blue eyes.” If exactly 20 people have blue eyes, what happens?",
    hint: "Start with one blue-eyed person. What would they conclude if they saw no one else with blue eyes?",
    solution:
      "All 20 blue-eyed people leave together on the twentieth midnight after the announcement.",
    explanation:
      "If there were one blue-eyed person, they would see none and leave on the first midnight, knowing the visitor's announcement must refer to them. With two, each sees one; after nobody leaves on night one, each realizes there must be two and both leave on night two. This reasoning extends by induction: with 20, each sees 19 and waits 19 nights; when nobody leaves, all 20 know their own eyes must be blue and leave on night 20. The public announcement makes “at least one” common knowledge.",
  },
  {
    category: "Constraints",
    title: "The Poisoned Bottle",
    prompt:
      "One of 16 bottles contains poison. You have four test strips; a strip changes colour if any poison touches it. You can run one test round and see all results at once. How can you identify the poisoned bottle?",
    hint: "Give every bottle a unique four-bit code, and let each strip represent one position in that code.",
    solution:
      "Number the bottles 0–15 in binary. Put a drop from each bottle onto the strips corresponding to the 1s in its four-bit number. The pattern of changed strips identifies the poisoned bottle.",
    explanation:
      "Four strips each have two possible outcomes, so together they produce 2⁴ = 16 distinct result patterns. Assign one unique pattern to each bottle. After the test, the changed/not-changed pattern directly names the one poisoned bottle (with bottle 0 represented by no strips changing).",
  },
  {
    category: "Constraints",
    title: "The Checkerboard and the Dominoes",
    prompt:
      "An 8-by-8 checkerboard has its two opposite corner squares removed. Can the remaining board be covered exactly by 31 dominoes, each covering two edge-adjacent squares?",
    hint: "Colour the board like a checkerboard and compare how many squares of each colour remain.",
    solution: "No. It is impossible.",
    explanation:
      "Opposite corners of a checkerboard are the same colour. Removing them leaves 30 squares of that colour and 32 of the other. Every domino placed on adjacent squares covers one square of each colour, so 31 dominoes would cover equal numbers of both colours. The remaining board has unequal counts, making a complete covering impossible.",
  },
]);
