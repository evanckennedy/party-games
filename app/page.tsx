"use client";

import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Flame,
  Home as HomeIcon,
  Lightbulb,
  LockKeyhole,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Vote,
  WandSparkles,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Container,
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
  type ButtonProps,
} from "@mantine/core";
import { categories, scenesPrompts, type ImposterMode } from "./game-data";

type Screen =
  | "home"
  | "setup"
  | "reveal"
  | "rules"
  | "discussion"
  | "result"
  | "guess"
  | "final"
  | "scenes";
type SetupStep = 1 | 2 | 3;
type Round = {
  secret: string;
  undercover: string;
  imposter: number;
  category: string;
};
const initialNames = ["Alex", "Jordan", "Sam", "Taylor"];

function AppMark({ onHome }: { onHome: () => void }) {
  return (
    <button
      type="button"
      aria-label="Return to Party Games home"
      onClick={onHome}
      style={{
        border: 0,
        padding: 0,
        color: "inherit",
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon size={34} radius="md" color="orange">
          <Sparkles size={18} />
        </ThemeIcon>
        <Text fw={800} size="lg" ff="heading">
          Party Games
        </Text>
      </Group>
    </button>
  );
}
function TopBar({ onHome, eyebrow }: { onHome: () => void; eyebrow?: string }) {
  return (
    <Group justify="space-between" align="center" mb={{ base: 30, sm: 48 }}>
      <AppMark onHome={onHome} />
      {eyebrow ? (
        <Badge variant="light" color="orange" size="lg">
          {eyebrow}
        </Badge>
      ) : (
        <Button
          onClick={onHome}
          variant="subtle"
          color="gray"
          leftSection={<HomeIcon size={16} />}
        >
          Home
        </Button>
      )}
    </Group>
  );
}
function Shell({
  children,
  onHome,
  eyebrow,
}: {
  children: ReactNode;
  onHome: () => void;
  eyebrow?: string;
}) {
  return (
    <main>
      <Container size={900} py={{ base: 24, sm: 42 }}>
        <TopBar onHome={onHome} eyebrow={eyebrow} />
        {children}
      </Container>
    </main>
  );
}
function PrimaryButton({
  children,
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button"> & { children: ReactNode }) {
  return (
    <Button
      size="md"
      radius="md"
      color="orange"
      rightSection={<ArrowRight size={17} />}
      {...props}
    >
      {children}
    </Button>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [step, setStep] = useState<SetupStep>(1);
  const [names, setNames] = useState(initialNames);
  const [categoryId, setCategoryId] = useState("random");
  const [mode, setMode] = useState<ImposterMode>("classic");
  const [round, setRound] = useState<Round | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [identified, setIdentified] = useState<boolean | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean | null>(
    null,
  );
  const [promptIndex, setPromptIndex] = useState(0);
  const [seenPrompts, setSeenPrompts] = useState<number[]>([0]);

  useEffect(() => {
    window.sessionStorage.setItem(
      "party-games-imposter-names",
      JSON.stringify(names),
    );
  }, [names]);

  const selectedCategory =
    categoryId === "random"
      ? categories[0]
      : (categories.find((category) => category.id === categoryId) ??
        categories[0]);
  const startRound = () => {
    const activeCategory =
      categoryId === "random"
        ? categories[Math.floor(Math.random() * categories.length)]
        : selectedCategory;
    const wordIndex = Math.floor(Math.random() * activeCategory.words.length);
    setRound({
      secret: activeCategory.words[wordIndex],
      undercover:
        activeCategory.words[(wordIndex + 1) % activeCategory.words.length],
      imposter: Math.floor(Math.random() * names.length),
      category: activeCategory.label,
    });
    setRevealIndex(0);
    setRevealed(false);
    setScreen("reveal");
  };
  const openImposter = () => {
    const stored = window.sessionStorage.getItem("party-games-imposter-names");
    if (stored) {
      try {
        const storedNames = JSON.parse(stored) as string[];
        if (Array.isArray(storedNames) && storedNames.length >= 3)
          setNames(storedNames);
      } catch {
        window.sessionStorage.removeItem("party-games-imposter-names");
      }
    }
    setScreen("setup");
  };
  const resetHome = () => {
    setScreen("home");
    setStep(1);
    setRevealed(false);
    setIdentified(null);
    setGuessedCorrectly(null);
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

  if (screen === "home")
    return (
      <HomeScreen
        onImposter={openImposter}
        onScenes={() => setScreen("scenes")}
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
    return <RulesScreen onContinue={() => setScreen("discussion")} />;
  if (screen === "discussion")
    return <DiscussionScreen onReveal={() => setScreen("result")} />;
  if (screen === "result")
    return (
      <ResultScreen
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

function HomeScreen({
  onImposter,
  onScenes,
}: {
  onImposter: () => void;
  onScenes: () => void;
}) {
  return (
    <Shell onHome={() => undefined} eyebrow="GAME NIGHT">
      <Stack gap={42}>
        <div>
          <Badge color="orange" variant="light" mb="md">
            PASS THE PHONE
          </Badge>
          <Title order={1} size="clamp(2.5rem, 7vw, 5rem)" lh={0.95} maw={640}>
            Good games.
            <br />
            <span style={{ color: "var(--mantine-color-orange-5)" }}>
              Great company.
            </span>
          </Title>
          <Text c="dimmed" size="lg" maw={500} mt="xl">
            Simple games made for one phone, a group of friends, and the kind of
            night you talk about later.
          </Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          <Card
            className="game-card"
            onClick={onImposter}
            withBorder
            radius="lg"
            p={{ base: "xl", sm: 32 }}
            style={{
              cursor: "pointer",
              background:
                "linear-gradient(145deg, rgba(111, 66, 25, .45), rgba(30, 25, 21, .8))",
            }}
          >
            <Stack justify="space-between" h={230}>
              <Group justify="space-between">
                <ThemeIcon size={54} radius="md" color="orange">
                  <Flame size={28} />
                </ThemeIcon>
                <Badge color="orange" variant="light">
                  3–12 players
                </Badge>
              </Group>
              <div>
                <Title order={2}>Imposter</Title>
                <Text c="dimmed" mt={6}>
                  One secret. One liar. Can the group spot them?
                </Text>
                <Text c="orange" fw={700} mt="lg">
                  Play game{" "}
                  <ArrowRight size={16} style={{ verticalAlign: "middle" }} />
                </Text>
              </div>
            </Stack>
          </Card>
          <Card
            className="game-card"
            onClick={onScenes}
            withBorder
            radius="lg"
            p={{ base: "xl", sm: 32 }}
            style={{
              cursor: "pointer",
              background:
                "linear-gradient(145deg, rgba(31, 73, 72, .55), rgba(23, 29, 28, .8))",
            }}
          >
            <Stack justify="space-between" h={230}>
              <Group justify="space-between">
                <ThemeIcon size={54} radius="md" color="teal">
                  <WandSparkles size={28} />
                </ThemeIcon>
                <Badge color="teal" variant="light">
                  No setup
                </Badge>
              </Group>
              <div>
                <Title order={2}>Scenes</Title>
                <Text c="dimmed" mt={6}>
                  Funny prompts for unforgettable performances.
                </Text>
                <Text c="teal" fw={700} mt="lg">
                  Play game{" "}
                  <ArrowRight size={16} style={{ verticalAlign: "middle" }} />
                </Text>
              </div>
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </Shell>
  );
}
function StepHeader({ step }: { step: SetupStep }) {
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
function ImposterSetup({
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
        <StepHeader step={step} />
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
              <Card
                withBorder
                p="md"
                radius="md"
                onClick={() => setCategoryId("random")}
                style={{
                  cursor: "pointer",
                  borderColor:
                    categoryId === "random"
                      ? "var(--mantine-color-orange-5)"
                      : undefined,
                }}
              >
                <Text size="xl">🎲</Text>
                <Text fw={700} mt="xs">
                  Random
                </Text>
                <Text size="xs" c="dimmed">
                  Surprise us
                </Text>
              </Card>
              {categories.map((category) => (
                <Card
                  key={category.id}
                  withBorder
                  p="md"
                  radius="md"
                  onClick={() => setCategoryId(category.id)}
                  style={{
                    cursor: "pointer",
                    borderColor:
                      categoryId === category.id
                        ? "var(--mantine-color-orange-5)"
                        : undefined,
                  }}
                >
                  <Text size="xl">{category.icon}</Text>
                  <Text fw={700} mt="xs" size="sm">
                    {category.label}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
            <Group justify="space-between" mt="xl">
              <Button
                variant="subtle"
                color="gray"
                leftSection={<ArrowLeft size={17} />}
                onClick={() => setStep(1)}
              >
                Back
              </Button>
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
              <Button
                variant="subtle"
                color="gray"
                leftSection={<ArrowLeft size={17} />}
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <PrimaryButton onClick={onStart}>Start the round</PrimaryButton>
            </Group>
          </div>
        )}
      </Stack>
    </Shell>
  );
}
function RevealScreen({
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
  round: Round;
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
              <Badge color={isImposter ? "red" : "orange"} size="lg">
                {isImposter
                  ? "YOU ARE THE IMPOSTER"
                  : round.category.toUpperCase()}
              </Badge>
              <Title order={2} mt="md" size="2rem">
                {isImposter
                  ? mode === "classic"
                    ? "You know the category"
                    : round.undercover
                  : round.secret}
              </Title>
              <Text c="dimmed" mt="xs">
                {isImposter
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
function RulesScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <Shell onHome={() => undefined} eyebrow="ROUND RULES">
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
            <Group gap="sm">
              <Badge color="orange">01</Badge>
              <Text>Everyone gives one-word clues.</Text>
            </Group>
            <Group gap="sm">
              <Badge color="orange">02</Badge>
              <Text>Discuss who sounds suspicious.</Text>
            </Group>
            <Group gap="sm">
              <Badge color="orange">03</Badge>
              <Text>Decide together, then reveal.</Text>
            </Group>
          </Stack>
        </Paper>
        <PrimaryButton onClick={onContinue}>Start the discussion</PrimaryButton>
      </Stack>
    </Shell>
  );
}
function DiscussionScreen({ onReveal }: { onReveal: () => void }) {
  return (
    <Shell onHome={() => undefined} eyebrow="DISCUSSION">
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
function ResultScreen({
  names,
  round,
  identified,
  setIdentified,
  onContinue,
}: {
  names: string[];
  round: Round;
  identified: boolean | null;
  setIdentified: (value: boolean) => void;
  onContinue: () => void;
}) {
  return (
    <Shell onHome={() => undefined} eyebrow="THE REVEAL">
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
function GuessScreen({
  setGuessedCorrectly,
  onReveal,
}: {
  setGuessedCorrectly: (value: boolean) => void;
  onReveal: () => void;
}) {
  return (
    <Shell onHome={() => undefined} eyebrow="FINAL CHANCE">
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
function FinalScreen({
  round,
  names,
  identified,
  guessedCorrectly,
  onAgain,
  onHome,
}: {
  round: Round;
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
          <Button
            size="md"
            variant="light"
            color="gray"
            leftSection={<HomeIcon size={17} />}
            onClick={onHome}
          >
            Back to games
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
function ScenesScreen({
  prompt,
  onHome,
  onNext,
}: {
  prompt: string;
  onHome: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="SCENES">
      <Stack gap="xl">
        <div>
          <Group justify="space-between" align="flex-start">
            <div>
              <Badge color="teal" variant="light" mb="md">
                PROMPT
              </Badge>
              <Title order={1}>Scenes</Title>
            </div>
            <ThemeIcon size={48} radius="md" color="teal" variant="light">
              <WandSparkles size={24} />
            </ThemeIcon>
          </Group>
          <Text c="dimmed" mt="sm">
            A prompt generator for your group&apos;s next great bit.
          </Text>
        </div>
        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(31, 73, 72, .48), rgba(23, 29, 28, .75))",
            minHeight: 330,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Text c="teal.2" fw={700} size="sm" tt="uppercase" mb="lg">
              Your scene is...
            </Text>
            <Title
              order={2}
              size="clamp(2rem, 5vw, 3.25rem)"
              maw={650}
              lh={1.1}
            >
              {prompt}
            </Title>
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
          <Button
            size="md"
            color="teal"
            rightSection={<ArrowRight size={17} />}
            onClick={onNext}
          >
            Next prompt
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
