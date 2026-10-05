// Object Notation and Arrays Demo
// Bouncing Circles

let theCircles = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);

  for (let theCircle of theCircles) {
    // Move circle
    theCircle.x += theCircle.dx;
    theCircle.y += theCircle.dy;
  
    // Bounce off edges
    if (theCircle.x <= 0 + theCircle.radius || theCircle.x >= width - theCircle.radius) {
      theCircle.dx *= -1;
    }
    if (theCircle.y <= 0 + theCircle.radius || theCircle.y >= height - theCircle.radius) {
      theCircle.dy *= -1;
    }
  
    // Display circle
    fill(theCircle.r, theCircle.g, theCircle.b);
    circle(theCircle.x, theCircle.y, 2*theCircle.radius);
  }

}

function mousePressed() {
  spawnCircles();
}

function spawnCircles() {
  let someCircle = {
    x: mouseX,
    y: mouseY,
    dx: 30000,
    dy: 30000,
    radius: random(10, 50),
    r: random(255),
    g: random(255),
    b: random(255),
  };
  theCircles.push(someCircle);
}