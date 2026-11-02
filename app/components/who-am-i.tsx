"use client";

import { ArrowRight, Home as HomeIcon, UserRound } from "lucide-react";
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
  whoAmICategories,
  type WhoAmICategoryId,
  type WhoAmIIdentity,
} from "../data/who-am-i";
import { Shell } from "./shared";
import { HowToPlayButton } from "./game-guide";

export function WhoAmISetup({
  onHome,
  onSelectCategory,
}: {
  onHome: () => void;
  onSelectCategory: (category: WhoAmICategoryId | "random") => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="WHO AM I?">
      <Stack gap="xl">
        <div>
          <Badge color="pink" variant="light" mb="md">
            GUESS THE IDENTITY
          </Badge>
          <Title order={1}>Choose a category.</Title>
          <Text c="dimmed" mt="xs">
            Everyone but the guesser looks at the screen. Random mixes every
            category.
          </Text>
        </div>
        <Group justify="flex-end">
          <HowToPlayButton game="who-am-i" />
        </Group>
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
          <CategoryCard
            label="Random"
            detail="A little of everything"
            onClick={() => onSelectCategory("random")}
          />
          {whoAmICategories.map((category) => (
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

export function WhoAmIScreen({
  identity,
  onHome,
  onNext,
}: {
  identity: WhoAmIIdentity;
  onHome: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="WHO AM I?">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <Badge color="pink" variant="light" size="lg">
            {identity.categoryLabel}
          </Badge>
          <ThemeIcon size={48} radius="md" color="pink" variant="light">
            <UserRound size={24} />
          </ThemeIcon>
        </Group>
        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(107, 33, 68, .58), rgba(40, 24, 35, .82))",
            minHeight: 330,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <Title
            order={1}
            size="clamp(2.5rem, 8vw, 4.5rem)"
            maw={700}
            lh={1.1}
            style={{ overflowWrap: "anywhere" }}
          >
            {identity.name}
          </Title>
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
          <Button
            size="md"
            color="pink"
            rightSection={<ArrowRight size={17} />}
            onClick={onNext}
          >
            Next Person
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
