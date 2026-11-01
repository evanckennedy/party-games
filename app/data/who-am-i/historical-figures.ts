import { createWhoAmIIdentities, type WhoAmICategory } from "./types";

const category: WhoAmICategory = {
  id: "historical-figures",
  label: "Historical Figures",
};

export const historicalFigureIdentities = createWhoAmIIdentities(category, [
  "Albert Einstein",
  "Cleopatra",
  "Napoleon Bonaparte",
  "William Shakespeare",
  "Marie Curie",
  "Genghis Khan",
  "Harriet Tubman",
  "Leonardo da Vinci",
  "Nelson Mandela",
  "Joan of Arc",
  "Ada Lovelace",
  "Alexander the Great",
  "Rosa Parks",
  "Mahatma Gandhi",
  "Queen Elizabeth I",
  "Ibn Battuta",
]);
