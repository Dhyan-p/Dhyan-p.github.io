// Source code for pacman character

// Current frames of pacman
// WARNING: if a frame is set to 1 that means its the first frame
let curentPacmanFrame = 1;

// Characters objects
let pacman = {
  row: 0,
  col: 0,
  x: 0,
  y: 0,
  currentDirection: "left"
};


// Draw Pac-man
function drawPacman() {
  push();
  let pacmanImg = pacmanAssets[pacman.currentDirection];
  
  // Common variables that does not change for image
  let dx = pacman.x;
  let dy = pacman.y;
  let dWidth = gridConfig.cellSize;
  let dHeight = gridConfig.cellSize;
  let sy = 0;
  let sWidth = pacmanImg.width / pacmanAssets.numsFrame;
  let sHeight = pacmanImg.height;

  // Set sx variables depending on the frame
  if (curentPacmanFrame === 1) {
    sx = 0;
  }
  if (curentPacmanFrame === 2) {
    sx = pacmanImg.width / pacmanAssets.numsFrame;
  }

  imageMode(CENTER);
  image(pacmanImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
  pop();
}

function changePacmanFrame() {
  if (curentPacmanFrame === pacmanAssets.numsFrame) {
    curentPacmanFrame = 1;
  }
  else if (curentPacmanFrame < pacmanAssets.numsFrame) {
    curentPacmanFrame++;
  }
}