// Source code for grid of 21x19 and is rendomly generated every time
// WARNING: emptySpaceIdentifier is not used currently but is planned to use for future updates of the game. Ignore emptySpaceIdentifier for now.

// Map State Identifiers
let emptySpaceIdentifier = 0; // Walkable empty space 
let pillIdentifier = 1; // Eatable pills
let wallIdentifier = 2; // Solid wall

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

// Main grid matrix
let gridMatrix = [];


// Setup the grid
function setupGrid() {
  // Use 85% of the total height for scaling
  let totalGridWidth = height * 0.85;

  // Calculates size of each cell
  gridConfig.cellSize = totalGridWidth / gridConfig.totalCols;

  // Set grid height such that it won't go off the screen
  let totalGridHeight = gridConfig.cellSize * gridConfig.totalRows;

  // Calculates starting X and Y and set them such that maze will be centered
  gridConfig.startX = (width - totalGridWidth) / 2;
  gridConfig.startY = (height - totalGridHeight) / 2;

  // Generate maze array once and then edit generated maze to create actual random maze
  generateMazeArray();
  editGeneratedMaze();
  console.log(gridMatrix);
}


// Generate maze array
function generateMazeArray() {
  for (let r = 0; r < gridConfig.totalRows; r++) {
    let row = [];
    for (let c = 0; c < gridConfig.totalCols; c++) {
      // If it is a boundary then make a wall if not then put pills instead
      if (r === 0 || r === gridConfig.totalRows - 1 || c === 0 || c === gridConfig.totalCols - 1) {
        row.push(wallIdentifier);
      }
      else {
        row.push(pillIdentifier);
      }
    }
    gridMatrix.push(row);
  }
}


// Generate inner random maze
function editGeneratedMaze() {
  // Set 15% chance of having a wall
  let wallChancePercent = 15;

  // Skip firt 2 rows and coloms to create a coridor aroudn the border
  for (let r = 0; r < gridConfig.totalRows; r++) {
    for (let c = 0; c < gridConfig.totalCols; c++) {
      if (random(100) < wallChancePercent) {
        // Create maze for left half, then calculate the mirrored position for the right side and set wallIdentifier in gridMatrix
        gridMatrix[r][c] = wallIdentifier;
        let mirroredCols = gridConfig.totalCols - 1 - c;
        gridMatrix[r][mirroredCols] = wallIdentifier; 
      }
    }
  }
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
      if (gridMatrix[r][c] === wallIdentifier) {
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
      if (gridMatrix[r][c] === pillIdentifier) {
        // Calculate x and y position of each pill
        let x = gridConfig.startX + gridConfig.cellSize / 2 + c * gridConfig.cellSize;
        let y = gridConfig.startY + gridConfig.cellSize / 2 + r * gridConfig.cellSize;
        square(x, y, pillConfig.pillSide);
      }
    }
  }
  pop();
}