import { ShortestPath } from '../src/ShortestPath';

xdescribe('ShortestPath', () => {
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

  it('one hole', () => {
    const holes = [[[4, 4], [4, 6], [5, 5], [5, 4]]];
    const from = [1, 1];
    const to = [9, 9];

    const path = new ShortestPath({ bounds, holes }).calculate({ from, to });
    expect(path).toEqual([from, [5, 4], to]);
  });

  it('should compute all vertices', () => {
    const holes = [[[1, 1], [2, 2]], [[3, 3], [4, 4]]];
    const bounds = [[5, 5]];

    const all = new ShortestPath({ bounds, holes }).allVertices();

    expect(all).toEqual([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]);
  });
});
