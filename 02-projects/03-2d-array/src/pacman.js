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

  // Set sx variables depending on the frame; also 1, 2, 3, and 4 is the frame number inside the image
  if (curentPacmanFrame === 1) {
    sx = 0;
  }
  if (curentPacmanFrame === 2) {
    sx = sWidth;
  }
  if (curentPacmanFrame === 3) {
    sx = 2*sWidth;
  }
  if (curentPacmanFrame === 4) {
    sx = 3*sWidth;
  }

  imageMode(CENTER);
  image(pacmanImg, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
  pop();
}


// Change currentFrame
function changePacmanFrame() {
  if (curentPacmanFrame === pacmanAssets.numsFrame) {
    curentPacmanFrame = 1;
  }
  else if (curentPacmanFrame < pacmanAssets.numsFrame) {
    curentPacmanFrame++;
  }
}


function keyPressed() {
  if (key.toLowerCase() === "w") {
    movePacman(pacman.x, pacman.y - 1);
    console.log("w");
    console.log(pacman.x, pacman.y - 1);
  }
  if (key.toLowerCase() === "s") {
    movePacman(pacman.x, pacman.y + 1);
    console.log("s");
    console.log(pacman.x, pacman.y + 1);
  }
  if (key.toLowerCase() === "d") {
    movePacman(pacman.x + 1, pacman.y);
    console.log("d");
    console.log(pacman.x + 1, pacman.y);
  }
  if (key.toLowerCase() === "a") {
    movePacman(pacman.x - 1, pacman.y);
    console.log("a");
    console.log(pacman.x - 1, pacman.y);
  }
}


// Move pacman
function movePacman(x, y) {
  // Make sure pacman don't go off the grid
  if (x >= 0 && x < gridConfig.totalCols && y >= 0 && y < gridConfig.totalRows && (fixedMazeGrid[y][x] === identifiers.empty || fixedMazeGrid[y][x] === identifiers.pill)) {
    // Keep track of pacman's old position
    let odlX = pacman.x;
    let oldY = pacman.y;
    console.log(odlX, oldY);

    // Move pacman
    pacman.x = x;
    pacman.y = y;
    console.log(pacman.x, pacman.y);

    // Change pacman position in the grid and change previous position to empty slot
    fixedMazeGrid[pacman.y][pacman.x] = identifiers.packmanSpawn;
    fixedMazeGrid[oldY][odlX] = identifiers.empty;
  }
}