import { coloredCircles } from "../plugin.js";
import { initTaskWithInstructions } from "../utility.js";
import { orderMap } from "../colored-circles.js";

initTaskWithInstructions(
  initJsPsych(),
  coloredCircles(orderMap(), jsPsychModule)
);
