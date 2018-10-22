import { segmentLineSide } from '../src/segmentLine';

describe('Segment-line', () => {
  it('should define LEFT enum item', () => {
    expect(segmentLineSide.LEFT).not.toBeUndefined();
  });

  it('should consider the segment [[1,2],[3,5]] on the left of line [[0,0], [3,3]]', () => {
    expect(segmentLineSide([[1, 2], [3, 5]], [[0, 0], [3, 3]])).toBe(segmentLineSide.LEFT);
  });
});
