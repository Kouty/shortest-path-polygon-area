import { pointLineSide } from './pointLine';

export function segmentLineSide([s1, s2], line) {
  const side1 = pointLineSide(s1, line);
  const side2 = pointLineSide(s2, line);

  if (side1 === side2) {
    return side1 === pointLineSide.LEFT ? segmentLineSide.LEFT : segmentLineSide.RIGHT;
  }

}

segmentLineSide.LEFT = Symbol('segmentLineSide.LEFT');