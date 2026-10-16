// Source code for grid of 21x19 and is rendomly generated every time

// Map State Identifiers
let emptySpaceIdentifier = 0; // Walkable empty space 
let pillIdentifier = 1; // Eatable pills
let wallIdentifier = 2; // Solid wall

// Configuration of grid object
let gridConfig = {
  totalRows: 21,
  totalCols: 19,
  cellSize: 0,
  startX: 0,
  startY: 0
};

// Main grid matrix
let gridMatrix = [];