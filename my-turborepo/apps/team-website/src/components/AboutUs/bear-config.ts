export const BEAR_MODEL_URL = "/models/about-bear.glb";
export const BEAR_POSTER_URL = "/images/about-us/bear-poster.webp";
export const BEAR_BACKDROP_URL = "/images/about-us/bear-dots.png";

export const RETURN_DURATION = 800;

// The supplied model is 0.735 units wide per unit of height. Reserve the
// desktop side columns for labels; phones use the full stage width.
export function bearZoom(width: number, height: number) {
  return Math.min(height * 0.4, (width * (width >= 640 ? 0.21 : 0.43)) / 0.735);
}

export interface BearStat {
  id: string;
  value: string;
  label: string;
  // Coordinates relative to the centered, two-unit-tall model.
  anchor: [number, number, number];
  // Resting SVG box dimensions as fractions of composition height.
  box: [number, number];
  side: "left" | "right";
  labelPosition: [number, number];
}

export const BEAR_STATS: BearStat[] = [
  {
    id: "participants",
    value: "600+",
    label: "PARTICIPANTS",
    anchor: [0.35, 0.64, 0.3],
    box: [0.16, 0.17],
    side: "right",
    labelPosition: [0.73, 0.09],
  },
  {
    id: "schools",
    value: "20+",
    label: "SCHOOLS",
    anchor: [-0.27, 0.2, 0.53],
    box: [0.22, 0.22],
    side: "left",
    labelPosition: [0.04, 0.4],
  },
  {
    id: "prizes",
    value: "15k+",
    label: "IN PRIZES",
    anchor: [0.25, -0.64, 0.27],
    box: [0.22, 0.24],
    side: "right",
    labelPosition: [0.75, 0.76],
  },
];

export interface BearMotion {
  yaw: number;
  pitch: number;
  dragging: boolean;
  returnAt: number;
  fromYaw: number;
  fromPitch: number;
}

export type ProjectAnchors = (
  points: { x: number; y: number }[],
  width: number,
  height: number,
) => void;

// Discard completed turns so recentering does not unwind every revolution.
export function wrapRotation(value: number) {
  return Math.atan2(Math.sin(value), Math.cos(value));
}

export function returnProgress(elapsed: number) {
  const t = Math.min(1, Math.max(0, elapsed / RETURN_DURATION));
  return 1 - Math.pow(1 - t, 3);
}
