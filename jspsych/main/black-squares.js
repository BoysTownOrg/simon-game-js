import { blackSquares } from "../plugin.js";
import { initTaskWithInstructions } from "../utility.js";
import { orderMap } from "../black-squares.js";

initTaskWithInstructions(
  initJsPsych(),
  blackSquares(orderMap(), jsPsychModule)
);
