import * as polySegmentModule from '../src/polygon';
import { Area } from '../src/Area';
import { polySegmentInside } from '../src/polygon';

describe('Area', () => {
  let testArea;

  describe('bounds', () => {
    beforeEach(() => {
      const bounds = [[0, 0], [0, 10], [10, 10], [10, 0]];
      testArea = new Area({ bounds });
    });

    it('should consider empty bounds as no bounds', () => {
      expect(new Area({ bounds: [] }).insideBounds()).toBe(true);
    });

    it('should use polySegmentInside to test if a segment is inside bounds', () => {
      const segment = {};
      const precision = 0.1;
      spyOn(polySegmentModule, 'polySegmentInside').and.returnValue(polySegmentInside.OUTSIDE);

      const result = testArea.insideBounds(segment, precision);

      expect(result).toBe(false);
      expect(polySegmentModule.polySegmentInside).toHaveBeenCalledWith(
        testArea.bounds,
        segment,
        precision
      );
    });

    it('should return true if polySegmentInside returns ABOVE', () => {
      const segment = {};
      const precision = 0.1;
      spyOn(polySegmentModule, 'polySegmentInside').and.returnValue(polySegmentInside.ABOVE);

      const result = testArea.insideBounds(segment, precision);

      expect(result).toBe(true);
    });
  });

  describe('holes', () => {
    const testHole = [[4, 4], [4, 6], [6, 6], [6, 4]];
    beforeEach(() => {
      const holes = [testHole];
      testArea = new Area({ holes });
    });

    it('should use polySegmentInside to test if a segment is inside holes', () => {
      const segment = {};
      const precision = 0.1;
      spyOn(polySegmentModule, 'polySegmentInside').and.returnValue(polySegmentInside.CROSS);

      const result = testArea.crossesHole(segment, precision);

      expect(result).toBe(testHole);
      expect(polySegmentModule.polySegmentInside).toHaveBeenCalledWith(
        testArea.holes[0],
        segment,
        precision
      );
    });

    it('should use polySegmentInside to test if a segment is inside holes', () => {
      const segment = {};
      const precision = 0.1;
      spyOn(polySegmentModule, 'polySegmentInside').and.returnValue(polySegmentInside.ABOVE);

      const result = testArea.crossesHole(segment, precision);

      expect(result).toBe(null);
    });
  });

  describe('No holes or bounds', () => {
    it('bounds param should be optional', () => {
      expect(() => new Area({}).insideBounds([[1, 1], [2, 2]])).not.toThrow();
    });

    it('holes param should be optional', () => {
      expect(() => new Area({}).crossesHole([[1, 1], [2, 2]])).not.toThrow();
    });
  });

  describe('insideArea', () => {
    beforeEach(() => {
      testArea = new Area({});
      spyOn(testArea, 'crossesHole');
      spyOn(testArea, 'insideBounds');
    });

    it('should use crossesHole()', () => {
      const segment = [[2, 2], [3, 3]];
      const precision = 0.1;

      testArea.insideArea(segment, precision);

      expect(testArea.crossesHole).toHaveBeenCalledWith(segment, precision);
    });

    it('should return false if crossesHole returns something', () => {
      testArea.crossesHole.and.returnValue({});

      expect(testArea.insideArea()).toBe(false);
    });

    it('should use insideBounds if no hole is hit', () => {
      testArea.crossesHole.and.returnValue(null);
      const segment = [[2, 2], [3, 3]];
      const precision = 0.1;

      testArea.insideArea(segment, precision);

      expect(testArea.insideBounds).toHaveBeenCalledWith(segment, precision);
    });

    it('should return false if insideBounds returns false', () => {
      testArea.insideBounds.and.returnValue(false);

      expect(testArea.insideArea()).toBe(false);
    });
  });

  describe('allVertices', () => {
    let bounds;
    let holes;
    beforeEach(() => {
      bounds = [[0, 0], [1, 1], [2, 2]];
      holes = [[[3, 3], [4, 4], [5, 5]], [[6, 6], [7, 7], [8, 8]]];
      testArea = new Area({ bounds, holes });
    });

    it('should return all the vertices in the area', () => {
      const all = [];
      all.push(...bounds);
      holes.forEach(hole => all.push(...hole));

      const allFromArea = testArea.allVertices();

      expect(allFromArea.length).toBe(all.length);
    });
  });
});
