// Array of Objects
// Dhyan Patel
// October 07, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


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
