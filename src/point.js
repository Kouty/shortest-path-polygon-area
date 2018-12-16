export function pointLineSide(point, line, precision = 0) {
  const dist = pointLineDistance(point, line);
  if (dist <= precision) {
    return pointLineSide.ABOVE;
  }
  const x = point[0];
  const y = point[1];
  const x1 = line[0][0];
  const y1 = line[0][1];
  const x2 = line[1][0];
  const y2 = line[1][1];
  const a = x - x1 === 0 || y2 - y1 === 0 ? 0 : (x - x1) * (y2 - y1);
  const b = y - y1 === 0 || x2 - x1 === 0 ? 0 : (y - y1) * (x2 - x1);
  const res = a - b;
  return res < 0 ? pointLineSide.LEFT : res === 0 ? pointLineSide.ABOVE : pointLineSide.RIGHT;
}

pointLineSide.LEFT = Symbol('pointLineSide.LEFT');
pointLineSide.RIGHT = Symbol('pointLineSide.RIGHT');
pointLineSide.ABOVE = Symbol('pointLineSide.ABOVE');

export function pointLineDistance(point, line) {
  const x = point[0];
  const y = point[1];
  const x1 = line[0][0];
  const y1 = line[0][1];
  const x2 = line[1][0];
  const y2 = line[1][1];

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

  const dyPerX = y2 - y1 === 0 ? 0 : (y2 - y1) * x;
  const dxPerY = x2 - x1 === 0 ? 0 : (x2 - x1) * y;

  const numerator = Math.abs(dyPerX - dxPerY + x2 * y1 - y2 * x1);
  const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
  return numerator / denominator;
}

export function distance(p1, p2) {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}
