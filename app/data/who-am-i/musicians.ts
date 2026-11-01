import { createWhoAmIIdentities, type WhoAmICategory } from "./types";

const category: WhoAmICategory = {
  id: "musicians",
  label: "Singers & Musicians",
};

export const musicianIdentities = createWhoAmIIdentities(category, [
  "Taylor Swift",
  "Drake",
  "Beyoncé",
  "The Weeknd",
  "Céline Dion",
  "Freddie Mercury",
  "Rihanna",
  "Dolly Parton",
  "Bad Bunny",
  "Shania Twain",
  "Michael Jackson",
  "Adele",
  "Elton John",
  "Billie Eilish",
  "Snoop Dogg",
  "Kendrick Lamar",
]);
