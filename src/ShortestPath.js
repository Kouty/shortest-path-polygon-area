import { Tree, TreeNode } from './Tree';
import { Area } from './Area';
import { distance } from './point';

export class ShortestPath {
  constructor({ bounds, holes }) {
    this.area = new Area({ bounds, holes });
  }

  calculate({ from, to, useCache = true }, precision) {
    const verticesToEvaluate = this.area.allVertices();
    verticesToEvaluate.push(to);
    const tree = new Tree(new TreeNode({ point: from, dist: 0 }));

    let moreNodesToEvaluate;
    let result = [];
    const segmentMap = new Map();
    do {
      moreNodesToEvaluate = false;
      let minDist = Number.POSITIVE_INFINITY;
      let nearestVertexIndex = null;
      let nearestNode = null;

      const it = tree.bfIterator();
      for (const node of it) {
        verticesToEvaluate.some((vertex, index) => {
          const segment = [node.value.point, vertex];
          const key = JSON.stringify(segment);
          let insideArea = segmentMap.get(key);
          if (insideArea === undefined) {
            insideArea = this.area.insideArea(segment, precision);
            if (useCache) {
              segmentMap.set(key, insideArea);
            }
          }
          if (insideArea) {
            moreNodesToEvaluate = true;
            const dist = distance(segment[0], segment[1]) + node.value.dist;
            if (dist < minDist) {
              minDist = dist;
              nearestVertexIndex = index;
              nearestNode = node;
            }

            if (segment[1] === to) {
              return true;
            }
          }

          return false;
        });
      }

      if (nearestVertexIndex !== null) {
        const nearestVertex = verticesToEvaluate[nearestVertexIndex];
        const treeNode = new TreeNode({
          point: nearestVertex,
          dist: minDist
        });
        nearestNode.addChild(treeNode);
        verticesToEvaluate.splice(nearestVertexIndex, 1);

        if (nearestVertex === to) {
          result = this._createPath(treeNode);
          break;
        }
      }
    } while (moreNodesToEvaluate);

    return result;
  }

  _createPath(node) {
    let currentNode = node;
    const path = [];

    while (currentNode != null) {
      path.push(currentNode.value.point);
      currentNode = currentNode.parent;
    }

    path.reverse();
    return path;
  }
}
