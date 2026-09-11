"use client";

import { ArrowRight, Brain, Eye, Home as HomeIcon } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  triviaCategories,
  type TriviaCategoryId,
  type TriviaDifficulty,
  type TriviaQuestion,
} from "../data/trivia-data";
import { PrimaryButton, Shell } from "./shared";

export function TriviaSetup({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  onHome,
  onStart,
}: {
  category: TriviaCategoryId | "random";
  setCategory: (category: TriviaCategoryId | "random") => void;
  difficulty: TriviaDifficulty | "mixed";
  setDifficulty: (difficulty: TriviaDifficulty | "mixed") => void;
  onHome: () => void;
  onStart: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="TRIVIA">
      <Stack gap="xl">
        <div>
          <Badge color="violet" variant="light" mb="md">
            GAME MASTER MODE
          </Badge>
          <Title order={1}>Set the vibe.</Title>
          <Text c="dimmed" mt="xs">
            Choose a category and difficulty. The room takes care of the rest.
          </Text>
        </div>
        <div>
          <Text fw={700} mb="sm">
            Category
          </Text>
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
            <CategoryCard
              selected={category === "random"}
              onClick={() => setCategory("random")}
              icon="🎲"
              label="Random"
              detail="A little of everything"
            />
            {triviaCategories.map((item) => (
              <CategoryCard
                key={item.id}
                selected={category === item.id}
                onClick={() => setCategory(item.id)}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </SimpleGrid>
        </div>
        <div>
          <Text fw={700} mb="sm">
            Difficulty
          </Text>
          <SegmentedControl
            fullWidth
            size="md"
            value={difficulty}
            onChange={(value) =>
              setDifficulty(value as TriviaDifficulty | "mixed")
            }
            data={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
              { label: "Mixed", value: "mixed" },
            ]}
          />
        </div>
        <Group justify="flex-end">
          <PrimaryButton onClick={onStart}>Start trivia</PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}

function CategoryCard({
  selected,
  onClick,
  icon,
  label,
  detail,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  detail?: string;
}) {
  return (
    <Card
      withBorder
      p="md"
      radius="md"
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderColor: selected ? "var(--mantine-color-violet-5)" : undefined,
      }}
    >
      <Text size="xl">{icon}</Text>
      <Text fw={700} mt="xs" size="sm">
        {label}
      </Text>
      {detail && (
        <Text size="xs" c="dimmed">
          {detail}
        </Text>
      )}
    </Card>
  );
}

export function TriviaScreen({
  question,
  answered,
  onReveal,
  onNext,
  onHome,
}: {
  question: TriviaQuestion;
  answered: boolean;
  onReveal: () => void;
  onNext: () => void;
  onHome: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="TRIVIA">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="violet" variant="light" mb="md">
              {question.categoryLabel}
            </Badge>
            <Title order={1}>Question</Title>
          </div>
          <ThemeIcon size={48} radius="md" color="violet" variant="light">
            <Brain size={24} />
          </ThemeIcon>
        </Group>
        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(56, 45, 86, .58), rgba(28, 25, 38, .82))",
            minHeight: 330,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Text c="dimmed" fw={700} size="sm" tt="uppercase" mb="lg">
              {question.difficulty} question
            </Text>
            <Title
              order={2}
              size="clamp(2rem, 5vw, 3.25rem)"
              maw={680}
              lh={1.1}
            >
              {question.question}
            </Title>
            {answered && (
              <div className="reveal-word">
                <Divider my="xl" />
                <Text c="violet.2" fw={700} size="sm" tt="uppercase">
                  Correct answer
                </Text>
                <Title order={3} size="2rem" mt="xs">
                  {question.answer}
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
            Exit
          </Button>
          {answered ? (
            <Button
              size="md"
              color="violet"
              rightSection={<ArrowRight size={17} />}
              onClick={onNext}
            >
              Next question
            </Button>
          ) : (
            <Button
              size="md"
              color="violet"
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
