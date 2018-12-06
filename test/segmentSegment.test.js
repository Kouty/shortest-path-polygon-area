import { segSegIntersect } from '../src/segmentSegment';

describe('Segment-segment', () => {

  describe('results', () => {
    it('should define segSegIntersect.INTERSECTION', () => {
      expect(segSegIntersect.INTERSECTION).not.toBeUndefined();
    });

    it('should define segSegIntersect.NO_INTERSECTION', () => {
      expect(segSegIntersect.NO_INTERSECTION).not.toBeUndefined();
    });

    it('should define segSegIntersect.INLINE_INTERSECTION', () => {
      expect(segSegIntersect.INLINE_INTERSECTION).not.toBeUndefined();
    });

    it('should define segSegIntersect.ABOVE_RIGHT', () => {
      expect(segSegIntersect.ABOVE_RIGHT).not.toBeUndefined();
    });

    it('should define segSegIntersect.ABOVE_LEFT', () => {
      expect(segSegIntersect.ABOVE_LEFT).not.toBeUndefined();
    });
  });

  describe('not inline segments', () => {
    it('should considers segments [[0,0],[10,10]], [[0,10],[10,0]] as intersecting', () => {
      expect(segSegIntersect([[0, 0], [10, 10]], [[0, 10], [10, 0]])).toBe(
        segSegIntersect.INTERSECTION
      );
    });

    it('should considers segments [[0,5],[5,5]], [[2,2],[7,2]] as NOT intersecting', () => {
      expect(segSegIntersect([[0, 5], [5, 5]], [[2, 2], [7, 2]])).toBe(
        segSegIntersect.NO_INTERSECTION
      );
    });
  });

  describe('inline segments', () => {
    it('should considers segments [[0,5],[5,5]], [[4,5],[7,5]] as intersecting inline', () => {
      expect(segSegIntersect([[0, 5], [5, 5]], [[4, 5], [7, 5]])).toBe(
        segSegIntersect.INLINE_INTERSECTION
      );
    });

    it('should considers segments [[0,5],[5,5]], [[6,5],[7,5]] as NOT intersecting', () => {
      expect(segSegIntersect([[0, 5], [5, 5]], [[6, 5], [7, 5]])).toBe(
        segSegIntersect.NO_INTERSECTION
      );
    });
  });

  describe('precision 0.1', () => {
    it('should considers segments [[0,0],[5,5]], [[4.95, 4.95],[7,7]] as NOT intersecting with precision 0.1', () => {
      expect(segSegIntersect([[0, 0], [5, 5]], [[4.95, 4.95], [7, 7]], 0.1)).toBe(
        segSegIntersect.NO_INTERSECTION
      );
    });

    it('should considers segments [[0,0],[0,5]], [[-0.01, 2],[7,7]] as NOT intersecting with precision 0.1', () => {
      expect(segSegIntersect([[0, 0], [0, 5]], [[-0.01, 2], [7, 7]], 0.1)).toBe(
        segSegIntersect.ABOVE_RIGHT
      );
    });

    it('should considers segments [[0,0],[0,5]], [[-0.01, 2],[7,7]] as intersecting with precision 0.001', () => {
      expect(segSegIntersect([[0, 0], [0, 5]], [[-0.01, 2], [7, 7]], 0.001)).toBe(
        segSegIntersect.INTERSECTION
      );
    });
  });

  describe('one point intersection', () => {
    it('should considers segment [[0,3],[7,3]] on the right of [[0,1],[0,6]]', () => {
      expect(segSegIntersect([[0, 1], [0, 6]], [[0, 3], [7, 3]])).toBe(segSegIntersect.ABOVE_RIGHT);
    });

    it('should considers segment [[0,3],[7,3]] on the right of [[0,1],[0,6]]', () => {
      expect(segSegIntersect([[0, 1], [0, 6]], [[7, 3], [0, 3]])).toBe(segSegIntersect.ABOVE_RIGHT);
    });

    it('should considers segment [[0,3],[-7,3]] on the left of [[0,1],[0,6]]', () => {
      expect(segSegIntersect([[0, 1], [0, 6]], [[0, 3], [-7, 3]])).toBe(segSegIntersect.ABOVE_LEFT);
    });

    it('should considers segment [[-7,3], [0,3]] on the left of [[0,1],[0,6]]', () => {
      expect(segSegIntersect([[0, 1], [0, 6]], [[-7, 3], [0, 3]])).toBe(segSegIntersect.ABOVE_LEFT);
    });

    it('should considers segment [[3,-2],[3,2]] on the right of [[0,0],[3,0]]', () => {
      expect(segSegIntersect([[0, 0], [3, 0]], [[3, -2], [3, 2]])).toBe(segSegIntersect.ABOVE_RIGHT);
    });

    it('should considers segment [[3,2], [3,-2]] on the right of [[0,0],[3,0]]', () => {
      expect(segSegIntersect([[0, 0], [3, 0]], [[3, 2], [3, -2]])).toBe(segSegIntersect.ABOVE_RIGHT);
    });

    it('should considers segment [[0,-2],[0,2]] on the left of [[0,0],[3,0]]', () => {
      expect(segSegIntersect([[0, 0], [3, 0]], [[0, -2], [0, 2]])).toBe(segSegIntersect.ABOVE_LEFT);
    });

    it('should considers segment [[0,2], [0,-2]] on the left of [[0,0],[3,0]]', () => {
      expect(segSegIntersect([[0, 0], [3, 0]], [[0,2], [0,-2]])).toBe(segSegIntersect.ABOVE_LEFT);
    });
  });
});
