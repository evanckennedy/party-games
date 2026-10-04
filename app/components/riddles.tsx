"use client";

import { ArrowRight, Eye, Home as HomeIcon, Lightbulb } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  SegmentedControl,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type { Riddle, RiddleDifficulty } from "../data/riddles";
import { PrimaryButton, Shell } from "./shared";

export type RiddleDifficultyChoice = RiddleDifficulty | "random";

export function RiddleSetup({
  difficulty,
  setDifficulty,
  onHome,
  onStart,
}: {
  difficulty: RiddleDifficultyChoice;
  setDifficulty: (difficulty: RiddleDifficultyChoice) => void;
  onHome: () => void;
  onStart: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="GUESS THE RIDDLE">
      <Stack gap="xl">
        <div>
          <Badge color="blue" variant="light" mb="md">
            RIDDLE MASTER MODE
          </Badge>
          <Title order={1}>Choose a difficulty.</Title>
          <Text c="dimmed" mt="xs">
            Random mixes easy, medium, and hard riddles as you play.
          </Text>
        </div>
        <SegmentedControl
          fullWidth
          size="md"
          value={difficulty}
          onChange={(value) => setDifficulty(value as RiddleDifficultyChoice)}
          data={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
            { label: "Random", value: "random" },
          ]}
        />
        <Group justify="flex-end">
          <PrimaryButton onClick={onStart}>Start riddles</PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}

export function RiddleScreen({
  riddle,
  revealed,
  onReveal,
  onNext,
  onHome,
}: {
  riddle: Riddle;
  revealed: boolean;
  onReveal: () => void;
  onNext: () => void;
  onHome: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="GUESS THE RIDDLE">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="blue" variant="light" mb="md">
              {riddle.difficulty.toUpperCase()}
            </Badge>
            <Title order={1}>Think it through.</Title>
            <Text c="dimmed" mt="xs">
              Read it aloud, discuss, and guess together.
            </Text>
          </div>
          <ThemeIcon size={48} radius="md" color="blue" variant="light">
            <Lightbulb size={24} />
          </ThemeIcon>
        </Group>
        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(28, 61, 103, .55), rgba(23, 28, 37, .84))",
            minHeight: 330,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Text c="blue.2" fw={700} size="sm" tt="uppercase" mb="lg">
              The riddle
            </Text>
            <Title
              order={2}
              size="clamp(1.75rem, 5vw, 3rem)"
              maw={700}
              lh={1.25}
              style={{ whiteSpace: "pre-line" }}
            >
              {riddle.prompt}
            </Title>
            {revealed && (
              <div className="reveal-word">
                <Text c="blue.2" fw={700} size="sm" tt="uppercase" mt="xl">
                  Answer
                </Text>
                <Title order={3} size="2rem" mt="xs">
                  {riddle.answer}
                </Title>
              </div>
            )}
          </div>
        </Card>
        <Group justify="space-between">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<HomeIcon size={17} />}
            onClick={onHome}
          >
            Back to games
          </Button>
          {revealed ? (
            <Button
              size="md"
              color="blue"
              rightSection={<ArrowRight size={17} />}
              onClick={onNext}
            >
              Next riddle
            </Button>
          ) : (
            <Button
              size="md"
              color="blue"
              rightSection={<Eye size={17} />}
              onClick={onReveal}
            >
              Reveal answer
            </Button>
          )}
        </Group>
      </Stack>
    </Shell>
  );
}
