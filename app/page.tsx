"use client";

import { useEffect, useState } from "react";
import { categories, type ImposterMode } from "./data/imposter";
import { quickWitPrompts } from "./data/quick-wit-data";
import { secureRandomIndex, secureShuffle } from "./lib/random";
import {
  triviaCategories,
  triviaQuestions,
  type TriviaCategoryId,
  type TriviaDifficulty,
  type TriviaQuestion,
} from "./data/trivia";
import { HomeScreen } from "./components/home-screen";
import { GameIntro } from "./components/game-guide";
import { QuickWitScreen } from "./components/quick-wit";
import { TriviaComplete, TriviaScreen, TriviaSetup } from "./components/trivia";
import { TierListBoard, TierListSetup } from "./components/tier-list";
import { WouldYouRatherScreen } from "./components/would-you-rather";
import { MostLikelyToScreen } from "./components/most-likely-to";
import { YesAndScreen } from "./components/yes-and";
import {
  DebateCategorySetup,
  DebatePlayersSetup,
  DebateReadyScreen,
  DebateResultScreen,
  DebateTimerScreen,
  DebateWinnerScreen,
  type DebateDuration,
  type DebateWinner,
} from "./components/debate";
import {
  RiddleScreen,
  RiddleSetup,
  type RiddleDifficultyChoice,
} from "./components/riddles";
import {
  SpellingBeeScreen,
  SpellingBeeSetup,
  type SpellingBeeDifficultyChoice,
} from "./components/spelling-bee";
import {
  wouldYouRatherPrompts,
  type WouldYouRatherPrompt,
} from "./data/would-you-rather";
import {
  mostLikelyPrompts,
  type MostLikelyPrompt,
} from "./data/most-likely-to";
import { yesAndScenes, type YesAndScene } from "./data/yes-and";
import { type DebateCategoryChoice, type DebateClaim } from "./data/debate";
import {
  chooseDebateClaim,
  createDebateRotation,
  type DebatePair,
} from "./lib/debate-rotation";
import { riddles, type Riddle } from "./data/riddles";
import {
  spellingBeeWords,
  type SpellingBeeDifficulty,
  type SpellingBeeWord,
} from "./data/spelling-bee";
import {
  whoAmIIdentities,
  type WhoAmICategoryId,
  type WhoAmIIdentity,
} from "./data/who-am-i";
import { WhoAmIScreen, WhoAmISetup } from "./components/who-am-i";
import { CharadesScreen } from "./components/charades";
import {
  charadesPrompts,
  type CharadesPrompt,
} from "./data/charades";
import { HotTakeScreen } from "./components/hot-take";
import { hotTakes, type HotTake } from "./data/hot-takes";
import {
  BlindRankingsResult,
  BlindRankingsRound,
  BlindRankingsSetup,
} from "./components/blind-rankings";
import {
  blindRankingCategories,
  blindRankingItems,
  type BlindRankingCategoryId,
  type BlindRankingItem,
} from "./data/blind-rankings";
import {
  LetsTalkQuestionScreen,
  LetsTalkSetup,
} from "./components/lets-talk";
import {
  letsTalkCategories,
  letsTalkQuestions,
  type LetsTalkCategoryId,
  type LetsTalkQuestion,
} from "./data/lets-talk";
import {
  LogicScreen,
  LogicSetup,
  type LogicDifficultyChoice,
} from "./components/logic";
import {
  logicChallenges,
  type LogicChallenge,
  type LogicDifficulty,
} from "./data/logic";
import {
  DiscussionScreen,
  FinalScreen,
  GuessScreen,
  ImposterSetup,
  RevealScreen,
  ResultScreen,
  RulesScreen,
  type ImposterRound,
  type SetupStep,
} from "./components/imposter";

type Screen =
  | "home"
  | "setup"
  | "reveal"
  | "rules"
  | "discussion"
  | "result"
  | "guess"
  | "final"
  | "quick-wit-intro"
  | "quick-wit"
  | "trivia-setup"
  | "trivia"
  | "trivia-complete"
  | "tier-list-setup"
  | "tier-list"
  | "would-you-rather"
  | "would-you-rather-intro"
  | "most-likely-to"
  | "most-likely-to-intro"
  | "yes-and"
  | "yes-and-intro"
  | "debate-players"
  | "debate-category"
  | "debate-ready"
  | "debate-active"
  | "debate-winner"
  | "debate-result"
  | "riddle-setup"
  | "riddle"
  | "spelling-bee-setup"
  | "spelling-bee"
  | "who-am-i-setup"
  | "who-am-i"
  | "charades"
  | "charades-intro"
  | "hot-take"
  | "hot-take-intro"
  | "logic-setup"
  | "logic"
  | "blind-rankings-setup"
  | "blind-rankings"
  | "blind-rankings-result"
  | "lets-talk-setup"
  | "lets-talk";

