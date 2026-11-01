"use client";

import {
  ArrowRight,
  Brain,
  Clapperboard,
  Flame,
  Layers3,
  ListOrdered,
  Lightbulb,
  MessageCircle,
  MessagesSquare,
  BookOpen,
  Puzzle,
  UserRound,
  Sparkles,
  Swords,
  UsersRound,
  WandSparkles,
} from "lucide-react";
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
  onWouldYouRather,
  onMostLikelyTo,
  onYesAnd,
  onRiddles,
  onSpellingBee,
  onWhoAmI,
  onCharades,
  onHotTake,
  onLogic,
  onDebate,
  onBlindRankings,
  onLetsTalk,
}: {
  onImposter: () => void;
  onScenes: () => void;
  onTrivia: () => void;
  onTierList: () => void;
  onWouldYouRather: () => void;
  onMostLikelyTo: () => void;
  onYesAnd: () => void;
  onRiddles: () => void;
  onSpellingBee: () => void;
  onWhoAmI: () => void;
  onCharades: () => void;
  onHotTake: () => void;
  onLogic: () => void;
  onDebate: () => void;
  onBlindRankings: () => void;
  onLetsTalk: () => void;
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
          <GameCard
            onClick={onWouldYouRather}
            color="yellow"
            icon={<MessageCircle size={28} />}
            badge="No setup"
            title="Would You Rather?"
            description="Pick a side, make your case, and keep the debate going."
          />
          <GameCard
            onClick={onMostLikelyTo}
            color="cyan"
            icon={<UsersRound size={28} />}
            badge="No setup"
            title="Most Likely To"
            description="Point, defend your pick, and see where the debate goes."
          />
          <GameCard
            onClick={onYesAnd}
            color="green"
            icon={<Sparkles size={28} />}
            badge="No setup"
            title="Yes, And"
            description="Take turns building a story together from a scene starter."
          />
          <GameCard
            onClick={onRiddles}
            color="blue"
            icon={<Lightbulb size={28} />}
            badge="Group guessing"
            title="Guess the Riddle"
            description="Think it through, guess out loud, then reveal the answer."
          />
          <GameCard
            onClick={onSpellingBee}
            color="green"
            icon={<BookOpen size={28} />}
            badge="Read it aloud"
            title="Spelling Bee"
            description="One reads, one spells aloud, and everyone checks the word."
          />
          <GameCard
            onClick={onWhoAmI}
            color="pink"
            icon={<UserRound size={28} />}
            badge="Guess who"
            title="Who Am I?"
            description="Ask yes-or-no questions and guess the identity."
          />
          <GameCard
            onClick={onCharades}
            color="orange"
            icon={<Clapperboard size={28} />}
            badge="Act it out"
            title="Charades"
            description="Act out a prompt while everyone else guesses."
          />
          <GameCard
            onClick={onHotTake}
            color="orange"
            icon={<MessageCircle size={28} />}
            badge="Group discussion"
            title="Hot Take"
            description="Share your honest opinions on a provocative statement."
          />
          <GameCard
            onClick={onLogic}
            color="violet"
            icon={<Puzzle size={28} />}
            badge="Solve together"
            title="Logic"
            description="Talk through clever challenges, hints, and solutions."
          />
          <GameCard
            onClick={onDebate}
            color="red"
            icon={<Swords size={28} />}
            badge="2–12 players"
            title="Debate"
            description="Get assigned a side, make your case, and let the audience decide."
          />
          <GameCard
            onClick={onBlindRankings}
            color="cyan"
            icon={<ListOrdered size={28} />}
            badge="No setup"
            title="Blind Rankings"
            description="Rank each item before you find out what comes next."
          />
          <GameCard
            onClick={onLetsTalk}
            color="violet"
            icon={<MessagesSquare size={28} />}
            badge="No setup"
            title="Let's Talk"
            description="Find a good question and see where the conversation goes."
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
  color:
    | "orange"
    | "teal"
    | "violet"
    | "pink"
    | "yellow"
    | "cyan"
    | "green"
    | "blue"
    | "red";
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
    yellow:
      "linear-gradient(145deg, rgba(110, 80, 25, .4), rgba(34, 30, 22, .82))",
    cyan: "linear-gradient(145deg, rgba(21, 78, 91, .52), rgba(23, 31, 36, .84))",
    green:
      "linear-gradient(145deg, rgba(35, 92, 59, .5), rgba(25, 34, 29, .84))",
    blue: "linear-gradient(145deg, rgba(28, 61, 103, .55), rgba(23, 28, 37, .84))",
    red: "linear-gradient(145deg, rgba(95, 34, 43, .52), rgba(35, 25, 29, .86))",
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
