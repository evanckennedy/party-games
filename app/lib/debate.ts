import { debateCategories, debateClaims } from "../data/debate";
import type { DebateCategoryChoice, DebateClaim } from "../data/debate";
import { secureRandomIndex } from "./random";

export type DebatePair = [firstPlayerIndex: number, secondPlayerIndex: number];

export function createDebateRotation(playerCount: number): DebatePair[] {
  if (!Number.isInteger(playerCount) || playerCount < 2 || playerCount > 12) {
    throw new RangeError("playerCount must be between 2 and 12");
  }

  const players = Array.from({ length: playerCount }, (_, index) => index);
  for (let index = players.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomIndex(index + 1);
    [players[index], players[swapIndex]] = [players[swapIndex], players[index]];
  }

  const pairings: DebatePair[] = [];
  for (let index = 0; index + 1 < players.length; index += 2) {
    pairings.push([players[index], players[index + 1]]);
  }

  if (players.length % 2 === 1) {
    const unplayedPlayer = players[players.length - 1];
    const returningPlayer = players[secureRandomIndex(players.length - 1)];
    pairings.push([unplayedPlayer, returningPlayer]);
  }

  return pairings;
}

export function chooseDebateClaim(
  categoryChoice: DebateCategoryChoice,
  remainingClaims: DebateClaim[],
  previousClaimId: string | null,
): { claim: DebateClaim; remaining: DebateClaim[] } {
  const eligibleClaims =
    categoryChoice === "random"
      ? debateClaims
      : debateClaims.filter((claim) => claim.category === categoryChoice);
  let availableClaims =
    remainingClaims.length > 0
      ? remainingClaims
      : eligibleClaims.filter((claim) => claim.id !== previousClaimId);

  if (availableClaims.length === 0) availableClaims = eligibleClaims;

  let claim: DebateClaim;
  if (categoryChoice === "random") {
    const availableCategories = debateCategories.filter((category) =>
      availableClaims.some(
        (availableClaim) => availableClaim.category === category.id,
      ),
    );
    const category =
      availableCategories[secureRandomIndex(availableCategories.length)];
    const categoryClaims = availableClaims.filter(
      (availableClaim) => availableClaim.category === category.id,
    );
    claim = categoryClaims[secureRandomIndex(categoryClaims.length)];
  } else {
    claim = availableClaims[secureRandomIndex(availableClaims.length)];
  }

  return {
    claim,
    remaining: availableClaims.filter(
      (availableClaim) => availableClaim.id !== claim.id,
    ),
  };
}