type LetsTalkCategoryChoice = LetsTalkCategoryId | "random";
type CurrentDebate = {
  claim: DebateClaim;
  defendIndex: number;
  attackIndex: number;
};
const initialNames = ["Alex", "Jordan", "Sam", "Taylor"];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [step, setStep] = useState<SetupStep>(1);
  const [names, setNames] = useState<string[]>(() => {
    if (typeof window === "undefined") return initialNames;

    const stored = window.sessionStorage.getItem("party-games-imposter-names");
    if (!stored) return initialNames;

    try {
      const storedNames = JSON.parse(stored) as string[];
      return Array.isArray(storedNames) && storedNames.length >= 3
        ? storedNames
        : initialNames;
    } catch {
      window.sessionStorage.removeItem("party-games-imposter-names");
      return initialNames;
    }
  });
  const [categoryId, setCategoryId] = useState("random");
  const [mode, setMode] = useState<ImposterMode>("classic");
  const [round, setRound] = useState<ImposterRound | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [revealStartIndex, setRevealStartIndex] = useState(0);
  const [nextRevealStartIndex, setNextRevealStartIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [identified, setIdentified] = useState<boolean | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean | null>(
    null,
  );
  const [quickWitPromptIndex, setQuickWitPromptIndex] = useState(0);
  const [seenQuickWitPrompts, setSeenQuickWitPrompts] = useState<number[]>([0]);
  const [triviaCategory, setTriviaCategory] = useState<
    TriviaCategoryId | "random"
  >("random");
  const [triviaDifficulty, setTriviaDifficulty] = useState<
    TriviaDifficulty | "mixed"
  >("mixed");
  const [triviaQuestion, setTriviaQuestion] = useState<
    (typeof triviaQuestions)[number] | null
  >(null);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [remainingTriviaQuestions, setRemainingTriviaQuestions] = useState<
    TriviaQuestion[]
  >([]);
  const [tierListTitle, setTierListTitle] = useState("");
  const [tierListItems, setTierListItems] = useState<string[]>([]);
  const [wouldYouRatherPrompt, setWouldYouRatherPrompt] =
    useState<WouldYouRatherPrompt | null>(null);
  const [remainingWouldYouRatherPrompts, setRemainingWouldYouRatherPrompts] =
    useState<WouldYouRatherPrompt[]>([]);
  const [mostLikelyPrompt, setMostLikelyPrompt] =
    useState<MostLikelyPrompt | null>(null);
  const [remainingMostLikelyPrompts, setRemainingMostLikelyPrompts] = useState<
    MostLikelyPrompt[]
  >([]);
  const [yesAndScene, setYesAndScene] = useState<YesAndScene | null>(null);
  const [remainingYesAndScenes, setRemainingYesAndScenes] = useState<
    YesAndScene[]
  >([]);
  const [debateNames, setDebateNames] = useState<string[]>(() => {
    if (typeof window === "undefined") return initialNames;

    const stored = window.sessionStorage.getItem("party-games-debate-names");
    if (!stored) return initialNames;

    try {
      const parsed = JSON.parse(stored) as unknown;
      return Array.isArray(parsed) &&
        parsed.length >= 2 &&
        parsed.length <= 12 &&
        parsed.every((name) => typeof name === "string")
        ? parsed
        : initialNames;
    } catch {
      window.sessionStorage.removeItem("party-games-debate-names");
      return initialNames;
    }
  });
  const [debateCategory, setDebateCategory] =
    useState<DebateCategoryChoice>("random");
  const [debateDuration, setDebateDuration] = useState<DebateDuration>(60);
  const [currentDebate, setCurrentDebate] = useState<CurrentDebate | null>(
    null,
  );
  const [debatePairings, setDebatePairings] = useState<DebatePair[]>([]);
  const [remainingDebateClaims, setRemainingDebateClaims] = useState<
    DebateClaim[]
  >([]);
  const [debateWinner, setDebateWinner] = useState<DebateWinner | null>(null);
  const [riddleDifficulty, setRiddleDifficulty] =
    useState<RiddleDifficultyChoice>("random");
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const [riddleRevealed, setRiddleRevealed] = useState(false);
  const [remainingRiddles, setRemainingRiddles] = useState<Riddle[]>([]);
  const [spellingBeeDifficulty, setSpellingBeeDifficulty] =
    useState<SpellingBeeDifficultyChoice>("random");
  const [spellingBeeWord, setSpellingBeeWord] =
    useState<SpellingBeeWord | null>(null);
  const [remainingSpellingBeeWords, setRemainingSpellingBeeWords] = useState<
    SpellingBeeWord[]
  >([]);
  const [whoAmICategory, setWhoAmICategory] = useState<
    WhoAmICategoryId | "random"
  >("random");
  const [whoAmIIdentity, setWhoAmIIdentity] =
    useState<WhoAmIIdentity | null>(null);
  const [remainingWhoAmIIdentities, setRemainingWhoAmIIdentities] = useState<
    WhoAmIIdentity[]
  >([]);
  const [charadesPrompt, setCharadesPrompt] =
    useState<CharadesPrompt | null>(null);
  const [remainingCharadesPrompts, setRemainingCharadesPrompts] = useState<
    CharadesPrompt[]
  >([]);
  const [hotTake, setHotTake] = useState<HotTake | null>(null);
  const [remainingHotTakes, setRemainingHotTakes] = useState<HotTake[]>([]);
  const [logicDifficulty, setLogicDifficulty] =
    useState<LogicDifficultyChoice>("random");
  const [logicChallenge, setLogicChallenge] =
    useState<LogicChallenge | null>(null);
  const [remainingLogicChallenges, setRemainingLogicChallenges] = useState<
    LogicChallenge[]
  >([]);
  const [blindRankingCategoryLabel, setBlindRankingCategoryLabel] =
    useState("");
  const [blindRankingRoundItems, setBlindRankingRoundItems] = useState<
    BlindRankingItem[]
  >([]);
  const [blindRankings, setBlindRankings] = useState<
    (BlindRankingItem | null)[]
  >(() => Array(5).fill(null));
  const [letsTalkCategory, setLetsTalkCategory] =
    useState<LetsTalkCategoryChoice>("random");
  const [letsTalkQuestion, setLetsTalkQuestion] =
    useState<LetsTalkQuestion | null>(null);
  const [remainingLetsTalkQuestions, setRemainingLetsTalkQuestions] =
    useState<Partial<Record<LetsTalkCategoryChoice, LetsTalkQuestion[]>>>({});

  useEffect(() => {
    window.sessionStorage.setItem(
      "party-games-imposter-names",
      JSON.stringify(names),
    );
  }, [names]);

  useEffect(() => {
    window.sessionStorage.setItem(
      "party-games-debate-names",
      JSON.stringify(debateNames),
    );
  }, [debateNames]);

  const resetHome = () => {
    setScreen("home");
    setStep(1);
    setRound(null);
    setRevealStartIndex(0);
    setNextRevealStartIndex(0);
    setRevealed(false);
    setIdentified(null);
    setGuessedCorrectly(null);
    setTriviaQuestion(null);
    setTriviaAnswered(false);
    setRemainingTriviaQuestions([]);
    setTierListTitle("");
    setTierListItems([]);
    setWouldYouRatherPrompt(null);
    setRemainingWouldYouRatherPrompts([]);
    setMostLikelyPrompt(null);
    setRemainingMostLikelyPrompts([]);
    setYesAndScene(null);
    setRemainingYesAndScenes([]);
    setCurrentDebate(null);
    setDebatePairings([]);
    setRemainingDebateClaims([]);
    setDebateWinner(null);
    setRiddle(null);
    setRiddleRevealed(false);
    setRemainingRiddles([]);
    setSpellingBeeWord(null);
    setRemainingSpellingBeeWords([]);
    setWhoAmIIdentity(null);
    setRemainingWhoAmIIdentities([]);
    setCharadesPrompt(null);
    setRemainingCharadesPrompts([]);
    setHotTake(null);
    setRemainingHotTakes([]);
    setLogicChallenge(null);
    setRemainingLogicChallenges([]);
    setBlindRankingCategoryLabel("");
    setBlindRankingRoundItems([]);
    setBlindRankings(Array(5).fill(null));
    setLetsTalkCategory("random");
    setLetsTalkQuestion(null);
    setRemainingLetsTalkQuestions({});
  };
  const openImposter = () => setScreen("setup");
  const startRound = () => {
    const startingIndex = nextRevealStartIndex % names.length;
    const selectedCategory =
      categoryId === "random"
        ? categories[secureRandomIndex(categories.length)]
        : (categories.find((category) => category.id === categoryId) ??
          categories[0]);
    const wordIndex = secureRandomIndex(selectedCategory.words.length);
    setRound({
      secret: selectedCategory.words[wordIndex],
      undercover:
        selectedCategory.words[(wordIndex + 1) % selectedCategory.words.length],
      imposter: secureRandomIndex(names.length),
      category: selectedCategory.label,
    });
    setRevealStartIndex(startingIndex);
    setNextRevealStartIndex((startingIndex + 1) % names.length);
    setRevealIndex(0);
    setRevealed(false);
    setScreen("reveal");
  };
  const startQuickWit = () => {
    const firstPrompt = secureRandomIndex(quickWitPrompts.length);
    setQuickWitPromptIndex(firstPrompt);
    setSeenQuickWitPrompts([firstPrompt]);
    setScreen("quick-wit");
  };
  const nextQuickWitPrompt = () => {
    const unvisitedPrompts = quickWitPrompts
      .map((_, index) => index)
      .filter((index) => !seenQuickWitPrompts.includes(index));
    const availablePrompts =
      unvisitedPrompts.length > 0
        ? unvisitedPrompts
        : quickWitPrompts
            .map((_, index) => index)
            .filter((index) => index !== quickWitPromptIndex);
    const next = availablePrompts[secureRandomIndex(availablePrompts.length)];
    setQuickWitPromptIndex(next);
    setSeenQuickWitPrompts(
      unvisitedPrompts.length > 0
        ? [...seenQuickWitPrompts, next]
        : [next],
    );
  };
  const getTriviaPool = () => {
    const categoryPool =
      triviaCategory === "random"
        ? triviaCategories.map((category) => category.id)
        : [triviaCategory];
    return triviaQuestions.filter(
      (question) =>
        categoryPool.includes(question.category) &&
        (triviaDifficulty === "mixed" ||
          question.difficulty === triviaDifficulty),
    );
  };
  const chooseTriviaQuestion = (pool: TriviaQuestion[]) => {
    const question = pool[secureRandomIndex(pool.length)];
    setTriviaQuestion(question);
    setRemainingTriviaQuestions(
      pool.filter((candidate) => candidate.question !== question.question),
    );
    setTriviaAnswered(false);
    setScreen("trivia");
  };
  const startTriviaSet = () => chooseTriviaQuestion(getTriviaPool());
  const nextTriviaQuestion = () => {
    if (remainingTriviaQuestions.length === 0) {
      setTriviaQuestion(null);
      setScreen("trivia-complete");
      return;
    }
    chooseTriviaQuestion(remainingTriviaQuestions);
  };
  const startTrivia = () => {
    setTriviaQuestion(null);
    setTriviaAnswered(false);
    setRemainingTriviaQuestions([]);
    setScreen("trivia-setup");
  };
  const startTierList = () => setScreen("tier-list-setup");
  const beginTierList = (title: string, items: string[]) => {
    setTierListTitle(title);
    setTierListItems(items);
    setScreen("tier-list");
  };
  const startWouldYouRather = () => {
    const firstIndex = secureRandomIndex(wouldYouRatherPrompts.length);
    const firstPrompt = wouldYouRatherPrompts[firstIndex];
    setWouldYouRatherPrompt(firstPrompt);
    setRemainingWouldYouRatherPrompts(
      wouldYouRatherPrompts.filter((prompt) => prompt.id !== firstPrompt.id),
    );
    setScreen("would-you-rather");
  };
  const nextWouldYouRather = () => {
    const availablePrompts =
      remainingWouldYouRatherPrompts.length > 0
        ? remainingWouldYouRatherPrompts
        : wouldYouRatherPrompts.filter(
            (prompt) => prompt.id !== wouldYouRatherPrompt?.id,
          );
    const nextIndex = secureRandomIndex(availablePrompts.length);
    const nextPrompt = availablePrompts[nextIndex];
    setWouldYouRatherPrompt(nextPrompt);
    setRemainingWouldYouRatherPrompts(
      availablePrompts.filter((prompt) => prompt.id !== nextPrompt.id),
    );
  };
  const startMostLikelyTo = () => {
    const firstPromptIndex = secureRandomIndex(mostLikelyPrompts.length);
    const firstPrompt = mostLikelyPrompts[firstPromptIndex];
    setMostLikelyPrompt(firstPrompt);
    setRemainingMostLikelyPrompts(
      mostLikelyPrompts.filter((prompt) => prompt.id !== firstPrompt.id),
    );
    setScreen("most-likely-to");
  };
  const nextMostLikelyPrompt = () => {
    const availablePrompts =
      remainingMostLikelyPrompts.length > 0
        ? remainingMostLikelyPrompts
        : mostLikelyPrompts.filter(
            (prompt) => prompt.id !== mostLikelyPrompt?.id,
          );
    const nextIndex = secureRandomIndex(availablePrompts.length);
    const nextPrompt = availablePrompts[nextIndex];
    setMostLikelyPrompt(nextPrompt);
    setRemainingMostLikelyPrompts(
      availablePrompts.filter((prompt) => prompt.id !== nextPrompt.id),
    );
  };
  const startYesAnd = () => {
    const firstSceneIndex = secureRandomIndex(yesAndScenes.length);
    const firstScene = yesAndScenes[firstSceneIndex];
    setYesAndScene(firstScene);
    setRemainingYesAndScenes(
      yesAndScenes.filter((scene) => scene.id !== firstScene.id),
    );
    setScreen("yes-and");
  };
  const nextYesAndScene = () => {
    const availableScenes =
      remainingYesAndScenes.length > 0
        ? remainingYesAndScenes
        : yesAndScenes.filter((scene) => scene.id !== yesAndScene?.id);
    const nextIndex = secureRandomIndex(availableScenes.length);
    const nextScene = availableScenes[nextIndex];
    setYesAndScene(nextScene);
    setRemainingYesAndScenes(
      availableScenes.filter((scene) => scene.id !== nextScene.id),
    );
  };
  const getRiddlePool = () =>
    riddleDifficulty === "random"
      ? riddles
      : riddles.filter((item) => item.difficulty === riddleDifficulty);
  const chooseRiddle = (pool: Riddle[]) => {
    const selectedRiddle = pool[secureRandomIndex(pool.length)];
    setRiddle(selectedRiddle);
    setRemainingRiddles(pool.filter((item) => item.id !== selectedRiddle.id));
    setRiddleRevealed(false);
    setScreen("riddle");
  };
  const startRiddles = () => setScreen("riddle-setup");
  const startRiddleRun = () => chooseRiddle(getRiddlePool());
  const nextRiddle = () => {
    const availableRiddles =
      remainingRiddles.length > 0
        ? remainingRiddles
        : getRiddlePool().filter((item) => item.id !== riddle?.id);
    chooseRiddle(availableRiddles);
  };
  const getSpellingBeePool = () =>
    spellingBeeDifficulty === "random"
      ? spellingBeeWords
      : spellingBeeWords.filter(
          (word) => word.difficulty === spellingBeeDifficulty,
        );
  const chooseSpellingBeeWord = (pool: SpellingBeeWord[]) => {
    const availableDifficulties: SpellingBeeDifficulty[] =
      spellingBeeDifficulty === "random"
        ? (["easy", "medium", "hard"] as const).filter((difficulty) =>
            pool.some((word) => word.difficulty === difficulty),
          )
        : [spellingBeeDifficulty];
    const selectedDifficulty =
      availableDifficulties[secureRandomIndex(availableDifficulties.length)];
    const difficultyPool = pool.filter(
      (word) => word.difficulty === selectedDifficulty,
    );
    const selectedWord = difficultyPool[secureRandomIndex(difficultyPool.length)];
    setSpellingBeeWord(selectedWord);
    setRemainingSpellingBeeWords(
      pool.filter((word) => word.id !== selectedWord.id),
    );
    setScreen("spelling-bee");
  };
  const startSpellingBee = () => setScreen("spelling-bee-setup");
  const startSpellingBeeRound = () =>
    chooseSpellingBeeWord(getSpellingBeePool());
  const nextSpellingBeeWord = () => {
    const availableWords =
      remainingSpellingBeeWords.length > 0
        ? remainingSpellingBeeWords
        : getSpellingBeePool().filter(
            (word) => word.id !== spellingBeeWord?.id,
          );
    chooseSpellingBeeWord(availableWords);
  };
  const getWhoAmIPool = (category: WhoAmICategoryId | "random") =>
    category === "random"
      ? whoAmIIdentities
      : whoAmIIdentities.filter((identity) => identity.category === category);
  const chooseWhoAmIIdentity = (pool: WhoAmIIdentity[]) => {
    const identity = pool[secureRandomIndex(pool.length)];
    setWhoAmIIdentity(identity);
    setRemainingWhoAmIIdentities(
      pool.filter((candidate) => candidate.id !== identity.id),
    );
    setScreen("who-am-i");
  };
  const startWhoAmI = () => setScreen("who-am-i-setup");
  const selectWhoAmICategory = (category: WhoAmICategoryId | "random") => {
    setWhoAmICategory(category);
    chooseWhoAmIIdentity(getWhoAmIPool(category));
  };
  const nextWhoAmIPerson = () => {
    const availableIdentities =
      remainingWhoAmIIdentities.length > 0
        ? remainingWhoAmIIdentities
        : getWhoAmIPool(whoAmICategory).filter(
            (identity) => identity.id !== whoAmIIdentity?.id,
          );
    chooseWhoAmIIdentity(availableIdentities);
  };
  const chooseCharadesPrompt = (
    pool: CharadesPrompt[],
    previousCategory: CharadesPrompt["category"] | null,
  ) => {
    const differentCategory = previousCategory
      ? pool.filter((prompt) => prompt.category !== previousCategory)
      : pool;
    const selectionPool =
      differentCategory.length > 0 ? differentCategory : pool;
    const prompt = selectionPool[secureRandomIndex(selectionPool.length)];
    setCharadesPrompt(prompt);
    setRemainingCharadesPrompts(
      pool.filter((candidate) => candidate.id !== prompt.id),
    );
    setScreen("charades");
  };
  const startCharades = () => chooseCharadesPrompt(charadesPrompts, null);
  const nextCharade = () => {
    const availablePrompts =
      remainingCharadesPrompts.length > 0
        ? remainingCharadesPrompts
        : charadesPrompts.filter(
            (prompt) => prompt.id !== charadesPrompt?.id,
          );
    chooseCharadesPrompt(
      availablePrompts,
      charadesPrompt?.category ?? null,
    );
  };
  const chooseHotTake = (pool: HotTake[]) => {
    const selected = pool[secureRandomIndex(pool.length)];
    setHotTake(selected);
    setRemainingHotTakes(
      pool.filter((candidate) => candidate.id !== selected.id),
    );
    setScreen("hot-take");
  };
  const startHotTakes = () => chooseHotTake(hotTakes);
  const nextHotTake = () => {
    const availableHotTakes =
      remainingHotTakes.length > 0
        ? remainingHotTakes
        : hotTakes.filter((candidate) => candidate.id !== hotTake?.id);
    chooseHotTake(availableHotTakes);
  };
  const getLogicPool = () =>
    logicDifficulty === "random"
      ? logicChallenges
      : logicChallenges.filter(
          (challenge) => challenge.difficulty === logicDifficulty,
        );
  const chooseLogicChallenge = (pool: LogicChallenge[]) => {
    const availableDifficulties: LogicDifficulty[] =
      logicDifficulty === "random"
        ? (["easy", "medium", "hard"] as const).filter((difficulty) =>
            pool.some((challenge) => challenge.difficulty === difficulty),
          )
        : [logicDifficulty];
    const selectedDifficulty =
      availableDifficulties[secureRandomIndex(availableDifficulties.length)];
    const difficultyPool = pool.filter(
      (challenge) => challenge.difficulty === selectedDifficulty,
    );
    const selectedChallenge =
      difficultyPool[secureRandomIndex(difficultyPool.length)];
    setLogicChallenge(selectedChallenge);
    setRemainingLogicChallenges(
      pool.filter((challenge) => challenge.id !== selectedChallenge.id),
    );
    setScreen("logic");
  };
  const startLogic = () => setScreen("logic-setup");
  const startLogicRun = () => chooseLogicChallenge(getLogicPool());
  const nextLogicChallenge = () => {
    const availableChallenges =
      remainingLogicChallenges.length > 0
        ? remainingLogicChallenges
        : getLogicPool().filter(
            (challenge) => challenge.id !== logicChallenge?.id,
          );
    chooseLogicChallenge(availableChallenges);
  };
  const startBlindRankings = (
    categoryId: BlindRankingCategoryId | "random",
  ) => {
    const category =
      categoryId === "random"
        ? null
        : blindRankingCategories.find((candidate) => candidate.id === categoryId);
    const pool =
      categoryId === "random"
        ? blindRankingItems
        : blindRankingItems.filter((item) => item.categoryId === categoryId);
    const shuffled = secureShuffle(pool);
    setBlindRankingCategoryLabel(category?.label ?? "Random Mix");
    setBlindRankingRoundItems(shuffled.slice(0, 5));
    setBlindRankings(Array(5).fill(null));
    setScreen("blind-rankings");
  };
  const assignBlindRanking = (rankIndex: number) => {
    if (rankIndex < 0 || rankIndex >= 5 || blindRankings[rankIndex]) return;
    const itemsRanked = blindRankings.filter(
      (item): item is BlindRankingItem => item !== null,
    ).length;
    const item = blindRankingRoundItems[itemsRanked];
    if (!item) return;
    const nextRankings = blindRankings.map((rankedItem, index) =>
      index === rankIndex ? item : rankedItem,
    );
    setBlindRankings(nextRankings);
    if (nextRankings.every((rankedItem) => rankedItem !== null)) {
      setScreen("blind-rankings-result");
    }
  };
  const restartBlindRankings = () => {
    setBlindRankingRoundItems([]);
    setBlindRankings(Array(5).fill(null));
    setBlindRankingCategoryLabel("");
    setScreen("blind-rankings-setup");
  };
  const chooseLetsTalkQuestion = (categoryChoice: LetsTalkCategoryChoice) => {
    const pool =
      categoryChoice === "random"
        ? letsTalkQuestions
        : letsTalkQuestions.filter(
            (question) => question.categoryId === categoryChoice,
          );
    const remaining = remainingLetsTalkQuestions[categoryChoice];
    const available =
      remaining && remaining.length > 0
        ? remaining
        : pool.filter(
            (question) => question.id !== letsTalkQuestion?.id,
          );
    const selected = available[secureRandomIndex(available.length)];
    setLetsTalkCategory(categoryChoice);
    setLetsTalkQuestion(selected);
    setRemainingLetsTalkQuestions((current) => ({
      ...current,
      [categoryChoice]: available.filter(
        (question) => question.id !== selected.id,
      ),
    }));
    setScreen("lets-talk");
  };
  const startLetsTalk = () => setScreen("lets-talk-setup");
  const nextLetsTalkQuestion = () =>
    chooseLetsTalkQuestion(letsTalkCategory);
  const prepareDebateRound = (
    pairing: DebatePair,
    categoryChoice: DebateCategoryChoice,
    remainingClaims: DebateClaim[],
    previousClaimId: string | null,
  ) => {
    const { claim, remaining } = chooseDebateClaim(
      categoryChoice,
      remainingClaims,
      previousClaimId,
    );

    const [firstPlayer, secondPlayer] = pairing;
    const firstPlayerDefends = secureRandomIndex(2) === 0;
    setCurrentDebate({
      claim,
      defendIndex: firstPlayerDefends ? firstPlayer : secondPlayer,
      attackIndex: firstPlayerDefends ? secondPlayer : firstPlayer,
    });
    setRemainingDebateClaims(remaining);
    setDebateWinner(null);
    setScreen("debate-ready");
  };
  const beginDebateSession = (categoryChoice: DebateCategoryChoice) => {
    const rotation = createDebateRotation(debateNames.length);
    setDebateCategory(categoryChoice);
    setDebatePairings(rotation.slice(1));
    prepareDebateRound(rotation[0], categoryChoice, [], null);
  };
  const nextDebate = () => {
    let nextPairing: DebatePair;
    let remainingPairings: DebatePair[];
    if (debatePairings.length > 0) {
      [nextPairing, ...remainingPairings] = debatePairings;
    } else {
      const nextRotation = createDebateRotation(debateNames.length);
      [nextPairing, ...remainingPairings] = nextRotation;
    }
    setDebatePairings(remainingPairings);
    prepareDebateRound(
      nextPairing,
      debateCategory,
      remainingDebateClaims,
      currentDebate?.claim.id ?? null,
    );
  };
  const chooseDebateWinner = (winner: DebateWinner) => {
    setDebateWinner(winner);
    setScreen("debate-result");
  };

  if (screen === "home")
    return (
      <HomeScreen
        onImposter={openImposter}
        onQuickWit={() => setScreen("quick-wit-intro")}
        onTrivia={startTrivia}
        onTierList={startTierList}
        onWouldYouRather={() => setScreen("would-you-rather-intro")}
        onMostLikelyTo={() => setScreen("most-likely-to-intro")}
        onYesAnd={() => setScreen("yes-and-intro")}
        onRiddles={startRiddles}
        onSpellingBee={startSpellingBee}
        onWhoAmI={startWhoAmI}
        onCharades={() => setScreen("charades-intro")}
        onHotTake={() => setScreen("hot-take-intro")}
        onLogic={startLogic}
        onDebate={() => setScreen("debate-players")}
        onBlindRankings={() => setScreen("blind-rankings-setup")}
        onLetsTalk={startLetsTalk}
      />
    );
  if (screen === "quick-wit-intro")
    return (
      <GameIntro
        game="quick-wit"
        onHome={resetHome}
        onStart={startQuickWit}
      />
    );
  if (screen === "quick-wit")
    return (
      <QuickWitScreen
        prompt={quickWitPrompts[quickWitPromptIndex]}
        onHome={resetHome}
        onNext={nextQuickWitPrompt}
      />
    );
  if (screen === "would-you-rather-intro")
    return (
      <GameIntro
        game="would-you-rather"
        onHome={resetHome}
        onStart={startWouldYouRather}
      />
    );
  if (screen === "most-likely-to-intro")
    return (
      <GameIntro
        game="most-likely-to"
        onHome={resetHome}
        onStart={startMostLikelyTo}
      />
    );
  if (screen === "yes-and-intro")
    return (
      <GameIntro
        game="yes-and"
        onHome={resetHome}
        onStart={startYesAnd}
      />
    );
  if (screen === "trivia-setup")
    return (
      <TriviaSetup
        category={triviaCategory}
        setCategory={setTriviaCategory}
        difficulty={triviaDifficulty}
        setDifficulty={setTriviaDifficulty}
        onHome={resetHome}
        onStart={startTriviaSet}
      />
    );
  if (screen === "trivia" && triviaQuestion)
    return (
      <TriviaScreen
        question={triviaQuestion}
        answered={triviaAnswered}
        onReveal={() => setTriviaAnswered(true)}
        onNext={nextTriviaQuestion}
        onHome={resetHome}
      />
    );
  if (screen === "trivia-complete")
    return <TriviaComplete onRestart={startTrivia} onHome={resetHome} />;
  if (screen === "tier-list-setup")
    return <TierListSetup onHome={resetHome} onStart={beginTierList} />;
  if (screen === "tier-list")
    return (
      <TierListBoard
        title={tierListTitle}
        items={tierListItems}
        onHome={resetHome}
        onRestart={startTierList}
      />
    );
  if (screen === "would-you-rather" && wouldYouRatherPrompt)
    return (
      <WouldYouRatherScreen
        prompt={wouldYouRatherPrompt}
        onHome={resetHome}
        onNext={nextWouldYouRather}
      />
    );
  if (screen === "most-likely-to" && mostLikelyPrompt)
    return (
      <MostLikelyToScreen
        prompt={mostLikelyPrompt}
        onHome={resetHome}
        onNext={nextMostLikelyPrompt}
      />
    );
  if (screen === "yes-and" && yesAndScene)
    return (
      <YesAndScreen
        scene={yesAndScene}
        onHome={resetHome}
        onNext={nextYesAndScene}
      />
    );
  if (screen === "riddle-setup")
    return (
      <RiddleSetup
        difficulty={riddleDifficulty}
        setDifficulty={setRiddleDifficulty}
        onHome={resetHome}
        onStart={startRiddleRun}
      />
    );
  if (screen === "riddle" && riddle)
    return (
      <RiddleScreen
        riddle={riddle}
        revealed={riddleRevealed}
        onReveal={() => setRiddleRevealed(true)}
        onNext={nextRiddle}
        onHome={resetHome}
      />
    );
  if (screen === "spelling-bee-setup")
    return (
      <SpellingBeeSetup
        difficulty={spellingBeeDifficulty}
        setDifficulty={setSpellingBeeDifficulty}
        onHome={resetHome}
        onStart={startSpellingBeeRound}
      />
    );
  if (screen === "spelling-bee" && spellingBeeWord)
    return (
      <SpellingBeeScreen
        word={spellingBeeWord}
        onNext={nextSpellingBeeWord}
        onHome={resetHome}
      />
    );
  if (screen === "who-am-i-setup")
    return (
      <WhoAmISetup
        onHome={resetHome}
        onSelectCategory={selectWhoAmICategory}
      />
    );
  if (screen === "who-am-i" && whoAmIIdentity)
    return (
      <WhoAmIScreen
        identity={whoAmIIdentity}
        onHome={resetHome}
        onNext={nextWhoAmIPerson}
      />
    );
  if (screen === "charades-intro")
    return (
      <GameIntro
        game="charades"
        onHome={resetHome}
        onStart={startCharades}
      />
    );
  if (screen === "charades" && charadesPrompt)
    return (
      <CharadesScreen
        key={charadesPrompt.id}
        prompt={charadesPrompt}
        onHome={resetHome}
        onNext={nextCharade}
      />
    );
  if (screen === "hot-take-intro")
    return (
      <GameIntro
        game="hot-take"
        onHome={resetHome}
        onStart={startHotTakes}
      />
    );
  if (screen === "hot-take" && hotTake)
    return (
      <HotTakeScreen
        hotTake={hotTake}
        onHome={resetHome}
        onNext={nextHotTake}
      />
    );
  if (screen === "logic-setup")
    return (
      <LogicSetup
        difficulty={logicDifficulty}
        setDifficulty={setLogicDifficulty}
        onHome={resetHome}
        onStart={startLogicRun}
      />
    );
  if (screen === "logic" && logicChallenge)
    return (
      <LogicScreen
        key={logicChallenge.id}
        challenge={logicChallenge}
        onHome={resetHome}
        onNext={nextLogicChallenge}
      />
    );
  if (screen === "blind-rankings-setup")
    return (
      <BlindRankingsSetup
        onHome={resetHome}
        onSelectCategory={startBlindRankings}
      />
    );
  const blindItemsRanked = blindRankings.filter(
    (item): item is BlindRankingItem => item !== null,
  ).length;
  if (
    screen === "blind-rankings" &&
    blindRankingRoundItems[blindItemsRanked]
  )
    return (
      <BlindRankingsRound
        categoryLabel={blindRankingCategoryLabel}
        item={blindRankingRoundItems[blindItemsRanked]}
        itemsRanked={blindItemsRanked}
        rankings={blindRankings}
        onAssign={assignBlindRanking}
        onHome={resetHome}
      />
    );
  if (
    screen === "blind-rankings-result" &&
    blindRankings.every(
      (item): item is BlindRankingItem => item !== null,
    )
  )
    return (
      <BlindRankingsResult
        categoryLabel={blindRankingCategoryLabel}
        rankings={blindRankings}
        onHome={resetHome}
        onPlayAgain={restartBlindRankings}
      />
    );
  if (screen === "lets-talk-setup")
    return (
      <LetsTalkSetup
        onHome={resetHome}
        onSelectCategory={chooseLetsTalkQuestion}
      />
    );
  if (screen === "lets-talk" && letsTalkQuestion)
    return (
      <LetsTalkQuestionScreen
        selectedCategoryLabel={
          letsTalkCategory === "random"
            ? "Random"
            : (letsTalkCategories.find(
                (category) => category.id === letsTalkCategory,
              )?.label ?? "Random")
        }
        question={letsTalkQuestion}
        onHome={resetHome}
        onCategories={() => setScreen("lets-talk-setup")}
        onNext={nextLetsTalkQuestion}
      />
    );
  if (screen === "debate-players")
    return (
      <DebatePlayersSetup
        names={debateNames}
        setNames={setDebateNames}
        onHome={resetHome}
        onContinue={() => setScreen("debate-category")}
      />
    );
  if (screen === "debate-category")
    return (
      <DebateCategorySetup
        selected={debateCategory}
        setSelected={setDebateCategory}
        onHome={resetHome}
        onContinue={() => beginDebateSession(debateCategory)}
      />
    );
  if (screen === "debate-ready" && currentDebate)
    return (
      <DebateReadyScreen
        claim={currentDebate.claim}
        defendName={debateNames[currentDebate.defendIndex]}
        attackName={debateNames[currentDebate.attackIndex]}
        audienceNames={debateNames.filter(
          (_, index) =>
            index !== currentDebate.defendIndex &&
            index !== currentDebate.attackIndex,
        )}
        duration={debateDuration}
        setDuration={setDebateDuration}
        onHome={resetHome}
        onStart={() => setScreen("debate-active")}
      />
    );
  if (screen === "debate-active" && currentDebate)
    return (
      <DebateTimerScreen
        claim={currentDebate.claim}
        defendName={debateNames[currentDebate.defendIndex]}
        attackName={debateNames[currentDebate.attackIndex]}
        audienceNames={debateNames.filter(
          (_, index) =>
            index !== currentDebate.defendIndex &&
            index !== currentDebate.attackIndex,
        )}
        durationSeconds={debateDuration}
        onHome={resetHome}
        onTimeUp={() => setScreen("debate-winner")}
      />
    );
  if (screen === "debate-winner" && currentDebate)
    return (
      <DebateWinnerScreen
        defendName={debateNames[currentDebate.defendIndex]}
        attackName={debateNames[currentDebate.attackIndex]}
        onHome={resetHome}
        onChoose={chooseDebateWinner}
      />
    );
  if (screen === "debate-result" && currentDebate && debateWinner)
    return (
      <DebateResultScreen
        winnerName={
          debateWinner === "defend"
            ? debateNames[currentDebate.defendIndex]
            : debateNames[currentDebate.attackIndex]
        }
        isTie={debateWinner === "tie"}
        onHome={resetHome}
        onNext={nextDebate}
      />
    );
  if (screen === "setup")
    return (
      <ImposterSetup
        step={step}
        setStep={setStep}
        names={names}
        setNames={setNames}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        mode={mode}
        setMode={setMode}
        onHome={resetHome}
        onStart={startRound}
      />
    );
  if (!round) return null;
  if (screen === "reveal")
    return (
      <RevealScreen
        round={round}
        mode={mode}
        names={names}
        index={revealIndex}
        startIndex={revealStartIndex}
        revealed={revealed}
        setRevealed={setRevealed}
        onHome={resetHome}
        onNext={() => {
          setRevealIndex((index) => index + 1);
          setRevealed(false);
        }}
        onRules={() => setScreen("rules")}
      />
    );
  if (screen === "rules")
    return (
      <RulesScreen
        onHome={resetHome}
        onContinue={() => setScreen("discussion")}
      />
    );
  if (screen === "discussion")
    return (
      <DiscussionScreen
        onHome={resetHome}
        onReveal={() => setScreen("result")}
      />
    );
  if (screen === "result")
    return (
      <ResultScreen
        onHome={resetHome}
        names={names}
        round={round}
        identified={identified}
        setIdentified={setIdentified}
        onContinue={() => setScreen(identified ? "guess" : "final")}
      />
    );
  if (screen === "guess")
    return (
      <GuessScreen
        onHome={resetHome}
        setGuessedCorrectly={setGuessedCorrectly}
        onReveal={() => setScreen("final")}
      />
    );
  return (
    <FinalScreen
      round={round}
      names={names}
      identified={identified ?? false}
      guessedCorrectly={guessedCorrectly}
      onAgain={startRound}
      onHome={resetHome}
    />
  );
}
