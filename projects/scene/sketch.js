// Interactive Scene
// Dhyan Patel
// Sept 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// State Variables
let sceneState = "Day"; // Scene State Can be Change in Betweeen "Day" and "Night"
let sunRadius, sunX, sunY, maxSunY, minSunY, sunArcRatio, moonRadius, moonX, moonY;
let horizonY; // Halfway of windowHeight
let distanceFromCenter; // Measure how far mouseX is From the Center of the screen (in abs)


async function setup() {
  createCanvas(windowWidth, windowHeight);

  horizonY = windowHeight/2;

  // Set Sun Such That it Initially Sets it Slightly Above Horizon in 2nd Quadrant
  sunRadius = (windowHeight/20); // Get 1/20th the Radius of the Total Height
  sunX = mouseX;
  maxSunY = sunRadius;
  minSunY = ((horizonY) - (sunRadius + 5));

  // Set moonX and moonY Such That it Sets in 1st Quadrant
  moonRadius = (windowHeight/25); // Moon is Always Smaller Then Sun, Therefor 1/25th the Radius of the Total Height
  moonX = (windowWidth/2) + (windowWidth/4);
  moonY = (horizonY) - (windowHeight/4);
}

function draw() {
  drawSky();
  drawMoonOrSun();
}

function keyPressed() {
  if (keyCode === 68) { // Key 'd'
    sceneState = "Day";
  }
  if (keyCode === 78) { // Key 'n'
    sceneState = "Night";
  }
}

function drawSky() {
  if (sceneState === "Day") {
    background(135, 206, 235); // Sky Blue Color for Day
  }
  else if (sceneState === "Night") {
    background(15, 20, 45); // Dark Navy Color for Night
  }
}

function drawMoonOrSun() {
  if (sceneState === "Day") {
    distanceFromCenter = abs(mouseX - (windowWidth/2));
    sunArcRatio = (distanceFromCenter / (windowWidth/2)); // Convert Distance From Center Into 0.0 to 1.0 Ratio to Calculate sunY Arc Height.
    sunY = (minSunY * sunArcRatio) + sunRadius; // Change sunY Based on distanceFromCenter and sunArcRatio

    fill("Yellow");
    circle(mouseX, sunY, sunRadius*2);
  }
  else if (sceneState === "Night") {
    fill("White");
    circle(moonX, moonY, moonRadius*2);
  }
}