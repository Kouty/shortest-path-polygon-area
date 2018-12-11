import { segmentPointSide } from '../src/segment';
import * as pointModule from '../src/pointLine';

describe('Segment point side', () => {
  it('should use pointLineSide', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.RIGHT);
    const point = {};
    const segment = {};
    const precision = 0.1;

    segmentPointSide(point, segment, precision);

    expect(pointModule.pointLineSide).toHaveBeenCalledWith(point, segment, precision);
  });

  it('should define LEFT side', () => {
    expect(segmentPointSide.LEFT).toBeDefined();
  });

  it('should return LEFT when pointLineSide returns left', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.LEFT);

    expect(segmentPointSide()).toBe(segmentPointSide.LEFT);
  });

  it('should define RIGHT side', () => {
    expect(segmentPointSide.RIGHT).toBeDefined();
  });

  it('should return RIGHT when pointLineSide returns right', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.RIGHT);

    expect(segmentPointSide()).toBe(segmentPointSide.RIGHT);
  });

  it('should throw when pointLineSide is unexpected', () => {
    const unexpectedValue = {};
    spyOn(pointModule, 'pointLineSide').and.returnValue(unexpectedValue);

    expect(segmentPointSide).toThrow();
  });

  it('should define ABOVE side', () => {
    expect(segmentPointSide.ABOVE).toBeDefined();
  });

  it('should return ABOVE when pointLineSide returns ABOVE and the point is inside the segment', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

    const result = segmentPointSide([1, 1], [[0, 0], [3, 3]]);

    expect(result).toBe(segmentPointSide.ABOVE);
  });

  it('should define INLINE_OUTSIDE side', () => {
    expect(segmentPointSide.INLINE_OUTSIDE).toBeDefined();
  });

  it('should return INLINE_OUTSIDE for point [4,1] and segment [[0,1],[3,1]]', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

    const result = segmentPointSide([4, 1], [[0, 1], [3, 1]]);

    expect(result).toBe(segmentPointSide.INLINE_OUTSIDE);
  });

  it('should return INLINE_OUTSIDE for point [-1,-1] and segment [[0,1],[3,1]]', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

    const result = segmentPointSide([-1, -1], [[0, 1], [3, 1]]);

    expect(result).toBe(segmentPointSide.INLINE_OUTSIDE);
  });

  it('should return INLINE_OUTSIDE for point [1,4] and segment [[1, 0],[1,3]]', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

    const result = segmentPointSide([1, 4], [[1, 0], [1, 3]]);

    expect(result).toBe(segmentPointSide.INLINE_OUTSIDE);
  });

  it('should return INLINE_OUTSIDE for point [1,0] and segment [[0,1],[3,1]]', () => {
    spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

    const result = segmentPointSide([1, 0], [[0, 1], [3, 1]]);

    expect(result).toBe(segmentPointSide.INLINE_OUTSIDE);
  });

  describe('precision 0.1', () => {
    const precision = 0.1;

    it('should return ABOVE for point [3.01,1] and segment [[0,1],[3,1]]', () => {
      spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

      const result = segmentPointSide([3.01, 1], [[0, 1], [3, 1]], precision);

      expect(result).toBe(segmentPointSide.ABOVE);
    });

    it('should return ABOVE for point [-0.01,1] and segment [[0,1],[3,1]]', () => {
      spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

      const result = segmentPointSide([-0.01, 1], [[0, 1], [3, 1]], precision);

      expect(result).toBe(segmentPointSide.ABOVE);
    });

    it('should return ABOVE for point [1, 3.01] and segment [[1,0],[1,3]]', () => {
      spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

      const result = segmentPointSide([1, 3.01], [[1, 0], [1, 3]], precision);

      expect(result).toBe(segmentPointSide.ABOVE);
    });

    it('should return ABOVE for point [1, -0.01] and segment [[1,0],[1,3]]', () => {
      spyOn(pointModule, 'pointLineSide').and.returnValue(pointModule.pointLineSide.ABOVE);

      const result = segmentPointSide([1, -0.01], [[1, 0], [1, 3]], precision);

      expect(result).toBe(segmentPointSide.ABOVE);
    });
  });
});
