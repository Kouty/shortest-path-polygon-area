export class Tree {
  constructor(root) {
    this.root = root;
  }

  bfIterator() {
    const queue = [this.root];
    let i = 0;

    return {
      next() {
        const nextEl = queue[i++];
        const done = nextEl === undefined;
        if(!done) {
          queue.push(...nextEl.children);
        }
        return {
          done,
          value: nextEl
        };
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  }
}

export class TreeNode {
  constructor() {
    this.children = [];
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
    return this;
  }

}