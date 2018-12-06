import { Tree, TreeNode } from './Tree';

export class ShortestPath {
  constructor(area) {
    this.area = area;
  }

  calculate({ from, to }) {
    const verticesToEvaluate = this.area.allVertices();
    verticesToEvaluate.push(to);
    const tree = new Tree(new TreeNode({ point: from, dist: 0 }));

    let moreNodesToEvaluate;
    do {
      moreNodesToEvaluate = false;
      const it = tree.bfIterator();
      for (const node of it) {
        verticesToEvaluate.some((vertex) => {
          const segment = [node.value.point, vertex];


          return false;
        });
      }
    } while (moreNodesToEvaluate);

    return [from, to];
  }

  allVertices() {
    let allVertices = [];
    this.holes.forEach((hole) => {
      allVertices = allVertices.concat(hole);
    });
    allVertices = allVertices.concat(this.bounds);

    return allVertices;
  }
}
