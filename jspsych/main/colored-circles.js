import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as coloredCircles from "../colored-circles.js";

const jsPsych = initJsPsych();
const simonPluginId = simonJsPsychPlugins.coloredCircles(
  coloredCircles.orderMap(),
  jsPsychModule
);
jsPsychUtility.initTaskWithInstructions(jsPsych, simonPluginId);
