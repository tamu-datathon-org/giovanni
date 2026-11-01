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
