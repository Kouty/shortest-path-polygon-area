import { segmentLineSide } from './segmentLine';
import { boundingBox, boxIntersect } from './boundingBox';

export function segSegIntersect(segment1, segment2) {
  const side1 = segmentLineSide(segment1, segment2);
  const side2 = segmentLineSide(segment2, segment1);

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

  if (side1 === segmentLineSide.ABOVE_1_2 || side2 === segmentLineSide.ABOVE_1_2) {
    const bb1 = boundingBox(segment1);
    const bb2 = boundingBox(segment2);

    return boxIntersect(bb1, bb2) ? segSegIntersect.INTERSECTION : segSegIntersect.NO_INTERSECTION;
  }
}

segSegIntersect.INTERSECTION = Symbol('segSegIntersect.INTERSECTION');
segSegIntersect.NO_INTERSECTION = Symbol('segSegIntersect.NO_INTERSECTION');
