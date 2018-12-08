import * as polySegmentModule from '../src/polygon';
import { Area } from '../src/Area';

describe('Area', () => {
  let testArea;

  describe('bounds', () => {
    beforeEach(() => {
      const bounds = [[0, 0], [0, 10], [10, 10], [10, 0]];
      testArea = new Area({ bounds });
    });

    it('should use polySegmentInside to test if a segment is inside bounds', () => {
      const segment = {};
      const precision = 0.1;
      const retValue = {};
      spyOn(polySegmentModule, 'polySegmentInside').and.returnValue(retValue);

      const result = testArea.insideBounds(segment, precision);

      expect(result).toBe(retValue);
      expect(polySegmentModule.polySegmentInside).toHaveBeenCalledWith(
        testArea.bounds,
        segment,
        precision
      );
    });
  });

  describe('holes', () => {
    const testHole = [[4, 4], [4, 6], [6, 6], [6, 4]];
    beforeEach(() => {
      const holes = [testHole];
      testArea = new Area({ holes });
    });

    xit('should use polySegmentInside to test if a segment is inside holes', () => {
      const segment = {};
      const precision = 0.1;
      const retValue = {};
      spyOn(polySegmentModule, 'polySegmentInside').and.returnValue(retValue);

      const result = testArea.crossHole(segment, precision);

      expect(result).toBe(retValue);
      expect(polySegmentModule.polySegmentInside).toHaveBeenCalledWith(
        testArea.holes[0],
        segment,
        precision
      );
    });
  });

  xdescribe('No holes or bounds', () => {
    it('bounds param should be optional', () => {
      expect(() => new Area({}).insideBounds([[1, 1], [2, 2]])).not.toThrow();
    });

    it('holes param should be optional', () => {
      expect(() => new Area({}).hitsHole([[1, 1], [2, 2]])).not.toThrow();
    });
  });

  xdescribe('insideArea', () => {
    beforeEach(() => {
      testArea = new Area({});
      spyOn(testArea, 'hitsHole');
      spyOn(testArea, 'insideBounds');
    });

    it('should use hitsHole()', () => {
      const segment = [[2, 2], [3, 3]];
      const precision = 0.1;

      testArea.insideArea(segment, precision);

      expect(testArea.hitsHole).toHaveBeenCalledWith(segment, precision);
    });

    it('should return false if hitHoles returns something', () => {
      testArea.hitsHole.and.returnValue({});

      expect(testArea.insideArea()).toBe(false);
    });

    it('should use insideBounds if no hole is hit', () => {
      testArea.hitsHole.and.returnValue(null);
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
