// Interactive Scene
// Dhyan Patel
// Sept 22, 2026
//
// Extra for Experts:
// - Used noise() function for terrain generation (specifically mountains)


// State Variables
let sceneState = "Night"; // Scene State Can be Change in Betweeen "Day" and "Night"

// Mountains
let noiseScale = 0.005; // Control How Smooth the Mountains Are
let mountainBase, noiseLevel;

// Sun and Moon
let sunRadius, sunX, sunY, maxSunY, minSunY, sunArcRatio, moonRadius, moonX, moonY;

//
let celestialBodyX = [];
let celestialBodyY = [];

// Helpin Variables
let horizonY; // Halfway of windowHeight
let distanceFromCenter; // Measure how far mouseX is From the Center of the screen (in abs)


async function setup() {
  createCanvas(windowWidth, windowHeight);

  horizonY = windowHeight/2;

  // Configure Mountains Base (slight below horizon) and noiseLevel (max height)
  mountainBase = horizonY - 20; 
  noiseLevel = windowHeight/4;

  // Set Sun Such That it Initially Sets it Slightly Above Horizon in 2nd Quadrant
  sunRadius = windowHeight/20; // Get 1/20th the Radius of the Total Height
  sunX = mouseX;
  maxSunY = sunRadius;
  minSunY = (horizonY) - (2*sunRadius);

  // Set moonX and moonY Such That it Sets in 1st Quadrant
  moonRadius = windowHeight/25; // Moon is Always Smaller Then Sun, Therefor 1/25th the Radius of the Total Height
  moonX = (windowWidth/2) + (windowWidth/4);
  moonY = (horizonY) - (windowHeight/4);

  // celestialBodyX = random(windowWidth);
  // celestialBodyY = random(windowHeight);
}

function draw() {
  drawSky();
  drawCelestialBody();
  drawMoonOrSun();
  drawMountains();
  drawFlashLight();

  // Draw Horizon Line for Reference (only while developing)
  stroke(255, 0, 0);
  line(0, horizonY, windowWidth, horizonY);
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

function drawCelestialBody() {
  if (sceneState === "Night") {
    noStroke();

    for (let x = 0; x <= windowWidth; x += 200) {
      for (let y = 0; y <= windowHeight; y += 200) {
        let celestialBodyRadius = random(3, 5);

        let celestialBodyX = random(windowWidth);
        let celestialBodyY = random(windowHeight);
        fill("White");
        circle(celestialBodyX, celestialBodyY, celestialBodyRadius);
      }
    }
  }
}

function drawMoonOrSun() {
  if (sceneState === "Day") {
    distanceFromCenter = abs(mouseX - (windowWidth/2));
    sunArcRatio = (distanceFromCenter / (windowWidth/2)); // Convert Distance From Center Into 0.0 to 1.0 Ratio to Calculate sunY Arc Height.
    sunY = (minSunY * sunArcRatio) + sunRadius; // Change sunY Based on distanceFromCenter and sunArcRatio

    stroke(0);
    fill("Yellow");
    circle(mouseX, sunY, sunRadius*2);
  }
  else if (sceneState === "Night") {
    noStroke();
    fill("White");
    circle(moonX, moonY, moonRadius*2);
  }
}

function drawMountains() {
  // Set Color for Mountains Base on the sceneState
  if (sceneState === "Day") {
    fill(80, 110, 90); // Green for Mountains
  }
  else if (sceneState === "Night") {
    fill(20, 40, 40); // Dark teal for Mountains
  }
  noStroke();
  
  // Start Drawing 2D Shapes
  beginShape();

  for (let x = 0; x <= windowWidth; x += 2){
    let noiseX1 = x * noiseScale;
    let y = horizonY - (noiseLevel * noise(noiseX1));
    vertex(x, y);
  }

  vertex(windowWidth, windowHeight);
  vertex(0, windowHeight);
  endShape(CLOSE);
}

function drawFlashLight() {
  if (sceneState === "Night") {
    fill("White");
    circle(mouseX, mouseY, 5);
  }
}
