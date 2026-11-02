"use client";

import { useState } from "react";
import { ArrowRight, Eye, Home as HomeIcon, Lightbulb } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  SegmentedControl,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type {
  LogicChallenge,
  LogicDifficulty,
} from "../data/logic";
import { PrimaryButton, Shell } from "./shared";
import { HowToPlayButton } from "./game-guide";

export type LogicDifficultyChoice = LogicDifficulty | "random";

export function LogicSetup({
  difficulty,
  setDifficulty,
  onHome,
  onStart,
}: {
  difficulty: LogicDifficultyChoice;
  setDifficulty: (difficulty: LogicDifficultyChoice) => void;
  onHome: () => void;
  onStart: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="LOGIC">
      <Stack gap="xl">
        <div>
          <Badge color="violet" variant="light" mb="md">
            THINK IT THROUGH
          </Badge>
          <Title order={1}>Choose a difficulty.</Title>
          <Text c="dimmed" mt="xs">
            Random picks a new difficulty for each challenge.
          </Text>
        </div>
        <Group justify="flex-end">
          <HowToPlayButton game="logic" />
        </Group>
        <SegmentedControl
          fullWidth
          size="md"
          value={difficulty}
          onChange={(value) => setDifficulty(value as LogicDifficultyChoice)}
          data={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
            { label: "Random", value: "random" },
          ]}
        />
        <Group justify="flex-end">
          <PrimaryButton onClick={onStart}>Start Logic</PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}

export function LogicScreen({
  challenge,
  onHome,
  onNext,
}: {
  challenge: LogicChallenge;
  onHome: () => void;
  onNext: () => void;
}) {
  const [hintVisible, setHintVisible] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  return (
    <Shell onHome={onHome} eyebrow="LOGIC">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Group gap="xs" mb="md">
              <Badge color="violet" variant="light">
                {challenge.difficulty.toUpperCase()}
              </Badge>
              <Badge color="gray" variant="light">
                {challenge.category}
              </Badge>
            </Group>
            <Title order={1}>Logic Challenge</Title>
          </div>
          <ThemeIcon size={48} radius="md" color="violet" variant="light">
            <Lightbulb size={24} />
          </ThemeIcon>
        </Group>
        <Card
          withBorder
          radius="lg"
          p={{ base: 24, sm: 40 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(56, 45, 86, .58), rgba(28, 25, 38, .82))",
          }}
        >
          <Stack gap="md">
            <Text c="violet.2" fw={700} size="sm" tt="uppercase">
              {challenge.title}
            </Text>
            <Text size="lg" lh={1.55} style={{ whiteSpace: "pre-line" }}>
              {challenge.prompt}
            </Text>
            {hintVisible && (
              <div>
                <Text c="violet.2" fw={700} size="sm" tt="uppercase" mb={4}>
                  Hint
                </Text>
                <Text c="dimmed">{challenge.hint}</Text>
              </div>
            )}
            {solutionRevealed && (
              <>
                <Divider color="gray.7" />
                <div>
                  <Text c="violet.2" fw={700} size="sm" tt="uppercase" mb={4}>
                    Solution
                  </Text>
                  <Text fw={700}>{challenge.solution}</Text>
                </div>
                <div>
                  <Text c="violet.2" fw={700} size="sm" tt="uppercase" mb={4}>
                    Why it works
                  </Text>
                  <Text c="dimmed">{challenge.explanation}</Text>
                </div>
              </>
            )}
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
          {solutionRevealed ? (
            <Button
              size="md"
              color="violet"
              rightSection={<ArrowRight size={17} />}
              onClick={onNext}
            >
              Next Challenge
            </Button>
          ) : (
            <Group gap="sm">
              {!hintVisible && (
                <Button
                  variant="light"
                  color="violet"
                  onClick={() => setHintVisible(true)}
                >
                  Need a Hint?
                </Button>
              )}
              <Button
                size="md"
                color="violet"
                leftSection={<Eye size={17} />}
                onClick={() => setSolutionRevealed(true)}
              >
                Reveal Solution
              </Button>
            </Group>
          )}
        </Group>
      </Stack>
    </Shell>
  );
}
