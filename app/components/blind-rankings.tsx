"use client";

import { ArrowRight, ListOrdered } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  blindRankingCategories,
  type BlindRankingCategoryId,
  type BlindRankingItem,
} from "../data/blind-rankings";
import { GameMenuButton, Shell } from "./shared";
import { HowToPlayButton } from "./game-guide";

const rankLabels = ["Best", "", "", "", "Worst"];

export function BlindRankingsSetup({
  onHome,
  onSelectCategory,
}: {
  onHome: () => void;
  onSelectCategory: (category: BlindRankingCategoryId | "random") => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="BLIND RANKINGS">
      <Stack gap="xl">
        <div>
          <Badge color="cyan" variant="light" mb="md">
            RANK WHAT YOU SEE
          </Badge>
          <Title order={1}>Choose a category.</Title>
          <Text c="dimmed" mt="xs">
            Place five items from best to worst. Each choice is locked before
            the next item appears.
          </Text>
        </div>
        <Group justify="flex-end">
          <HowToPlayButton game="blind-rankings" />
        </Group>
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
          <CategoryCard
            label="Random"
            detail="Items from every category"
            onClick={() => onSelectCategory("random")}
          />
          {blindRankingCategories.map((category) => (
            <CategoryCard
              key={category.id}
              label={category.label}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Shell>
  );
}

function CategoryCard({
  label,
  detail,
  onClick,
}: {
  label: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <Card
      withBorder
      p="md"
      radius="md"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Text fw={700} size="sm">
        {label}
      </Text>
      {detail && (
        <Text size="xs" c="dimmed">
          {detail}
        </Text>
      )}
    </Card>
  );
}

export function BlindRankingsRound({
  categoryLabel,
  item,
  itemsRanked,
  rankings,
  onAssign,
  onHome,
  onGameMenu,
}: {
  categoryLabel: string;
  item: BlindRankingItem;
  itemsRanked: number;
  rankings: (BlindRankingItem | null)[];
  onAssign: (rankIndex: number) => void;
  onHome: () => void;
  onGameMenu: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="BLIND RANKINGS">
      <Stack gap="xl">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="cyan" variant="light" mb="md">
              {categoryLabel}
            </Badge>
            <Title order={1}>Item {itemsRanked + 1} of 5</Title>
            <Text c="dimmed" mt="xs">
              Choose a spot. You can’t move it later.
            </Text>
          </div>
          <ThemeIcon size={48} radius="md" color="cyan" variant="light">
            <ListOrdered size={24} />
          </ThemeIcon>
        </Group>
        <Card
          withBorder
          radius="lg"
          p={{ base: 28, sm: 56 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(21, 78, 91, .52), rgba(23, 31, 36, .84))",
            minHeight: 250,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <Title
            order={2}
            size="clamp(2rem, 6vw, 3.5rem)"
            maw={680}
            lh={1.2}
          >
            {item.name}
          </Title>
        </Card>
        <Stack gap="sm">
          <Text fw={700}>Choose an open rank</Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
            {rankings.map((rankedItem, index) => (
              <Button
                key={index}
                variant={rankedItem ? "light" : "outline"}
                color={rankedItem ? "gray" : "cyan"}
                disabled={Boolean(rankedItem)}
                onClick={() => onAssign(index)}
                h="auto"
                mih={72}
                styles={{
                  inner: { justifyContent: "flex-start", whiteSpace: "normal" },
                  label: { whiteSpace: "normal", textAlign: "left" },
                }}
              >
                <Stack gap={2} align="flex-start">
                  <Text fw={800} size="md">
                    #{index + 1}
                    {rankLabels[index] ? ` · ${rankLabels[index]}` : ""}
                  </Text>
                  {rankedItem && (
                    <Text size="sm" fw={500}>
                      {rankedItem.name}
                    </Text>
                  )}
                </Stack>
              </Button>
            ))}
          </SimpleGrid>
        </Stack>
        <Group justify="flex-start">
          <GameMenuButton onClick={onGameMenu} />
        </Group>
      </Stack>
    </Shell>
  );
}

export function BlindRankingsResult({
  categoryLabel,
  rankings,
  onHome,
  onGameMenu,
  onPlayAgain,
}: {
  categoryLabel: string;
  rankings: BlindRankingItem[];
  onHome: () => void;
  onGameMenu: () => void;
  onPlayAgain: () => void;
}) {
  return (
    <Shell onHome={onHome} eyebrow="BLIND RANKINGS">
      <Stack gap="xl">
        <div>
          <Badge color="cyan" variant="light" mb="md">
            {categoryLabel}
          </Badge>
          <Title order={1}>Your final ranking</Title>
          <Text c="dimmed" mt="xs">
            That’s how the five items landed.
          </Text>
        </div>
        <Stack gap="sm">
          {rankings.map((item, index) => (
            <Card key={item.id} withBorder radius="md" p="md">
              <Group wrap="nowrap">
                <ThemeIcon size={40} radius="md" color="cyan" variant="light">
                  <Text fw={800}>#{index + 1}</Text>
                </ThemeIcon>
                <Text fw={700}>{item.name}</Text>
              </Group>
            </Card>
          ))}
        </Stack>
        <Group justify="space-between">
          <GameMenuButton onClick={onGameMenu} />
          <Button
            size="md"
            color="cyan"
            rightSection={<ArrowRight size={17} />}
            onClick={onPlayAgain}
          >
            Play Again
          </Button>
        </Group>
      </Stack>
    </Shell>
  );
}
