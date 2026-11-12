// Source code for all ghosts

// Ghosts
// Blinky
let blinky = {
  row: 0,
  col: 0,
  x: 0,
  y: 0,
  currentDirection: "left"
};


// Draw Ghosts
// Draw Blinky
function drawBlinkyGhost() {
  push();
  // Variables for image
  let dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight;
  let currentBlinkyFrame = blinkyAssets.numsFrame;
  let blinkyGhostImg = blinkyAssets[blinky.currentDirection];

  // Common variables that does not change for image
  dx = blinky.x;
  dy = blinky.y;
  dWidth = gridConfig.cellSize;
  dHeight = gridConfig.cellSize;
  sy = 0;
  sWidth = blinkyGhostImg.width / blinkyAssets.numsFrame;
  sHeight = blinkyGhostImg.height;

  // Set variables to use for image
  if (currentBlinkyFrame === 1) {
    sx = 0;
  }
  if (currentBlinkyFrame === 2) {
    sx = blinkyGhostImg.width / blinkyAssets.numsFrame;
  }

  imageMode(CENTER);
  image(blinkyGhostImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
  pop();
}