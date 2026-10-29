// 2D Array
// Dhyan Patel
// October 07, 2026
//
// Extra for Experts:
// 
//
// Credits:
// - Credit for images: https://freepacman.org/

// Character Assets Objects
// Eye Assets
let eyeAssets = {
  down: null,
  left: null,
  right: null,
  up: null,
};

// Scared Assets
let scaredAssets = {
  blue: null,
  white: null,
};

// Pac-Man Assets
let pacmanAssets = {
  arrowDown: null,
  arrowLeft: null,
  arrowRight: null,
  arrowUp: null,
  death: null,
  down: null,
  error: null,
  left: null,
  right: null,
  up: null,
};

// Blinky Assets
let blinkyAssets = {
  downAngry: null,
  downAnnoyed: null,
  down: null,
  leftAngry: null,
  leftAnnoyed: null,
  left: null,
  rightAngry: null,
  rightAnnoyed: null,
  right: null,
  upAngry: null,
  upAnnoyed: null,
  up: null,
};


async function setup() {
  createCanvas(windowWidth, windowHeight);

  // Build the grid from src/grid.js
  setupGrid();
}


function draw() {
  background("black");

  // Render grid and pills from src/grid.js
  drawMaze();
  renderPills();
}
