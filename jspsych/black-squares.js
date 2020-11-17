import * as simon from "../lib/index.js";

export function orderMap() {
  return new Map([
    [simon.Color.red, 0],
    [simon.Color.green, 1],
    [simon.Color.blue, 2],
    [simon.Color.yellow, 3],
  ]);
}
