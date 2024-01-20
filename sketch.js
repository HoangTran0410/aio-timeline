let position = Date.now();
let zoom = 150; // 1px = 1 day
let velocity = 0;

const oneDay = 1000 * 60 * 60 * 24;
const oneWeek = oneDay * 7;
const oneMonth = oneDay * 30;
const oneYear = oneDay * 365;
const tenYears = oneYear * 10;
const hundredYears = oneYear * 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(30);

  stroke(200);
  line(0, height / 2, width, height / 2);

  drawTimeline();

  position += (velocity / zoom) * oneDay;
  velocity *= 0.9;
}

function mouseDragged() {
  let dx = pmouseX - mouseX;

  position += (dx / zoom) * oneDay;
}

function mouseReleased() {
  velocity = pmouseX - mouseX;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, true);
}

function mouseWheel(event) {
  zoom *= event.delta > 0 ? 0.9 : 1.1;
}

function drawTimeline() {
  let startOfCurrentDate = new Date(position);
  startOfCurrentDate.setHours(0);
  startOfCurrentDate.setMinutes(0);
  startOfCurrentDate.setMilliseconds(0);

  let _zoom = zoom;
  while (_zoom < 30) {
    _zoom *= 2;
  }

  let pos = startOfCurrentDate.getTime();
  let deltaTime = position - pos;
  let deltaX = map(deltaTime, 0, oneDay, 0, _zoom);

  // for (let d of [oneDay, oneWeek, oneMonth, oneYear, tenYears, hundredYears]) {
  //   deltaX = map(deltaTime, 0, d, 0, zoom);
  //   console.log(deltaX);
  //   if (deltaX > 30) {
  //     break;
  //   }
  // }

  let c = width / 2 - deltaX;

  stroke(200);
  line(c, height / 2 - 5, c, height / 2 + 5);

  for (let x = c; x > 0; x -= _zoom) {
    line(x, height / 2 - 5, x, height / 2 + 5);
  }
  for (let x = c + _zoom; x < width; x += _zoom) {
    line(x, height / 2 - 5, x, height / 2 + 5);
  }

  noStroke();
  fill(200);

  for (let x = c; x > -400; x -= _zoom) {
    let date = new Date(pos + (c - x) * oneDay);
    text(date.toLocaleDateString(), x, height / 2 + 10);
  }
  for (let x = c + _zoom; x < 400 + width; x += _zoom) {
    let date = new Date(pos + (x - c) * oneDay);
    text(date.toLocaleDateString(), x, height / 2 + 10);
  }
}
