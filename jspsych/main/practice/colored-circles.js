import * as simonJsPsychPlugins from "../../plugin.js";
import * as jsPsychUtility from "../../utility.js";
import * as coloredCircles from "../../colored-circles.js";

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
const trials = [];
trials.push({
  type: simonPluginId,
  colors() {
    return jsPsychUtility.randomColorSequence(3);
  },
});
trials.push({
  type: "html-button-response",
  stimulus() {
    return jsPsychUtility.arrayToHtml([
      jsPsychUtility.lastTrialCorrect() ? "Good job!" : "Try again.",
    ]);
  },
  choices: ["Continue"],
});
timeline.push({ timeline: trials, repetitions: 10 });
jsPsychUtility.pushFinalScreenAndInit(timeline);
