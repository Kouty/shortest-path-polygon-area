import { polyPointInside, polySegmentIntersect } from './polygon';

export class Area {

  constructor({ bounds = [], holes = [] }) {
    this.bounds = bounds;
    this.holes = holes;
  }

  insideBounds(segment, precision) {
    const intersects = polySegmentIntersect(this.bounds, segment, precision);
    if (intersects) {
      return false;
    }

    const pointInside = polyPointInside(this.bounds, segment[0], precision);
    return pointInside === polyPointInside.ABOVE || pointInside === polyPointInside.INSIDE;
  }

  hitsHole(segment, precision) {
    let hit = null;
    this.holes.some((hole) => {
      const result = polySegmentIntersect(hole, segment, precision);
      if (result) {
        hit = hole;
      }

      return result;
    });

    return hit;
  }

  insideArea(segment, precision) {
    if (this.hitsHole(segment, precision)) {
      return false;
    }

    return this.insideBounds(segment, precision);
  }

  allVertices() {
    let allVertices = [];
    this.holes.forEach(hole => {
      allVertices = allVertices.concat(hole);
    });
    allVertices = allVertices.concat(this.bounds);

    return allVertices;
  }
}