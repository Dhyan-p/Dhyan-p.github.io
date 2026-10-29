// Source code for grids of 21x19
// WARNING: In identifiers object, following identifiers is not used for this version of the game: empty, packmanSpawn, blinkySpawn, pinkySpawn, inkySpawn, and clydeSpawn. But will be used for futur updates of the game.

// Map State & Character Identifiers
let identifiers = {
  empty: 0, // Wakable empty space
  pill: 1, // Eatable pills
  wall: 2, // Solid wall
  packmanSpawn: 3, // Pac-Man
  blinkySpawn: 4, // Red
  pinkySqawn: 5, // Pink
  inkySpawn: 6, // Cyan
  clydeSpawn: 7, // Orange
};

// Configuration of grid object
let gridConfig = {
  totalRows: 21,
  totalCols: 19,
  cellSize: 0,
  startX: 0,
  startY: 0
};

// Configuration of pills
let pillConfig = {
  pillSide: 5
};

// Fixed maze structure
let fixedMazeGrid = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2],
  [0, 0, 0, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 0, 0, 0],
  [2, 2, 2, 2, 1, 2, 1, 2, 2, 4, 2, 2, 1, 2, 1, 2, 2, 2, 2],
  [0, 1, 1, 1, 1, 1, 1, 0, 6, 5, 7, 0, 1, 1, 1, 1, 1, 1, 0],
  [2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2],
  [0, 0, 0, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 0, 0, 0],
  [2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 2, 1, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];


// Setup the grid
function setupGrid() {
  // Use 85% of the total height for scaling
  let totalGridWidth = height * 0.85;

  // Calculates size of each cell
  gridConfig.cellSize = totalGridWidth / gridConfig.totalCols;

  // Set grid height so it won't go off the screen
  let totalGridHeight = gridConfig.cellSize * gridConfig.totalRows;

  // Calculates starting X and Y so that the entire grid center to the screen
  gridConfig.startX = (width - totalGridWidth) / 2;
  gridConfig.startY = (height - totalGridHeight) / 2;
}


// Draw Maze
function drawMaze() {
  push();
  stroke("blue");
  fill("blue");
  rectMode(CENTER);

  // Draw Maze boarder
  for (let r = 0; r < gridConfig.totalRows; r++) {
    for (let c = 0; c < gridConfig.totalCols; c++) {
      // Check if there should be wall or not using a wallIdentifier
      if (fixedMazeGrid[r][c] === identifiers.wall) {
        // Calculate x and y position of each wall
        let x = gridConfig.startX + gridConfig.cellSize / 2 + c * gridConfig.cellSize;
        let y = gridConfig.startY + gridConfig.cellSize / 2 + r * gridConfig.cellSize;
        square(x, y, gridConfig.cellSize);
      }
    }
  }
  pop();
}


// Render Pills
function renderPills() {
  push();
  fill("pink");
  noStroke();
  rectMode(CENTER);

  // Render Pills for each cell
  for (let r = 0; r < gridConfig.totalRows; r++) {
    for (let c = 0; c < gridConfig.totalCols; c++) {
      // Check if there should be a pill or not using pillIdentifier
      if (fixedMazeGrid[r][c] === identifiers.pill) {
        // Calculate x and y position of each pill
        let x = gridConfig.startX + gridConfig.cellSize / 2 + c * gridConfig.cellSize;
        let y = gridConfig.startY + gridConfig.cellSize / 2 + r * gridConfig.cellSize;
        square(x, y, pillConfig.pillSide);
      }
    }
  }
  pop();
}