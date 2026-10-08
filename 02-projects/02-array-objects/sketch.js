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
  background(220);

  // Render grid from src/grid.js
  drawGrid();
}
