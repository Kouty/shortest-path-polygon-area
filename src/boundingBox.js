export function boundingBox([[x0, y0], [x1, y1]]) {
  const bbX0 = Math.min(x0, x1);
  const bbY0 = Math.max(y0, y1);
  const bbX1 = Math.max(x0, x1);
  const bbY1 = Math.min(y0, y1);

  return [[bbX0, bbY0], [bbX1, bbY1]];
}

export function boxIntersect(segment1, segment2, precision = 0) {
  const bb0 = boundingBox(segment1);
  const bb1 = boundingBox(segment2);
  const [[bb0x0, bb0y0], [bb0x1, bb0y1]] = bb0;
  const [[bb1x0, bb1y0], [bb1x1, bb1y1]] = bb1;

  const inside = !(bb1x0 > bb0x1 || bb1y0 < bb0y1 || bb1x1 < bb0x0 || bb1y1 > bb0y0);
  if (inside) {
    const in0x0 = Math.max(bb0x0, bb1x0);
    const in0x1 = Math.min(bb0x1, bb1x1);
    const in0y0 = Math.min(bb0y0, bb1y0);
    const in0y1 = Math.max(bb0y1, bb1y1);

    if (in0x1 - in0x0 <= precision || in0y0 - in0y1 <= precision) {
      return false;
    }
  }

  return inside;
}
