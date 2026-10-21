// Randomized Art

let theTiles = [];
const THE_SIZE = 25;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let x = 0; x < windowWidth; x += THE_SIZE) {
    for (let y = 0; y < windowHeight; y += THE_SIZE) {
      let someTile = spawnTile(x, y, THE_SIZE);
      theTiles.push(someTile);
    }
  }
}

function draw() {
  background(220);
  for (let theTile of theTiles) {
    line(theTile.x1, theTile.y1, theTile.x2, theTile.y2);
  }
}

function spawnTile(x, y, tileSize) {
  let choice = random(100);
  let tile;
  if (choice < 50) {
    // Positive slope
    tile = {
      x1: x + tileSize/2,
      y1: y - tileSize/2,
      x2: x - tileSize/2,
      y2: y + tileSize/2,
    };
  }
  else {
    // Negative slope
    tile = {
      x1: x - tileSize/2,
      y1: y - tileSize/2,
      x2: x + tileSize/2,
      y2: y + tileSize/2,
    };
  }
  return tile;
}