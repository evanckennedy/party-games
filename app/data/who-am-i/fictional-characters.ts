import { createWhoAmIIdentities, type WhoAmICategory } from "./types";

const category: WhoAmICategory = {
  id: "fictional-characters",
  label: "Fictional Characters",
};

export const fictionalCharacterIdentities = createWhoAmIIdentities(category, [
  "Spider-Man (Peter Parker)",
  "Shrek",
  "Darth Vader",
  "Hermione Granger",
  "Sherlock Holmes",
  "Mario",
  "Pikachu",
  "Elsa",
  "Batman (Bruce Wayne)",
  "Katniss Everdeen",
  "SpongeBob SquarePants",
  "Wednesday Addams",
  "Yoda",
  "Winnie-the-Pooh",
  "Barbie",
  "Homer Simpson",
  "Mickey Mouse",
  "Frodo Baggins",
]);
