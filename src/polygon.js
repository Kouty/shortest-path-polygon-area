import { segSegIntersect } from './segmentSegment';

export function polyPointInside(poly, point, precision) {
  let prev = poly[0];
  const seg = [point, [0, Number.POSITIVE_INFINITY]];
  let counter = 0;
  for (let i = 1; i <= poly.length; i++) {
    const iSegment = [prev, poly[i >= poly.length ? 0 : i]];
    const result = segSegIntersect(iSegment, seg, precision);
    if (result === segSegIntersect.INTERSECTION || result === segSegIntersect.ABOVE_LEFT) {
      counter++;
    }
    prev = poly[i];
  }

  return counter % 2 !== 0;
}

export function polySegmentIntersect(poly, seg, precision) {
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
