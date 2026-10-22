// Loading Images and Sound fx

let coinImg; 
let coingSound;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  coinImg = await loadImage("coin.png");
  coingSound = await loadSound("coin.wav");
}

function draw() {
  background("black");

  image(coinImg, width/2, height/2);
}

function mousePressed() {
  coingSound.play();
}