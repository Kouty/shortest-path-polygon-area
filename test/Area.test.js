import { Area } from '../src/Area';

describe('Area', () => {
  let testArea;

  beforeEach(() => {
    const bounds = [[0, 0], [0, 10], [10, 10], [10, 0]];
    testArea = new Area({ bounds });
  });

  it('should consider [[1,1],[9,9]] inside bounds', () => {
    expect(testArea.insideBounds([[1, 1], [9, 9]])).toBe(true);
  });

  it('should consider [[-1,-1],[-9,9]] outside bounds', () => {
    expect(testArea.insideBounds([[-1, -1], [-9, 9]])).toBe(false);
  });

  it('should consider [[-1,-1],[9,9]] outside bounds', () => {
    expect(testArea.insideBounds([[-1, -1], [9, 9]])).toBe(false);
  });

  it('should consider [[0,0],[10,10]] inside bounds', () => {
    expect(testArea.insideBounds([[0,0], [10, 10]])).toBe(true);
  });

});
