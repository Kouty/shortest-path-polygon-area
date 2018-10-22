export function pointLineDistance([x, y], [[x1, y1], [x2, y2]]) {
  const numerator = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
  const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
  return numerator / denominator;
}

export function pointSide({ x, y }, [{ x: x1, y: y1 }, { x: x2, y: y2 }]) {
  const d = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
  return d < 0 ? pointSide.LEFT : pointSide.RIGHT;
}

pointSide.LEFT = Symbol('pointSide.LEFT');
pointSide.RIGHT = Symbol('pointSide.RIGHT');