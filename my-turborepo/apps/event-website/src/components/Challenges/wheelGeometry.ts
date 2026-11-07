import { wheelOptions } from "./challengeData";

const wheelCenter = { x: 330, y: 341 };
const segmentRadius = 320;
export const segmentAngle = 360 / wheelOptions.length;

function pointAt(radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: wheelCenter.x + Math.sin(radians) * radius,
    y: wheelCenter.y - Math.cos(radians) * radius,
  };
}

export function getSegmentPath(index: number) {
  const startAngle = index * segmentAngle;
  const endAngle = (index + 1) * segmentAngle;
  const firstEdge = pointAt(segmentRadius, startAngle);
  const secondEdge = pointAt(segmentRadius, endAngle);

  return [
    `M ${wheelCenter.x} ${wheelCenter.y}`,
    `L ${firstEdge.x} ${firstEdge.y}`,
    `A ${segmentRadius} ${segmentRadius} 0 0 1 ${secondEdge.x} ${secondEdge.y}`,
    "Z",
  ].join(" ");
}

/** A clockwise arc across a slice, for a name to run along (tops pointing out). */
export function getLabelArc(index: number, radius: number) {
  const start = pointAt(radius, index * segmentAngle);
  const end = pointAt(radius, (index + 1) * segmentAngle);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

// Names curve along the outer band of each slice, between the white ring and the rim.
const labelTop = 292; // cap tops, just inside the orange rim
const labelSpan = ((segmentAngle - 5) * Math.PI) / 180; // clear of the slice dividers
const capHeight = 0.7; // Righteous, in ems
const charWidth = 0.68; // a generous average Righteous capital, in ems

function baselines(font: number) {
  const outer = labelTop - capHeight * font;
  const inner = outer - 1.1 * font;
  return { outer, inner, single: (outer + inner) / 2 };
}

const fits = (line: string, radius: number, font: number) =>
  line.length * charWidth * font <= radius * labelSpan;

/** One line if it fits, otherwise two, broken where the longer line is shortest. */
function splitLabel(name: string, font: number): string[] {
  const words = name.toUpperCase().split(/\s+/);
  const whole = words.join(" ");
  if (words.length < 2 || fits(whole, baselines(font).single, font)) {
    return [whole];
  }

  const splits = words
    .slice(1)
    .map((_, i) => [words.slice(0, i + 1).join(" "), words.slice(i + 1).join(" ")]);
  const longest = (lines: string[]) => Math.max(...lines.map((line) => line.length));
  return splits.reduce((best, lines) => (longest(lines) < longest(best) ? lines : best));
}

function layoutLabels(font: number) {
  const radii = baselines(font);
  const labels = wheelOptions.map((option) =>
    splitLabel(option.wheelName ?? option.name, font),
  );
  const allFit = labels.every((lines) =>
    lines.length === 1
      ? fits(lines[0] ?? "", radii.single, font)
      : fits(lines[0] ?? "", radii.outer, font) &&
        fits(lines[1] ?? "", radii.inner, font),
  );
  return allFit ? labels : null;
}

// One size for every slice: the largest that fits them all.
let font = 28;
let labels = layoutLabels(font);
while (!labels && font > 14) {
  font -= 1;
  labels = layoutLabels(font);
}

export const wheelLabelFont = font;

/** Each slice's name as lines, outer first, with the radius each line sits on. */
export const wheelLabels = (labels ?? []).map((lines) => {
  const radii = baselines(font);
  return lines.length === 1
    ? [{ text: lines[0] ?? "", radius: radii.single }]
    : [
        { text: lines[0] ?? "", radius: radii.outer },
        { text: lines[1] ?? "", radius: radii.inner },
      ];
});
