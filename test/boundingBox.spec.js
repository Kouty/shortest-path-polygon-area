import { boundingBox, boxIntersect } from '../src/boundingBox';

describe('Segment bounding box', () => {
  describe('boundingBox', () => {
    it('should return [[0,5], [3,4]] as the bounding box of [[0,5], [3,4]] segment', () => {
      expect(boundingBox([[0, 5], [3, 4]])).toEqual([[0, 5], [3, 4]]);
    });

    it('should return [[-3,-1], [0,-5]] as the bounding box of [[0,-5], [-3,-1]] segment', () => {
      expect(boundingBox([[0, -5], [-3, -1]])).toEqual([[-3, -1], [0, -5]]);
    });

    it('should return [[0,4], [3,0]] as the bounding box of [[0,0], [3,4]] segment', () => {
      expect(boundingBox([[0, 0], [3, 4]])).toEqual([[0, 4], [3, 0]]);
    });

    it('should return [[0,4], [3,0]] as the bounding box of [[3,4], [0,0]] segment', () => {
      expect(boundingBox([[3, 4], [0, 0]])).toEqual([[0, 4], [3, 0]]);
    });
  });

  describe('boxIntersect', () => {
    it('should use boundingBox to calc the bounding box', () => {
      expect(boxIntersect([[3, 0], [0, 2]], [[0, 2], [3, 0]])).toBe(true);
    });

    it('should consider [[0,0],[3,1]] to intersect [[2,0],[4,1]]', () => {
      expect(boxIntersect([[0, 0], [3, 1]], [[2, 0], [4, 1]])).toBe(true);
    });

    it('should consider [[0,0],[5,1]] to intersect [[2,0],[4,1]]', () => {
      expect(boxIntersect([[0, 0], [5, 1]], [[2, 0], [4, 1]])).toBe(true);
    });

    it('should consider [[0,0],[3,3]] to NOT intersect [[4,0],[5,3]]', () => {
      expect(boxIntersect([[0, 0], [3, 3]], [[4, 0], [5, 3]])).toBe(false);
    });

    it('should consider [[4,0],[5,0]] to NOT intersect [[0,0],[3,0]]', () => {
      expect(boxIntersect([[4, 0], [5, 0]], [[0, 0], [3, 0]])).toBe(false);
    });

    it('should consider [[0,4],[0,5]] to NOT intersect [[0,0],[0,3]]', () => {
      expect(boxIntersect([[0, 4], [0, 5]], [[0, 0], [0, 3]])).toBe(false);
    });

    it('should consider [[0,0],[0,3]] to NOT intersect [[0,4],[0,5]]', () => {
      expect(boxIntersect([[0, 0], [0, 3]], [[0, 4], [0, 5]])).toBe(false);
    });
  });

  describe('boxIntersect with precision 0.1', () => {
    it('should consider [[0,0],[3,3]] to NOT intersect [[2.99,0],[5,3]]', () => {
      expect(boxIntersect([[0, 0], [3, 3]], [[2.99, 0], [5, 5]], 0.1)).toBe(false);
    });

    it('should consider [[0,0],[3,3]] to NOT intersect [[-3,0],[0.05,0]]', () => {
      expect(boxIntersect([[0, 0], [3, 3]], [[-3, 0], [0.05, 1]], 0.1)).toBe(false);
    });

    it('should consider [[0,0],[3,3]] to NOT intersect [[1,2.99],[2,4]]', () => {
      expect(boxIntersect([[0, 0], [3, 3]], [[1, 2.99], [2, 4]], 0.1)).toBe(false);
    });

    it('should consider [[0,0],[3,3]] to NOT intersect [[-1,-2],[1,0.04]]', () => {
      expect(boxIntersect([[0, 0], [3, 3]], [[-1, -2], [1, 0.04]], 0.1)).toBe(false);
    });
  });
});
