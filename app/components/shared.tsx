"use client";

import { ArrowRight, Home as HomeIcon, Menu, Sparkles } from "lucide-react";
import {
  Badge,
  Button,
  Container,
  Group,
  ThemeIcon,
  Text,
  Switch,
} from "@mantine/core";
import { useCallback, useRef } from "react";
import type { ButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function AppMark({ onHome }: { onHome: () => void }) {
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

export function Shell({
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
        {children}
      </Container>
    </main>
  );
}

export function PrimaryButton({
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

export function GameMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="subtle"
      color="gray"
      leftSection={<Menu size={17} />}
      onClick={onClick}
    >
      Game menu
    </Button>
  );
}

export type TimerSoundCue = "start" | "warning" | "finish";

export function useTimerSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const play = useCallback((cue: TimerSoundCue) => {
    const AudioContextClass =
      window.AudioContext ??
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!AudioContextClass) return;

    const context =
      audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;
    if (context.state === "suspended") void context.resume();

    const frequencies =
      cue === "start"
        ? [440, 660]
        : cue === "warning"
          ? [660]
          : [523, 392, 262];
    const duration = cue === "finish" ? 0.12 : 0.08;
    let startAt = context.currentTime;

    frequencies.forEach((frequency) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(cue === "warning" ? 0.025 : 0.045, startAt);
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + duration);
      startAt += duration + 0.035;
    });
  }, []);

  return play;
}

export function TimerSoundToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={(event) => onChange(event.currentTarget.checked)}
      label="Timer sound"
      description={enabled ? "On" : "Off"}
      color="orange"
      size="md"
    />
  );
}
