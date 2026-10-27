import { wheelOptions } from "./challengeData";

const wheelCenter = { x: 330, y: 341 };
const segmentBands = [
  { innerRadiusX: 114, innerRadiusY: 118, outerRadiusX: 177, outerRadiusY: 184 },
  { innerRadiusX: 188, innerRadiusY: 195, outerRadiusX: 297, outerRadiusY: 305 },
];
const segmentInset = 0;
export const segmentAngle = 360 / wheelOptions.length;

function pointAt(radiusX: number, radiusY: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: wheelCenter.x + Math.sin(radians) * radiusX,
    y: wheelCenter.y - Math.cos(radians) * radiusY,
  };
}

function segmentBandPath(
  startAngle: number,
  endAngle: number,
  innerRadiusX: number,
  innerRadiusY: number,
  outerRadiusX: number,
  outerRadiusY: number,
) {
  const firstInnerPoint = pointAt(innerRadiusX, innerRadiusY, startAngle);
  const firstOuterPoint = pointAt(outerRadiusX, outerRadiusY, startAngle);
  const secondOuterPoint = pointAt(outerRadiusX, outerRadiusY, endAngle);
  const secondInnerPoint = pointAt(innerRadiusX, innerRadiusY, endAngle);

  return [
    `M ${firstInnerPoint.x} ${firstInnerPoint.y}`,
    `L ${firstOuterPoint.x} ${firstOuterPoint.y}`,
    `A ${outerRadiusX} ${outerRadiusY} 0 0 1 ${secondOuterPoint.x} ${secondOuterPoint.y}`,
    `L ${secondInnerPoint.x} ${secondInnerPoint.y}`,
    `A ${innerRadiusX} ${innerRadiusY} 0 0 0 ${firstInnerPoint.x} ${firstInnerPoint.y}`,
    "Z",
  ].join(" ");
}

export function getSegmentPath(index: number) {
  const startAngle = index * segmentAngle + segmentInset;
  const endAngle = (index + 1) * segmentAngle - segmentInset;

  return segmentBands
    .map((band) =>
      segmentBandPath(
        startAngle,
        endAngle,
        band.innerRadiusX,
        band.innerRadiusY,
        band.outerRadiusX,
        band.outerRadiusY,
      ),
    )
    .join(" ");
}
