import { pointLineDistance } from '../src/pointLine';

describe('Point-line math', () => {
  it('(1,1) should be distance 1 from x axis', () => {
    expect(pointLineDistance([1, 1], [[0, 0], [10, 0]])).toBeCloseTo(1);
  });
});
