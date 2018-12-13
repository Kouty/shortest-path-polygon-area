import { pointLineSide } from './pointLine';
import { boundingBox } from './boundingBox';

export function segmentPointSide(point, segment, precision = 0) {
  function gt(a, b) {
    return a > b + precision;
  }

  function lt(a, b) {
    return a < b - precision;
  }

  const side = pointLineSide(point, segment, precision);
  let result;
  if (side === pointLineSide.LEFT) {
    result = segmentPointSide.LEFT;
  } else if (side === pointLineSide.RIGHT) {
    result = segmentPointSide.RIGHT;
  } else if (side === pointLineSide.ABOVE) {
    result = segmentPointSide.ABOVE;
    const bbox = boundingBox(segment);
    if (
      lt(point[0], bbox[0][0]) ||
      gt(point[0], bbox[1][0]) ||
      gt(point[1], bbox[0][1]) ||
      lt(point[1], bbox[1][1])
    ) {
      result = segmentPointSide.INLINE_OUTSIDE;
    }
  } else {
    throw new Error('Unexpected result from pointLineSide ' + side.toString());
  }

  return result;
}

segmentPointSide.LEFT = Symbol('segmentPointSide.LEFT');
segmentPointSide.RIGHT = Symbol('segmentPointSide.RIGHT');
segmentPointSide.ABOVE = Symbol('segmentPointSide.ABOVE');
segmentPointSide.INLINE_OUTSIDE = Symbol('segmentPointSide.INLINE_OUTSIDE');
