"use client";

import { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  GripVertical,
  Home as HomeIcon,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Group,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { tierPresets, type TierPresetGroup } from "../data/tier-list-data";
import { PrimaryButton, Shell } from "./shared";

type TierId = "unranked" | "S" | "A" | "B" | "C" | "D";
type BoardItem = { id: string; label: string; tier: TierId };
const tierIds: Exclude<TierId, "unranked">[] = ["S", "A", "B", "C", "D"];
const tierColors: Record<TierId, string> = {
  unranked: "gray",
  S: "red",
  A: "orange",
  B: "yellow",
  C: "teal",
  D: "blue",
};
const groups: TierPresetGroup[] = [
  "Food",
  "Entertainment",
  "Sports",
  "Random / General",
];

const tierCollisionDetection = (args: Parameters<typeof pointerWithin>[0]) => {
  const pointerCollisions = pointerWithin(args);
  const itemCollision = pointerCollisions.find((collision) =>
    args.droppableContainers.find(
      (container) =>
        container.id === collision.id &&
        container.data.current?.type === "item",
    ),
  );
  if (itemCollision) return [itemCollision];

  const tierCollision = pointerCollisions.find((collision) =>
    args.droppableContainers.find(
      (container) =>
        container.id === collision.id &&
        container.data.current?.type === "tier",
    ),
  );
  return tierCollision ? [tierCollision] : closestCorners(args);
};

export function TierListSetup({
  onHome,
  onStart,
}: {
  onHome: () => void;
  onStart: (title: string, items: string[]) => void;
}) {
  const [mode, setMode] = useState<"preset" | "custom">("preset");
  const [selectedPreset, setSelectedPreset] = useState(tierPresets[0].id);
  const [customTitle, setCustomTitle] = useState("");
  const [customItems, setCustomItems] = useState(["", "", ""]);
  const preset =
    tierPresets.find((item) => item.id === selectedPreset) ?? tierPresets[0];
  const updateCustomItem = (index: number, value: string) =>
    setCustomItems((items) =>
      items.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  const startCustom = () => {
    const items = customItems.map((item) => item.trim()).filter(Boolean);
    if (customTitle.trim() && items.length >= 2)
      onStart(customTitle.trim(), items);
  };
  return (
    <Shell onHome={onHome} eyebrow="TIER LIST">
      <Stack gap="xl">
        <div>
          <Badge color="pink" variant="light" mb="md">
            GROUP DEBATE MODE
          </Badge>
          <Title order={1}>What are we ranking?</Title>
          <Text c="dimmed" mt="xs">
            Pick a topic, then let the arguments begin.
          </Text>
        </div>
        <SegmentedControl
          fullWidth
          size="md"
          value={mode}
          onChange={(value) => setMode(value as "preset" | "custom")}
          data={[
            { label: "Preset tier list", value: "preset" },
            { label: "Custom tier list", value: "custom" },
          ]}
        />
        {mode === "preset" ? (
          <PresetPicker
            selected={selectedPreset}
            onSelect={setSelectedPreset}
          />
        ) : (
          <CustomBuilder
            title={customTitle}
            setTitle={setCustomTitle}
            items={customItems}
            updateItem={updateCustomItem}
            addItem={() => setCustomItems((items) => [...items, ""])}
            removeItem={(index) =>
              setCustomItems((items) =>
                items.filter((_, itemIndex) => itemIndex !== index),
              )
            }
          />
        )}
        {mode === "preset" ? (
          <Group justify="flex-end">
            <PrimaryButton onClick={() => onStart(preset.title, preset.items)}>
              Start ranking
            </PrimaryButton>
          </Group>
        ) : (
          <Group justify="flex-end">
            <PrimaryButton
              disabled={
                !customTitle.trim() ||
                customItems.filter((item) => item.trim()).length < 2
              }
              onClick={startCustom}
            >
              Start ranking
            </PrimaryButton>
          </Group>
        )}
      </Stack>
    </Shell>
  );
}

function PresetPicker({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Stack gap="lg">
      {groups.map((group) => (
        <div key={group}>
          <Text fw={700} mb="sm" c="dimmed">
            {group}
          </Text>
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
            {tierPresets
              .filter((preset) => preset.group === group)
              .map((preset) => (
                <Card
                  key={preset.id}
                  withBorder
                  p="md"
                  radius="md"
                  onClick={() => onSelect(preset.id)}
                  style={{
                    cursor: "pointer",
                    borderColor:
                      selected === preset.id
                        ? "var(--mantine-color-pink-5)"
                        : undefined,
                  }}
                >
                  <Text fw={700} size="sm">
                    {preset.title}
                  </Text>
                  <Text size="xs" c="dimmed" mt={4}>
                    {preset.items.length} items
                  </Text>
                </Card>
              ))}
          </SimpleGrid>
        </div>
      ))}
    </Stack>
  );
}

function CustomBuilder({
  title,
  setTitle,
  items,
  updateItem,
  addItem,
  removeItem,
}: {
  title: string;
  setTitle: (value: string) => void;
  items: string[];
  updateItem: (index: number, value: string) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
}) {
  return (
    <Stack gap="lg">
      <TextInput
        label="Topic"
        placeholder="Best friend group survival skills"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        size="md"
      />
      <div>
        <Text fw={700} mb="sm">
          Items{" "}
          <Text span c="dimmed" fw={400} size="sm">
            (at least 2)
          </Text>
        </Text>
        <Stack gap="sm">
          {items.map((item, index) => (
            <Group key={index} wrap="nowrap">
              <TextInput
                aria-label={`Tier list item ${index + 1}`}
                placeholder={`Item ${index + 1}`}
                value={item}
                onChange={(event) =>
                  updateItem(index, event.currentTarget.value)
                }
                style={{ flex: 1 }}
              />
              <Button
                aria-label={`Remove item ${index + 1}`}
                variant="subtle"
                color="gray"
                onClick={() => removeItem(index)}
                disabled={items.length <= 2}
              >
                <Trash2 size={17} />
              </Button>
            </Group>
          ))}
          <Button
            variant="subtle"
            color="gray"
            leftSection={<Plus size={17} />}
            onClick={addItem}
          >
            Add item
          </Button>
        </Stack>
      </div>
    </Stack>
  );
}

export function TierListBoard({
  title,
  items,
  onHome,
  onRestart,
}: {
  title: string;
  items: string[];
  onHome: () => void;
  onRestart: () => void;
}) {
  const [board, setBoard] = useState<BoardItem[]>(() =>
    items.map((label, index) => ({
      id: `${index}-${label}`,
      label,
      tier: "unranked",
    })),
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
  );
  const activeItem = board.find((item) => item.id === activeId);
  const itemsForTier = (tier: TierId) =>
    board.filter((item) => item.tier === tier);
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const targetItem = board.find((item) => item.id === over.id);
    const targetTier = targetItem?.tier ?? (over.id as TierId);
    if (
      !tierIds.includes(targetTier as Exclude<TierId, "unranked">) &&
      targetTier !== "unranked"
    )
      return;
    setBoard((current) => {
      const moved = current.find((item) => item.id === active.id);
      if (!moved) return current;
      const updated = current.map((item) =>
        item.id === moved.id ? { ...item, tier: targetTier } : item,
      );
      if (!targetItem || moved.tier !== targetTier) return updated;
      const tierItems = updated.filter((item) => item.tier === targetTier);
      const oldIndex = tierItems.findIndex((item) => item.id === moved.id);
      const newIndex = tierItems.findIndex((item) => item.id === targetItem.id);
      const reordered = arrayMove(tierItems, oldIndex, newIndex);
      const order = new Map(reordered.map((item, index) => [item.id, index]));
      return [...updated].sort((a, b) =>
        a.tier === targetTier && b.tier === targetTier
          ? (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0)
          : 0,
      );
    });
  };
  return (
    <Shell onHome={onHome} eyebrow="TIER LIST">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <div>
            <Badge color="pink" variant="light" mb="sm">
              RANKING TOGETHER
            </Badge>
            <Title order={1}>{title}</Title>
            <Text c="dimmed" mt={5}>
              Drag an item into any row. Drop directly on another item to
              rearrange it.
            </Text>
          </div>
          <ThemeIcon size={48} radius="md" color="pink" variant="light">
            <Sparkles size={24} />
          </ThemeIcon>
        </Group>
        <DndContext
          sensors={sensors}
          collisionDetection={tierCollisionDetection}
          onDragStart={({ active }) => setActiveId(String(active.id))}
          onDragCancel={() => setActiveId(null)}
          onDragEnd={handleDragEnd}
        >
          <Stack gap="sm">
            <TierDropZone tier="unranked" items={itemsForTier("unranked")} />
            {tierIds.map((tier) => (
              <TierDropZone key={tier} tier={tier} items={itemsForTier(tier)} />
            ))}
          </Stack>
          <DragOverlay>
            {activeItem ? <ItemChip item={activeItem} dragging /> : null}
          </DragOverlay>
        </DndContext>
        <Group justify="space-between" mt="sm">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<HomeIcon size={17} />}
            onClick={onHome}
          >
            Back to games
          </Button>
          <Group gap="xs">
            <Button
              variant="subtle"
              color="gray"
              leftSection={<RotateCcw size={17} />}
              onClick={onRestart}
            >
              Start over
            </Button>
            <Button
              color="pink"
              leftSection={<Check size={17} />}
              onClick={onHome}
            >
              Done
            </Button>
          </Group>
        </Group>
      </Stack>
    </Shell>
  );
}

