// Bubble Moving Around the Screen
// Learning Classes with ES6 from: https://youtu.be/T-HGdc8L-7w?si=1TEhfFD3l5HX__j8
// Learning Classes constructor() with arguments from: https://youtu.be/rHiSsgFRgx4?si=20xhRlhozEFzbxnn
// Learning Array of Objects from: https://youtu.be/fBqaA7zRO58?si=T-nF0GwlDraxOdbP

let bubble = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    let x = random(windowWidth);
    let y = random(windowHeight);
    let r = random(10, 20);
    bubble[i] = new Bubble(x, y, r); 
  }  
}

function draw() {
  background(0);
  for (let i = 0; i < bubble.length; i++) {
    bubble[i].move();
    bubble[i].show();
  }
}

// Moved Code to bubble.js to keep things organize

// Class is like a template so that you can use to make many objects. In this case we made 2 bubbles.
// class Bubble {
//   // Add arguments/parameters to make it more flexible
//   constructor(tempBubbleX, tempBubbleY, tempBubbleR) {
//     this.x = tempBubbleX;
//     this.y = tempBubbleY;
//     this.r = tempBubbleR;
//   }

//   // Set function so that bubble can move. NO NEED TO WRITE 'function' ANY MORE INSIDE A CLASS.
//   move() {
//     // Use this.x and this.y inside a class
//     this.x = this.x + random(-5, 5);
//     this.y = this.y + random(-5, 5);
//   }

//   show() {
//     stroke(255);
//     strokeWeight(4);
//     noFill();
//     ellipse(this.x, this.y, 2*this.r);
//   }
// }