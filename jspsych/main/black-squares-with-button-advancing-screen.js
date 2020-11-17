import * as simon from "../../lib/index.js";
import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";
import * as feedback from "../feedback.js";

const simonPluginId = "simon-game-black-squares";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.blackSquares(
  new Map([
    [simon.Color.red, 0],
    [simon.Color.green, 1],
    [simon.Color.blue, 2],
    [simon.Color.yellow, 3],
  ])
);
const timeline = [];
jsPsychUtility.pushParticipantIdForm(timeline);
jsPsychUtility.pushContinueButtonResponse(timeline, [
  "You will see patterns of black squares shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place where you saw it.",
  'When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.',
  'For example, if you see the pattern of upper left corner, bottom right corner, and upper right corner, then you should press those same places in that order, and then press "Done" in the center.',
  "If you don't know or can't remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct blocks.",
  "Watch me!",
]);
const firstTrial = {
  type: simonPluginId,
  colors: [simon.Color.red, simon.Color.blue, simon.Color.blue],
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
  colors: [simon.Color.green, simon.Color.yellow, simon.Color.green],
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
