import { pointLineDistance } from '../src/pointLineDistance';

describe('Point distance from a rect', () => {
  it('(1,1) should dist 1 from  x axis', () => {
    expect(pointLineDistance([1, 1], [[0, 0], [10, 0]])).toBeCloseTo(1);
  });
});
