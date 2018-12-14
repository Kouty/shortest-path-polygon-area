import { segmentPointSide } from './segment';

export function polyPointInside(poly, point, precision) {
  let intersectionCounter = 0;
  const halfLine = [point, [point[0], Number.POSITIVE_INFINITY]];
  for (const segment of segmentsOfPolygon(poly)) {
    const res = segmentSegment(halfLine, segment, precision);
    const { side1A, side2A, side2B } = res;

    if (side1A === segmentPointSide.ABOVE) {
      return polyPointInside.ABOVE;
    }

    const aboveLeft1 = side2A === segmentPointSide.ABOVE && side2B === segmentPointSide.LEFT;
    const aboveLeft2 = side2A === segmentPointSide.LEFT && side2B === segmentPointSide.ABOVE;
    if (res.crosses() || aboveLeft1 || aboveLeft2) {
      intersectionCounter++;
    }
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

export function polySegmentInside(poly, segment, precision) {
  const toEvaluate = [segment];
  for (const pSegment of segmentsOfPolygon(poly)) {
    const res = segmentSegment(segment, pSegment);
    if (res.crosses()) {
      return polySegmentInside.CROSS;
    }
  }

  const oneInside = false;
  const oneOutside = false;
  for (const segment of toEvaluate) {

  }

}

polySegmentInside.INSIDE = Symbol('polySegmentInside.INSIDE');
polySegmentInside.OUTSIDE = Symbol('polySegmentInside.OUTSIDE');
polySegmentInside.ABOVE = Symbol('polySegmentInside.ABOVE');
polySegmentInside.CROSS = Symbol('polySegmentInside.CROSS');

function segmentsOfPolygon(poly) {
  const segments = [];
  let prevPoint = poly[0];
  for (let i = 1; i <= poly.length + 1; i++) {
    const segment = [prevPoint, poly[i >= poly.length ? 0 : i]];
    segments.push(segment);
    prevPoint = segment[1];
  }
  return segments;
}

function segmentSegment(seg1, seg2, precision) {
  const side1A = segmentPointSide(seg1[0], seg2, precision);
  const side1B = segmentPointSide(seg1[1], seg2);
  const side2A = segmentPointSide(seg2[0], seg1);
  const side2B = segmentPointSide(seg2[1], seg1);

  return {
    side1A,
    side1B,
    side2A,
    side2B,
    crosses() {
      return oneLeftOneRight(side1A, side1B) && oneLeftOneRight(side2A, side2B);
    }
  };
}

export function middlePoint(seg) {
  return [seg[0][0] + seg[1][0] / 2, seg[0][1] + seg[1][1] / 2];
}