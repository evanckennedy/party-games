import { createWhoAmIIdentities, type WhoAmICategory } from "./types";

const category: WhoAmICategory = { id: "actors", label: "Actors & Actresses" };

export const actorIdentities = createWhoAmIIdentities(category, [
  "Ryan Reynolds",
  "Leonardo DiCaprio",
  "Dwayne Johnson",
  "Viola Davis",
  "Keanu Reeves",
  "Zendaya",
  "Jackie Chan",
  "Meryl Streep",
  "Pedro Pascal",
  "Priyanka Chopra Jonas",
  "Tom Hanks",
  "Morgan Freeman",
  "Emma Watson",
  "Samuel L. Jackson",
  "Simu Liu",
  "Michelle Yeoh",
]);
