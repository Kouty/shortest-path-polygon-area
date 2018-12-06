import { polySegmentIntersect, polyPointInside } from '../src/polygon';

describe('Polygon', () => {
  let squareClockWise;

  beforeEach(() => {
    squareClockWise = [[0, 0], [0, 10], [10, 10], [10, 0]];
  });

  describe('point inside', () => {
    it('should consider point [5,5] inside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 5])).toBe(true);
    });

    it('should consider point [5,11] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 11])).toBe(false);
    });

    it('should consider point [5, 0] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 0])).toBe(false);
    });

    it('should consider point [10, 5] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [10, 5])).toBe(false);
    });

    it('should consider point [5, 10] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 10])).toBe(false);
    });

    it('should consider point [0, 5] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [0, 5])).toBe(false);
    });

    it('should consider point [10, 10] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [10, 10])).toBe(false);
    });

    it('should count only once boundaries 1', () => {
      expect(polyPointInside([[0, -5], [5, 0], [0, 5], [-5, 0]], [0, 0])).toBe(true);
    });

    it('should count only once boundaries 2', () => {
      expect(polyPointInside([[0, -5], [5, 0], [0, 5], [-5, 0]], [0, -6])).toBe(false);
    });

    it('should consider point [9.95, 9.95] outside squareClockWise polygon, with precision 0.1', () => {
      expect(polyPointInside(squareClockWise, [9.95, 9.95], 0.1)).toBe(false);
    });
  });

  describe('segment intersection', () => {
    it('segment [[-1,2],[3,5]] intersects the squareClockWise polygon', () => {
      expect(polySegmentIntersect(squareClockWise, [[-1, 2], [3, 5]])).toBe(true);
    });

    it('should consider the last segment of a polygon [[0,0], [10,0]]', () => {
      expect(polySegmentIntersect(squareClockWise, [[3, -2], [3, 2]])).toBe(true);
    });

    it('segment [[11,-5],[12,5]] does NOT intersect the squareClockWise polygon', () => {
      expect(polySegmentIntersect(squareClockWise, [[11, -5], [12, 5]])).toBe(false);
    });

    it('segment [[-10, -10],[12, 12]] intersects the squareClockWise polygon', () => {
      expect(polySegmentIntersect(squareClockWise, [[-10, -10], [12, 12]])).toBe(false);
    });

    describe('preicision', () => {
      it('segment [[-5, 5],[0.01,6]] does NOT intersect the squareClockWise polygon with precision 0.1', () => {
        expect(polySegmentIntersect(squareClockWise, [[-5, 5], [0.01, 6]], 0.1)).toBe(false);
      });
    });
  });

  describe('one point inside, one outside', () => {
    it('segment [[5,5],[12, 12]] intersects the squareClockWise polygon', () => {
      expect(polySegmentIntersect(squareClockWise, [[5, 5], [12, 12]])).toBe(true);
    });
  });

});