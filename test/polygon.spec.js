describe('Polygon', () => {
  let squareClockWise;

  beforeEach(() => {
    squareClockWise = [[0, 0], [0, 10], [10, 10], [10, 0]];
  });

  describe('segment intersection:', () => {
    it('segment [[-1,2],[3,5]] intersects the squareClockWise polygon', () => {
      expect(polySegmentIntersect(squareClockWise, [[-1, 2], [3, 5]])).toBe(true);
    });
  });

});