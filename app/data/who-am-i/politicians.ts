import { createWhoAmIIdentities, type WhoAmICategory } from "./types";

const category: WhoAmICategory = { id: "politicians", label: "Politicians" };

export const politicianIdentities = createWhoAmIIdentities(category, [
  "Barack Obama",
  "Justin Trudeau",
  "Donald Trump",
  "Joe Biden",
  "Kamala Harris",
  "Jacinda Ardern",
  "Winston Churchill",
  "John A. Macdonald",
  "Volodymyr Zelenskyy",
  "Margaret Thatcher",
  "Abraham Lincoln",
  "Angela Merkel",
  "Pierre Trudeau",
  "Alexandria Ocasio-Cortez",
  "Ursula von der Leyen",
  "Lula da Silva",
]);
