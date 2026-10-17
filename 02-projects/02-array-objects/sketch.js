// Array of Objects
// Dhyan Patel
// October 07, 2026
//
// Extra for Experts:
// - Created 2D grid matrix which generates randomly everytime by using map identifiers such as wallIdentifier and pillIdentifier.


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
