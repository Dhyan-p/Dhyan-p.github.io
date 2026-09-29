// ========================================================
// Interactive Scene
// Dhyan Patel
// Sept 22, 2026
//
// Extra for Experts:
// - Used noise() function for terrain generation (specifically mountains)
// - Used mouseWheel(event) to increase/decrease particle speed (rain/snow) with constrain to set minimum and maximum for particle so everything runs smoothly
// ========================================================


// ========================================================
// Weather Variables
let weatherState = "Clear"; // Can be "Clear", "Rain", or "Snow"
let weatherX = [];
let weatherY = [];
let totalParticles = 150; 
let particalSpeed = 5; // Fall Speed Can be Controled by mouseWheel

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
let showControls = true; // Toggles Control Instructions Menu

// drawUI Variables
let margin, panelWidth, panelHeight, panelX, panelY, startY, rowHeight, rowGap, leftWidth, rightWidth, currentY, leftX, rightX;
// ========================================================


// ========================================================
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

  // Generate Cordinates in Array
  generateStarCods();
  generateWeatherCods();
}
// ========================================================


// ========================================================
function generateStarCods() {
  for (let i = 0; i < totalStars; i++) {
    celestialBodyX.push(random(0, windowWidth));
    celestialBodyY.push(random(0, horizonY));
  }
}

function generateWeatherCods() {
  for (let i = 0; i < totalParticles; i++) {
    weatherX.push(random(0, windowWidth));
    weatherY.push(random(0, windowHeight));
  }
}
// ========================================================


// ========================================================
function draw() {
  drawSky();
  drawCelestialBody();
  drawMoonOrSun();
  drawMountains();
  weather();
  drawUI();
  changeKeyBindIfAsked();

  drawFlashLight();

  // Draw Horizon Line and Vertically Split Screen for Reference (only while developing)
  stroke(255, 0, 0);
  line(0, horizonY, windowWidth, horizonY);
  line(windowWidth/2, 0, windowWidth/2, windowHeight);
}
// ========================================================


// ========================================================
function mouseWheel(event) {
  let minParticleSpeed = 5;
  let maxParticleSpeed = 20;

  // Increase/Decrease Speed
  if (event.delta > 0) {
    particalSpeed += 0.5;
  }
  else {
    particalSpeed -= 0.5;
  }

  // Keep Within minParticleSpeed and maxParticleSpeed
  particalSpeed = constrain(particalSpeed, minParticleSpeed, maxParticleSpeed);
}

function keyPressed() {
  if (keyCode === 68) { // Key 'd'
    sceneState = "Day";
  }
  if (keyCode === 78) { // Key 'n'
    sceneState = "Night";
  }
  if (keyCode === 67) {// Key 'c'
    weatherState = "Clear";
  }
  if (keyCode === 82) {// Key 'r'
    weatherState = "Rain";
  }
  if (keyCode === 83) {// Key 's'
    weatherState = "Snow";
  }
  if (keyCode === 27) {// Key 'ESCAPE'
    showControls = !showControls;
  }
}

function mousePressed() {
  // Check if showControls Then Check if the Mouse is within Right Partition: Key Bind Box
  if (showControls) {
    // Debug
    console.log(mouseX, mouseY);
    console.log(rightX, startY);
    console.log(rightX + rightWidth, startY+rowHeight);

    if (mouseX > rightX && mouseX < rightX + rightWidth) {
      if (mouseY > startY && mouseY < startY + rowHeight) {
        console.log("D");
      }
      if (mouseY > startY + rowHeight + rowGap && mouseY < startY + 2*rowHeight + rowGap) {
        console.log("N");
      }
    }
  }
}
// ========================================================


// ========================================================
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
    let noiseX = x * noiseScale;
    let y = horizonY - (noiseLevel * noise(noiseX));
    vertex(x, y);
  }
  
  vertex(windowWidth, windowHeight);
  vertex(0, windowHeight);
  endShape(CLOSE);
}

