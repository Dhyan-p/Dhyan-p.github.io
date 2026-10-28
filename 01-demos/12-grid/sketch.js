// 2D Grid Demo

// For Hardcoding
// let grid = [[1, 0, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 0, 1]];
// let cellSize;
// const  SQUARE_DIMENSIONS = grid.length;

const SQUARE_DIENSIONS = 10;
let grid;
let cellSize;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = Math.min(width, height) / SQUARE_DIENSIONS;

  grid = randomizedGrid(SQUARE_DIENSIONS, SQUARE_DIENSIONS);
}

function draw() {
  background(220);
  showGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
}

function showGrid() {
  for (let r = 0; r < SQUARE_DIENSIONS; r++) {
    for (let c = 0; c < SQUARE_DIENSIONS; c++) {
      if (grid[r][c] === 0) {
        fill("white");
      }
      else if (grid[r][c] === 1) {
        fill("black");
      }
      square(r * cellSize, c * cellSize, cellSize);
    }
  }
}

function randomizedGrid(cols, rows) {
  let newGrid = [];

  for (let r = 0; r < rows; r++) {
    newGrid.push([]);
    for (let c = 0; c < cols; c++) {
      if (random(100) < 50) {
        newGrid[r].push(0);
      }
      else {
        newGrid[r].push(1);
      }
    }
  }
  return newGrid;
}