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
  targetX: 0,
  targetY: 0,
  targetRow: 0,
  targetCol: 0,
  isMoving: false,
  currentDirection: "left", // Default direction
  nextDirection: "left", // Player queue direction
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


// Change direction on key press
function keyPressed() {
  // Make key lowercase
  let checkKey = key.toLowerCase();

  if (checkKey === 'a' || key === LEFT_ARROW) {
    pacman.nextDirection = "left";
  }
  else if (checkKey === 'd' || key === RIGHT_ARROW) {
    pacman.nextDirection = "right";
  }
  else if (checkKey === 'w' || key === UP_ARROW) {
    pacman.nextDirection = "up";
  }
  else if (checkKey === 's' || key === DOWN_ARROW) {
    pacman.nextDirection = "down";
  }
}


// Move pacman using lerp
function movePacman() {
  // If pacman has completed moving to the desire tile, pick the next tile direction
  if (!pacman.isMoving) {
    let chosenDirection = pacman.currentDirection;

    // Check if the nextDirection is open to move
    let nextOffSet = getOffSet(pacman.nextDirection);
    let rowOffSet = pacman.row + nextOffSet.row;
    let colOffSet = pacman.col + nextOffSet.col;

    // Check if pacman can move to the nextDirection
    if (canMove(colOffSet, rowOffSet)) {
      pacman.targetX = colOffSet;
      pacman.targetY = rowOffSet;
    }
  }
}


// Find the grid direction
function getOffSet(theDirection) {
  if (theDirection === "left") {
    return {col: -1, row: 0};
  }
  else if (theDirection === "right") {
    return {col: 1, row: 0};
  }
  else if (theDirection === "up") {
    return {col: 0, row: -1};
  }
  else if (theDirection === "down") {
    return {col: 0, row: 1};
  }
}


function canMove(col, row) {
  if (fixedMazeGrid[row][col] !== identifiers.wall) {
    return true;
  }
  return false;
}