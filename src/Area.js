import { polySegmentInside, polySegmentIntersect } from './polygon';

export class Area {
  constructor({ bounds = [], holes = [] }) {
    this.bounds = bounds;
    this.holes = holes;
  }

  insideBounds(segment, precision) {
    return polySegmentInside(this.bounds, segment, precision);
  }

  insideHole(segment, precision) {
    let hole = null;
    this.holes.some(hole => {
      const inside = polySegmentInside(hole, segment, precision);


      return inside;
    });

    return hole;
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
