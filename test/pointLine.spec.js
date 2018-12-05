import { pointLineDistance, pointLineSide } from '../src/pointLine';

describe('Point-line math', () => {
  const Inf = Number.POSITIVE_INFINITY;

  describe('pointLineDistance', () => {
    it('(1,1) should be distance 1 from x axis', () => {
      expect(pointLineDistance([1, 1], [[0, 0], [10, 0]])).toBeCloseTo(1);
    });

    it('(10,20) should be distance 7 from [[0,+Inf],[3,4]]', () => {
      expect(pointLineDistance([10, 20], [[0, +Inf], [3, 4]])).toBeCloseTo(7);
    });

    it('(10,20) should be distance 8 from [[2,73],[3,+Inf]]', () => {
      expect(pointLineDistance([10, 20], [[2, 73], [3, +Inf]])).toBeCloseTo(8);
    });

    it('(10,20) should be distance 16 from [[+Inf,5],[56,4]]', () => {
      expect(pointLineDistance([10, 20], [[+Inf, 5], [56, 4]])).toBeCloseTo(16);
    });

    it('(10,20) should be distance 13 from [[2,7],[+Inf,99]]', () => {
      expect(pointLineDistance([10, 20], [[2, 7], [+Inf, 99]])).toBeCloseTo(13);
    });

    it('(10,Inf) should be distance Inf from [[2,7],[99,99]]', () => {
      expect(pointLineDistance([10, Inf], [[2, 7], [99, 99]])).toBe(Inf);
    });

    it('[Inf, 0] should be distance Inf from  [[0, 0], [0, 10]]', () => {
      expect(pointLineDistance([Inf, 0], [[0, 0], [10, 0]])).toBe(Inf);
    });

    it('[0, Inf] should be distance Inf from  [[0, 0], [0, 10]]', () => {
      expect(pointLineDistance([0, Inf], [[0, 0], [0, 10]])).toBe(Inf);
    });
  });

  describe('pointLineSide', () => {
    it('should define a LEFT side', () => {
      expect(pointLineSide.LEFT).toBeDefined();
    });

    it('should return LEFT for the point (2,3) and the line [(0,0), (3,3)]', () => {
      expect(pointLineSide([2, 3], [[0, 0], [3, 3]])).toBe(pointLineSide.LEFT);
    });

    it('should define a RIGHT side', () => {
      expect(pointLineSide.RIGHT).toBeDefined();
    });

    it('should return RIGHT for the point (2,1) and the line [(0,0), (3,3)]', () => {
      expect(pointLineSide([2, 1], [[0, 0], [3, 3]])).toBe(pointLineSide.RIGHT);
    });

    it('should define ABOVE', () => {
      expect(pointLineSide.ABOVE).toBeDefined();
    });

    it('should return ABOVE for the point (5,5) and the line [(0,0), (3,3)]', () => {
      expect(pointLineSide([5, 5], [[0, 0], [3, 3]])).toBe(pointLineSide.ABOVE);
    });

    it('should return ABOVE for the point (4,2.1) and the line [(0,0), (10,5)] with precision 0.1', () => {
      expect(pointLineSide([4, 2.1], [[0, 0], [10, 5]], 0.1)).toBe(
        pointLineSide.ABOVE
      );
    });

    it('should return LEFT for point (13, 2) and X axis', () => {
      expect(pointLineSide([13, 2], [[0, 0], [+Inf, 0]])).toBe(pointLineSide.LEFT);
    });

    it('should return RIGHT for point (13, -2) and X axis', () => {
      expect(pointLineSide([13, -2], [[0, 0], [+Inf, 0]])).toBe(pointLineSide.RIGHT);
    });

    it('should return LEFT for point (-2, 13) and Y axis', () => {
      expect(pointLineSide([-2, 13], [[0, 0], [0, +Inf]])).toBe(pointLineSide.LEFT);
    });

    it('should return RIGHT for point (2, 13) and Y axis', () => {
      expect(pointLineSide([2, 13], [[0, 0], [0, +Inf]])).toBe(pointLineSide.RIGHT);
    });
  });
});
