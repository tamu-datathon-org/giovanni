import type { Team, TeamMember } from "./team-data";

export interface BubbleSlot {
  member: TeamMember;
  team: Team;
  row: number;
  x: number;
  offsetY: number;
  size: number;
}

// Includes the portrait's outer ring and keyboard focus outline.
export const BUBBLE_OUTLINE_ALLOWANCE = 10;
export const MIN_BUBBLE_SCALE = 0.32;

export interface BubbleLayout {
  slots: BubbleSlot[];
  firstRows: Record<string, number>;
  rowTeams: string[];
  rowCount: number;
  diameter: number;
  captionWidth: number;
  rowPitch: number;
  travel: number;
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Native scroll extents include every face's center, with no empty extra plane. */
export function getBubbleBounds(layout: BubbleLayout) {
  return layout.slots.reduce(
    (bounds, slot) => {
      const y = slot.row * layout.rowPitch + slot.offsetY;
      return {
        minX: Math.min(bounds.minX, slot.x),
        maxX: Math.max(bounds.maxX, slot.x),
        minY: Math.min(bounds.minY, y),
        maxY: Math.max(bounds.maxY, y),
      };
    },
    { minX: 0, maxX: 0, minY: 0, maxY: 0 },
  );
}

/** Interlocking central pairs and trios, with small satellite faces at the sides. */
export function createBubbleLayout(
  teams: Team[],
  width: number,
  fieldHeight = 640,
): BubbleLayout {
  const clusterWidth = Math.min(width - 16, fieldHeight * 1.2, 1060);
  const diameter = Math.max(56, (clusterWidth - 64) * 0.32);
  const columnPitch = diameter + BUBBLE_OUTLINE_ALLOWANCE * 2 + 8;
  const rowPitch = (columnPitch * Math.sqrt(3)) / 2;
  const slots: BubbleSlot[] = [];
  const firstRows: Record<string, number> = {};
  const rowTeams: string[] = [];
  // Packing continues across team boundaries instead of restarting a row per team.
  const members = teams.flatMap((team) =>
    team.teamMembers.map((member) => ({ member, team })),
  );
  let row = 0;
  let cursor = 0;
  while (cursor < members.length) {
    const pattern =
      row % 2 === 0
        ? [{ x: -0.5 }, { x: 0.5 }, { x: -1.5 }, { x: 1.5 }]
        : [{ x: 0 }, { x: -1 }, { x: 1 }];
    const batch = members.slice(cursor, cursor + pattern.length);
    batch.forEach(({ member, team }, index) => {
      const point = pattern[index];
      if (firstRows[team.id] === undefined) firstRows[team.id] = row;
      slots.push({
        member,
        team,
        row,
        // Even a partial final row stays on the lattice. Re-centering that
        // row independently would bring it too close to the row above it.
        x: members.length === 1 ? 0 : point.x * columnPitch,
        offsetY: 0,
        size: 1,
      });
    });
    rowTeams.push(batch[0].team.id);
    cursor += batch.length;
    row++;
  }

  // A team's first face may be a satellite shared with the previous cluster.
  // Prefer its first large face when jumping from the color key.
  for (const team of teams) {
    const prominent = slots.find(
      (slot) =>
        slot.team.id === team.id && Math.abs(slot.x) < clusterWidth * 0.2,
    );
    if (prominent) firstRows[team.id] = prominent.row;
  }

  return {
    slots,
    firstRows,
    rowTeams,
    rowCount: row,
    diameter,
    captionWidth: Math.min(224, Math.max(132, clusterWidth * 0.34)),
    rowPitch,
    travel: Math.max(0, row - 1) * rowPitch,
  };
}

/**
 * One radial lens controls both spacing and size in every pan direction.
 * Its smallest local stretch across a portrait's entire bounding disk sets
 * that portrait's scale. Each drawn disk therefore stays inside the image of
 * its disjoint source disk, so circles cannot intersect at any camera position.
 */
export function projectBubble(
  distance: number,
  fieldHeight: number,
  slot: Pick<BubbleSlot, "x" | "size" | "offsetY">,
  diameter: number,
  cameraX = 0,
) {
  const relativeX = slot.x - cameraX;
  const relativeY = distance + slot.offsetY;
  const radialDistance = Math.hypot(relativeX, relativeY);
  const radius = Math.max(
    diameter,
    Math.min(fieldHeight * 0.46, diameter * 1.55),
  );
  const normalized = radialDistance / radius;
  const positionScale =
    normalized < 0.000001
      ? 1
      : MIN_BUBBLE_SCALE +
        ((1 - MIN_BUBBLE_SCALE) * Math.atan(normalized)) / normalized;
  const outerDistance =
    radialDistance + diameter / 2 + BUBBLE_OUTLINE_ALLOWANCE;
  const scale =
    MIN_BUBBLE_SCALE +
    (1 - MIN_BUBBLE_SCALE) / (1 + Math.pow(outerDistance / radius, 2));
  return {
    x: relativeX * positionScale,
    y: relativeY * positionScale,
    scale,
    captionOpacity: clamp(
      (diameter * 0.75 - radialDistance) / (diameter * 0.25),
      0,
      1,
    ),
  };
}
