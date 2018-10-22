import { segmentLineSide } from '../src/segmentLine';

describe('Segment-line', () => {
  it('should define LEFT enum item', () => {
    expect(segmentLineSide.LEFT).not.toBeUndefined();
  });

  it('should consider the segment [[1,2],[3,5]] on the LEFT of line [[0,0], [3,3]]', () => {
    expect(segmentLineSide([[1, 2], [3, 5]], [[0, 0], [3, 3]])).toBe(segmentLineSide.LEFT);
  });

  it('should define RIGHT enum item', () => {
    expect(segmentLineSide.RIGHT).not.toBeUndefined();
  });

  it('should consider the segment [[2,1],[5,3]] on the RIGHT of line [[0,0], [3,3]]', () => {
    expect(segmentLineSide([[2, 1], [5, 3]], [[0, 0], [3, 3]])).toBe(segmentLineSide.RIGHT);
  });

  it('should define INTERSECTION enum item', () => {
    expect(segmentLineSide.INTERSECTION).not.toBeUndefined();
  });

  it('should consider the segment [[2,1],[3,5]] to INTERSECT line [[0,0], [10,10]]', () => {
    expect(segmentLineSide([[2, 1], [3, 5]], [[0, 0], [10, 10]])).toBe(segmentLineSide.INTERSECTION);
  });

  it('should define ABOVE_1 enum item', () => {
    expect(segmentLineSide.ABOVE_1).not.toBeUndefined();
  });

  it('should consider the segment [[2,2],[3,5]] to be ABOVE_1 line [[0,0], [10,10]]', () => {
    expect(segmentLineSide([[2, 2], [3, 5]], [[0, 0], [10, 10]])).toBe(segmentLineSide.ABOVE_1);
  });

  it('should define ABOVE_2 enum item', () => {
    expect(segmentLineSide.ABOVE_2).not.toBeUndefined();
  });

  it('should consider the segment [[2,3],[5,5]] to be ABOVE_2 line [[0,0], [10,10]]', () => {
    expect(segmentLineSide([[2, 3], [5, 5]], [[0, 0], [10, 10]])).toBe(segmentLineSide.ABOVE_2);
  });

  it('should define ABOVE_1_2 enum item', () => {
    expect(segmentLineSide.ABOVE_1_2).not.toBeUndefined();
  });

  it('should consider the segment [[2,2],[5,5]] to be ABOVE_1_2 line [[0,0], [10,10]]', () => {
    expect(segmentLineSide([[2, 2], [5, 5]], [[0, 0], [10, 10]])).toBe(segmentLineSide.ABOVE_1_2);
  });

  it('should consider the segment [[2,2.1],[5,4.9]] to be ABOVE_1_2 line [[0,0], [10,10]] with a precision of 0.1', () => {
    expect(segmentLineSide([[2, 2.1], [5, 4.9]], [[0, 0], [10, 10]], 0.1)).toBe(segmentLineSide.ABOVE_1_2);
  });
});
