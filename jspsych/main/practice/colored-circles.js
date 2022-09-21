import { coloredCircles } from "../../plugin.js";
import { initPracticeWithInstructions } from "../../utility.js";
import { orderMap } from "../../colored-circles.js";

const trials = 10;
initPracticeWithInstructions(
  initJsPsych(),
  coloredCircles(orderMap(), jsPsychModule),
  trials
);
