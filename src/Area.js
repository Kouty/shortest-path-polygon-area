import { polyPointInside, polySegmentIntersect } from './polygon';

export class Area {

  constructor({ bounds }) {
    this.bounds = bounds;
  }

  insideBounds(segment) {
    const intersects = polySegmentIntersect(this.bounds, segment);
    if (intersects) {
      return false;
    }

    const pointInside = polyPointInside(this.bounds, segment[0]);
    return pointInside === polyPointInside.ABOVE || pointInside === polyPointInside.INSIDE;
  }
}