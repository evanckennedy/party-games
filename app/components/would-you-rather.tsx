"use client";

import { ArrowRight, Home as HomeIcon, MessageCircle } from "lucide-react";
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
import type { WouldYouRatherPrompt } from "../data/would-you-rather";
import { Shell } from "./shared";

export function WouldYouRatherScreen({
  prompt,
  onHome,
  onNext,
}: {
  prompt: WouldYouRatherPrompt;
  onHome: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="WOULD YOU RATHER?">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="yellow" variant="light" mb="md">
              {prompt.category}
            </Badge>
            <Title order={1}>Would you rather...</Title>
          </div>
          <ThemeIcon size={48} radius="md" color="yellow" variant="light">
            <MessageCircle size={24} />
          </ThemeIcon>
        </Group>

        <div>
          <div className="would-you-rather-options">
            <div className="would-you-rather-first">
              <ChoicePanel label="A" choice={prompt.firstChoice} />
            </div>
            <Text
              className="would-you-rather-or"
              ta="center"
              c="yellow.3"
              fw={800}
              size="sm"
            >
              OR
            </Text>
            <div className="would-you-rather-second">
              <ChoicePanel label="B" choice={prompt.secondChoice} />
            </div>
          </div>
        </div>

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
            color="yellow"
            rightSection={<ArrowRight size={17} />}
            onClick={onNext}
          >
            Next question
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}

function ChoicePanel({ label, choice }: { label: string; choice: string }) {
  return (
    <Card
      withBorder
      radius="lg"
      p={{ base: "xl", sm: 32 }}
      style={{
        background:
          "linear-gradient(145deg, rgba(110, 80, 25, .4), rgba(34, 30, 22, .82))",
        minHeight: 210,
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
    >
      <Stack align="center" justify="center" gap="md">
        <ThemeIcon size={34} radius="xl" color="yellow" variant="light">
          <Text fw={800} size="sm">
            {label}
          </Text>
        </ThemeIcon>
        <Text size="xl" fw={700} lh={1.25}>
          {choice}
        </Text>
      </Stack>
    </Card>
  );
}
