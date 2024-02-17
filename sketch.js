function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30);

  noFill();
  stroke(200);
  circle(mouseX, mouseY, 20);

  // horizontal line
  line(0, height / 2, width, height / 2);

  // vertical line
  line(mouseX, height / 2, mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, true);
}
