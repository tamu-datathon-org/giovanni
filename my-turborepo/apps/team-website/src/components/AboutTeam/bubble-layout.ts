import type { Team, TeamMember } from "./team-data";

export interface BubbleSlot {
  member: TeamMember;
  team: Team;
  x: number;
  y: number;
}

/**
 * Honeycomb shape: even rows hold `columns` faces and odd rows one fewer, so
 * the lattice stays symmetric. If everyone doesn't fit, the grid grows along
 * its longer side; spare cells are trimmed from the corners.
 */
export interface BubbleGrid {
  columns: number;
  rows: number;
}

// Even gap, in px, between two full-size neighboring portraits.
export const BUBBLE_GAP = 12;

export interface BubbleLayout {
  slots: BubbleSlot[];
  /** Resting camera position: the center team's first member. */
  home: { x: number; y: number };
  diameter: number;
  captionWidth: number;
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Native scroll extents include every face's center, with no empty extra plane. */
export function getBubbleBounds(layout: BubbleLayout) {
  return layout.slots.reduce(
    (bounds, slot) => ({
      minX: Math.min(bounds.minX, slot.x),
      maxX: Math.max(bounds.maxX, slot.x),
      minY: Math.min(bounds.minY, slot.y),
      maxY: Math.max(bounds.maxY, slot.y),
    }),
    { minX: 0, maxX: 0, minY: 0, maxY: 0 },
  );
}

interface Point {
  x: number;
  y: number;
}

const rowLength = (row: number, columns: number) =>
  row % 2 === 0 ? columns : columns - 1;

const gridCapacity = ({ columns, rows }: BubbleGrid) => {
  let total = 0;
  for (let row = 0; row < rows; row++) total += rowLength(row, columns);
  return total;
};

/** Grows a too-small grid along its longer side, so wide stays wide and tall stays tall. */
function fitGrid(grid: BubbleGrid, count: number): BubbleGrid {
  // Two columns minimum: a single column has no offset rows to nest into,
  // so faces a row apart would overlap.
  let columns = Math.max(2, Math.floor(grid.columns));
  let rows = Math.max(1, Math.floor(grid.rows));
  while (gridCapacity({ columns, rows }) < count) {
    if (columns >= rows) columns++;
    else rows++;
  }
  if (columns !== grid.columns || rows !== grid.rows) {
    console.warn(
      `[BubbleField] A ${grid.columns}×${grid.rows} grid can't hold ${count} faces; using ${columns}×${rows}.`,
    );
  }
  return { columns, rows };
}

/**
 * The first team sits in the middle. Every other team gets one wedge around
 * it, clockwise from (about) 12 o'clock in array order, and each team's
 * members fill their wedge from the inside out, so its first member (the
 * lead) sits next to the middle.
 */
export function createBubbleLayout(
  teams: Team[],
  width: number,
  fieldHeight: number,
  grid: BubbleGrid,
): BubbleLayout {
  const clusterWidth = Math.min(width - 16, fieldHeight * 1.6, 1400);
  const diameter = Math.max(56, (clusterWidth - 64) * 0.26);
  const columnPitch = diameter + BUBBLE_GAP;
  const rowPitch = (columnPitch * Math.sqrt(3)) / 2;
  const count = teams.reduce(
    (total, team) => total + team.teamMembers.length,
    0,
  );
  const { columns, rows } = fitGrid(grid, count);

  const cells: Point[] = [];
  for (let row = 0; row < rows; row++) {
    const length = rowLength(row, columns);
    for (let index = 0; index < length; index++) {
      cells.push({
        x: (index - (length - 1) / 2) * columnPitch,
        y: (row - (rows - 1) / 2) * rowPitch,
      });
    }
  }

  // Spare cells come off the corners. The distance is normalized to the
  // grid's own extents so the kept cells follow its aspect ratio.
  const halfWidth = Math.max(columnPitch, ...cells.map(({ x }) => Math.abs(x)));
  const halfHeight = Math.max(rowPitch, ...cells.map(({ y }) => Math.abs(y)));
  const kept = cells
    .map((cell) => ({
      cell,
      reach: (cell.x / halfWidth) ** 2 + (cell.y / halfHeight) ** 2,
    }))
    .sort((a, b) => a.reach - b.reach)
    .slice(0, count)
    .map(({ cell }) => cell);

  const TAU = Math.PI * 2;
  const distance = (cell: Point, from: Point) =>
    Math.hypot(cell.x - from.x, cell.y - from.y);
  // Clockwise on screen (y points down), starting at 12 o'clock.
  const clockAngle = (cell: Point, from: Point) =>
    (Math.atan2(cell.y - from.y, cell.x - from.x) + Math.PI * 2.5) % TAU;
  const origin = { x: 0, y: 0 };

  const core = teams.at(0);
  const others = teams.slice(1);
  const coreSize = core?.teamMembers.length ?? 0;
  kept.sort(
    (a, b) =>
      distance(a, origin) - distance(b, origin) ||
      clockAngle(a, origin) - clockAngle(b, origin),
  );
  const coreCells = kept.slice(0, coreSize);
  const center = coreCells.length
    ? {
        x: coreCells.reduce((sum, cell) => sum + cell.x, 0) / coreCells.length,
        y: coreCells.reduce((sum, cell) => sum + cell.y, 0) / coreCells.length,
      }
    : origin;

  // Each other team takes one run of the remaining cells in clockwise order
  // around the middle of the center team, which makes a wedge touching it. A narrow wedge
  // (top and bottom of a tall grid) can skip a cell and split in two, so the
  // start angle is nudged away from 12 o'clock a degree at a time until every
  // wedge is one piece that touches the middle.
  const coreSet = new Set(coreCells);
  const neighbors = new Map(
    kept.map((cell) => [
      cell,
      kept.filter(
        (other) => other !== cell && distance(cell, other) < columnPitch * 1.5,
      ),
    ]),
  );
  const wedgePenalty = (wedge: Point[]) => {
    const first = wedge.at(0);
    if (!first) return 0;
    const inWedge = new Set(wedge);
    const reached = new Set<Point>();
    const stack = [first];
    for (let cell = stack.pop(); cell; cell = stack.pop()) {
      if (reached.has(cell)) continue;
      reached.add(cell);
      for (const next of neighbors.get(cell) ?? [])
        if (inWedge.has(next)) stack.push(next);
    }
    const touchesCore = wedge.some((cell) =>
      neighbors.get(cell)?.some((next) => coreSet.has(next)),
    );
    return (reached.size < wedge.length ? 100 : 0) + (touchesCore ? 0 : 1);
  };
  const ring = kept.slice(coreSize);
  let best: { wedges: Point[][]; penalty: number } | undefined;
  for (let step = 0; step < 360 && best?.penalty !== 0; step++) {
    // 0°, +1°, -1°, +2°, … so ties go to the start nearest 12 o'clock.
    const start = (((step % 2 ? step + 1 : -step) / 2) * Math.PI) / 180;
    const turn = (cell: Point) =>
      (clockAngle(cell, center) - start + TAU) % TAU;
    const order = [...ring].sort(
      (a, b) => turn(a) - turn(b) || distance(a, center) - distance(b, center),
    );
    let cursor = 0;
    const wedges = others.map((team) =>
      order.slice(cursor, (cursor += team.teamMembers.length)),
    );
    const penalty = wedges.reduce((sum, wedge) => sum + wedgePenalty(wedge), 0);
    if (!best || penalty < best.penalty) best = { wedges, penalty };
  }

  // Members fill their cells from the inside out, so leads sit nearest the middle.
  const slots: BubbleSlot[] = [];
  const place = (team: Team, teamCells: Point[]) => {
    teamCells
      .sort((a, b) => distance(a, center) - distance(b, center))
      .forEach((cell, index) => {
        const member = team.teamMembers.at(index);
        if (member) slots.push({ member, team, x: cell.x, y: cell.y });
      });
  };
  if (core) place(core, coreCells);
  others.forEach((team, index) => place(team, best?.wedges[index] ?? []));

  // Rest on a face rather than between the core's faces, so exactly one sits
  // under the lens at full size with its caption showing.
  const first = slots.at(0);
  return {
    slots,
    home: first ? { x: first.x, y: first.y } : center,
    diameter,
    captionWidth: Math.min(224, Math.max(132, clusterWidth * 0.34)),
  };
}

/**
 * One axis at a time, exactly like the Watch honeycomb: a face stays put at
 * full size until it reaches `plateau`, then eases into the remaining
 * distance to `halfExtent`. `pos` is the exact integral of the stretch
 * curve, so a face's screen position and its size shrink together and gaps
 * never widen as faces shrink. Beyond `halfExtent`, position pins to the
 * viewport edge and stretch is exactly 0.
 */
function lensAxis(value: number, halfExtent: number, plateau: number) {
  const boundedPlateau = clamp(plateau, 0, halfExtent);
  const fringe = Math.max(0.0001, halfExtent - boundedPlateau);
  const magnitude = Math.abs(value);
  if (magnitude <= boundedPlateau) {
    return { pos: value, stretch: 1 };
  }
  const t = clamp((magnitude - boundedPlateau) / (2 * fringe), 0, 1);
  // Smoothstep and its exact integral, so stretch and position stay consistent.
  const smoothstep = 3 * t * t - 2 * t * t * t;
  const stretch = 1 - smoothstep;
  const integral = t - t * t * t + (t * t * t * t) / 2;
  const mapped = boundedPlateau + 2 * fringe * integral;
  return { pos: Math.sign(value) * mapped, stretch };
}

/**
 * Rectangular honeycomb lens: only the exact center of the field is
 * guaranteed full size — everything else already eases into the gradient,
 * reaching exactly zero size at the viewport boundary, the way the one face
 * nearest the Watch's finger is the only one that's truly at rest. Scale is
 * measured at each face's outer edge (its own radius plus half the gap)
 * along both axes — the weakest local stretch across its source disk — so
 * projected disks can never overlap.
 */
export function projectBubble(
  relX: number,
  relY: number,
  viewport: { width: number; height: number },
  diameter: number,
) {
  const halfWidth = viewport.width / 2;
  const halfHeight = viewport.height / 2;
  const outerRadius = (diameter + BUBBLE_GAP) / 2;

  const lensX = lensAxis(relX, halfWidth, outerRadius);
  const lensY = lensAxis(relY, halfHeight, outerRadius);
  const edgeX = lensAxis(Math.abs(relX) + outerRadius, halfWidth, outerRadius);
  const edgeY = lensAxis(Math.abs(relY) + outerRadius, halfHeight, outerRadius);
  const scale = edgeX.stretch * edgeY.stretch;

  const radialDistance = Math.hypot(relX, relY);
  return {
    x: lensX.pos,
    y: lensY.pos,
    scale,
    captionOpacity: clamp(
      (diameter * 0.75 - radialDistance) / (diameter * 0.25),
      0,
      1,
    ),
  };
}
