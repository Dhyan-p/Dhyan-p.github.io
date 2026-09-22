// Square Moving Around Edge of Screen

let x = 0; //x-position of square
let y = 0; //y-position of square
let size = 60; //Size of the Square (length of each side)
let velocityofSquare = 10; //Velocity (speed) of the Square
let state = "right"; //State which direction is going

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveSquare();
  displaySquare();
}

function displaySquare() {
  fill("black");
  square(x, y, size);
}

function moveSquare() {
  if (state === 'right') {
    x += velocityofSquare;
    if (x >= windowWidth - size) {
      state = "down";
    }
  }

  else if (state === 'down') {
    y += velocityofSquare;
    if (y >= windowHeight - size) {
      state = "left";
    }
  }
  
  else if (state === 'left') {
    x -= velocityofSquare;
    if (x <= 0) {
      state = "up";
    }
  }

  else if (state === 'up') {
    y -= velocityofSquare;
    if (y <= 0) {
      state = "right";
    }
  }
}
