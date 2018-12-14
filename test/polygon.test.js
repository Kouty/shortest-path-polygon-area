import {
  middlePoint,
  polyPointInside,
  polySegmentInside,
  segmentsFromPoints, segmentsOfPolygon
} from '../src/polygon';

describe('polyPointInside', () => {
  let square;
  const INSIDE = polyPointInside.INSIDE;
  const OUTSIDE = polyPointInside.OUTSIDE;
  const ABOVE = polyPointInside.ABOVE;

  beforeEach(() => {
    square = [[0, 0], [0, 10], [10, 10], [10, 0]];
  });

  it('should define INSIDE', () => {
    expect(polyPointInside.INSIDE).toBeDefined();
  });

  it('should define ABOVE', () => {
    expect(polyPointInside.ABOVE).toBeDefined();
  });

  it('should define OUTSIDE', () => {
    expect(polyPointInside.OUTSIDE).toBeDefined();
  });

  it('should return ABOVE for point [0,5]', () => {
    expect(polyPointInside(square, [0, 5])).toBe(ABOVE);
  });

  it('should return ABOVE for point [10,10]', () => {
    expect(polyPointInside(square, [10, 10])).toBe(ABOVE);
  });

  it('should return INSIDE for point [5,5]', () => {
    expect(polyPointInside(square, [5, 5])).toBe(INSIDE);
  });

  it('should return INSIDE for point [5,5] and counter-clock square', () => {
    const counterClockSquare = square.reverse();
    expect(polyPointInside(counterClockSquare, [5, 5])).toBe(INSIDE);
  });

  it('should return OUTSIDE for point [5,11]', () => {
    expect(polyPointInside(square, [5, 11])).toBe(OUTSIDE);
  });

  it('should return OUTSIDE for point [5,-11]', () => {
    expect(polyPointInside(square, [5, -11])).toBe(OUTSIDE);
  });

  it('should return OUTSIDE for point [11,5]', () => {
    expect(polyPointInside(square, [11, 5])).toBe(OUTSIDE);
  });

  it('should return OUTSIDE for point [0,-5]', () => {
    expect(polyPointInside(square, [0, -5])).toBe(OUTSIDE);
  });

  it('should count vertexes only once', () => {
    const triangle = [[-5, 0], [5, 0], [0, 3]];
    expect(polyPointInside(triangle, [0, 1])).toBe(INSIDE);
  });

  it('should count vertexes only once counter clock wise', () => {
    const triangle = [[-5, 0], [5, 0], [0, 3]];
    triangle.reverse();
    expect(polyPointInside(triangle, [0, 1])).toBe(INSIDE);
  });

  describe('precision', () => {
    const precision = 0.1;
    it('should return ABOVE for point [5, -0.01]', () => {
      expect(polyPointInside(square, [5, -0.01], precision)).toBe(ABOVE);
    });

    it('should return ABOVE for point [5, 0.01]', () => {
      expect(polyPointInside(square, [5, 0.01], precision)).toBe(ABOVE);
    });
  });
});

describe('polySegmentInside', () => {
  let square;
  const INSIDE = polySegmentInside.INSIDE;
  const OUTSIDE = polySegmentInside.OUTSIDE;
  const ABOVE = polySegmentInside.ABOVE;
  const CROSS = polySegmentInside.CROSS;

  beforeEach(() => {
    square = [[0, 0], [0, 10], [10, 10], [10, 0]];
  });

  it('should define INSIDE', () => {
    expect(polySegmentInside.INSIDE).toBeDefined();
  });

  it('should define OUTSIDE', () => {
    expect(polySegmentInside.OUTSIDE).toBeDefined();
  });

  it('should define ABOVE', () => {
    expect(polySegmentInside.ABOVE).toBeDefined();
  });

  it('should define CROSS', () => {
    expect(polySegmentInside.CROSS).toBeDefined();
  });

  it('should return CROSS for segment [[-3,5],[6,4]]', () => {
    expect(polySegmentInside(square, [[-3, 5], [6, 4]])).toBe(CROSS);
  });

  it('should return INSIDE for segment [[1,1],[9,9]]', () => {
    expect(polySegmentInside(square, [[1, 1], [9, 9]])).toBe(INSIDE);
  });

  it('should return OUTSIDE for segment [[10,1],[12,9]]', () => {
    expect(polySegmentInside(square, [[10, 1], [12, 9]])).toBe(OUTSIDE);
  });

  it('should return CROSS for segment [[-1,-1],[11,11]]', () => {
    expect(polySegmentInside(square, [[-1, -1], [11, 11]])).toBe(CROSS);
  });

  it('should return INSIDE for segment [[0,0],[10,10]]', () => {
    expect(polySegmentInside(square, [[0, 0], [10, 10]])).toBe(INSIDE);
  });

  it('should return INSIDE for segment [[0,5],[10,6]]', () => {
    expect(polySegmentInside(square, [[0, 5], [10, 6]])).toBe(INSIDE);
  });

  it('should return ABOVE for segment [[0,0],[10,0]]', () => {
    expect(polySegmentInside(square, [[0, 0], [10, 0]])).toBe(ABOVE);
  });

  it('should return OUTSIDE for segment [[-1,0],[10,0]]', () => {
    expect(polySegmentInside(square, [[-1, 0], [10, 0]])).toBe(OUTSIDE);
  });

  it('should return ABOVE for segment [[-0.01,0],[10.01,0]] and precision 0.1', () => {
    const precision = 0.1;
    expect(polySegmentInside(square, [[-0.01, 0], [10.01, 0]], precision)).toBe(ABOVE);
  });

  it('should return INSIDE for segment [[-0.01,5],[10.01,6]] and precision 0.1', () => {
    const precision = 0.1;
    expect(polySegmentInside(square, [[-0.01, 5], [10.01, 6]], precision)).toBe(INSIDE);
  });

  it('|^-^| inside', () => {
    const poly = [
      [0, 0],
      [0, 3],
      [1, 2],
      [3, 2],
      [4, 3],
      [4, 0]
    ];
    expect(polySegmentInside(poly, [[0, 2], [4, 2]])).toBe(INSIDE);
  });
});

describe('middlePoint', () => {
  it('should return [15,13] for segment [[10,10],[20,16]]', () => {
    expect(middlePoint([[10, 10], [20, 16]])).toEqual([15, 13]);
  });
});

describe('segmentsFromPoints', () => {
  it('should return a list of segments given a list of points', () => {
    const segments = segmentsFromPoints([[0, 0], [1, 1], [2, 3]]);

    expect(segments.length).toBe(2);
    expect(segments[0]).toEqual([[0, 0], [1, 1]]);
    expect(segments[1]).toEqual([[1, 1], [2, 3]]);
  });
});

describe('segmentsOfPolygon', () => {
  it('should return a list of segments given a polygon', () => {
    const segments = segmentsOfPolygon([[0, 0], [1, 1], [2, 3]]);

    expect(segments.length).toBe(3);
    expect(segments[0]).toEqual([[0, 0], [1, 1]]);
    expect(segments[1]).toEqual([[1, 1], [2, 3]]);
    expect(segments[2]).toEqual([[2, 3], [0, 0]]);
  });
});