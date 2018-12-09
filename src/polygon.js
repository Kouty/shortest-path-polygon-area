import { segSegIntersect } from './segmentSegment';
import { pointLineSide } from './pointLine';
import { distance } from './pointPointDistance';

export function polyPointInside(poly, point, precision) {
  let prev = poly[0];
  const seg = [point, [0, Number.POSITIVE_INFINITY]];
  let counter = 0;
  for (let i = 1; i <= poly.length; i++) {
    const iSegment = [prev, poly[i >= poly.length ? 0 : i]];
    const side = pointLineSide(point, iSegment, precision);
    if (side === pointLineSide.ABOVE) {
      return polyPointInside.ABOVE;
    }

    const result = segSegIntersect(seg, iSegment, precision);
    if (result === segSegIntersect.INLINE_INTERSECTION) {
      return polyPointInside.ABOVE;
    }

    if (
      result === segSegIntersect.INTERSECTION ||
      result === segSegIntersect.ABOVE_1_LEFT ||
      result === segSegIntersect.ABOVE_2_LEFT
    ) {
      counter++;
    }
    prev = poly[i];
  }

  return counter % 2 !== 0 ? polyPointInside.INSIDE : polyPointInside.OUTSIDE;
}

polyPointInside.OUTSIDE = Symbol('OUTSIDE');
polyPointInside.INSIDE = Symbol('INSIDE');
polyPointInside.ABOVE = Symbol('ABOVE');

export function polySegmentInside(poly, seg, precision = 0) {
  const aInside = polyPointInside(poly, seg[0], precision);
  const bInside = polyPointInside(poly, seg[1], precision);

  if (
    (aInside === polyPointInside.OUTSIDE && bInside === polyPointInside.INSIDE) ||
    (aInside === polyPointInside.INSIDE && bInside === polyPointInside.OUTSIDE)
  ) {
    return polySegmentInside.CROSS;
  }

  let prev = poly[0];
  let prevSegment = [poly[poly.length - 1], poly[0]];
  let prevResult = null;
  for (let i = 1; i <= poly.length; i++) {
    const iSegment = [prev, poly[i % poly.length]];
    const result = segSegIntersect(seg, iSegment, precision);
    if (result === segSegIntersect.INTERSECTION) {
      return polySegmentInside.CROSS;
    }

    if (result === segSegIntersect.ABOVE_1_RIGHT || result === segSegIntersect.ABOVE_1_LEFT) {
      // distance(iSegment[0], seg[0]) > precision &&
      // distance(iSegment[0], seg[1]) > precision

      if (prevResult === null) {
        prevResult = segSegIntersect(seg, prevSegment, precision);
      }
      if (
        prevResult === segSegIntersect.ABOVE_2_RIGHT ||
        prevResult === segSegIntersect.ABOVE_2_LEFT
      ) {
        return aInside === polyPointInside.OUTSIDE
          ? polySegmentInside.CROSS
          : polySegmentInside.INSIDE;
      }
    }

    prev = poly[i];
    prevSegment = iSegment;
    prevResult = result;
  }

  const insideOrAbove = aInside === polyPointInside.INSIDE || aInside === polyPointInside.ABOVE;
  return insideOrAbove ? polySegmentInside.INSIDE : polySegmentInside.OUTSIDE;
}

// export function polySegmentInside(poly, segment, precision) {
//   const intersects = polySegmentIntersect(poly, segment, precision);
//   if (intersects) {
//     return polySegmentInside.CROSS;
//   }
//
//   function insideOrOutside(side) {
//     return side === polyPointInside.INSIDE ? polySegmentInside.INSIDE : polySegmentInside.OUTSIDE;
//   }
//
//   const pointInside1 = polyPointInside(poly, segment[0], precision);
//   const pointInside2 = polyPointInside(poly, segment[1], precision);
//   let result;
//   if (pointInside1 !== polyPointInside.ABOVE) {
//     result = insideOrOutside(pointInside1);
//   } else if (pointInside2 !== polyPointInside.ABOVE) {
//     result = insideOrOutside(pointInside2);
//   } else {
//     result = polySegmentInside.ABOVE;
//   }
//
//   return result;
// }

polySegmentInside.INSIDE = Symbol('INSIDE');
polySegmentInside.OUTSIDE = Symbol('OUTSIDE');
polySegmentInside.CROSS = Symbol('CROSS');
polySegmentInside.ABOVE = Symbol('ABOVE');
