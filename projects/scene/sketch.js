// Interactive Scene
// Dhyan Patel
// Sept 22, 2026
//
// Extra for Experts:
// - Used noise() function for terrain generation (specifically mountains)


// Weather Variables
let weatherState = "Clear"; // Can be "Clear", "Rain", or "Snow"
let weatherX = [];
let weatherY = [];
let totalParticles = 150; 
let particalSpeed = 5; // Fall Speed Can be Controled by mouseWheel (later)

// Scene
let sceneState = "Day"; // Scene State Can be Change in Betweeen "Day" and "Night"

// Mountains
let noiseScale = 0.005; // Control How Smooth the Mountains Are
let mountainBase, noiseLevel;

// Sun and Moon
let sunRadius, sunX, sunY, maxSunY, minSunY, sunArcRatio, moonRadius, moonX, moonY;

// Celestial Bodys in Sky
let celestialBodyX = [];
let celestialBodyY = [];
let totalStars = 100;

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

  // Generate Star Array Cordinates
  generateStarCods();
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

function generateStarCods() {
  for (let i = 0; i < totalStars; i++) {
    celestialBodyX.push(random(0, windowWidth));
    celestialBodyY.push(random(0, horizonY));
  }
}

function drawSky() {
  noStroke();
  
  if (sceneState === "Day") {
    fill(135, 206, 235); // Sky Blue Color for Day
  }
  else {
    fill(15, 20, 45); // Dark Navy Color for Night
  }
  rect(0, 0, windowWidth, horizonY); // Draw Sky Above Horizon Only
}

function drawCelestialBody() {
  if (sceneState === "Night") {
    fill(255, 255, 255, 200); // Soft White For Stars
    noStroke();
    
    // Use Array to Render Each Star
    for (let i = 0; i < celestialBodyX.length; i++) {
      circle(celestialBodyX[i], celestialBodyY[i], random(1.5, 3));
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
  else {
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
  else {
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
    noStroke();
    
    // Inner Core of FlashLight
    fill(255, 255, 255, 220);
    circle(mouseX, mouseY, 15);
    
    // 2nd Core of FlashLight
    fill(255, 255, 220,70);
    circle(mouseX, mouseY, 60);
    
    // Outer Core of FlashLight
    fill(255, 255, 200, 30);
    circle(mouseX, mouseY, 120);
  }
}
