"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clapperboard } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type { CharadesPrompt } from "../data/charades";
import { GameMenuButton, PrimaryButton, Shell } from "./shared";

type CharadesPhase = "handoff" | "reveal" | "playing" | "got-it" | "time-up";

export function CharadesScreen({
  prompt,
  onHome,
  onGameMenu,
  onNext,
}: {
  prompt: CharadesPrompt;
  onHome: () => void;
  onGameMenu: () => void;
  onNext: () => void;
}) {
  const [phase, setPhase] = useState<CharadesPhase>("handoff");
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (phase !== "playing" || secondsLeft === 0) return;

    const timeout = window.setTimeout(
      () => setSecondsLeft((seconds) => seconds - 1),
      1000,
    );
    return () => window.clearTimeout(timeout);
  }, [phase, secondsLeft]);

  const visiblePhase =
    phase === "playing" && secondsLeft === 0 ? "time-up" : phase;
  const result = visiblePhase === "got-it" || visiblePhase === "time-up";
  const title =
    visiblePhase === "got-it"
      ? "Got it!"
      : visiblePhase === "time-up"
        ? "Time's up!"
        : "Charades";

  return (
    <Shell onHome={onHome} eyebrow="CHARADES">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="orange" variant="light" mb="md">
              {result ? title : visiblePhase === "handoff" ? "CHARADE" : prompt.category}
            </Badge>
            <Title order={1}>{title}</Title>
          </div>
          <ThemeIcon size={48} radius="md" color="orange" variant="light">
            <Clapperboard size={24} />
          </ThemeIcon>
        </Group>

        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(111, 66, 25, .45), rgba(30, 25, 21, .8))",
            minHeight: 330,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          {visiblePhase === "handoff" ? (
            <div>
              <Text c="orange.2" fw={700} size="sm" tt="uppercase" mb="lg">
                Pass the phone to the actor
              </Text>
              <Title order={2} size="clamp(2rem, 5vw, 3rem)" lh={1.15}>
                Don&apos;t let anyone else see the screen.
              </Title>
            </div>
          ) : visiblePhase === "reveal" ? (
            <Stack align="center" gap="xl">
              <div>
                <Text c="orange.2" fw={700} size="sm" tt="uppercase" mb="lg">
                  Your prompt
                </Text>
                <Title order={2} size="clamp(2rem, 5vw, 3rem)" maw={680} lh={1.15}>
                  {prompt.prompt}
                </Title>
                <Text c="dimmed" mt="lg">
                  Act it out without speaking.
                </Text>
              </div>
              <Button
                size="md"
                color="orange"
                onClick={() => {
                  setSecondsLeft(60);
                  setPhase("playing");
                }}
              >
                I&apos;m Ready
              </Button>
            </Stack>
          ) : visiblePhase === "playing" ? (
            <Stack align="center" gap="lg">
              <Title
                order={2}
                size="clamp(5rem, 20vw, 9rem)"
                lh={1}
                aria-live="polite"
                aria-label={`${secondsLeft} seconds remaining`}
              >
                {secondsLeft}
              </Title>
              <Text c="dimmed">Act it out without speaking.</Text>
              <Button
                size="md"
                color="orange"
                onClick={() => setPhase("got-it")}
              >
                Got It!
              </Button>
            </Stack>
          ) : (
            <div>
              <Text c="orange.2" fw={700} size="sm" tt="uppercase" mb="lg">
                {visiblePhase === "got-it" ? "Got it!" : "Time's up!"}
              </Text>
              <Title order={2} size="clamp(2rem, 5vw, 3rem)" maw={680} lh={1.15}>
                {prompt.prompt}
              </Title>
            </div>
          )}
        </Card>

        <Group justify="space-between">
          <GameMenuButton onClick={onGameMenu} />
          {visiblePhase === "handoff" ? (
            <PrimaryButton onClick={() => setPhase("reveal")}>
              Reveal Prompt
            </PrimaryButton>
          ) : result ? (
            <Button
              size="md"
              color="orange"
              rightSection={<ArrowRight size={17} />}
              onClick={onNext}
            >
              Next Charade
            </Button>
          ) : null}
        </Group>
      </Stack>
    </Shell>
  );
}
