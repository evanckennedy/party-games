"use client";

import { ArrowRight, Home as HomeIcon, Sparkles } from "lucide-react";
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
import type { YesAndScene } from "../data/yes-and";
import { Shell } from "./shared";

export function YesAndScreen({
  scene,
  onHome,
  onNext,
}: {
  scene: YesAndScene;
  onHome: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="YES, AND">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="green" variant="light" mb="md">
              {scene.category}
            </Badge>
            <Title order={1}>Yes, and...</Title>
            <Text c="dimmed" mt="sm" maw={580}>
              Take turns adding a sentence. Accept the last idea, then build on
              it.
            </Text>
          </div>
          <ThemeIcon size={48} radius="md" color="green" variant="light">
            <Sparkles size={24} />
          </ThemeIcon>
        </Group>

        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(35, 92, 59, .5), rgba(25, 34, 29, .84))",
            minHeight: 330,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Text c="green.2" fw={700} size="sm" tt="uppercase" mb="lg">
              Your scene begins...
            </Text>
            <Title
              order={2}
              size="clamp(2rem, 5vw, 3.25rem)"
              maw={680}
              lh={1.1}
            >
              {scene.setup}
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
            Back to games
          </Button>
          <Button
            size="md"
            color="green"
            rightSection={<ArrowRight size={17} />}
            onClick={onNext}
          >
            New scene
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
