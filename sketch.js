let position = Date.now();
let zoom = 150; // px/day
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

  noStroke();
  fill(200);
  text(~~frameRate(), 10, 10);
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
  let date = new Date(position);
  date = getStartOf.date(date);

  let _zoom = zoom;
  while (_zoom < 100) {
    _zoom *= 2;
  }

  let t = date.getTime();
  let dt = position - t;
  let dx = map(dt, 0, oneDay, 0, _zoom);

  let c = width / 2 - dx;

  stroke(200);
  fill(200);
  for (let x = c; x > 0; x -= _zoom) {
    line(x, height / 2 - 5, x, height / 2 + 5);
    let d = new Date(position - (oneDay * (c - x)) / _zoom);
    text(d.toLocaleDateString(), x, height / 2 + 15);
  }
  for (let x = c + _zoom; x < width; x += _zoom) {
    line(x, height / 2 - 5, x, height / 2 + 5);
    let d = new Date(position + (oneDay * (x - c)) / _zoom);
    text(d.toLocaleDateString(), x, height / 2 + 15);
  }
}

function cloneDate(date) {
  return new Date(date.getTime());
}

const getStartOf = {
  date: (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  },
  week: (date) => {
    date.setDate(date.getDate() - (date.getDay() == 0 ? 6 : date.getDay()));
    return getStartOf.date(date);
  },
  month: (date) => {
    date.setDate(1);
    return getStartOf.date(date);
  },
  year: (date) => {
    date.setDate(1);
    date.setMonth(0);
    return getStartOf.date(date);
  },
};