function weather() {
  if (weatherState === "Clear") {
    return; // Do Nothing
  }

  // Move Particle Down. If Particle is Below windownHeight, Reset it Back
  for (let i = 0; i < weatherX.length; i++) {
    weatherY[i] += particalSpeed;

    if (weatherY[i] > windowHeight) {
      weatherY[i] = 0;
    }

    // Render Rain and Snow
    // 65, 105, 225
    if (weatherState === "Rain") {
      if (sceneState === "Day") {
        stroke(65, 105, 225, 200); // Vibrant Water Blue
      }
      else {
        stroke(180, 210, 255, 200); // Light Blue
      }
      strokeWeight(1);
      line(weatherX[i], weatherY[i], weatherX[i], weatherY[i] + 10);
    }
    else if (weatherState === "Snow") {
      noStroke();
      fill(255, 255, 255, 220); // Soft White Snowflake
      circle(weatherX[i], weatherY[i], random(3, 5));
    }
  }
}

function drawUI() {
  push();
  noStroke();

  margin = 15;

  if (showControls) {
    // Full Screen Dark Overlay
    fill(10, 10, 15, 220);
    rect(0, 0, windowWidth, windowHeight);
 
    // Centered Container Panel Layout
    panelWidth = min(520, windowWidth - 40);
    panelHeight = 380;
    panelX = (windowWidth - panelWidth)/2;
    panelY = (windowHeight - panelHeight)/2;

    // Container Background
    fill(25, 28, 34);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    // Header Title Bar
    fill(35, 40, 48);
    rect(panelX, panelY, panelWidth, 45, 10, 10, 0, 0);

    fill(255);
    textSize(15);
    textAlign(CENTER, CENTER);
    text("CONTROLS & SHORTCUTS", windowWidth/2, panelY + 22);

    // Control Item Data
    let controlsData = [ 
      { label: "Day Mode", key: "D" }, 
      { label: "Night Mode", key: "N" },
      { label: "Rain Weather", key: "R" }, 
      { label: "Snow Weather", key: "S" }, 
      { label: "Clear Weather", key: "C" }, 
      { label: "Adjust Fall Speed", key: "Mouse Wheel" }
    ];

    startY = panelY + 58;
    rowHeight = 32;
    rowGap = 7;
    leftWidth = panelWidth * 0.62 - 15; // Width for Action Description
    rightWidth = panelWidth * 0.38 - 15; // Width for Key Bind Box

    // Loop ThroughControls to Render Rows
    for (let i = 0; i < controlsData.length; i++) {
      currentY = startY + i * (rowHeight + rowGap);
      leftX = panelX + 12;
      rightX = leftX + leftWidth + 10;

      // Left Partition: Action Description Box
      fill(42, 46, 54);
      rect(leftX, currentY, leftWidth, rowHeight, 4);

      fill(220);
      textSize(12);
      textAlign(LEFT, CENTER);
      text(controlsData[i].label, leftX + 12, currentY + rowHeight/2);

      // Right Partition: Key Bind Box
      fill(45, 85, 135);
      rect(rightX, currentY, rightWidth, rowHeight, 4);

      fill(220);
      textAlign(CENTER, CENTER);
      text(controlsData[i].key, rightX + rightWidth/2, currentY + rowHeight/2);
    }

    fill(200, 220, 255);
    textSize(11);
    textAlign(CENTER, CENTER);
    text("[ESC] Close Menu", windowWidth/2, panelY + panelHeight - 16);
  }
  else {
    // Small Bottom-Left Hint Box When Menu is Closed
    let boxWidth = 135;
    let boxHeight = 30;
    let boxX = margin;
    let boxY = windowHeight - boxHeight - margin;

    // Small Hint Box
    fill(0, 0, 0, 160);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    // Box Text Content
    fill(255);
    textSize(11);
    textAlign(LEFT, CENTER);
    text("Press ESC for Controls", boxX + 10, boxY + (boxHeight/2));
  }
  pop();
}

function changeKeyBindIfAsked() {

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
// ========================================================