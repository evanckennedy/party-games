"use client";

import { ArrowRight, Home as HomeIcon, MessageCircle } from "lucide-react";
import {
  Button,
  Card,
  Group,
  Stack,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type { HotTake } from "../data/hot-takes";
import { Shell } from "./shared";

export function HotTakeScreen({
  hotTake,
  onHome,
  onNext,
}: {
  hotTake: HotTake;
  onHome: () => void;
  onNext: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="HOT TAKE">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <Title order={1}>Hot Take</Title>
          <ThemeIcon size={48} radius="md" color="orange" variant="light">
            <MessageCircle size={24} />
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
          <Title
            order={2}
            size="clamp(2rem, 5vw, 3.25rem)"
            maw={680}
            lh={1.2}
          >
            “{hotTake.statement}”
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
            color="orange"
            rightSection={<ArrowRight size={17} />}
            onClick={onNext}
          >
            Next Hot Take
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
