import { ShortestPath } from '../src/ShortestPath';

describe('performance', () => {
  it('30 points hole', () => {
    const holes = [
      [
        [362, 258],
        [360, 240],
        [369, 222],
        [376, 217],
        [393, 211],
        [406, 210],
        [421, 208],
        [436, 216],
        [444, 222],
        [451, 235],
        [452, 253],
        [457, 267],
        [464, 284],
        [464, 298],
        [461, 317],
        [452, 332],
        [433, 332],
        [410, 332],
        [399, 319],
        [400, 311],
        [411, 308],
        [423, 302],
        [432, 299],
        [438, 284],
        [432, 268],
        [422, 253],
        [412, 244],
        [397, 243],
        [383, 249],
        [376, 261]
      ]
    ];
    const bounds = [];
    const from = [414, 266];
    const to = [467, 258];

    let start = Date.now();
    new ShortestPath({ bounds, holes }).calculate({ from, to }, 0);
    const elapsed = Date.now() - start;

    start = Date.now();
    new ShortestPath({ bounds, holes }).calculate({ from, to, useCache: false }, 0);
    const noCacheElapsed = Date.now() - start;

    console.log(`noCacheElapsed: ${noCacheElapsed}, elapsed: ${elapsed}`);
    expect(noCacheElapsed > elapsed * 1.1).toBe(true);
  });
});
