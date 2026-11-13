// 2D Array
// Dhyan Patel
// October 07, 2026
//
// Extra for Experts:
// 
//
// Credits:
// - Credit for images: https://freepacman.org/

// For Ghosts use dijkstra's algorithm to figure out the path in the grid

// Character Assets Objects
// For all the assets keep this in mind: when you see numsFrame it is the base number of images in a spike sheet and when you see something added to numsFrame that refers to the specific image for example; numsFrameDeathNError in pacmanAssets refer to death and error image frames not the other images and the numsFrame in pacmanAssets refer to all other image that has been left.
// Eye Assets
let eyeAssets = {
  down: null,
  left: null,
  right: null,
  up: null,
  numsFrame: 2,
};

// Scared Assets
let scaredAssets = {
  blue: null,
  white: null,
  numsFrame: 2,
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
  numsFrameDeathNError: 11,
  numsFrame: 4,
};

// Ghosts
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
  numsFrame: 2,
};


// Preload Image
async function preLoadImage() {
  eyeAssets.down = await loadImage("assets/characters/ghosts/eyes_down.png");
  eyeAssets.left = await loadImage("assets/characters/ghosts/eyes_left.png");
  eyeAssets.right = await loadImage("assets/characters/ghosts/eyes_right.png");
  eyeAssets.up = await loadImage("assets/characters/ghosts/eyes_up.png");

  scaredAssets.blue = await loadImage("assets/characters/ghosts/scared_blue.png");
  scaredAssets.white = await loadImage("assets/characters/ghosts/scared_white.png");

  // Character
  pacmanAssets.arrowDown = await loadImage("assets/characters/pac-man/arrow_down.png");
  pacmanAssets.arrowLeft = await loadImage("assets/characters/pac-man/arrow_left.png");
  pacmanAssets.arrowRight = await loadImage("assets/characters/pac-man/arrow_right.png");
  pacmanAssets.arrowUp = await loadImage("assets/characters/pac-man/arrow_up.png");
  pacmanAssets.death = await loadImage("assets/characters/pac-man/pacman_death.png");
  pacmanAssets.down = await loadImage("assets/characters/pac-man/pacman_down.png");
  pacmanAssets.error = await loadImage("assets/characters/pac-man/pacman_error.png");
  pacmanAssets.left = await loadImage("assets/characters/pac-man/pacman_left.png");
  pacmanAssets.right = await loadImage("assets/characters/pac-man/pacman_right.png");
  pacmanAssets.up = await loadImage("assets/characters/pac-man/pacman_up.png");

  // Ghosts
  // Blinky
  blinkyAssets.downAngry = await loadImage("assets/characters/ghosts/blinky/blinky_down_angry.png");
  blinkyAssets.downAnnoyed = await loadImage("assets/characters/ghosts/blinky/blinky_down_annoyed.png");
  blinkyAssets.down = await loadImage("assets/characters/ghosts/blinky/blinky_down.png");
  blinkyAssets.leftAngry = await loadImage("assets/characters/ghosts/blinky/blinky_left_angry.png");
  blinkyAssets.leftAnnoyed = await loadImage("assets/characters/ghosts/blinky/blinky_left_annoyed.png");
  blinkyAssets.left = await loadImage("assets/characters/ghosts/blinky/blinky_left.png");
  blinkyAssets.rightAngry = await loadImage("assets/characters/ghosts/blinky/blinky_right_angry.png");
  blinkyAssets.rightAnnoyed = await loadImage("assets/characters/ghosts/blinky/blinky_right_annoyed.png");
  blinkyAssets.right = await loadImage("assets/characters/ghosts/blinky/blinky_right.png");
  blinkyAssets.upAngry = await loadImage("assets/characters/ghosts/blinky/blinky_up_angry.png");
  blinkyAssets.upAnnoyed = await loadImage("assets/characters/ghosts/blinky/blinky_up_annoyed.png");
  blinkyAssets.up = await loadImage("assets/characters/ghosts/blinky/blinky_up.png");
}


async function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Build the grid from src/grid.js and load images from preLoadImage function
  setupGrid();
  await preLoadImage();

  // Do animation
  window.setInterval(changeBlinkyFrame, 300);
  window.setInterval(changePacmanFrame, 150);
}


function draw() {
  background("black");

  // Render grid and pills from src/grid.js
  drawMaze();
  renderPills();

  // Render Character
  // Draw Pac-man
  drawPacman();

  // Render Ghosts
  // Draw Blinky Ghost
  drawBlinkyGhost();
}
