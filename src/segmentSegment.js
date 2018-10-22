import { segmentLineSide } from './segmentLine';

function boundingBox([[x0, y0], [x1, y1]]) {
  const bbX0 = Math.min(x0, x1);
  const bbX1 = Math.max(x0, x1);
  const bbY0 = Math.min(y0, y1);
  const bbY1 = Math.max(y0, y1);

  // left, top - right, bottom
  return [[bbX0, bbY0], [bbX1, bbY1]];
}

function boxIntersect([[r1L, r1T],[r1R,r1B]], [[r2L, r2T],[r2R,r2B]]) {
  return !(r2L > r1R
    || r2R < r1L
    || r2T > r1B
    || r2B < r1T);
}

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
