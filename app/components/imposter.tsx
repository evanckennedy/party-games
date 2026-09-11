"use client";

import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lightbulb,
  LockKeyhole,
  Minus,
  Plus,
  RotateCcw,
  Vote,
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
import { categories, type ImposterMode } from "../data/imposter-data";
import { PrimaryButton, Shell } from "./shared";

export type ImposterRound = {
  secret: string;
  undercover: string;
  imposter: number;
  category: string;
};
export type SetupStep = 1 | 2 | 3;

export function ImposterSetup({
  step,
  setStep,
  names,
  setNames,
  categoryId,
  setCategoryId,
  mode,
  setMode,
  onHome,
  onStart,
}: {
  step: SetupStep;
  setStep: (step: SetupStep) => void;
  names: string[];
  setNames: (names: string[]) => void;
  categoryId: string;
  setCategoryId: (id: string) => void;
  mode: ImposterMode;
  setMode: (mode: ImposterMode) => void;
  onHome: () => void;
  onStart: () => void;
}) {
  const updateName = (index: number, value: string) =>
    setNames(
      names.map((name, itemIndex) => (itemIndex === index ? value : name)),
    );
  return (
    <Shell onHome={onHome} eyebrow="IMPOSTER">
      <Stack gap="xl">
        <SetupHeader step={step} />
        {step === 1 && (
          <div>
            <Title order={1}>Who&apos;s playing?</Title>
            <Text c="dimmed" mt="xs" mb="xl">
              Add everyone passing the phone around. You can edit these next
              round.
            </Text>
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
                    rightSection={
                      names.length > 3 ? (
                        <button
                          aria-label={`Remove ${name || `player ${index + 1}`}`}
                          onClick={() =>
                            setNames(
                              names.filter(
                                (_, itemIndex) => itemIndex !== index,
                              ),
                            )
                          }
                        >
                          <Minus size={16} />
                        </button>
                      ) : undefined
                    }
                  />
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
            <Group justify="flex-end" mt="xl">
              <PrimaryButton
                disabled={names.some((name) => !name.trim())}
                onClick={() => setStep(2)}
              >
                Choose category
              </PrimaryButton>
            </Group>
          </div>
        )}
        {step === 2 && (
          <div>
            <Title order={1}>Pick a category</Title>
            <Text c="dimmed" mt="xs" mb="xl">
              Everyone will know the category. The word stays secret.
            </Text>
            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
              <ChoiceCard
                selected={categoryId === "random"}
                onClick={() => setCategoryId("random")}
                icon="🎲"
                label="Random"
                detail="Surprise us"
              />
              {categories.map((category) => (
                <ChoiceCard
                  key={category.id}
                  selected={categoryId === category.id}
                  onClick={() => setCategoryId(category.id)}
                  icon={category.icon}
                  label={category.label}
                />
              ))}
            </SimpleGrid>
            <Group justify="space-between" mt="xl">
              <BackButton onClick={() => setStep(1)} />
              <PrimaryButton onClick={() => setStep(3)}>
                Choose mode
              </PrimaryButton>
            </Group>
          </div>
        )}
        {step === 3 && (
          <div>
            <Title order={1}>Choose your mode</Title>
            <Text c="dimmed" mt="xs" mb="xl">
              Same game, two ways to keep the secret.
            </Text>
            <SegmentedControl
              fullWidth
              size="md"
              value={mode}
              onChange={(value) => setMode(value as ImposterMode)}
              data={[
                { label: "Classic", value: "classic" },
                { label: "Undercover", value: "undercover" },
              ]}
            />
            <Paper withBorder p="lg" mt="md" radius="md">
              <Text fw={700}>
                {mode === "classic" ? "The classic bluff" : "A trickier secret"}
              </Text>
              <Text c="dimmed" size="sm" mt="xs">
                {mode === "classic"
                  ? "The Imposter knows the category, but not the secret word."
                  : "The Imposter gets a different, related word and must blend in."}
              </Text>
            </Paper>
            <Group justify="space-between" mt="xl">
              <BackButton onClick={() => setStep(2)} />
              <PrimaryButton onClick={onStart}>Start the round</PrimaryButton>
            </Group>
          </div>
        )}
      </Stack>
    </Shell>
  );
}

function SetupHeader({ step }: { step: SetupStep }) {
  return (
    <Stack gap="xs" mb="xl">
      <Group justify="space-between">
        <Text size="sm" fw={700} c="orange">
          SETUP · 0{step} / 03
        </Text>
        <Text size="sm" c="dimmed">
          {step === 1 ? "Players" : step === 2 ? "Category" : "Mode"}
        </Text>
      </Group>
      <Progress value={step * 33.33} color="orange" size="sm" radius="xl" />
    </Stack>
  );
}
function ChoiceCard({
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
        borderColor: selected ? "var(--mantine-color-orange-5)" : undefined,
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
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="subtle"
      color="gray"
      leftSection={<ArrowLeft size={17} />}
      onClick={onClick}
    >
      Back
    </Button>
  );
}

