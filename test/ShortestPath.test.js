import { ShortestPath } from '../src/ShortestPath';

describe('ShortestPath', () => {
  let bounds;

  beforeEach(() => {
    bounds = [[0, 0], [10, 0], [10, 10], [0, 10]];
  });

  it('direct path is the shortest path with no holes', () => {
    const holes = [];
    const from = [1, 1];
    const to = [9, 9];

    const path = new ShortestPath({ bounds, holes }).calculate({ from, to });
    expect(path).toEqual([from, to]);
  });

  it('one hole, path on vertices', () => {
    const holes = [[[4, 4], [4, 6], [5, 5], [5, 4]]];
    const from = [1, 1];
    const to = [9, 9];

    const path = new ShortestPath({ bounds, holes }).calculate({ from, to });
    expect(path).toEqual([from, [5, 4], to]);
  });

  it('one hole, path on side of hole', () => {
    const holes = [[[4, 4], [4, 6], [6, 5], [6, 4]]];
    const from = [5, 3];
    const to = [5, 7];

    const path = new ShortestPath({ bounds, holes }).calculate({ from, to });
    expect(path).toEqual([from, [6, 4], [6, 5], to]);
  });
});
