import { actorIdentities } from "./actors";
import { athleteIdentities } from "./athletes";
import { comedianIdentities } from "./comedians";
import { fictionalCharacterIdentities } from "./fictional-characters";
import { historicalFigureIdentities } from "./historical-figures";
import { musicianIdentities } from "./musicians";
import { politicianIdentities } from "./politicians";
import type { WhoAmICategory } from "./types";

export type { WhoAmICategoryId, WhoAmIIdentity } from "./types";

export const whoAmICategories: WhoAmICategory[] = [
  { id: "actors", label: "Actors & Actresses" },
  { id: "musicians", label: "Singers & Musicians" },
  { id: "athletes", label: "Athletes" },
  { id: "historical-figures", label: "Historical Figures" },
  { id: "politicians", label: "Politicians" },
  { id: "comedians", label: "Comedians" },
  { id: "fictional-characters", label: "Fictional Characters" },
];

export const whoAmIIdentities = [
  ...actorIdentities,
  ...musicianIdentities,
  ...athleteIdentities,
  ...historicalFigureIdentities,
  ...politicianIdentities,
  ...comedianIdentities,
  ...fictionalCharacterIdentities,
];
