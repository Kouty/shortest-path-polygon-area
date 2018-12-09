import { segmentLineSide } from './segmentLine';
import { boxIntersect } from './boundingBox';
import { distance } from './pointPointDistance';

export function segSegIntersect(segment1, segment2, precision = 0) {
  const side1 = segmentLineSide(segment1, segment2, precision);
  const side2 = segmentLineSide(segment2, segment1, precision);

  if (side1 === segmentLineSide.INTERSECTION && side2 === segmentLineSide.INTERSECTION) {
    return segSegIntersect.INTERSECTION;
  }

  if (
    side1 === segmentLineSide.LEFT ||
    side1 === segmentLineSide.RIGHT ||
    side2 === segmentLineSide.LEFT ||
    side2 === segmentLineSide.RIGHT
  ) {
    return segSegIntersect.NO_INTERSECTION;
  }

  if (side2 === segmentLineSide.ABOVE_1_RIGHT) {
    return segSegIntersect.ABOVE_1_RIGHT;
  }

  if (side2 === segmentLineSide.ABOVE_2_RIGHT) {
    return segSegIntersect.ABOVE_2_RIGHT;
  }

  if (side2 === segmentLineSide.ABOVE_1_LEFT) {
    return segSegIntersect.ABOVE_1_LEFT;
  }

  if (side2 === segmentLineSide.ABOVE_2_LEFT) {
    return segSegIntersect.ABOVE_2_LEFT;
  }

  if (side1 === segmentLineSide.ABOVE_2_RIGHT || side1 === segmentLineSide.ABOVE_2_LEFT) {
    return segSegIntersect.ME_ABOVE_2;
  }

  if (side1 === segmentLineSide.ABOVE_1_RIGHT || side1 === segmentLineSide.ABOVE_1_LEFT) {
    return segSegIntersect.ME_ABOVE_1;
  }

  if (side1 === segmentLineSide.ABOVE_1_2 || side2 === segmentLineSide.ABOVE_1_2) {
    let intersection = boxIntersect(segment1, segment2);
    if (intersection) {
      const minDist = Math.min(
        distance(segment1[0], segment2[0]),
        distance(segment1[0], segment2[1]),
        distance(segment1[1], segment2[0]),
        distance(segment1[1], segment2[1])
      );

      intersection = minDist > precision;
    }

    return intersection ? segSegIntersect.INLINE_INTERSECTION : segSegIntersect.NO_INTERSECTION;
  }

  throw new Error(`Unhandled case ${side1.toString()} - ${side2.toString()}`);
}

segSegIntersect.INTERSECTION = Symbol('segSegIntersect.INTERSECTION');
segSegIntersect.INLINE_INTERSECTION = Symbol('segSegIntersect.INLINE_INTERSECTION');
segSegIntersect.NO_INTERSECTION = Symbol('segSegIntersect.NO_INTERSECTION');
segSegIntersect.ABOVE_1_RIGHT = Symbol('segSegIntersect.ABOVE_1_RIGHT');
segSegIntersect.ABOVE_2_RIGHT = Symbol('segSegIntersect.ABOVE_2_RIGHT');
segSegIntersect.ABOVE_1_LEFT = Symbol('segSegIntersect.ABOVE_1_LEFT');
segSegIntersect.ABOVE_2_LEFT = Symbol('segSegIntersect.ABOVE_2_LEFT');
segSegIntersect.ME_ABOVE_1 = Symbol('segSegIntersect.ME_ABOVE_1');
segSegIntersect.ME_ABOVE_2 = Symbol('segSegIntersect.ME_ABOVE_2');
