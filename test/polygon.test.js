import { polyPointInside } from '../src/polygon';

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

  it('should return INSIDE for point [5,5]', () => {
    expect(polyPointInside(square, [5, 5])).toBe(INSIDE);
  });

  it('should return INSIDE for point [5,5]', () => {
    const counterClockSquare = square.reverse();
    expect(polyPointInside(counterClockSquare, [5, 5])).toBe(INSIDE);
  });
});
