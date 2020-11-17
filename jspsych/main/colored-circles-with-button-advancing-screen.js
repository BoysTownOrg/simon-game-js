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
  "Watch me!",
]);
const firstTrial = {
  type: simonPluginId,
  colors: coloredCircles.firstTrialSequence(),
};
timeline.push(firstTrial);
jsPsychUtility.pushConditionalTrial(
  timeline,
  firstTrial,
  jsPsychUtility.lastTrialIncorrect
);
jsPsychUtility.pushConditionalContinueButtonResponse(
  timeline,
  [coloredCircles.instruction21],
  jsPsychUtility.lastTrialCorrect
);
const secondTrial = {
  type: simonPluginId,
  colors: coloredCircles.secondTrialSequence(),
};
jsPsychUtility.pushConditionalTrial(
  timeline,
  secondTrial,
  jsPsychUtility.allEvaluatedTrialsCorrect
);
jsPsychUtility.pushConditionalContinueButtonResponse(
  timeline,
  ["Good job!", "Do you have any questions?"],
  jsPsychUtility.allEvaluatedTrialsCorrect
);
jsPsychUtility.pushBlockTrials(timeline, simonPluginId);
fetch("final-screen-text.txt")
  .then((p) => p.text())
  .then((text) => {
    jsPsychUtility.pushContinueButtonResponse(timeline, [text]);
    jsPsych.init({
      timeline,
    });
  });
