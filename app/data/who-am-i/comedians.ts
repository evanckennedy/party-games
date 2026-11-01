import { createWhoAmIIdentities, type WhoAmICategory } from "./types";

const category: WhoAmICategory = {
  id: "comedians",
  label: "Comedians",
};

export const comedianIdentities = createWhoAmIIdentities(category, [
  "Charlie Chaplin",
  "Rowan Atkinson",
  "Kevin Hart",
  "Jim Carrey",
  "Robin Williams",
  "Eddie Murphy",
  "Tina Fey",
  "Steve Carell",
  "Melissa McCarthy",
  "Chris Rock",
  "Amy Poehler",
  "Trevor Noah",
  "John Cleese",
  "Ricky Gervais",
  "Ali Wong",
  "Dave Chappelle",
]);
