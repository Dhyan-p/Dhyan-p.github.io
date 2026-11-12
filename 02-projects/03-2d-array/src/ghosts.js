// Source code for all ghosts

// Current frames of ghosts
// WARNING: if a frame is set to 1 that means its the first frame
let currentBlinkyFrame = 1;

// Ghosts
// Blinky
let blinky = {
  row: 0,
  col: 0,
  x: 0,
  y: 0,
  currentDirection: "left"
};


// Draw Blinky
function drawBlinkyGhost() {
  push();
  // Variables for image
  let dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight;
  let blinkyGhostImg = blinkyAssets[blinky.currentDirection];

  // Common variables that does not change for image
  dx = blinky.x;
  dy = blinky.y;
  dWidth = gridConfig.cellSize;
  dHeight = gridConfig.cellSize;
  sy = 0;
  sWidth = blinkyGhostImg.width / blinkyAssets.numsFrame;
  sHeight = blinkyGhostImg.height;

  // Set sx variables depending on the frame
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

function changeBlinkyFrame() {
  if (currentBlinkyFrame === blinkyAssets.numsFrame) {
    currentBlinkyFrame = 1;
  }
  else if (currentBlinkyFrame < blinkyAssets.numsFrame) {
    currentBlinkyFrame++;
  }
}