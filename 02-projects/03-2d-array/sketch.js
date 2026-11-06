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
}


function draw() {
  background("black");

  // Render grid and pills from src/grid.js
  drawMaze();
  renderPills();
}
