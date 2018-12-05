export function pointLineDistance([x, y], [[x1, y1], [x2, y2]]) {
  if (!Number.isFinite(x)) {
    return Number.POSITIVE_INFINITY;
  }

  if (!Number.isFinite(y)) {
    return Number.POSITIVE_INFINITY;
  }

  if (!Number.isFinite(y1)) {
    return Math.abs(x2 - x);
  }

  if (!Number.isFinite(y2)) {
    return Math.abs(x1 - x);
  }

  if (!Number.isFinite(x1)) {
    return Math.abs(y2 - y);
  }

  if (!Number.isFinite(x2)) {
    return Math.abs(y1 - y);
  }

  const numerator = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
  const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
  return numerator / denominator;
}

export function pointLineSide([x, y], [[x1, y1], [x2, y2]], precision = 0) {
  if (precision) {
    const dist = pointLineDistance([x, y], [[x1, y1], [x2, y2]]);
    if(isNaN(dist)) {
      console.log([x, y], [[x1, y1], [x2, y2]])
    }
    if (dist <= precision) {
      return pointLineSide.ABOVE;
    }
  }

  const d = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
  return d < 0
    ? pointLineSide.LEFT
    : d === 0
      ? pointLineSide.ABOVE
      : pointLineSide.RIGHT;
}

pointLineSide.LEFT = Symbol('pointLineSide.LEFT');
pointLineSide.RIGHT = Symbol('pointLineSide.RIGHT');
pointLineSide.ABOVE = Symbol('pointLineSide.ABOVE');
