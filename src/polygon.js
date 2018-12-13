import { segmentPointSide } from './segment';

export function polyPointInside(poly, point, precision) {
  let prevPoint = poly[0];
  let intersectionCounter = 0;
  const halfLine = [point, [point[0], Number.POSITIVE_INFINITY]];
  for (let i = 1; i <= poly.length + 1; i++) {
    const segment = [prevPoint, poly[i >= poly.length ? 0 : i]];
    const side1A = segmentPointSide(halfLine[0], segment, precision);
    const side1B = segmentPointSide(halfLine[1], segment);
    const side2A = segmentPointSide(segment[0], halfLine);
    const side2B = segmentPointSide(segment[1], halfLine);

    if (side1A === segmentPointSide.ABOVE) {
      return polyPointInside.ABOVE;
    }

    const leftRight1 = oneLeftOneRight(side1A, side1B);
    const leftRight2 = oneLeftOneRight(side2A, side2B);
    const aboveLeft1 = side2A === segmentPointSide.ABOVE && side2B === segmentPointSide.LEFT;
    const aboveLeft2 = side2A === segmentPointSide.LEFT && side2B === segmentPointSide.ABOVE;
    if ((leftRight1 && leftRight2) || aboveLeft1 || aboveLeft2) {
      intersectionCounter++;
    }

    prevPoint = segment[1];
  }

  return intersectionCounter % 2 === 0 ? polyPointInside.OUTSIDE : polyPointInside.INSIDE;
}

function oneLeftOneRight(side1, side2) {
  return (
    (side1 === segmentPointSide.RIGHT && side2 === segmentPointSide.LEFT) ||
    (side1 === segmentPointSide.LEFT && side2 === segmentPointSide.RIGHT)
  );
}

polyPointInside.INSIDE = Symbol('polyPointInside.INSIDE');
polyPointInside.ABOVE = Symbol('polyPointInside.ABOVE');
polyPointInside.OUTSIDE = Symbol('polyPointInside.OUTSIDE');
