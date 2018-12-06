import { segSegIntersect } from './segmentSegment';
import { pointLineSide } from './pointLine';

export function polyPointInside(poly, point, precision) {
  let prev = poly[0];
  const seg = [point, [0, Number.POSITIVE_INFINITY]];
  let counter = 0;
  for (let i = 1; i <= poly.length; i++) {
    const iSegment = [prev, poly[i >= poly.length ? 0 : i]];
    const result = segSegIntersect(iSegment, seg, precision);
    if (result === segSegIntersect.ABOVE_LEFT || result === segSegIntersect.ABOVE_RIGHT) {
      const side = pointLineSide(point, iSegment);
      if (side === pointLineSide.ABOVE) {
        return false;
      }
    } else if (result === segSegIntersect.INLINE_INTERSECTION) {
      return false;
    }

    if (result === segSegIntersect.INTERSECTION || result === segSegIntersect.ABOVE_LEFT) {
      counter++;
    }
    prev = poly[i];
  }

  return counter % 2 !== 0;
}

export function polySegmentIntersect(poly, seg, precision) {
  const aInside = polyPointInside(poly, seg[0], precision);
  const bInside = polyPointInside(poly, seg[1], precision);

  if (aInside !== bInside) {
    return true;
  }

  let prev = poly[0];
  for (let i = 1; i <= poly.length; i++) {
    const iSegment = [prev, poly[i >= poly.length ? 0 : i]];
    const result = segSegIntersect(iSegment, seg, precision);

    if (result === segSegIntersect.INTERSECTION) {
      return true;
    }

    prev = poly[i];
  }

  return false;
}
