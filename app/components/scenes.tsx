"use client";

import { ArrowRight, Home as HomeIcon, WandSparkles } from "lucide-react";
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
import { Shell } from "./shared";

export function ScenesScreen({
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
