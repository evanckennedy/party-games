import { createRiddleSet } from "./types";

export const hardRiddles = createRiddleSet("hard", [
  [
    "Four people must cross a bridge at night with one flashlight. They take 1, 2, 7, and 10 minutes to cross. At most two can cross at once, and the flashlight must be carried. What is the shortest total time?",
    "17 minutes: the 1- and 2-minute people cross, the 1-minute person returns, the 7- and 10-minute people cross, the 2-minute person returns, then the 1- and 2-minute people cross",
  ],
  [
    "Two ropes each take exactly one hour to burn, but burn at an uneven rate. How can you measure exactly 45 minutes?",
    "Light the first rope at both ends and the second rope at one end. When the first rope finishes after 30 minutes, light the other end of the second rope; it will finish 15 minutes later",
  ],
  [
    "Three boxes are labeled Apples, Oranges, and Mixed. Every label is wrong. You may take one fruit from one box without looking inside. Which box should you draw from to identify all three?",
    "Draw from the box labeled Mixed. Since its label is wrong, the fruit reveals whether that box contains only apples or only oranges; the other two follow from the incorrect labels",
  ],
  [
    "There are 25 horses and a track that fits five at a time. You have no stopwatch and can only learn the order in each race. What is the fewest races needed to identify the three fastest horses?",
    "Seven races: five heats, one race among the heat winners, then one final race among the remaining candidates",
  ],
  [
    "One hundred closed lockers are toggled in 100 passes: on pass 1 every locker is toggled, on pass 2 every second locker, and so on. Which lockers remain open?",
    "The lockers with perfect-square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, and 100",
  ],
  [
    "You have eight identical-looking balls, one of which is heavier. Using a balance scale only twice, how can you find the heavier ball?",
    "Weigh three against three. If they balance, weigh one of the two remaining balls against the other. If not, take the heavier group of three and weigh one ball against another; if they balance, the third is heavier",
  ],
  [
    "Three switches are outside a closed room. One controls a traditional bulb inside. You may operate the switches however you like, but enter the room only once. How do you identify the correct switch?",
    "Turn one switch on for several minutes, then turn it off. Turn a second switch on and enter. If the bulb is lit, it is the second switch; if it is off but warm, it is the first; if it is off and cool, it is the third",
  ],
  [
    "A farmer must take a fox, a chicken, and a bag of grain across a river. The boat holds the farmer and one passenger or item. The fox cannot be left alone with the chicken, and the chicken cannot be left alone with the grain. How can all three cross?",
    "Take the chicken across, return alone, take the fox across, bring the chicken back, take the grain across, return alone, then take the chicken across",
  ],
  [
    "A snail climbs a 10-foot wall. Each day it climbs 3 feet and each night it slides back 2 feet. How many days does it take to get over the wall?",
    "Eight days; after seven nights it is at 7 feet, then it climbs to 10 feet on day eight and gets over before sliding back",
  ],
  [
    "A lily pad patch doubles in area every day. It covers the whole lake on day 48. On what day was the lake half covered?",
    "Day 47",
  ],
  [
    "A prisoner is told: 'If you tell a lie, you will be hanged; if you tell the truth, you will be shot.' What can the prisoner say to make either punishment break the rule?",
    "'I will be hanged.' If it is true, the rule requires shooting; if it is a lie, the rule requires hanging, making either outcome contradict the rule",
  ],
  [
    "A person looks at a portrait and says, 'Brothers and sisters I have none, but that person's father is my father's son.' Who is in the portrait?",
    "The speaker's child",
  ],
  [
    "A room has two doors: one leads out and one to a trap. One guard always tells the truth and one always lies, but you do not know which is which. You may ask one guard one question. What do you ask to find the safe door?",
    "Ask either guard, 'Which door would the other guard say leads out?' Then take the opposite door",
  ],
  [
    "You have a 3-liter jug and a 5-liter jug, with no markings. How can you measure exactly 4 liters?",
    "Fill the 5-liter jug and pour into the 3-liter jug, leaving 2 liters. Empty the 3-liter jug and pour in the 2 liters. Refill the 5-liter jug and pour into the 3-liter jug until it is full; 4 liters remain in the 5-liter jug",
  ],
  [
    "A person leaves home, makes three left turns, and returns home to find two masked people waiting. Where are they?",
    "At home plate in a baseball game; the two masked people are the catcher and umpire",
  ],
  [
    "Ten bags each contain coins. Nine bags hold 10-gram coins, but one bag holds 9-gram coins. You may use a digital scale once. Take one coin from bag 1, two from bag 2, and so on through bag 10. The scale reads 546 grams. Which bag has the lighter coins?",
    "Bag 4; ten normal sets would weigh 550 grams, and the 4-gram shortfall identifies bag 4",
  ],
  [
    "A clock's minute and hour hands overlap exactly at 12:00. How many times do they overlap in the next 12 hours?",
    "Eleven times",
  ],
  [
    "A cube is painted on all six outer faces, then cut into 27 equal smaller cubes. How many small cubes have paint on exactly two faces?",
    "12; these are the middle cubes on the 12 edges",
  ],
  [
    "In a room are three people wearing hats chosen from three white and two black hats. Each can see the others but not their own. The first says, 'I don't know my hat color.' The second says the same. The third then knows. What color is the third person's hat?",
    "White",
  ],
  [
    "A number between 1 and 100 is chosen. You are told it is divisible by 3 and 5, and its square is less than 10,000. What is the largest possible number?",
    "90",
  ],
]);
