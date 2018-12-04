import { segmentLineSide } from './segmentLine';
import { boxIntersect } from './boundingBox';

export function segSegIntersect(segment1, segment2, precision = 0) {
  const side1 = segmentLineSide(segment1, segment2, precision);
  const side2 = segmentLineSide(segment2, segment1, precision);

  if (
    side1 === segmentLineSide.INTERSECTION &&
    side2 === segmentLineSide.INTERSECTION
  ) {
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

  if(
    side1 === segmentLineSide.ABOVE_1 ||
    side1 === segmentLineSide.ABOVE_2 ||
    side2 === segmentLineSide.ABOVE_1 ||
    side2 === segmentLineSide.ABOVE_2
  ) {
    return segSegIntersect.NO_INTERSECTION;
  }

  if (side1 === segmentLineSide.ABOVE_1_2 || side2 === segmentLineSide.ABOVE_1_2) {
    let intersection = boxIntersect(segment1, segment2);
    if(intersection) {
      const minDist = Math.min(
        dist(segment1[0], segment2[0]),
        dist(segment1[0], segment2[1]),
        dist(segment1[1], segment2[0]),
        dist(segment1[1], segment2[1])
      );

      intersection = minDist > precision;
    }

    return intersection ? segSegIntersect.INLINE_INTERSECTION : segSegIntersect.NO_INTERSECTION;
  }
}

segSegIntersect.INTERSECTION = Symbol('segSegIntersect.INTERSECTION');
segSegIntersect.INLINE_INTERSECTION = Symbol('segSegIntersect.INLINE_INTERSECTION');
segSegIntersect.NO_INTERSECTION = Symbol('segSegIntersect.NO_INTERSECTION');
segSegIntersect.RIGHT = Symbol('segSegIntersect.RIGHT');

function dist(p1, p2) {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}