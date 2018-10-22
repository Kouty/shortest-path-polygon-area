import { pointLineDistance, pointLineSide } from '../src/pointLine';

describe('Point-line math', () => {
  describe('pointLineDistance', () => {
    it('(1,1) should be distance 1 from x axis', () => {
      expect(pointLineDistance([1, 1], [[0, 0], [10, 0]])).toBeCloseTo(1);
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
      expect(pointLineSide([4, 2.1], [[0, 0], [10, 5]], 0.1)).toBe(pointLineSide.ABOVE);
    });
  });
});
