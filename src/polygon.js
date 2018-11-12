import { segSegIntersect } from './segmentSegment';

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
