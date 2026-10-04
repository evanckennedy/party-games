import { debateCategories, debateClaims } from "../data/debate";
import type { DebateCategoryChoice, DebateClaim } from "../data/debate";
import { secureRandomIndex } from "./random";

export type DebatePair = [firstPlayerIndex: number, secondPlayerIndex: number];

export function createDebateRotation(playerCount: number): DebatePair[] {
  if (!Number.isInteger(playerCount) || playerCount < 2 || playerCount > 12) {
    throw new RangeError("playerCount must be between 2 and 12");
  }

  const playerOrder = Array.from({ length: playerCount }, (_, index) => index);
  for (let index = playerOrder.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomIndex(index + 1);
    [playerOrder[index], playerOrder[swapIndex]] = [
      playerOrder[swapIndex],
      playerOrder[index],
    ];
  }

  const pairings: DebatePair[] = [];
  for (let index = 0; index + 1 < playerOrder.length; index += 2) {
    pairings.push([playerOrder[index], playerOrder[index + 1]]);
  }

  if (playerOrder.length % 2 === 1) {
    const unplayedPlayer = playerOrder[playerOrder.length - 1];
    const returningPlayer =
      playerOrder[secureRandomIndex(playerOrder.length - 1)];
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
      availableClaims.some((candidate) => candidate.category === category.id),
    );
    const category =
      availableCategories[secureRandomIndex(availableCategories.length)];
    const categoryClaims = availableClaims.filter(
      (candidate) => candidate.category === category.id,
    );
    claim = categoryClaims[secureRandomIndex(categoryClaims.length)];
  } else {
    claim = availableClaims[secureRandomIndex(availableClaims.length)];
  }

  return {
    claim,
    remaining: availableClaims.filter((candidate) => candidate.id !== claim.id),
  };
}
