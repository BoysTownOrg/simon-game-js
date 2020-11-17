import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as blackSquares from "../black-squares.js";

const simonPluginId = "simon-game-black-squares";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.blackSquares(
  blackSquares.orderMap()
);
jsPsychUtility.initTaskWithInstructions(
  [
    blackSquares.instruction11,
    blackSquares.instruction12,
    blackSquares.instruction13,
    blackSquares.instruction14,
    blackSquares.instruction15,
  ],
  simonPluginId
);
