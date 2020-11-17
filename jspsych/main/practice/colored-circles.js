import * as simonJsPsychPlugins from "../../plugin.js";
import * as jsPsychUtility from "../../utility.js";
import * as coloredCircles from "../../colored-circles.js";

const simonPluginId = "simon-game-colored-circles";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.coloredCircles(
  coloredCircles.orderMap()
);
const timeline = [];
jsPsychUtility.pushParticipantIdForm(timeline);
fetch("instructions.txt")
  .then((p) => p.text())
  .then((text) => {
    jsPsychUtility.pushContinueButtonResponse(timeline, text.split("\n"));
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
  });
