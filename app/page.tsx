"use client";

import { useEffect, useState } from "react";
import { categories, type ImposterMode } from "./data/imposter-data";
import { scenesPrompts } from "./data/scenes-data";
import {
  triviaCategories,
  triviaQuestions,
  type TriviaCategoryId,
  type TriviaDifficulty,
  type TriviaQuestion,
} from "./data/trivia";
import { HomeScreen } from "./components/home-screen";
import { ScenesScreen } from "./components/scenes";
import { TriviaComplete, TriviaScreen, TriviaSetup } from "./components/trivia";
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
  | "scenes"
  | "trivia-setup"
  | "trivia"
  | "trivia-complete";
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
  const [revealed, setRevealed] = useState(false);
  const [identified, setIdentified] = useState<boolean | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean | null>(
    null,
  );
  const [promptIndex, setPromptIndex] = useState(0);
  const [seenPrompts, setSeenPrompts] = useState<number[]>([0]);
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

  useEffect(() => {
    window.sessionStorage.setItem(
      "party-games-imposter-names",
      JSON.stringify(names),
    );
  }, [names]);

  const resetHome = () => {
    setScreen("home");
    setStep(1);
    setRound(null);
    setRevealed(false);
    setIdentified(null);
    setGuessedCorrectly(null);
    setTriviaQuestion(null);
    setTriviaAnswered(false);
    setRemainingTriviaQuestions([]);
  };
  const openImposter = () => setScreen("setup");
  const startRound = () => {
    const selectedCategory =
      categoryId === "random"
        ? categories[Math.floor(Math.random() * categories.length)]
        : (categories.find((category) => category.id === categoryId) ??
          categories[0]);
    const wordIndex = Math.floor(Math.random() * selectedCategory.words.length);
    setRound({
      secret: selectedCategory.words[wordIndex],
      undercover:
        selectedCategory.words[(wordIndex + 1) % selectedCategory.words.length],
      imposter: Math.floor(Math.random() * names.length),
      category: selectedCategory.label,
    });
    setRevealIndex(0);
    setRevealed(false);
    setScreen("reveal");
  };
  const startScenes = () => {
    const firstPrompt = Math.floor(Math.random() * scenesPrompts.length);
    setPromptIndex(firstPrompt);
    setSeenPrompts([firstPrompt]);
    setScreen("scenes");
  };
  const nextPrompt = () => {
    let next = Math.floor(Math.random() * scenesPrompts.length);
    while (
      seenPrompts.includes(next) &&
      seenPrompts.length < scenesPrompts.length
    )
      next = Math.floor(Math.random() * scenesPrompts.length);
    setPromptIndex(next);
    setSeenPrompts((current) => [...current, next]);
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
    const question = pool[Math.floor(Math.random() * pool.length)];
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

  if (screen === "home")
    return (
      <HomeScreen
        onImposter={openImposter}
        onScenes={startScenes}
        onTrivia={startTrivia}
      />
    );
  if (screen === "scenes")
    return (
      <ScenesScreen
        prompt={scenesPrompts[promptIndex]}
        onHome={resetHome}
        onNext={nextPrompt}
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
