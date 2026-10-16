// Array of Objects
// Dhyan Patel
// October 07, 2026
//
// Extra for Experts:
// - Created fixed 2D array grid to render pills and to keep track of where pills, walls and empty space should be alongside with where the sqawn point of the characters Pac-Man and Ghosts
//
// Credits:
// - Credit for images: https://freepacman.org/


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
