import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as feedback from "../feedback.js";
import * as blackSquares from "../black-squares.js";

const simonPluginId = "simon-game-black-squares";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.blackSquares(
  blackSquares.orderMap()
);
const timeline = [];
jsPsychUtility.pushParticipantIdForm(timeline);
jsPsychUtility.pushContinueButtonResponse(timeline, [
  blackSquares.instruction11,
  blackSquares.instruction12,
  blackSquares.instruction13,
  blackSquares.instruction14,
  blackSquares.instruction15,
]);
const firstTrial = {
  type: simonPluginId,
  colors: blackSquares.firstTrialSequence(),
};
timeline.push(firstTrial);
jsPsychUtility.pushConditionalTrial(
  timeline,
  firstTrial,
  jsPsychUtility.lastTrialIncorrect
);
jsPsychUtility.pushConditionalButtonResponse(
  timeline,
  [feedback.afterFirstTrial11],
  "Continue",
  jsPsychUtility.lastTrialCorrect
);
const secondTrial = {
  type: simonPluginId,
  colors: blackSquares.secondTrialSequence(),
};
jsPsychUtility.pushConditionalTrial(
  timeline,
  secondTrial,
  jsPsychUtility.allEvaluatedTrialsCorrect
);
jsPsychUtility.pushConditionalButtonResponse(
  timeline,
  [feedback.afterSecondTrial1, feedback.afterSecondTrial2],
  "Continue",
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
