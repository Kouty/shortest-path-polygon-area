import { polySegmentIntersect, polyPointInside, polySegmentInside } from '../src/polygon';

describe('Polygon', () => {
  let squareClockWise;

  beforeEach(() => {
    squareClockWise = [[0, 0], [0, 10], [10, 10], [10, 0]];
  });

  describe('point inside', () => {
    it('should consider point [5,5] inside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 5])).toBe(polyPointInside.INSIDE);
    });

    it('should consider point [5,11] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 11])).toBe(polyPointInside.OUTSIDE);
    });

    it('should consider point [5, 0] above squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 0])).toBe(polyPointInside.ABOVE);
    });

    it('should consider point [10, 5] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [10, 5])).toBe(polyPointInside.ABOVE);
    });

    it('should consider point [5, 10] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [5, 10])).toBe(polyPointInside.ABOVE);
    });

    it('should consider point [0, 5] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [0, 5])).toBe(polyPointInside.ABOVE);
    });

    it('should consider point [10, 10] outside squareClockWise polygon', () => {
      expect(polyPointInside(squareClockWise, [10, 10])).toBe(polyPointInside.ABOVE);
    });

    it('should count only once boundaries 1', () => {
      expect(polyPointInside([[0, -5], [5, 0], [0, 5], [-5, 0]], [0, 0])).toBe(
        polyPointInside.INSIDE
      );
    });

    it('should count only once boundaries 2', () => {
      expect(polyPointInside([[0, -5], [5, 0], [0, 5], [-5, 0]], [0, -6])).toBe(
        polyPointInside.OUTSIDE
      );
    });

    it('should consider point [9.95, 9.95] outside squareClockWise polygon, with precision 0.1', () => {
      expect(polyPointInside(squareClockWise, [9.95, 9.95], 0.1)).toBe(polyPointInside.ABOVE);
    });
  });

  describe('segment inside', () => {
    const INSIDE = polySegmentInside.INSIDE;
    const OUTSIDE = polySegmentInside.OUTSIDE;
    const CROSS = polySegmentInside.CROSS;
    const ABOVE = polySegmentInside.ABOVE;

    it('segment [[5,5],[12, 12]] crosses the squareClockWise polygon', () => {
      expect(polySegmentInside(squareClockWise, [[5, 5], [12, 12]])).toBe(CROSS);
    });

    it('should consider [[1,1],[9,9]] inside bounds', () => {
      expect(polySegmentInside(squareClockWise, [[1, 1], [9, 9]])).toBe(INSIDE);
    });

    it('should consider [[0,0],[10,10]] inside bounds', () => {
      expect(polySegmentInside(squareClockWise, [[0, 0], [10, 10]])).toBe(INSIDE);
    });

    it('should consider [[0,5],[10,6]] inside bounds', () => {
      expect(polySegmentInside(squareClockWise, [[0, 5], [10, 6]])).toBe(INSIDE);
    });

    xit('should consider [[0,0],[0,10]] above bounds', () => {
      expect(polySegmentInside(squareClockWise, [[0, 0], [0, 10]])).toBe(ABOVE);
    });

    xit('should consider [[0,-1],[0,11]] above bounds', () => {
      expect(polySegmentInside(squareClockWise, [[0, -1], [0, 11]])).toBe(ABOVE);
    });

    it('segment [[-1, -1], [11, 11]] crosses the squareClockWise polygon', () => {
      expect(polySegmentInside(squareClockWise, [[-1, -1], [11, 11]])).toBe(CROSS);
    });

    it('should consider [[-1,-1],[-9,9]] outside bounds', () => {
      expect(polySegmentInside(squareClockWise, [[-1, -1], [-9, 9]])).toBe(OUTSIDE);
    });

    it('should consider [[-1,-1],[9,9]] to cross bounds', () => {
      expect(polySegmentInside(squareClockWise, [[-1, -1], [9, 9]])).toBe(CROSS);
    });

    it('segment [[-1,2],[3,5]] intersects the squareClockWise polygon', () => {
      expect(polySegmentInside(squareClockWise, [[-1, 2], [3, 5]])).toBe(CROSS);
    });

    it('should consider the last segment of a polygon [[0,0], [10,0]]', () => {
      expect(polySegmentInside(squareClockWise, [[3, -2], [3, 2]])).toBe(CROSS);
    });

    it('segment [[11,-5],[12,5]] does NOT intersect the squareClockWise polygon', () => {
      expect(polySegmentInside(squareClockWise, [[11, -5], [12, 5]])).toBe(OUTSIDE);
    });

    it('segment [[0, 0],[10, 10]] is inside the squareClockWise polygon', () => {
      expect(polySegmentInside(squareClockWise, [[0, 0], [10, 10]])).toBe(INSIDE);
    });

    it('should consider [[-0.01,5],[10.01,5]] inside bounds with precision 0.1', () => {
      expect(polySegmentInside(squareClockWise, [[-0.01, 5], [10.01, 5]], 0.1)).toBe(INSIDE);
    });

    it('segment [[-5, 5],[0.01,6]] does NOT cross the squareClockWise polygon with precision 0.1', () => {
      expect(polySegmentInside(squareClockWise, [[-5, 5], [0.01, 6]], 0.1)).toBe(OUTSIDE);
    });

    it('should consider [[-0.01,-0.01],[10.01,10.01]] inside bounds with preicision 0.1', () => {
      expect(polySegmentInside(squareClockWise, [[-0.01, -0.01], [10.01, 10.01]], 0.1)).toBe(
        INSIDE
      );
    });
  });
});
