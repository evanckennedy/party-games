"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock3,
  Home as HomeIcon,
  Minus,
  Plus,
  Shield,
  Swords,
  UsersRound,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  Paper,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  debateCategories,
  type DebateCategoryChoice,
  type DebateClaim,
} from "../data/debate";
import { PrimaryButton, Shell } from "./shared";

export type DebateDuration = 30 | 60 | 120 | 180 | 300;
export type DebateWinner = "defend" | "attack" | "tie";

const debateDurations: { value: DebateDuration; label: string }[] = [
  { value: 30, label: "30 sec" },
  { value: 60, label: "1 min" },
  { value: 120, label: "2 min" },
  { value: 180, label: "3 min" },
  { value: 300, label: "5 min" },
];

export function DebatePlayersSetup({
  names,
  setNames,
  onHome,
  onContinue,
}: {
  names: string[];
  setNames: (names: string[]) => void;
  onHome: () => void;
  onContinue: () => void;
}) {
  const updateName = (index: number, value: string) =>
    setNames(
      names.map((name, nameIndex) => (index === nameIndex ? value : name)),
    );

  return (
    <Shell onHome={onHome} eyebrow="DEBATE">
      <Stack gap="xl">
        <div>
          <Badge color="red" variant="light" mb="md">
            PARTY DEBATE
          </Badge>
          <Title order={1}>Who&apos;s in the hot seat?</Title>
          <Text c="dimmed" mt="xs">
            Add 2–12 players. Two will debate; everyone else is the audience.
          </Text>
        </div>
        <Stack gap="sm">
          {names.map((name, index) => (
            <Group key={index} wrap="nowrap">
              <Text fw={700} c="dimmed" w={24}>
                {index + 1}
              </Text>
              <TextInput
                value={name}
                onChange={(event) =>
                  updateName(index, event.currentTarget.value)
                }
                placeholder={`Player ${index + 1}`}
                size="md"
                style={{ flex: 1 }}
              />
              <Button
                aria-label={`Remove ${name || `player ${index + 1}`}`}
                variant="subtle"
                color="gray"
                onClick={() =>
                  setNames(names.filter((_, nameIndex) => nameIndex !== index))
                }
                disabled={names.length <= 2}
              >
                <Minus size={17} />
              </Button>
            </Group>
          ))}
          {names.length < 12 && (
            <Button
              variant="subtle"
              color="gray"
              leftSection={<Plus size={17} />}
              onClick={() => setNames([...names, ""])}
            >
              Add player
            </Button>
          )}
        </Stack>
        <Group justify="flex-end">
          <PrimaryButton
            disabled={names.some((name) => !name.trim())}
            onClick={onContinue}
          >
            Choose a category
          </PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}

export function DebateCategorySetup({
  selected,
  setSelected,
  onHome,
  onContinue,
}: {
  selected: DebateCategoryChoice;
  setSelected: (category: DebateCategoryChoice) => void;
  onHome: () => void;
  onContinue: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="DEBATE">
      <Stack gap="xl">
        <div>
          <Badge color="red" variant="light" mb="md">
            PICK YOUR TOPIC
          </Badge>
          <Title order={1}>Choose a category.</Title>
          <Text c="dimmed" mt="xs">
            Random picks a fresh category for every debate.
          </Text>
        </div>
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
          <CategoryCard
            label="Random"
            icon="🎲"
            selected={selected === "random"}
            onClick={() => setSelected("random")}
          />
          {debateCategories.map((category) => (
            <CategoryCard
              key={category.id}
              label={category.label}
              icon={category.icon}
              selected={selected === category.id}
              onClick={() => setSelected(category.id)}
            />
          ))}
        </SimpleGrid>
        <Group justify="space-between">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<ArrowLeft size={17} />}
            onClick={onHome}
          >
            Back
          </Button>
          <PrimaryButton onClick={onContinue}>Deal the sides</PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}

function CategoryCard({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      withBorder
      p="md"
      radius="md"
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderColor: selected ? "var(--mantine-color-red-5)" : undefined,
      }}
    >
      <Text size="xl">{icon}</Text>
      <Text fw={700} mt="xs" size="sm">
        {label}
      </Text>
    </Card>
  );
}

export function DebateReadyScreen({
  claim,
  defendName,
  attackName,
  audienceNames,
  duration,
  setDuration,
  onHome,
  onStart,
}: {
  claim: DebateClaim;
  defendName: string;
  attackName: string;
  audienceNames: string[];
  duration: DebateDuration;
  setDuration: (duration: DebateDuration) => void;
  onHome: () => void;
  onStart: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="DEBATE">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="red" variant="light" mb="md">
              {claim.categoryLabel}
            </Badge>
            <Title order={1}>Here&apos;s the claim.</Title>
          </div>
          <ThemeIcon size={48} radius="md" color="red" variant="light">
            <Swords size={24} />
          </ThemeIcon>
        </Group>
        <Card
          withBorder
          radius="lg"
          p={{ base: 24, sm: 40 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(95, 34, 43, .52), rgba(35, 25, 29, .86))",
            textAlign: "center",
          }}
        >
          <Text c="red.2" fw={700} size="sm" tt="uppercase" mb="md">
            Debate this
          </Text>
          <Title order={2} size="clamp(1.75rem, 5vw, 3rem)" lh={1.2}>
            {claim.statement}
          </Title>
        </Card>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <RoleCard role="DEFEND" name={defendName} color="teal" />
          <RoleCard role="ATTACK" name={attackName} color="orange" />
        </SimpleGrid>
        {audienceNames.length > 0 && (
          <Text c="dimmed" size="sm">
            Audience: {audienceNames.join(", ")}
          </Text>
        )}
        <div>
          <Text fw={700} mb="sm">
            Debate length
          </Text>
          <SegmentedControl
            fullWidth
            size="md"
            value={String(duration)}
            onChange={(value) => setDuration(Number(value) as DebateDuration)}
            data={debateDurations.map(({ value, label }) => ({
              value: String(value),
              label,
            }))}
          />
        </div>
        <Group justify="flex-end">
          <Button
            size="md"
            color="red"
            leftSection={<Swords size={17} />}
            onClick={onStart}
          >
            Start Debate
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}

