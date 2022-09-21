import * as simonJsPsychPlugins from "../../plugin.js";
import initPracticeWithInstructions from "../../utility.js";
import * as coloredCircles from "../../colored-circles.js";

const trials = 10;
initPracticeWithInstructions(
  initJsPsych(),
  simonJsPsychPlugins.coloredCircles(coloredCircles.orderMap(), jsPsychModule),
  trials
);
