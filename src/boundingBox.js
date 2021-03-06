export function boundingBox([[x0, y0], [x1, y1]]) {
  const bbX0 = Math.min(x0, x1);
  const bbY0 = Math.max(y0, y1);
  const bbX1 = Math.max(x0, x1);
  const bbY1 = Math.min(y0, y1);

  return [[bbX0, bbY0], [bbX1, bbY1]];
}

export function boxIntersect(segment1, segment2) {
  const bb0 = boundingBox(segment1);
  const bb1 = boundingBox(segment2);
  const [[bb0x0, bb0y0], [bb0x1, bb0y1]] = bb0;
  const [[bb1x0, bb1y0], [bb1x1, bb1y1]] = bb1;

  return !(bb1x0 > bb0x1 || bb1y0 < bb0y1 || bb1x1 < bb0x0 || bb1y1 > bb0y0);
}
