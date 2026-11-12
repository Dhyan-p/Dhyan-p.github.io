// Source code for pacman character

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
  
  // Set variables to use for image
  let dx = pacman.x;
  let dy = pacman.y;
  let dWidth = gridConfig.cellSize;
  let dHeight = gridConfig.cellSize;
  let sx = 0;
  let sy = 0;
  let sWidth = pacmanImg.width / pacmanAssets.numsFrame;
  let sHeight = pacmanImg.height;

  imageMode(CENTER);
  image(pacmanImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
  pop();
}