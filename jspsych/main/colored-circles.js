import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as coloredCircles from "../colored-circles.js";

const simonPluginId = "simon-game-colored-circles";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.coloredCircles(
  coloredCircles.orderMap()
);
jsPsychUtility.initTaskWithInstructions(
  [
    coloredCircles.instruction11,
    coloredCircles.instruction12,
    coloredCircles.instruction13,
    coloredCircles.instruction14,
    coloredCircles.instruction15,
  ],
  simonPluginId
);
