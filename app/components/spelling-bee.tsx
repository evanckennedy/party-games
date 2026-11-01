"use client";

import { Home as HomeIcon } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type {
  SpellingBeeDifficulty,
  SpellingBeeWord,
} from "../data/spelling-bee";
import { PrimaryButton, Shell } from "./shared";

export type SpellingBeeDifficultyChoice = SpellingBeeDifficulty | "random";

export function SpellingBeeSetup({
  difficulty,
  setDifficulty,
  onHome,
  onStart,
}: {
  difficulty: SpellingBeeDifficultyChoice;
  setDifficulty: (difficulty: SpellingBeeDifficultyChoice) => void;
  onHome: () => void;
  onStart: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="SPELLING BEE">
      <Stack gap="xl">
        <div>
          <Badge color="green" variant="light" mb="md">
            GROUP SPELLING
          </Badge>
          <Title order={1}>Choose a difficulty.</Title>
          <Text c="dimmed" mt="xs">
            Random chooses a new difficulty for every word.
          </Text>
        </div>
        <SegmentedControl
          fullWidth
          size="md"
          value={difficulty}
          onChange={(value) => setDifficulty(value as SpellingBeeDifficultyChoice)}
          data={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
            { label: "Random", value: "random" },
          ]}
        />
        <Group justify="flex-end">
          <PrimaryButton onClick={onStart}>Start Spelling Bee</PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}

export function SpellingBeeScreen({
  word,
  onNext,
  onHome,
}: {
  word: SpellingBeeWord;
  onNext: () => void;
  onHome: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="SPELLING BEE">
      <Stack gap="lg">
        <Group justify="center">
          <Badge color="green" variant="light" size="lg">
            {word.difficulty}
          </Badge>
        </Group>
        <Card
          withBorder
          radius="lg"
          p={{ base: 24, sm: 40 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(35, 92, 59, .5), rgba(25, 34, 29, .84))",
          }}
        >
          <Stack gap="md">
            <div style={{ textAlign: "center" }}>
              <Text c="green.2" fw={700} size="sm" tt="uppercase" mb="sm">
                Word
              </Text>
              <Title
                order={1}
                size="clamp(2.5rem, 11vw, 5rem)"
                lh={1.05}
                style={{ overflowWrap: "anywhere" }}
              >
                {word.word}
              </Title>
              {word.acceptedSpellings && (
                <Text c="dimmed" size="sm" mt="sm">
                  Also accepted: {word.acceptedSpellings.join(", ")}
                </Text>
              )}
            </div>
            <Divider color="gray.7" />
            <div>
              <Text c="green.2" fw={700} size="sm" tt="uppercase" mb={4}>
                Definition
              </Text>
              <Text size="md">{word.definition}</Text>
            </div>
            <div>
              <Text c="green.2" fw={700} size="sm" tt="uppercase" mb={4}>
                Example sentence
              </Text>
              <Text size="md" fs="italic">
                “{word.example}”
              </Text>
            </div>
            <div>
              <Text c="green.2" fw={700} size="sm" tt="uppercase" mb={4}>
                Word origin
              </Text>
              <Text size="md">{word.origin}</Text>
            </div>
          </Stack>
        </Card>
        <Group justify="space-between" wrap="wrap">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<HomeIcon size={17} />}
            onClick={onHome}
          >
            Back to games
          </Button>
          <PrimaryButton onClick={onNext}>Next Word</PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}
