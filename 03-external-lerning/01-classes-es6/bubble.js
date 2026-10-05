// Learning adding JavaScript file to keep things organize from: https://youtu.be/5nf41qLeagU?si=FzMmp8S7JcW_1tmP



// Class is like a template so that you can use to make many objects. In this case we made 2 bubbles.
class Bubble {
  // Add arguments/parameters to make it more flexible
  constructor(tempBubbleX, tempBubbleY, tempBubbleR) {
    this.x = tempBubbleX;
    this.y = tempBubbleY;
    this.r = tempBubbleR;
  }

  // Set function so that bubble can move. NO NEED TO WRITE 'function' ANY MORE INSIDE A CLASS.
  move() {
    // Use this.x and this.y inside a class
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 2*this.r);
  }
}