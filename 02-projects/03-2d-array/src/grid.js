// Source code for grids of 21x19
// WARNING: In identifiers object, following identifiers is not used for this version of the game: empty, packmanSpawn, blinkySpawn, pinkySpawn, inkySpawn, and clydeSpawn. But will be used for futur updates of the game.

// While developing keep the default position as mentioned below
// pacman: left circle
// blinky: left
// inky: up
// pinky: down
// clyde: up

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

// Characters objects
let pacman = {
  row: 0,
  col: 0,
  x: 0,
  y: 0,
  currentDirection: "left"
};

// Ghosts
// Blinky
let blinky = {
  row: 0,
  col: 0,
  x: 0,
  y: 0,
  currentDirection: "left"
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

  // Scan matrix and find spawn points and get (x,y) coordinated
  for (let row = 0; row < gridConfig.totalRows; row++) {
    for (let col = 0; col < gridConfig.totalCols; col++) {
      let tile = fixedMazeGrid[row][col];

      if (tile === identifiers.packmanSpawn) {
        pacman.row = row;
        pacman.col = col;
        pacman.x = gridConfig.startX + gridConfig.cellSize / 2 + col * gridConfig.cellSize;
        pacman.y = gridConfig.startY + gridConfig.cellSize / 2 + row * gridConfig.cellSize;
      }
      else if (tile === identifiers.blinkySpawn) {
        blinky.row = row;
        blinky.col = col;
        blinky.x = gridConfig.startX + gridConfig.cellSize / 2 + col * gridConfig.cellSize;
        blinky.y = gridConfig.startY + gridConfig.cellSize / 2 + row * gridConfig.cellSize;
      }
    }
  }
}


// Draw Pac-man
function drawPacman() {
  push();
  let pacmanCharacter = pacmanAssets[pacman.currentDirection];
  imageMode(CENTER);
  image(pacmanCharacter, pacman.x, pacman.y, gridConfig.cellSize, gridConfig.cellSize);
  pop();
}

// Helper function to render pills or to generate maze
function render(purpose) {
  // This function will render pills as well as will generate or draw maze
  // By the purpose decide what to checke and what to have for size
  let checker = null;
  let forSize = null;
  if (purpose === "drawingMaze") {
    checker = identifiers.wall;
    forSize = gridConfig.cellSize;
  }
  else if (purpose === "renderPill") {
    checker = identifiers.pill;
    forSize = pillConfig.pillSide;
  }

  for (let rows = 0; rows < gridConfig.totalRows; rows++) {
    for (let cols = 0; cols < gridConfig.totalCols; cols++) {
      // Check if there should be wall or pill using a wallIdentifier and pillIdentifier
      if (fixedMazeGrid[rows][cols] === checker) {
        // Calculate x and y position of each wall or pill
        let x = gridConfig.startX + gridConfig.cellSize / 2 + cols * gridConfig.cellSize;
        let y = gridConfig.startY + gridConfig.cellSize / 2 + rows * gridConfig.cellSize;
        square(x, y, forSize);
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
  render("drawingMaze");

  pop();
}


// Render Pills
function renderPills() {
  push();
  fill("pink");
  noStroke();
  rectMode(CENTER);

  // Render Pills for each cell
  render("renderPill");
  
  pop();
}