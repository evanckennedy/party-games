"use client";

import { ArrowRight, Home as HomeIcon, UsersRound } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type { MostLikelyPrompt } from "../data/most-likely-to";
import { Shell } from "./shared";

export function MostLikelyToScreen({
  prompt,
  onHome,
  onNext,
}: {
  prompt: MostLikelyPrompt;
  onHome: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="MOST LIKELY TO">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="cyan" variant="light" mb="md">
              {prompt.category}
            </Badge>
            <Title order={1}>Who&apos;s most likely to...</Title>
          </div>
          <ThemeIcon size={48} radius="md" color="cyan" variant="light">
            <UsersRound size={24} />
          </ThemeIcon>
        </Group>

        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(21, 78, 91, .52), rgba(23, 31, 36, .84))",
            minHeight: 330,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <Title order={2} size="clamp(2rem, 5vw, 3.25rem)" maw={680} lh={1.1}>
            {prompt.prompt}
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
            color="cyan"
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
