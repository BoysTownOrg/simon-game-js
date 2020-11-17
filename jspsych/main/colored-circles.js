import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as coloredCircles from "../colored-circles.js";

const simonPluginId = "simon-game-colored-circles";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.coloredCircles(
  coloredCircles.orderMap()
);
const timeline = [];
jsPsychUtility.pushParticipantIdForm(timeline);
jsPsychUtility.pushContinueButtonResponse(timeline, [
  coloredCircles.instruction11,
  coloredCircles.instruction12,
  coloredCircles.instruction13,
  coloredCircles.instruction14,
  coloredCircles.instruction15,
]);
jsPsychUtility.pushBlockTrials(timeline, simonPluginId);
jsPsychUtility.pushFinalScreenAndInit(timeline);
