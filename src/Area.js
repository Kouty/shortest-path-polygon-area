import { polyPointInside, polySegmentIntersect } from './polygon';

export class Area {

  constructor({ bounds }) {
    this.bounds = bounds;
  }

  insideBounds(segment, precision) {
    const intersects = polySegmentIntersect(this.bounds, segment, precision);
    if (intersects) {
      return false;
    }

    const pointInside = polyPointInside(this.bounds, segment[0], precision);
    return pointInside === polyPointInside.ABOVE || pointInside === polyPointInside.INSIDE;
  }
}