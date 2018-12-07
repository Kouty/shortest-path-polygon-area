import { pointLineSide } from './pointLine';

export function segmentLineSide([s1, s2], line, precision) {
  const side1 = pointLineSide(s1, line, precision);
  const side2 = pointLineSide(s2, line, precision);

  if (side1 === pointLineSide.ABOVE && side2 === pointLineSide.ABOVE) {
    return segmentLineSide.ABOVE_1_2;
  }

  if (side1 === side2) {
    return side1 === pointLineSide.LEFT ? segmentLineSide.LEFT : segmentLineSide.RIGHT;
  }

  if (side1 === pointLineSide.ABOVE) {
    return side2 === pointLineSide.RIGHT
      ? segmentLineSide.ABOVE_1_RIGHT
      : segmentLineSide.ABOVE_1_LEFT;
  }

  if (side2 === pointLineSide.ABOVE) {
    return side1 === pointLineSide.RIGHT
      ? segmentLineSide.ABOVE_2_RIGHT
      : segmentLineSide.ABOVE_2_LEFT;
  }

  return segmentLineSide.INTERSECTION;
}

segmentLineSide.LEFT = Symbol('segmentLineSide.LEFT');
segmentLineSide.RIGHT = Symbol('segmentLineSide.RIGHT');
segmentLineSide.INTERSECTION = Symbol('segmentLineSide.INTERSECTION');
segmentLineSide.ABOVE_1_RIGHT = Symbol('segmentLineSide.ABOVE_1_RIGHT');
segmentLineSide.ABOVE_1_LEFT = Symbol('segmentLineSide.ABOVE_1_LEFT');
segmentLineSide.ABOVE_2_RIGHT = Symbol('segmentLineSide.ABOVE_2_RIGHT');
segmentLineSide.ABOVE_2_LEFT = Symbol('segmentLineSide.ABOVE_2_LEFT');
segmentLineSide.ABOVE_1_2 = Symbol('segmentLineSide.ABOVE_1_2');
