import { ShortestPath } from './ShortestPath';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function updateCanvasSize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

updateCanvasSize();
window.onresize = updateCanvasSize;

let crtHole = [];
let holes = [crtHole];
let bounds = [];
let boundsDone = false;
let from = null;
let to = null;
let path = [];

const HoleState = {
  name: 'HoleState',
  onStateEnter() {
    // NOP
  },
  onClick(evt) {
    crtHole.push([evt.layerX, evt.layerY]);
  },
  onRightClick() {
    if (crtHole.length > 0) {
      crtHole = [];
      holes.push(crtHole);
    }
  },
  onChangeState() {
    this.onRightClick();
  }
};

const AreaState = {
  name: 'AreaState',
  onStateEnter() {
    bounds = [];
    boundsDone = false;
  },
  onClick(evt) {
    bounds.push([evt.layerX, evt.layerY]);
  },
  onRightClick() {
    boundsDone = true;
  },
  onChangeState(newState) {
    this.onRightClick();
  }
};

const PathState = {
  name: 'PathState',
  onStateEnter() {
    from = null;
    to = null;
    path = [];
  },
  onClick(evt) {
    const point = [evt.layerX, evt.layerY];
    if (from === null || (from !== null && to !== null)) {
      from = point;
      to = null;
      path = [from];
    } else if (to === null) {
      to = point;
      path = new ShortestPath({ bounds, holes }).calculate({ from, to }, 0.1);
    }
  },
  onRightClick() {
    path = [];
    from = null;
    to = null;
  },
  onChangeState() {
    // NOP
  }
};

let state = HoleState;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  holes.forEach((hole, index) => {
    ctx.strokeStyle = '#000';
    drawPoly(hole, index < holes.length - 1);
  });

  ctx.strokeStyle = '#006';
  drawPoly(bounds, boundsDone);

  ctx.strokeStyle = '#060';
  drawPoly(path, false);
}

function drawPoly(poly, closed) {
  ctx.beginPath();
  ctx.moveTo(poly[0], poly[1]);
  poly.forEach(p => ctx.lineTo(p[0], p[1]));

  if (closed) {
    ctx.closePath();
  }
  ctx.stroke();

  const radius = 5;
  poly.forEach(point => {
    ctx.beginPath();
    ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  });
}

draw();

canvas.onclick = evt => {
  state.onClick(evt);
  draw();
};
canvas.oncontextmenu = () => {
  state.onRightClick();
  draw();
  return false;
};

function toggleBounds() {
  switchState(AreaState);
}

function toggleHole() {
  switchState(HoleState);
}

function togglePath() {
  switchState(PathState);
}

function switchState(newState) {
  state.onChangeState(newState);
  state = newState;
  state.onStateEnter();
  draw();
}

function clearCanvas() {
  crtHole = [];
  holes = [crtHole];
  bounds = [];
  boundsDone = false;
  from = null;
  to = null;
  path = [];
  draw();
}

window.toggleBounds = toggleBounds;
window.toggleHole = toggleHole;
window.clearCanvas = clearCanvas;
window.togglePath = togglePath;
