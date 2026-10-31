import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

// Exercise the actual pure TypeScript helpers without adding a test framework.
async function loadTypeScript(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}

const { teams } = await loadTypeScript(
  "../src/components/AboutTeam/team-data.ts",
);
const {
  createBubbleLayout,
  getBubbleBounds,
  projectBubble,
  BUBBLE_OUTLINE_ALLOWANCE,
  MIN_BUBBLE_SCALE,
} = await loadTypeScript("../src/components/AboutTeam/bubble-layout.ts");

function assertSeparate(layout, height, cameraX, cameraY) {
  const circles = layout.slots.map((slot) =>
    projectBubble(
      slot.row * layout.rowPitch - cameraY,
      height,
      slot,
      layout.diameter,
      cameraX,
    ),
  );
  for (let i = 0; i < circles.length; i++) {
    const a = circles[i];
    assert.ok(Number.isFinite(a.x) && Number.isFinite(a.y));
    assert.ok(a.scale >= MIN_BUBBLE_SCALE && a.scale <= 1);
    for (let j = i + 1; j < circles.length; j++) {
      const b = circles[j];
      const separation = Math.hypot(a.x - b.x, a.y - b.y);
      const paintedRadii =
        (layout.diameter / 2 + BUBBLE_OUTLINE_ALLOWANCE) * (a.scale + b.scale);
      assert.ok(
        separation >= paintedRadii - 1e-7,
        `Overlap: members ${i}/${j}, camera (${cameraX}, ${cameraY}), gap ${separation - paintedRadii}`,
      );
    }
  }
}

test("all circles and focus outlines stay separate throughout diagonal scrolling", () => {
  for (const [width, height] of [
    [280, 400],
    [375, 560],
    [680, 560],
    [1024, 800],
  ]) {
    const layout = createBubbleLayout(teams, width, height);
    const bounds = getBubbleBounds(layout);
    // Also cover positions beyond the bounds to catch any spring overshoot.
    for (let x = -2; x <= 22; x++) {
      for (let y = -2; y <= 52; y++) {
        assertSeparate(
          layout,
          height,
          bounds.minX + ((bounds.maxX - bounds.minX) * x) / 20,
          bounds.minY + ((bounds.maxY - bounds.minY) * y) / 50,
        );
      }
    }
  }
});

test("click, reset and cross-cluster selection paths remain collision free", () => {
  const layout = createBubbleLayout(teams, 680, 560);
  for (let i = 0; i < layout.slots.length; i++) {
    const from = layout.slots[i];
    const to = layout.slots[layout.slots.length - 1 - i];
    for (let step = 0; step <= 40; step++) {
      const progress = step / 40;
      assertSeparate(
        layout,
        560,
        from.x + (to.x - from.x) * progress,
        (from.row + (to.row - from.row) * progress) * layout.rowPitch,
      );
      assertSeparate(
        layout,
        560,
        from.x * progress,
        from.row * layout.rowPitch * progress,
      );
    }
  }
});

test("unequal teams and partial final rows preserve a non-overlapping lattice", () => {
  const member = teams[0].teamMembers[0];
  for (const count of [0, 1, 2, 3, 4, 5, 6, 7, 8, 29, 30, 31, 102]) {
    const roster = [
      {
        ...teams[0],
        teamMembers: Array.from({ length: count }, (_, i) => ({
          ...member,
          id: `member-${i}`,
        })),
      },
    ];
    const layout = createBubbleLayout(roster, 680, 560);
    assert.equal(layout.slots.length, count);
    assert.deepEqual(
      layout.slots.map((slot) => slot.member.id),
      roster[0].teamMembers.map((person) => person.id),
    );
    const bounds = getBubbleBounds(layout);
    assert.ok(Object.values(bounds).every(Number.isFinite));
    for (const slot of layout.slots) {
      assertSeparate(layout, 560, slot.x, slot.row * layout.rowPitch);
    }
  }
  const layout = createBubbleLayout(teams, 680, 560);
  for (const team of teams) {
    assert.ok(
      layout.slots.some(
        (slot) =>
          slot.team.id === team.id && slot.row === layout.firstRows[team.id],
      ),
    );
  }
});

test("sizes depend only on distance, change continuously, and never become tiny", () => {
  const layout = createBubbleLayout(teams, 680, 560);
  let previous = 1;
  const slot = { x: 0, offsetY: 0, size: 1 };
  for (let distance = 0; distance <= 2000; distance += 2) {
    const vertical = projectBubble(distance, 560, slot, layout.diameter);
    const horizontal = projectBubble(0, 560, slot, layout.diameter, distance);
    assert.ok(vertical.scale >= MIN_BUBBLE_SCALE);
    assert.ok(vertical.scale <= previous);
    if (distance) assert.ok(previous - vertical.scale < 0.01);
    assert.ok(Math.abs(vertical.scale - horizontal.scale) < 1e-10);
    previous = vertical.scale;
  }
  const centeredScale = projectBubble(0, 560, slot, layout.diameter).scale;
  for (const member of layout.slots) {
    assert.equal(
      projectBubble(0, 560, member, layout.diameter, member.x).scale,
      centeredScale,
    );
  }
});
