// Source code for grids of 10x10
// Keep in mind 0 is empty space in the array that means the cell is empty and pacman can go there

// Configuration of grid object
let gridConfig = {
    totalRows: 10,
    totalCols: 10,
    cellSize: 0,
    startX: 0,
    startY: 0
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
            row.push(0);
        }
        gridMatrix.push(row);
    }
}


// Draw the grid outline
function drawGrid() {

    for (let r = 0; r < gridConfig.totalRows; r++) {
        for (let c = 0; c < gridConfig.totalCols; c++) {
            // Calculate x and y positon of each cell as they draw
            let x = gridConfig.startX + (c * gridConfig.cellSize);
            let y = gridConfig.startY + (r * gridConfig.cellSize);
            rect(x, y, gridConfig.cellSize, gridConfig.cellSize);
        }
    }
}