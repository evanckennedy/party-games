"use client";

import { ArrowRight, Home as HomeIcon, Sparkles } from "lucide-react";
import {
  Badge,
  Button,
  Container,
  Group,
  ThemeIcon,
  Text,
} from "@mantine/core";
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
