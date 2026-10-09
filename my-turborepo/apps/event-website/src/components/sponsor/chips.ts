export interface Chip {
  id: string;
  name: string;
  /** Desktop center, as a percentage of the field's width / height. */
  x: number;
  y: number;
  /** Mobile center (the field is taller and narrower there). */
  mx: number;
  my: number;
  /** Desktop width, as a percentage of the field's width. */
  size: number;
  /** Degrees the chip is turned on the table. */
  rotation: number;
  /** Match the chip's SVG; used to draw its back and side. */
  colors: { body: string; stripe: string; ring: string };
}

/** Hand-scattered so the chips look random but never overlap. */
export const CHIPS: Chip[] = [
  {
    id: "heb",
    name: "H-E-B",
    x: 73,
    y: 82,
    mx: 32,
    my: 86,
    size: 22,
    rotation: -12,
    colors: { body: "#E70020", stripe: "#E70020", ring: "#B10018" },
  },
  {
    id: "databricks",
    name: "Databricks",
    x: 36,
    y: 17,
    mx: 69,
    my: 18,
    size: 23,
    rotation: 8,
    colors: { body: "#FF3621", stripe: "#1B3139", ring: "#C4281A" },
  },
  {
    id: "qualcomm",
    name: "Qualcomm",
    x: 60,
    y: 38,
    mx: 31,
    my: 35,
    size: 21,
    rotation: -6,
    colors: { body: "#3253DC", stripe: "#3253DC", ring: "#233CA0" },
  },
  {
    id: "hitachi",
    name: "Hitachi",
    x: 86,
    y: 20,
    mx: 71,
    my: 43,
    size: 22,
    rotation: 14,
    colors: { body: "#E60012", stripe: "#E60012", ring: "#AE000D" },
  },
  {
    id: "sec",
    name: "SEC",
    x: 13,
    y: 30,
    mx: 30,
    my: 10,
    size: 23,
    rotation: -15,
    colors: { body: "#1F1F1F", stripe: "#1F1F1F", ring: "#000000" },
  },
  {
    id: "conocophillips",
    name: "ConocoPhillips",
    x: 47,
    y: 70,
    mx: 69,
    my: 69,
    size: 22,
    rotation: 6,
    colors: { body: "#E4002B", stripe: "#1A1A1A", ring: "#A80020" },
  },
  {
    id: "phillips",
    name: "Phillips 66",
    x: 90,
    y: 56,
    mx: 71,
    my: 91,
    size: 21,
    rotation: -9,
    colors: { body: "#E31937", stripe: "#1A1A1A", ring: "#A8122A" },
  },
  {
    id: "serp",
    name: "SerpApi",
    x: 19,
    y: 69,
    mx: 28,
    my: 61,
    size: 22,
    rotation: 11,
    colors: { body: "#3B4BF0", stripe: "#161A3A", ring: "#2A36AF" },
  },
];

/** The desktop field is 3:2, so a y step covers 2/3 the distance of an x step. */
const distanceFromTopRight = ({ x, y }: Chip) => 100 - x + y * (2 / 3);

/** On desktop the chips flip in a wave from the top right to the bottom left. */
export const FLIP_ORDER = new Map(
  [...CHIPS]
    .sort((p, q) => distanceFromTopRight(p) - distanceFromTopRight(q))
    .map((chip, index) => [chip.id, index]),
);
