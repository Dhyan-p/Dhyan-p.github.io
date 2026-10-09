// Source code for grids of 20x20

// 0 in the array means the cell is empty and pacman can go there
let emptySpaceIdentifier = 0;
// 1 in array means there is pill in that perticular cell and pacman can eat it to increase the score
let pillIdentifier = 1;
// 2 in array means there is a wall and pacman can't move if facing the wall
let wallIdentifier = 2;

// Configuration of grid object
let gridConfig = {
    totalRows: 20,
    totalCols: 20,
    cellSize: 0,
    startX: 0,
    startY: 0
};

// Configuration of pills
let pillConfig = {
    pillSide: 5
};

// Main grid array
let gridMatrix = [];


// Setup the grid
function setupGrid() {
    // Use 85% of the total height
    let totalGridSize = height * 0.85;

    // Calculate size of each cell
    gridConfig.cellSize = totalGridSize / gridConfig.totalCols;

    // Calculate starting X and Y so that the entire grid center to the screen
    gridConfig.startX = (width - totalGridSize) / 2;
    gridConfig.startY = (height - totalGridSize) / 2;

    // Put the grid in the array
    for (let r = 0; r < gridConfig.totalRows; r++) {
        let row = [];
        for (let c = 0; c < gridConfig.totalCols; c++) {
            if (r === 0 || r === gridConfig.totalRows - 1 || c === 0 || c === gridConfig.totalCols - 1) {
                row.push(wallIdentifier);
            }
            else {
                row.push(pillIdentifier);
            }
        }
        gridMatrix.push(row);
    }

    // Generate Maze
    generateMaze();
}


// Draw the grid outline
function drawGrid() {
    push();

    // Draw 2 main outer boarder of the box 
    stroke("blue");
    noFill();

    // 1st border of the box. Outer most
    let spaceBetweenRect = 10;
    let outerRectSide = 2*spaceBetweenRect + gridConfig.totalRows * gridConfig.cellSize;
    let outerRectX = gridConfig.startX - spaceBetweenRect;
    let outerRectY = gridConfig.startY - spaceBetweenRect;
    square(outerRectX, outerRectY, outerRectSide);

    // 2nd border of the box
    let innerRectSide = outerRectSide - 2*spaceBetweenRect;
    square(gridConfig.startX, gridConfig.startY, innerRectSide);
    pop();
}


// Generate Maze
function generateMaze () {
    // Set 25% chance of having a wall
    let wallChancePercent = 25;

    // Skip 2 rows and coloms to create a coridore around the border
    for (let r = 2; r < gridConfig.totalRows - 2; r++) {
        for (let c = 2; c < gridConfig.totalCols - 2; c++) {
            if (random(100) < wallChancePercent) {
                // Create maze for left half and also calculate the mirrored position of the same wall for the right half and set it to wallIdentifier
                gridMatrix[r][c] = wallIdentifier;
                let mirroredCols = gridConfig.totalCols - 1 - c;
                gridMatrix[r][mirroredCols] = wallIdentifier;
            }
        }
    }
}


// Draw Maze
// function drawMaze() {
//     push();
//     // Draw Maze boarder
//     for (let r = 0; r < gridConfig.totalRows; r++) {
//         for (let c = 0; c < gridConfig.totalCols; c++) {
//             if (gridMatrix[r][c] === wallIdentifier) {
//                 let wallSize = 5;
//                 let x = gridConfig.startX + (gridConfig.cellSize / 2) + (c * gridConfig.cellSize);
//                 let y = gridConfig.startY + (gridConfig.cellSize / 2) + (r * gridConfig.cellSize);
//                 noStroke();
//                 fill("blue");
//                 rectMode(CENTER);
//                 square(x, y, wallSize);
//             }
//         }
//     }
//     pop();
// }


// Put pill if applicable
function renderPills() {
    push();
    for (let r = 0; r < gridConfig.totalRows; r++) {
        for (let c = 0; c < gridConfig.totalCols; c++) {
            // Check if
            if (gridMatrix[r][c] === pillIdentifier) {
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