export function RevealScreen({
  round,
  mode,
  names,
  index,
  revealed,
  setRevealed,
  onHome,
  onNext,
  onRules,
}: {
  round: ImposterRound;
  mode: ImposterMode;
  names: string[];
  index: number;
  revealed: boolean;
  setRevealed: (value: boolean) => void;
  onHome: () => void;
  onNext: () => void;
  onRules: () => void;
}) {
  const isLast = index === names.length - 1;
  const isImposter = round.imposter === index;
  const isClassicImposter = mode === "classic" && isImposter;
  return (
    <Shell onHome={onHome} eyebrow="PRIVATE REVEAL">
      <Stack align="center" ta="center" gap="xl">
        <Progress
          value={((index + 1) / names.length) * 100}
          color="orange"
          size="sm"
          w="100%"
          maw={420}
        />
        <div>
          <Text c="orange" fw={700} size="sm">
            PLAYER {index + 1} OF {names.length}
          </Text>
          <Title order={1} mt="xs">
            Pass the phone to
            <br />
            {names[index]}
          </Title>
          <Text c="dimmed" mt="md">
            Make sure nobody else is looking.
          </Text>
        </div>
        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 44 }}
          w="100%"
          maw={460}
          style={{ minHeight: 250, display: "grid", placeItems: "center" }}
        >
          {!revealed ? (
            <Stack align="center">
              <ThemeIcon size={68} radius="xl" color="gray" variant="light">
                <LockKeyhole size={30} />
              </ThemeIcon>
              <Button
                size="md"
                variant="light"
                color="orange"
                leftSection={<Eye size={18} />}
                onClick={() => setRevealed(true)}
              >
                Tap to reveal
              </Button>
            </Stack>
          ) : (
            <div className="reveal-word">
              <Badge color={isClassicImposter ? "red" : "orange"} size="lg">
                {isClassicImposter
                  ? "YOU ARE THE IMPOSTER"
                  : round.category.toUpperCase()}
              </Badge>
              <Title order={2} mt="md" size="2rem">
                {isClassicImposter
                  ? `Category: ${round.category}`
                  : isImposter
                    ? round.undercover
                    : round.secret}
              </Title>
              <Text c="dimmed" mt="xs">
                {isClassicImposter
                  ? "Blend in. Do not get caught."
                  : "Keep it secret."}
              </Text>
            </div>
          )}
        </Card>
        {revealed && (
          <Button
            variant="subtle"
            color="gray"
            leftSection={<EyeOff size={17} />}
            onClick={() => setRevealed(false)}
          >
            Hide information
          </Button>
        )}
        {revealed && (
          <PrimaryButton onClick={isLast ? onRules : onNext}>
            {isLast ? "Everyone is ready" : "Next player"}
          </PrimaryButton>
        )}
      </Stack>
    </Shell>
  );
}

