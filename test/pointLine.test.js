import { pointLineDistance, pointLineSide } from '../src/pointLine';

describe('Point-line', () => {
  describe('side', () => {
    it('should define pointLineSide.RIGHT', () => {
      expect(pointLineSide.RIGHT).not.toBe(undefined);
    });

    it('[3,2] is on the right of [[0,0],[5,5]]', () => {
      expect(pointLineSide([3, 2], [[0, 0], [5, 5]])).toBe(pointLineSide.RIGHT);
    });

    it('should define pointLineSide.LEFT', () => {
      expect(pointLineSide.LEFT).not.toBe(undefined);
    });

    it('[3,4] is on the left of [[0,0],[5,5]]', () => {
      expect(pointLineSide([3, 4], [[0, 0], [5, 5]])).toBe(pointLineSide.LEFT);
    });

    it('should define pointLineSide.ABOVE', () => {
      expect(pointLineSide.ABOVE).not.toBe(undefined);
    });

    it('[4,4] is above of [[0,0],[5,5]]', () => {
      expect(pointLineSide([4, 4], [[0, 0], [5, 5]])).toBe(pointLineSide.ABOVE);
    });

    it('[4.01,3.99] is above of [[0,0],[5,5]] with precision 0.1', () => {
      expect(pointLineSide([4.01, 3.99], [[0, 0], [5, 5]], 0.1)).toBe(pointLineSide.ABOVE);
    });

    describe('side with Infinity', () => {
      const Inf = Number.POSITIVE_INFINITY;

      it('[Inf, 1] is on the right of [[0, 10], [3, 10]]', () => {
        expect(pointLineSide([Inf, 1], [[0, 10], [3, 10]])).toBe(pointLineSide.RIGHT);
      });

      it('[Inf, 1] is on the left of [[3, 10], [0, 10]]', () => {
        expect(pointLineSide([Inf, 1], [[3, 10], [0, 10]])).toBe(pointLineSide.LEFT);
      });

      it('[1, Inf] is on the right of [[0, 3], [0, 7]]', () => {
        expect(pointLineSide([1, Inf], [[0, 3], [0, 7]])).toBe(pointLineSide.RIGHT);
      });

      it('[1, Inf] is on the left of [[0, 7], [0, 3]]', () => {
        expect(pointLineSide([1, Inf], [[0, 7], [0, 3]])).toBe(pointLineSide.LEFT);
      });
    });
  });

  describe('pointLineDistance', () => {
    it('[1,0] is sqrt(2)/2 distant from line [0,0], [7,7]', () => {
      expect(pointLineDistance([1, 0], [[0, 0], [7, 7]])).toBeCloseTo(Math.sqrt(2) / 2);
    });

    const Inf = Number.POSITIVE_INFINITY;
    describe('Infinity on line coordinates', () => {
      it('[1,-7] is 7 distant from [[0, 0], [Inf, 0]]', () => {
        expect(pointLineDistance([1, -7], [[0, 0], [Inf, 0]])).toBe(7);
      });

      it('[1,7] is 7 distant from [[Inf, 0], [0, 0]]', () => {
        expect(pointLineDistance([1, -7], [[Inf, 0], [0, 0]])).toBe(7);
      });

      it('[1,7] is 7 distant from X axis', () => {
        expect(pointLineDistance([1, -7], [[-Inf, 0], [+Inf, 0]])).toBe(7);
      });

      it('[8,1] is 8 distant from [[0, 0], [0, Inf]]', () => {
        expect(pointLineDistance([8, 1], [[0, 0], [0, Inf]])).toBe(8);
      });

      it('[8,1] is 8 distant from [[0, Inf], [0, 0]]', () => {
        expect(pointLineDistance([8, 1], [[0, Inf], [0, 0]])).toBe(8);
      });

      it('[8,1] is 8 distant from Y axis', () => {
        expect(pointLineDistance([8, 1], [[0, Inf], [0, -Inf]])).toBe(8);
      });
    });

    describe('Infinity on point coordinates', () => {
      it('[Inf,10] is distant Inf from any non horizontal line', () => {
        expect(pointLineDistance([Inf, 10], [[0, 0], [3, 4]])).toBe(Inf);
      });

      it('[Inf,-10] is distant 20 from horizontal [[0,10],[4,10]] line', () => {
        expect(pointLineDistance([Inf, -10], [[0, 10], [4, 10]])).toBe(20);
      });

      it('[Inf,-10] is distant 10 from X axis', () => {
        expect(pointLineDistance([Inf, -10], [[-Inf, 0], [+Inf, 0]])).toBe(10);
      });

      it('[10,Inf] is Inf distant from any non vertical line', () => {
        expect(pointLineDistance([10, Inf], [[0, 0], [3, 4]])).toBe(Inf);
      });

      it('[-10,Inf] is distant 20 from vertical line [[10,0],[10,10]] line', () => {
        expect(pointLineDistance([-10, Inf], [[10, 0], [10, 10]])).toBe(20);
      });

      it('[-10, Inf] is distant 10 from Y axis', () => {
        expect(pointLineDistance([-10, Inf], [[0, -Inf], [0, +Inf]])).toBe(10);
      });
    });
  });
});