"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  List,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { PrimaryButton, Shell } from "./shared";

export type GameGuideId =
  | "imposter"
  | "quick-wit"
  | "trivia"
  | "tier-list"
  | "would-you-rather"
  | "most-likely-to"
  | "yes-and"
  | "riddles"
  | "spelling-bee"
  | "who-am-i"
  | "charades"
  | "hot-take"
  | "logic"
  | "debate"
  | "blind-rankings"
  | "lets-talk";

const gameGuides: Record<
  GameGuideId,
  { title: string; summary: string; steps: string[] }
> = {
  imposter: {
    title: "Imposter",
    summary: "Find the player who doesn’t know the secret word.",
    steps: [
      "Pass the phone privately so everyone sees their role.",
      "Take turns giving one-word clues, then discuss who seems suspicious.",
      "Vote on the Imposter. If they’re caught, they get one chance to guess the word.",
      "Undercover mode gives one player a similar, different word instead.",
    ],
  },
  "quick-wit": {
    title: "Quick Wit",
    summary:
      "Read a setup aloud. Someone jumps in immediately with a funny line, excuse, reaction, or quick performance—no discussion needed.",
    steps: [
      "Read the prompt aloud.",
      "Jump in with the funniest line, excuse, or reaction you can—or act it out.",
      "Keep it moving. Tap Next Prompt for another setup.",
    ],
  },
  trivia: {
    title: "Trivia",
    summary: "Take turns reading questions and reveal the answer to the group.",
    steps: [
      "Choose a category and difficulty, then read each question aloud.",
      "Let everyone guess or discuss before revealing the answer.",
      "Tap Next Question to continue. The app doesn’t keep score.",
    ],
  },
  "tier-list": {
    title: "Tier List",
    summary: "Rank a set of items together and debate where they belong.",
    steps: [
      "Choose a preset topic or create a custom list.",
      "Drag items into tiers from S (top) to D (bottom); leave undecided items unranked.",
      "Move items around as the group debates, then tap Done.",
    ],
  },
  "would-you-rather": {
    title: "Would You Rather?",
    summary: "Choose between two options and compare everyone’s reasoning.",
    steps: [
      "Read both choices aloud.",
      "Everyone picks a side and explains their choice.",
      "Tap Next Question when the discussion is ready to move on.",
    ],
  },
  "most-likely-to": {
    title: "Most Likely To",
    summary: "Decide who in the group best fits each playful prompt.",
    steps: [
      "Read the prompt aloud.",
      "Everyone points to or names the person they think fits best, then explain why.",
      "Tap Next Prompt for another round of debate.",
    ],
  },
  "yes-and": {
    title: "Yes, And",
    summary: "Build a collaborative story one idea at a time.",
    steps: [
      "Read the scene starter aloud.",
      "Take turns adding a sentence: accept the previous idea, then build on it.",
      "Tap New Scene whenever you want a fresh story starter.",
    ],
  },
  riddles: {
    title: "Guess the Riddle",
    summary: "Solve a riddle together before revealing its answer.",
    steps: [
      "Read the riddle aloud and think it through as a group.",
      "Share guesses, then tap Reveal Answer to check.",
      "Tap Next Riddle when you’re ready for another.",
    ],
  },
  "spelling-bee": {
    title: "Spelling Bee",
    summary: "One person reads the word; another spells it aloud.",
    steps: [
      "The reader shows and says the word to the contestant.",
      "The contestant spells it aloud without looking at the screen; the group checks the spelling shown.",
      "Use the definition or example if clarification is requested, then tap Next Word.",
    ],
  },
  "who-am-i": {
    title: "Who Am I?",
    summary: "Guess the identity on the screen using yes-or-no questions.",
    steps: [
      "Choose a category. The guesser looks away while everyone else sees the identity.",
      "The guesser asks yes-or-no questions; the group answers without saying the name.",
      "When they guess or want to move on, tap Next Person.",
    ],
  },
  charades: {
    title: "Charades",
    summary: "Act out a secret prompt while the group tries to guess it.",
    steps: [
      "Pass the phone to the actor without showing anyone else.",
      "The actor reveals the prompt, then acts silently while the group guesses.",
      "Tap Got It! when it’s guessed, or wait for time to run out, then choose Next Charade.",
    ],
  },
  "hot-take": {
    title: "Hot Take",
    summary: "Share your reactions and opinions on a bold statement.",
    steps: [
      "Read the statement aloud.",
      "Everyone shares whether they agree and why; friendly disagreement is the point.",
      "Tap Next Hot Take to keep the conversation going.",
    ],
  },
  logic: {
    title: "Logic",
    summary: "Work through a logic challenge together before checking the solution.",
    steps: [
      "Read the challenge and discuss possible answers.",
      "Reveal a hint if you need one, then reveal the solution when ready.",
      "Tap Next Challenge for another puzzle.",
    ],
  },
  debate: {
    title: "Debate",
    summary: "Two players argue opposite sides while the rest of the group listens.",
    steps: [
      "Add 2–12 players and choose a debate category.",
      "The assigned players defend or attack the claim; the others are the audience.",
      "Debate until the timer ends, then the audience chooses a side or a tie.",
    ],
  },
  "blind-rankings": {
    title: "Blind Rankings",
    summary: "Rank five items without knowing what’s coming next.",
    steps: [
      "Choose a category. You’ll see one item at a time.",
      "Place each item in an open rank from #1 (best) to #5 (worst). Placements are locked.",
      "After all five items, review your final ranking.",
    ],
  },
  "lets-talk": {
    title: "Let’s Talk",
    summary: "Use thoughtful questions to get a real conversation started.",
    steps: [
      "Choose a category or Random.",
      "Read the question aloud and let the conversation go wherever it leads.",
      "Tap Next Question when the group is ready for another.",
    ],
  },
};

export function HowToPlayButton({ game }: { game: GameGuideId }) {
  const [opened, setOpened] = useState(false);
  const guide = gameGuides[game];

  return (
    <>
      <Button
        variant="light"
        color="orange"
        leftSection={<CircleHelp size={17} />}
        onClick={() => setOpened(true)}
      >
        How to play
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        closeButtonProps={{ "aria-label": "Close how to play" }}
        title={`How to play ${guide.title}`}
        centered
        size="md"
      >
        <Stack gap="md">
          <Text c="dimmed">{guide.summary}</Text>
          <List spacing="sm">
            {guide.steps.map((step) => (
              <List.Item key={step}>{step}</List.Item>
            ))}
          </List>
        </Stack>
      </Modal>
    </>
  );
}

export function GameIntro({
  game,
  onHome,
  onStart,
}: {
  game: GameGuideId;
  onHome: () => void;
  onStart: () => void;
}) {
  const guide = gameGuides[game];

  return (
    <Shell onHome={onHome} eyebrow={guide.title.toUpperCase()}>
      <Stack gap="xl">
        <div>
          <Badge color="orange" variant="light" mb="md">
            READY WHEN YOU ARE
          </Badge>
          <Title order={1}>{guide.title}</Title>
          <Text c="dimmed" mt="xs" maw={560}>
            {guide.summary}
          </Text>
        </div>
        <Card withBorder radius="lg" p={{ base: 24, sm: 36 }}>
          <Stack gap="md">
            <Title order={3}>Get the group together</Title>
            <Text c="dimmed">
              Start when everyone is ready. You can check the rules first if
              this is your first time playing.
            </Text>
            <Group justify="space-between" wrap="wrap">
              <HowToPlayButton game={game} />
              <PrimaryButton onClick={onStart}>Start playing</PrimaryButton>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Shell>
  );
}
