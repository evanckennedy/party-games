"use client";

import { ArrowRight, WandSparkles } from "lucide-react";
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
import { GameMenuButton, Shell } from "./shared";

export function QuickWitScreen({
  prompt,
  onHome,
  onGameMenu,
  onNext,
}: {
  prompt: string;
  onHome: () => void;
  onGameMenu: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="QUICK WIT">
      <Stack gap="xl">
        <div>
          <Group justify="space-between" align="flex-start">
            <div>
              <Badge color="teal" variant="light" mb="md">
                PROMPT
              </Badge>
              <Title order={1}>Quick Wit</Title>
            </div>
            <ThemeIcon size={48} radius="md" color="teal" variant="light">
              <WandSparkles size={24} />
            </ThemeIcon>
          </Group>
          <Text c="dimmed" mt="sm">
            Read the setup. Fire back a funny line, excuse, or performance.
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
              Your prompt is...
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
          <GameMenuButton onClick={onGameMenu} />
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
