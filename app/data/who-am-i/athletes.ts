import { createWhoAmIIdentities, type WhoAmICategory } from "./types";

const category: WhoAmICategory = { id: "athletes", label: "Athletes" };

export const athleteIdentities = createWhoAmIIdentities(category, [
  "Cristiano Ronaldo",
  "Lionel Messi",
  "Serena Williams",
  "Wayne Gretzky",
  "Simone Biles",
  "Michael Jordan",
  "Naomi Osaka",
  "Connor McDavid",
  "Usain Bolt",
  "Muhammad Ali",
  "David Beckham",
  "Shohei Ohtani",
  "Megan Rapinoe",
  "Christine Sinclair",
  "LeBron James",
  "Roger Federer",
]);
