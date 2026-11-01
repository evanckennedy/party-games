"use client";

import { ArrowRight, Home as HomeIcon, MessageCircle } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  letsTalkCategories,
  type LetsTalkCategoryId,
  type LetsTalkQuestion,
} from "../data/lets-talk";
import { Shell } from "./shared";

export function LetsTalkSetup({
  onHome,
  onSelectCategory,
}: {
  onHome: () => void;
  onSelectCategory: (category: LetsTalkCategoryId | "random") => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="LET'S TALK">
      <Stack gap="xl">
        <div>
          <Badge color="violet" variant="light" mb="md">
            GOOD QUESTIONS, GOOD CONVERSATION
          </Badge>
          <Title order={1}>What should we talk about?</Title>
          <Text c="dimmed" mt="xs">
            Pick a category and see where the conversation goes.
          </Text>
        </div>
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
          <CategoryCard
            label="Random"
            detail="Questions from every category"
            onClick={() => onSelectCategory("random")}
          />
          {letsTalkCategories.map((category) => (
            <CategoryCard
              key={category.id}
              label={category.label}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Shell>
  );
}

function CategoryCard({
  label,
  detail,
  onClick,
}: {
  label: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <Card
      withBorder
      p="md"
      radius="md"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Text fw={700} size="sm">
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

export function LetsTalkQuestionScreen({
  selectedCategoryLabel,
  question,
  onHome,
  onCategories,
  onNext,
}: {
  selectedCategoryLabel: string;
  question: LetsTalkQuestion;
  onHome: () => void;
  onCategories: () => void;
  onNext: () => void;
}) {
  const badgeLabel =
    selectedCategoryLabel === "Random"
      ? `Random · ${question.categoryLabel}`
      : question.categoryLabel;

  return (
    <Shell onHome={onHome} eyebrow="LET'S TALK">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="violet" variant="light" mb="md">
              {badgeLabel}
            </Badge>
            <Title order={1}>Let’s Talk</Title>
          </div>
          <ThemeIcon size={48} radius="md" color="violet" variant="light">
            <MessageCircle size={24} />
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
          <Title
            order={2}
            size="clamp(1.75rem, 5vw, 3rem)"
            maw={700}
            lh={1.25}
          >
            {question.question}
          </Title>
        </Card>
        <Group justify="space-between" wrap="wrap">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<HomeIcon size={17} />}
            onClick={onCategories}
          >
            Categories
          </Button>
          <Button
            size="md"
            color="violet"
            rightSection={<ArrowRight size={17} />}
            onClick={onNext}
          >
            Next Question
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
