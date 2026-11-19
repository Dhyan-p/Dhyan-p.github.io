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
    let nextTestRow = pacman.row + nextOffSet.row;
    let nextTestCol = pacman.col + nextOffSet.col;

    // Check if pacman nextDirection is valid to move or not
    if (canMoveTo(nextTestRow, nextTestCol)) {
      // Turn into nextDirection
      chosenDirection = pacman.nextDirection;
    }

    // Now check if the valid nextDirection can be walked into
    let curretOffSet = getOffSet(chosenDirection);
    let targetRow = pacman.row + curretOffSet.row;
    let targetCol = pacman.col + curretOffSet.col;

    if (canMoveTo(targetRow, targetCol)) {
      pacman.currentDirection = chosenDirection;
      pacman.targetRow = targetRow;
      pacman.targetCol = targetCol;

      // Calculate pixel cordinates for center of the target tile
      pacman.targetX = gridConfig.startX + gridConfig.cellSize / 2 + targetCol * gridConfig.cellSize;
      pacman.targetY = gridConfig.startY + gridConfig.cellSize / 2 + targetRow * gridConfig.cellSize;
      pacman.isMoving = true;
    }
  }

  // Make pacman move smoothly with lerp function
  if (pacman.isMoving) {
    // set lerp speed to 15% of remaining distance
    let lerpSpeed = 0.25;
    pacman.x = lerp(pacman.x, pacman.targetX, lerpSpeed);
    pacman.y = lerp(pacman.y, pacman.targetY, lerpSpeed);

    // If pacman already coverd half the pixel target, then skip to destination till
    let distance = dist(pacman.x, pacman.y, pacman.targetX, pacman.targetY);
    if (distance < 0.5) {
      pacman.x = pacman.targetX;
      pacman.y = pacman.targetY;
      pacman.row = pacman.targetRow;
      pacman.col = pacman.targetCol;
      pacman.isMoving = false; // Get ready to calculate next tile
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
  return {col: 0, row: 0};
}


// Helper function
function canMoveTo(row, col) {
  // Check grid boundaries
  if (row < 0 || row >= gridConfig.totalRows || col < 0 || col >= gridConfig.totalCols) {
    return false;
  }
  // Check if tile is not a wall
  return fixedMazeGrid[row][col] !== identifiers.wall;
}