export function RulesScreen({
  onHome,
  onContinue,
}: {
  onHome: () => void;
  onContinue: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="ROUND RULES">
      <Stack align="center" ta="center" gap="xl">
        <ThemeIcon size={72} radius="xl" color="orange" variant="light">
          <Lightbulb size={34} />
        </ThemeIcon>
        <div>
          <Title order={1}>Time to find the Imposter.</Title>
          <Text c="dimmed" size="lg" maw={520} mt="md">
            Go around the group and give <b>one word</b> as a clue. Be specific
            enough to prove you know the word, but not so obvious that you give
            it away.
          </Text>
        </div>
        <Paper withBorder p="lg" w="100%" maw={520} ta="left">
          <Stack gap="sm">
            <Rule number="01" text="Everyone gives one-word clues." />
            <Rule number="02" text="Discuss who sounds suspicious." />
            <Rule number="03" text="Decide together, then reveal." />
          </Stack>
        </Paper>
        <PrimaryButton onClick={onContinue}>Start the discussion</PrimaryButton>
      </Stack>
    </Shell>
  );
}
function Rule({ number, text }: { number: string; text: string }) {
  return (
    <Group gap="sm">
      <Badge color="orange">{number}</Badge>
      <Text>{text}</Text>
    </Group>
  );
}
export function DiscussionScreen({
  onHome,
  onReveal,
}: {
  onHome: () => void;
  onReveal: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="DISCUSSION">
      <Stack align="center" ta="center" gap="xl">
        <ThemeIcon size={72} radius="xl" color="red" variant="light">
          <Vote size={34} />
        </ThemeIcon>
        <div>
          <Title order={1}>Who is acting suspicious?</Title>
          <Text c="dimmed" size="lg" mt="md" maw={460}>
            Talk it out, point fingers, and make your final decision as a group.
          </Text>
        </div>
        <Paper withBorder p="xl" w="100%" maw={460}>
          <Text c="dimmed" size="sm">
            When the group has chosen...
          </Text>
          <Button mt="md" size="md" color="orange" onClick={onReveal}>
            Reveal the result
          </Button>
        </Paper>
      </Stack>
    </Shell>
  );
}
export function ResultScreen({
  onHome,
  names,
  round,
  identified,
  setIdentified,
  onContinue,
}: {
  onHome: () => void;
  names: string[];
  round: ImposterRound;
  identified: boolean | null;
  setIdentified: (value: boolean) => void;
  onContinue: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="THE REVEAL">
      <Stack align="center" ta="center" gap="xl">
        <div>
          <Text c="orange" fw={700} size="sm">
            THE ACTUAL IMPOSTER WAS
          </Text>
          <Title order={1} size="clamp(2.5rem, 8vw, 4.5rem)" mt="xs">
            {names[round.imposter]}
          </Title>
          <Text c="dimmed" size="lg" mt="md">
            Did the group identify them?
          </Text>
        </div>
        <Group>
          <Button
            size="md"
            variant={identified === true ? "filled" : "light"}
            color="green"
            leftSection={<Check size={18} />}
            onClick={() => setIdentified(true)}
          >
            Yes, we did
          </Button>
          <Button
            size="md"
            variant={identified === false ? "filled" : "light"}
            color="red"
            leftSection={<Minus size={18} />}
            onClick={() => setIdentified(false)}
          >
            No, they got away
          </Button>
        </Group>
        {identified !== null && (
          <PrimaryButton onClick={onContinue}>
            {identified ? "Give them one last chance" : "See who wins"}
          </PrimaryButton>
        )}
      </Stack>
    </Shell>
  );
}
export function GuessScreen({
  onHome,
  setGuessedCorrectly,
  onReveal,
}: {
  onHome: () => void;
  setGuessedCorrectly: (value: boolean) => void;
  onReveal: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="FINAL CHANCE">
      <Stack align="center" ta="center" gap="xl">
        <ThemeIcon size={72} radius="xl" color="orange" variant="light">
          <Lightbulb size={34} />
        </ThemeIcon>
        <div>
          <Title order={1}>One last chance.</Title>
          <Text c="dimmed" size="lg" mt="md" maw={460}>
            The Imposter can now guess the secret word out loud.
          </Text>
        </div>
        <Text c="dimmed">Did they guess it correctly?</Text>
        <Group>
          <Button
            size="md"
            color="green"
            onClick={() => {
              setGuessedCorrectly(true);
              onReveal();
            }}
          >
            They got it
          </Button>
          <Button
            size="md"
            color="gray"
            variant="light"
            onClick={() => {
              setGuessedCorrectly(false);
              onReveal();
            }}
          >
            They missed
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
export function FinalScreen({
  round,
  names,
  identified,
  guessedCorrectly,
  onAgain,
  onHome,
}: {
  round: ImposterRound;
  names: string[];
  identified: boolean;
  guessedCorrectly: boolean | null;
  onAgain: () => void;
  onHome: () => void;
}) {
  const imposterWon = !identified || guessedCorrectly === true;
  return (
    <Shell onHome={onHome} eyebrow="FINAL RESULT">
      <Stack align="center" ta="center" gap="xl">
        <Badge size="lg" color={imposterWon ? "red" : "green"} variant="light">
          {imposterWon ? "THE IMPOSTER WINS" : "THE GROUP WINS"}
        </Badge>
        <div>
          <Title order={1}>
            {imposterWon ? "Well played." : "Nicely spotted."}
          </Title>
          <Text c="dimmed" size="lg" mt="md">
            The secret word was
          </Text>
          <Title order={2} size="2.5rem" c="orange" mt="xs">
            {round.secret}
          </Title>
        </div>
        <Text c="dimmed">
          {!identified
            ? `${names[round.imposter]} escaped the vote.`
            : guessedCorrectly
              ? `${names[round.imposter]} identified the word.`
              : `${names[round.imposter]} missed the final guess.`}
        </Text>
        <Group>
          <Button
            size="md"
            leftSection={<RotateCcw size={17} />}
            onClick={onAgain}
          >
            Play another round
          </Button>
          <Button size="md" variant="light" color="gray" onClick={onHome}>
            Back to games
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
