import * as simonJsPsychPlugins from "../../plugin.js";
import * as jsPsychUtility from "../../utility.js";
import * as coloredCircles from "../../colored-circles.js";

const jsPsych = initJsPsych();
const simonPluginId = simonJsPsychPlugins.coloredCircles(
  coloredCircles.orderMap(),
  jsPsychModule
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
        return jsPsychUtility.randomColorSequence(jsPsych, 3);
      },
    });
    trials.push({
      type: "html-button-response",
      stimulus() {
        return jsPsychUtility.arrayToHtml([
          jsPsychUtility.lastTrialCorrect(jsPsych) ? "Good job!" : "Try again.",
        ]);
      },
      choices: ["Continue"],
    });
    timeline.push({ timeline: trials, repetitions: 10 });
    jsPsychUtility.pushFinalScreenAndRun(jsPsych, timeline);
  });
