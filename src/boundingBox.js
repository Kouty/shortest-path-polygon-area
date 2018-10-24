export function boundingBox([[x0, y0], [x1, y1]]) {
  const bbX0 = Math.min(x0, x1);
  const bbX1 = Math.max(x0, x1);
  const bbY0 = Math.min(y0, y1);
  const bbY1 = Math.max(y0, y1);

  return [[bbX0, bbY0], [bbX1, bbY1]];
}

export function boxIntersect([[bb0x0, bb0y0], [bb0x1, bb0y1]], [[bb1x0, bb1y0], [bb1x1, bb1y1]]) {
  return !(bb1x0 > bb0x1 || bb1y0 > bb0y1);


  // return !(r2L >= r1R
  //   || r2R < r1L
  //   || r2T > r1B
  //   || r2B < r1T);
}
