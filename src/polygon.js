import { segmentPointSide } from './segment';

export function polyPointInside(poly, point) {
  let prevPoint = poly[0];
  let intersectionCounter = 0;
  for (let i = 1; i <= poly.length + 1; i++) {
    const segment = [prevPoint, poly[i >= poly.length ? 0 : i]];
    const sideA = segmentPointSide(point, segment);
    // const sideB = segmentPointSide([point[0], Number.POSITIVE_INFINITY], segment);

    if (sideA === segmentPointSide.ABOVE) {
      return polyPointInside.ABOVE;
    }


  }
}

// segmentPointSide.LEFT = Symbol('segmentPointSide.LEFT');
// segmentPointSide.RIGHT = Symbol('segmentPointSide.RIGHT');
// segmentPointSide.ABOVE = Symbol('segmentPointSide.ABOVE');
// segmentPointSide.INLINE_OUTSIDE = Symbol('segmentPointSide.INLINE_OUTSIDE');

polyPointInside.INSIDE = Symbol('polyPointInside.INSIDE');
polyPointInside.ABOVE = Symbol('polyPointInside.ABOVE');
polyPointInside.OUTSIDE = Symbol('polyPointInside.OUTSIDE');
