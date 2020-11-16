import * as simon from "../lib/index.js";

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function colorOrder(orderedColors, n) {
  return [orderedColors.get(n), n];
}

function sequencedColors(orderedColors, sequence) {
  let colors = [];
  for (const order of sequence) {
    colors.push(orderedColors.get(order));
  }
  return colors;
}

// https://stackoverflow.com/a/10050831
const order = shuffle([...Array(4).keys()]);
const orderedColors = new Map([
  [order[0], simon.Color.red],
  [order[1], simon.Color.green],
  [order[2], simon.Color.blue],
  [order[3], simon.Color.yellow],
]);

export function orderMap() {
  return new Map([
    colorOrder(orderedColors, order[0]),
    colorOrder(orderedColors, order[1]),
    colorOrder(orderedColors, order[2]),
    colorOrder(orderedColors, order[3]),
  ]);
}

export function firstTrialSequence() {
  return sequencedColors(orderedColors, [0, 2, 2]);
}

export function secondTrialSequence() {
  return sequencedColors(orderedColors, [1, 3, 1]);
}
