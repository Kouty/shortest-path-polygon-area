import { polySegmentInside, polySegmentIntersect } from './polygon';

export class Area {
  constructor({ bounds = [], holes = [] }) {
    this.bounds = bounds;
    this.holes = holes;
  }

  insideBounds(segment, precision) {
    return polySegmentInside(this.bounds, segment, precision);
  }

  crossesHole(segment, precision) {
    let hitHole = null;
    this.holes.some(hole => {
      const result = polySegmentInside(hole, segment, precision);
      if (result === polySegmentInside.CROSS) {
        hitHole = hole;
        return true;
      }
      return false;
    });

    return hitHole;
  }

  insideArea(segment, precision) {
    if (this.crossesHole(segment, precision)) {
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