function TierDropZone({ tier, items }: { tier: TierId; items: BoardItem[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: tier,
    data: { type: "tier", tier },
  });
  return (
    <Paper
      ref={setNodeRef}
      withBorder
      p="sm"
      radius="md"
      style={{
        borderColor: isOver ? "var(--mantine-color-pink-5)" : undefined,
        background: isOver ? "rgba(190, 24, 93, .12)" : undefined,
        minHeight: 76,
        touchAction: "none",
        transition: "border-color 140ms ease, background 140ms ease",
      }}
    >
      <Group align="stretch" wrap="nowrap">
        <ThemeIcon
          color={tierColors[tier]}
          variant="light"
          radius="sm"
          style={{ minWidth: 54 }}
        >
          <Text fw={800} size="lg">
            {tier === "unranked" ? "?" : tier}
          </Text>
        </ThemeIcon>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Group
            gap="xs"
            wrap="wrap"
            style={{ flex: 1, minHeight: 42, alignContent: "center" }}
          >
            {items.length ? (
              items.map((item) => <SortableItem key={item.id} item={item} />)
            ) : (
              <Text c={isOver ? "pink" : "dimmed"} size="sm" py={10}>
                {tier === "unranked"
                  ? "Drag items here to get started"
                  : "Drop items here"}
              </Text>
            )}
          </Group>
        </SortableContext>
      </Group>
    </Paper>
  );
}

function SortableItem({ item }: { item: BoardItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { type: "item", tier: item.tier } });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
        touchAction: "none",
      }}
      {...attributes}
      {...listeners}
    >
      <ItemChip item={item} />
    </div>
  );
}
function ItemChip({ item, dragging }: { item: BoardItem; dragging?: boolean }) {
  return (
    <Paper
      shadow={dragging ? "lg" : undefined}
      withBorder
      p="xs"
      radius="md"
      style={{
        cursor: "grab",
        touchAction: "none",
        background: "var(--mantine-color-dark-6)",
      }}
    >
      <Group gap={5} wrap="nowrap">
        <GripVertical size={14} opacity={0.5} />
        <Text size="sm" fw={600}>
          {item.label}
        </Text>
      </Group>
    </Paper>
  );
}
