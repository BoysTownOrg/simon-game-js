import * as simon from "../lib/index.js";

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    const temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function colorOrder(orderedColors, n) {
  return [orderedColors.get(n), n];
}

function sequencedColors(orderedColors, sequence) {
  const colors = [];
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

export const instruction11 =
  "You will see patterns of black squares shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place where you saw it.";
export const instruction12 =
  'When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.';
export const instruction13 =
  'For example, if you see the pattern of upper left corner, bottom right corner, and upper right corner, then you should press those same places in that order, and then press "Done" in the center.';
export const instruction14 =
  "If you don't know or can't remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct blocks.";
export const instruction15 = "Watch me!";
