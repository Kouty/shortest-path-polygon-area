import { Tree, TreeNode } from './Tree';
import { Area } from './Area';
import { distance } from './pointPointDistance';

export class ShortestPath {
  constructor({ bounds, holes }) {
    this.area = new Area({ bounds, holes });
  }

  calculate({ from, to }, precision) {
    const verticesToEvaluate = this.area.allVertices();
    verticesToEvaluate.push(to);
    const tree = new Tree(new TreeNode({ point: from, dist: 0 }));

    let moreNodesToEvaluate;
    let result = [];
    do {
      moreNodesToEvaluate = false;
      let minDist = Number.POSITIVE_INFINITY;
      let nearestVertexIndex = null;
      let nearestNode = null;

      const it = tree.bfIterator();
      for (const node of it) {
        verticesToEvaluate.some((vertex, index) => {
          // if (vertex === to) {
          //   console.log('cippa');
          // }
          const segment = [node.value.point, vertex];
          if (this.area.insideArea(segment, precision)) {
            moreNodesToEvaluate = true;
            const dist = distance(segment[0], segment[1]) + node.value.dist;
            if (dist < minDist) {
              minDist = dist;
              nearestVertexIndex = index;
              nearestNode = node;
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
