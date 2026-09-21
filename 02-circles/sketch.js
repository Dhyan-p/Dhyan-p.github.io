

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  // background(220);
  drawRandomCircles();
}

function drawRandomCircles() {
  fill(random(0, 255), random(0, 255), random(0, 255));
  circle(random(0, width), random(0, height), random(30, 100));
}