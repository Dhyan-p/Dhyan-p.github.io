// Collision Demo

let hit = false;
let converseLogo;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  converseLogo = await loadImage('logo.png');
  imageMode(CENTER);
}

function draw() {
  background("white");

  hit = collideRectCircle(300, 400, 200, 150, mouseX, mouseY, 100, 100);

  if (hit) {
    fill("red");
  }
  else {
    fill("black");
  }

  // Comment out this image to see the simpler version and uncomment the circle
  image(converseLogo, mouseX, mouseY, 100, 100);
  rect(300, 400, 200, 150);
  // circle(mouseX, mouseY, 100);
}
