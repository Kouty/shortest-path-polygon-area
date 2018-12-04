import { segSegIntersect } from '../src/segmentSegment';

xdescribe('Segment-segment', () => {

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

    it('should define segSegIntersect.RIGHT', () => {
      expect(segSegIntersect.RIGHT).not.toBeUndefined();
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
        segSegIntersect.NO_INTERSECTION
      );
    });
  });

  xdescribe('one point intersection', () => {
    it('should considers segment [[0,3],[7,3]] on the right of [[0,1],[0,6]]', () => {
      console.log('----');
      expect(segSegIntersect([[0, 1], [0, 6]], [[0, 3], [7, 3]])).toBe(segSegIntersect.RIGHT);
      console.log('----');
    });
  });
});
