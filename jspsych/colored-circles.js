import * as simon from "../../lib/index.js";
import * as jsPsychUtility from "../utility.js";

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
const order = jsPsychUtility.shuffle([...Array(4).keys()]);
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
