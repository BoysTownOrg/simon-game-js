import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as coloredCircles from "../colored-circles.js";
import * as feedback from "../feedback.js";

const simonPluginId = "simon-game-colored-circles";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.coloredCircles(
  coloredCircles.orderMap()
);
const timeline = [];
jsPsychUtility.pushParticipantIdForm(timeline);
jsPsychUtility.pushSpacebarResponse(timeline, [
  coloredCircles.instruction11,
  coloredCircles.instruction12,
  coloredCircles.instruction13,
  coloredCircles.instruction14,
  coloredCircles.instruction15,
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
jsPsychUtility.pushConditionalSpacebarResponse(
  timeline,
  [feedback.afterFirstTrial11, feedback.afterFirstTrial12],
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
jsPsychUtility.pushConditionalSpacebarResponse(
  timeline,
  [
    feedback.afterSecondTrial1,
    feedback.afterSecondTrial2,
    feedback.afterSecondTrial3,
  ],
  jsPsychUtility.allEvaluatedTrialsCorrect
);
jsPsychUtility.pushBlockTrials(timeline, simonPluginId);
fetch("final-screen-text.txt")
  .then((p) => p.text())
  .then((text) => {
    jsPsychUtility.pushAnyKeyResponse(timeline, [
      text,
      "Press any key to close.",
    ]);
    jsPsych.init({
      timeline,
    });
  });
