import { boundingBox, boxIntersect } from '../src/boundingBox';

describe('Segment bounding box', () => {
  it('should return [[0,1], [3,4]] as the bounding box of [[0,1], [3,4]] segment', () => {
    expect(boundingBox([[0, 1], [3, 4]])).toEqual([[0, 1], [3, 4]]);
  });

  it('should return [[0,1], [3,4]] as the bounding box of [[3,4], [0,1]] segment', () => {
    expect(boundingBox([[3, 4], [0, 1]])).toEqual([[0, 1], [3, 4]]);
  });

  it('should consider [[0,0],[3,0]] to intersect [[2,0],[4,0]]', () => {
    expect(boxIntersect(boundingBox([[0, 0], [3, 0]]), boundingBox([[2, 0], [4, 0]]))).toBe(true);
  });

  it('should consider [[0,0],[0,3]] to intersect [[0,1],[0,4]]', () => {
    expect(boxIntersect(boundingBox([[0, 0], [0, 3]]), boundingBox([[0, 1], [0, 4]]))).toBe(true);
  });

  xit('should consider [[0,0],[0,3]] to intersect [[0,1],[0,4]]', () => {
    expect(boxIntersect(boundingBox([[0, 0], [0, 3]]), boundingBox([[0, 1], [0, 4]]))).toBe(true);
  });

  xit('should consider [[0,0],[3,3]] to NOT intersect [[4,0],[5,3]]', () => {
    expect(boxIntersect(boundingBox([[0, 0], [3, 3]]), boundingBox([[4, 0], [5, 3]]))).toBe(false);
  });

  xit('should consider [[0,0],[3,3]] to NOT intersect [[3,0],[5,3]]', () => {
    expect(boxIntersect(boundingBox([[0, 0], [3, 3]]), boundingBox([[3, 0], [5, 5]]))).toBe(false);
  });
});
