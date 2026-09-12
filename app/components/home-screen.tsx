"use client";

import { ArrowRight, Brain, Flame, Layers3, WandSparkles } from "lucide-react";
import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Shell } from "./shared";

export function HomeScreen({
  onImposter,
  onScenes,
  onTrivia,
  onTierList,
}: {
  onImposter: () => void;
  onScenes: () => void;
  onTrivia: () => void;
  onTierList: () => void;
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
          <GameCard
            onClick={onImposter}
            color="orange"
            icon={<Flame size={28} />}
            badge="3–12 players"
            title="Imposter"
            description="One secret. One liar. Can the group spot them?"
          />
          <GameCard
            onClick={onScenes}
            color="teal"
            icon={<WandSparkles size={28} />}
            badge="No setup"
            title="Scenes"
            description="Funny prompts for unforgettable performances."
          />
          <GameCard
            onClick={onTrivia}
            color="violet"
            icon={<Brain size={28} />}
            badge="No setup"
            title="Trivia"
            description="Ask the questions. Argue about the answers. Keep your own score."
          />
          <GameCard
            onClick={onTierList}
            color="pink"
            icon={<Layers3 size={28} />}
            badge="Group debate"
            title="Tier List"
            description="Drag, debate, and rank your favorites together."
          />
        </SimpleGrid>
      </Stack>
    </Shell>
  );
}

function GameCard({
  onClick,
  color,
  icon,
  badge,
  title,
  description,
}: {
  onClick: () => void;
  color: "orange" | "teal" | "violet" | "pink";
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
}) {
  const backgrounds = {
    orange:
      "linear-gradient(145deg, rgba(111, 66, 25, .45), rgba(30, 25, 21, .8))",
    teal: "linear-gradient(145deg, rgba(31, 73, 72, .55), rgba(23, 29, 28, .8))",
    violet:
      "linear-gradient(145deg, rgba(56, 45, 86, .58), rgba(28, 25, 38, .82))",
    pink: "linear-gradient(145deg, rgba(107, 33, 68, .58), rgba(40, 24, 35, .82))",
  };
  return (
    <Card
      className="game-card"
      onClick={onClick}
      withBorder
      radius="lg"
      p={{ base: "xl", sm: 32 }}
      style={{ cursor: "pointer", background: backgrounds[color] }}
    >
      <Stack justify="space-between" h={230}>
        <Group justify="space-between">
          <ThemeIcon size={54} radius="md" color={color}>
            {icon}
          </ThemeIcon>
          <Badge color={color} variant="light">
            {badge}
          </Badge>
        </Group>
        <div>
          <Title order={2}>{title}</Title>
          <Text c="dimmed" mt={6}>
            {description}
          </Text>
          <Text c={color} fw={700} mt="lg">
            Play game{" "}
            <ArrowRight size={16} style={{ verticalAlign: "middle" }} />
          </Text>
        </div>
      </Stack>
    </Card>
  );
}
