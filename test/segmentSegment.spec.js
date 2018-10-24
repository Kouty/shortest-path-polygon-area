import { segSegIntersect } from '../src/segmentSegment';

describe('Segment-segment', () => {
  it('should define segSegIntersect.INTERSECTION', () => {
    expect(segSegIntersect.INTERSECTION).not.toBeUndefined();
  });

  it('should considers segments [[0,0],[10,10]], [[0,10],[10,0]] as intersecting', () => {
    expect(segSegIntersect([[0, 0], [10, 10]], [[0, 10], [10, 0]])).toBe(
      segSegIntersect.INTERSECTION
    );
  });

  it('should define segSegIntersect.INTERSECTION', () => {
    expect(segSegIntersect.NO_INTERSECTION).not.toBeUndefined();
  });

  it('should considers segments [[0,0],[5,5]], [[6,10],[7,0]] as NOT intersecting', () => {
    expect(segSegIntersect([[0, 0], [5, 5]], [[6, 10], [7, 0]])).toBe(
      segSegIntersect.NO_INTERSECTION
    );
  });

  it('should considers segments [[0,5],[5,5]], [[2,2],[7,2]] as NOT intersecting', () => {
    expect(segSegIntersect([[0, 5], [5, 5]], [[2, 2], [7, 2]])).toBe(
      segSegIntersect.NO_INTERSECTION
    );
  });

  xit('should considers segments [[0,5],[5,5]], [[4,5],[7,5]] as intersecting', () => {
    expect(segSegIntersect([[0, 5], [5, 5]], [[4, 5], [7, 5]])).toBe(
      segSegIntersect.INTERSECTION
    );
  });

  xit('should considers segments [[0,5],[5,5]], [[6,5],[7,5]] as NOT intersecting', () => {
    expect(segSegIntersect([[0, 5], [5, 5]], [[6, 5], [7, 5]])).toBe(
      segSegIntersect.NO_INTERSECTION
    );
  });
});
