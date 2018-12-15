const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function updateCanvasSize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

updateCanvasSize();
window.onresize = updateCanvasSize;

let state = 'hole';
let crtHole = [];
let holes = [crtHole];
let bounds = [];

function toggleArea() {
  state = 'area';
}

function toggleHole() {
  state = 'hole';
}

function clearCanvas() {
  holes = [];
  draw();
}

window.toggleArea = toggleArea;
window.toggleHole = toggleHole;
window.clearCanvas = clearCanvas;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  holes.forEach((hole, index) => {
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.moveTo(hole[0], hole[1]);
    hole.forEach(p => ctx.lineTo(p[0], p[1]));

    if (index < holes.length - 1) {
      ctx.closePath();
    }
    ctx.stroke();

    const radius = 5;
    hole.forEach(point => {
      ctx.beginPath();
      ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.closePath();
    });
  });
}

draw();

canvas.onclick = evt => {
  crtHole.push([evt.layerX, evt.layerY]);
  draw();
};
canvas.oncontextmenu = evt => {
  crtHole = [];
  holes.push(crtHole);
  draw();
  return false;
};
