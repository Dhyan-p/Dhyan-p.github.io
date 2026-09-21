function setup() {
  //make the largest square you can...
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
}

function draw() {
  background(220);
  drawChessboard();
}

// function drawChessboard() {
//   for (let x = 0; x < width; x += width/8) {
//     for (let y = 0; y < height; y += height/8) {
//       rect(y, x, width/8, height/8);
//     }
//   }
// }

function drawChessboard() {
  let size = width/8;
  let isWhite = true;
  
  for (let x=0; x<8; x++) {
    for (let y=0; y<8; y++) {
      if (isWhite) {
        fill("White");
      }
      else {
        fill("black");
      }
      square(x*size, y*size, size);
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
}