function RoleCard({
  role,
  name,
  color,
}: {
  role: "DEFEND" | "ATTACK";
  name: string;
  color: "teal" | "orange";
}) {
  return (
    <Paper withBorder p="lg" radius="md">
      <Group justify="space-between">
        <div>
          <Text c={color} fw={800} size="sm">
            {role}
          </Text>
          <Title order={3} mt={4}>
            {name}
          </Title>
        </div>
        <ThemeIcon color={color} variant="light" size={42} radius="md">
          {role === "DEFEND" ? <Shield size={21} /> : <Swords size={21} />}
        </ThemeIcon>
      </Group>
    </Paper>
  );
}

export function DebateTimerScreen({
  claim,
  defendName,
  attackName,
  audienceNames,
  durationSeconds,
  onHome,
  onTimeUp,
}: {
  claim: DebateClaim;
  defendName: string;
  attackName: string;
  audienceNames: string[];
  durationSeconds: DebateDuration;
  onHome: () => void;
  onTimeUp: () => void;
}) {
  const [remainingSeconds, setRemainingSeconds] =
    useState<number>(durationSeconds);
  const progress = (remainingSeconds / durationSeconds) * 100;

  useEffect(() => {
    if (remainingSeconds === 0) {
      const timeout = window.setTimeout(onTimeUp, 0);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(
      () => setRemainingSeconds((seconds) => seconds - 1),
      1000,
    );
    return () => window.clearTimeout(timeout);
  }, [remainingSeconds, onTimeUp]);

  const formattedTime = `${Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(remainingSeconds % 60).toString().padStart(2, "0")}`;

  return (
    <Shell onHome={onHome} eyebrow="DEBATE IN PROGRESS">
      <Stack gap="xl" align="center">
        <Group justify="space-between" w="100%" align="flex-start">
          <div>
            <Badge color="red" variant="light" mb="sm">
              {claim.categoryLabel}
            </Badge>
            <Title order={2} maw={650}>
              {claim.statement}
            </Title>
          </div>
          <ThemeIcon size={46} radius="md" color="red" variant="light">
            <Clock3 size={23} />
          </ThemeIcon>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" w="100%">
          <RoleCard role="DEFEND" name={defendName} color="teal" />
          <RoleCard role="ATTACK" name={attackName} color="orange" />
        </SimpleGrid>
        {audienceNames.length > 0 && (
          <Text c="dimmed" size="sm" ta="center">
            Audience: {audienceNames.join(", ")}
          </Text>
        )}
        <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
          <Title
            order={1}
            size="clamp(4rem, 18vw, 8rem)"
            ff="heading"
            style={{ fontVariantNumeric: "tabular-nums" }}
            aria-live="off"
          >
            {formattedTime}
          </Title>
          <Progress
            value={progress}
            color={remainingSeconds <= 10 ? "red" : "orange"}
            size="md"
            radius="xl"
            mt="md"
          />
        </div>
        <Button size="lg" color="red" variant="light" onClick={onTimeUp}>
          Argument Done
        </Button>
      </Stack>
    </Shell>
  );
}

export function DebateWinnerScreen({
  defendName,
  attackName,
  onHome,
  onChoose,
}: {
  defendName: string;
  attackName: string;
  onHome: () => void;
  onChoose: (winner: DebateWinner) => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="THE AUDIENCE DECIDES">
      <Stack gap="xl" align="center" ta="center">
        <ThemeIcon size={68} radius="xl" color="red" variant="light">
          <UsersRound size={32} />
        </ThemeIcon>
        <div>
          <Title order={1}>Who won?</Title>
          <Text c="dimmed" mt="sm">
            Decide together, then record the group&apos;s pick.
          </Text>
        </div>
        <Stack w="100%" maw={480} gap="sm">
          <Button
            size="lg"
            color="teal"
            variant="light"
            onClick={() => onChoose("defend")}
          >
            {defendName} (Defend)
          </Button>
          <Button
            size="lg"
            color="orange"
            variant="light"
            onClick={() => onChoose("attack")}
          >
            {attackName} (Attack)
          </Button>
          <Button
            size="lg"
            color="gray"
            variant="default"
            onClick={() => onChoose("tie")}
          >
            It&apos;s a tie
          </Button>
        </Stack>
      </Stack>
    </Shell>
  );
}

export function DebateResultScreen({
  winnerName,
  isTie,
  onHome,
  onNext,
}: {
  winnerName: string;
  isTie: boolean;
  onHome: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="DEBATE RESULT">
      <Stack align="center" ta="center" gap="xl">
        <ThemeIcon
          size={72}
          radius="xl"
          color={isTie ? "gray" : "yellow"}
          variant="light"
        >
          <Check size={34} />
        </ThemeIcon>
        <div>
          <Title order={1}>
            {isTie ? "It's a tie!" : `${winnerName} wins!`}
          </Title>
          <Text c="dimmed" mt="md">
            Ready for the next claim?
          </Text>
        </div>
        <Group>
          <Button
            variant="subtle"
            color="gray"
            leftSection={<HomeIcon size={17} />}
            onClick={onHome}
          >
            Back to games
          </Button>
          <PrimaryButton onClick={onNext}>Next Debate</PrimaryButton>
        </Group>
      </Stack>
    </Shell>
  );
}
