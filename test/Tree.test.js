import { Tree, TreeNode } from '../src/Tree';

describe('Tree', () => {

  describe('TreeNode', () => {
    it('should provide addChild method', () => {
      const node = new TreeNode();
      const child = new TreeNode();

      node.addChild(child);

      expect(node.children[0]).toBe(child);
    });

    it('should set itself as the parent of a child', () => {
      const node = new TreeNode();
      const child = new TreeNode();

      node.addChild(child);

      expect(child.parent).toBe(node);
    });
  });

  describe('Tree', () => {
    it('should provide the root', () => {
      const root = new TreeNode();
      const tree = new Tree(root);

      expect(tree.root).toBe(root);
    });

    it('should provide a breadthFirst iterator', () => {
      // https://en.wikipedia.org/wiki/Breadth-first_search#/media/File:Animated_BFS.gif
      const a = new TreeNode();
      const b = new TreeNode();
      const c = new TreeNode();
      const d = new TreeNode();
      const e = new TreeNode();
      const f = new TreeNode();
      const g = new TreeNode();
      const h = new TreeNode();
      a.addChild(b).addChild(c);
      b.addChild(d).addChild(e);
      c.addChild(f).addChild(g);
      e.addChild(h);

      const it = new Tree(a).bfIterator();
      const nodes = [];
      for (let node of it) {
        nodes.push(node);
      }

      expect(nodes).toEqual([a, b, c, d, e, f, g, h]);
    });
  });
});