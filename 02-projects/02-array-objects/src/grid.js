// Source code for grids of 21x19

// Map State Identifiers
let emptySpaceIdentifier = 0; // Walkable empty space 
let pillIdentifier = 1; // Eatable pills
let wallIdentifier = 2; // Solid wall

// Character Identifiers
let pacmanSqawnIdentifier = 3; // Pac-Man
let blinkySpawnIdentifier = 4; // Red
let pinkySpawnIdentifier = 5; // Pink
let inkySpawnIdentifier = 6; // Cyan
let clydeSpawnIdentifier = 7; // Orange(Yellow)

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

    // Calculate size of each cell
    gridConfig.cellSize = totalGridWidth / gridConfig.totalCols;

    // 
    let totalGridHeight = gridConfig.cellSize * gridConfig.totalRows;

    // Calculate starting X and Y so that the entire grid center to the screen
    gridConfig.startX = (width - totalGridWidth) / 2;
    gridConfig.startY = (height - totalGridHeight) / 2;
}


// Draw Maze
function drawMaze() {
    push();
    // Draw Maze boarder
    for (let r = 0; r < gridConfig.totalRows; r++) {
        for (let c = 0; c < gridConfig.totalCols; c++) {
            if (fixedMazeGrid[r][c] === wallIdentifier) {
                let x = gridConfig.startX + (gridConfig.cellSize / 2) + (c * gridConfig.cellSize);
                let y = gridConfig.startY + (gridConfig.cellSize / 2) + (r * gridConfig.cellSize);
                // noStroke();
                fill("blue");
                rectMode(CENTER);
                square(x, y, gridConfig.cellSize);
            }
        }
    }
    pop();
}


// Put pill if applicable
function renderPills() {
    push();
    for (let r = 0; r < gridConfig.totalRows; r++) {
        for (let c = 0; c < gridConfig.totalCols; c++) {
            // Check if
            if (fixedMazeGrid[r][c] === pillIdentifier) {
                // Calculate x and y position of each pill
                let x = gridConfig.startX + (gridConfig.cellSize / 2) + (c * gridConfig.cellSize);
                let y = gridConfig.startY + (gridConfig.cellSize / 2) + (r * gridConfig.cellSize);
                fill("pink");
                noStroke();
                rectMode(CENTER);
                square(x, y, pillConfig.pillSide);
            }
        }
    }
    pop();
}