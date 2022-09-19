import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as blackSquares from "../black-squares.js";

const jsPsych = initJsPsych();
const simonPluginId = simonJsPsychPlugins.blackSquares(
  blackSquares.orderMap(),
  jsPsychModule
);
jsPsychUtility.initTaskWithInstructions(jsPsych, simonPluginId);
