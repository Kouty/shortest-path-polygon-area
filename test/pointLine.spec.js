import { pointLineDistance, pointSide } from '../src/pointLine';

describe('Point-line math', () => {
  describe('pointLineDistance', () => {
    it('(1,1) should be distance 1 from x axis', () => {
      expect(pointLineDistance([1, 1], [[0, 0], [10, 0]])).toBeCloseTo(1);
    });
  });

  describe('pointSide', () => {
    it('should define a LEFT side', () => {
      expect(pointSide.LEFT).toBeDefined();
    });

    it('should return LEFT for the point (2,3) and the line [(0,0), (3,3)]', () => {
      expect(pointSide({ x: 2, y: 3 }, [{ x: 0, y: 0 }, { x: 3, y: 3 }])).toBe(pointSide.LEFT);
    });

    it('should define a RIGHT side', () => {
      expect(pointSide.RIGHT).toBeDefined();
    });

    it('should return RIGHT for the point (2,1) and the line [(0,0), (3,3)]', () => {
      expect(pointSide({ x: 2, y: 1 }, [{ x: 0, y: 0 }, { x: 3, y: 3 }])).toBe(pointSide.RIGHT);
    });
  });

});
