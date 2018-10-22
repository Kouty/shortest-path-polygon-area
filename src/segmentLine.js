import { pointLineSide } from './pointLine';

export function segmentLineSide([s1, s2], line, precision) {
  const side1 = pointLineSide(s1, line, precision);
  const side2 = pointLineSide(s2, line, precision);

  if (side1 === pointLineSide.ABOVE && side2 === pointLineSide.ABOVE) {
    return segmentLineSide.ABOVE_1_2;
  }

  if (side1 === side2) {
    return side1 === pointLineSide.LEFT
      ? segmentLineSide.LEFT
      : segmentLineSide.RIGHT;
  }

  if (side1 === pointLineSide.ABOVE || side2 === pointLineSide.ABOVE) {
    return side1 === pointLineSide.ABOVE
      ? segmentLineSide.ABOVE_1
      : segmentLineSide.ABOVE_2;
  }

  return segmentLineSide.INTERSECTION;
}

segmentLineSide.LEFT = Symbol('segmentLineSide.LEFT');
segmentLineSide.RIGHT = Symbol('segmentLineSide.RIGHT');
segmentLineSide.INTERSECTION = Symbol('segmentLineSide.INTERSECTION');
segmentLineSide.ABOVE_1 = Symbol('segmentLineSide.ABOVE_1');
segmentLineSide.ABOVE_2 = Symbol('segmentLineSide.ABOVE_2');
segmentLineSide.ABOVE_1_2 = Symbol('segmentLineSide.ABOVE_1_2');
