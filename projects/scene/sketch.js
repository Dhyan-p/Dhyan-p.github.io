// Interactive Scene
// Dhyan Patel
// Sept 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// State Variables
let sceneState = "Night"; // Scene State Can be Change in Betweeen "Day" and "Night"
let sunRadius, sunX, sunY, moonRadius, moonX, moonY;

// Images
let landscape1day;


async function setup() {
  createCanvas(windowWidth, windowHeight);

  // LoadImage From Assets Folder
  landscape1day = await loadImage('/assets/images/landscape1-day.png');
  image(landscape1day, 0, 0);

  // Set sunX and sunY Such That it Sets it Slightly Above Horizon in 2nd Quadrant
  sunRadius = (windowHeight/20); // Get 1/20th the Radius of the Total Height
  sunX = sunRadius;
  sunY = ((windowHeight/2) + (sunRadius + 5));

  // Set moonX and moonY Such That it Sets in 1st Quadrant
  moonRadius = (windowHeight/25); // Moon is Always Smaller Then Sun, Therefor 1/25th the Radius of the Total Height
  moonX = (windowWidth/2) + (windowWidth/4);
  moonY = (windowHeight/2) - (windowHeight/4);
}

function draw() {
  // background(220);

  drawSky();
  drawMoonOrSun();
  // drawLandscape();
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
    fill("Yellow");
    circle(sunX, sunY, sunRadius*2);
  }
  else if (sceneState === "Night") {
    fill("white");
    circle(moonX, moonY, moonRadius*2);
  }
}

// function drawLandscape() {

// }