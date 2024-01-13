let position = 1990;
let scale = 1; // months / 50px

let timeline = document.getElementById("timeline");

main();

function main() {
  // display years in timeline based on position and scale
  let years = calculateYears(position, scale);
  console.log(years);
  renderYears(years);
}

function calculateYears(position, scale) {
  let windowWidth = window.innerWidth;

  let startYear = position - ~~(windowWidth / 2 / 50);
  let endYear = position + ~~(windowWidth / 2 / 50);

  let years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return years;
}

function renderYears(years) {
  timeline.innerHTML = "";
  years.forEach((year) => {
    let yearElement = document.createElement("div");
    yearElement.classList.add("year");
    yearElement.textContent = year;
    timeline.appendChild(yearElement);
  });
}

window.addEventListener("resize", () => {
  main();
});
