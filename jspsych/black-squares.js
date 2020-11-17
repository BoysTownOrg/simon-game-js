import * as simon from "../lib/index.js";

export function orderMap() {
  return new Map([
    [simon.Color.red, 0],
    [simon.Color.green, 1],
    [simon.Color.blue, 2],
    [simon.Color.yellow, 3],
  ]);
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
