import * as simon from "../../../lib/index.js";
import * as simonJsPsychPlugins from "../../plugin.js";
import * as jsPsychUtility from "../../utility.js";

function colorOrder(orderedColors, n) {
  return [orderedColors.get(n), n];
}

// https://stackoverflow.com/a/10050831
const order = jsPsychUtility.shuffle([...Array(4).keys()]);
const orderedColors = new Map([
  [order[0], simon.Color.red],
  [order[1], simon.Color.green],
  [order[2], simon.Color.blue],
  [order[3], simon.Color.yellow],
]);
const simonPluginId = "simon-game-practice-colored-circles";
jsPsych.plugins[simonPluginId] = simonJsPsychPlugins.coloredCircles(
  new Map([
    colorOrder(orderedColors, order[0]),
    colorOrder(orderedColors, order[1]),
    colorOrder(orderedColors, order[2]),
    colorOrder(orderedColors, order[3]),
  ])
);
const timeline = [];
jsPsychUtility.pushSingleInput(
  timeline,
  "Participant ID number: ",
  "participant_id"
);
jsPsychUtility.pushSpacebarResponse(timeline, [
  "You will see patterns of colored circles shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place/color where you saw it.",
  'When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.',
  'For example, if you see the pattern BLUE-RED-GREEN, then you should press the colors blue, red, green in that order, and then press "Done" at the bottom.',
  "If you don't know or can't remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct colors.",
  "Watch me! Press spacebar to start.",
]);
const trials = [];
trials.push({
  type: simonPluginId,
  colors: function () {
    return jsPsych.randomization.sampleWithReplacement(
      [
        simon.Color.red,
        simon.Color.green,
        simon.Color.blue,
        simon.Color.yellow,
      ],
      3
    );
  },
});
trials.push({
  type: "html-keyboard-response",
  stimulus: function () {
    return jsPsychUtility.arrayToHtml([
      jsPsychUtility.lastTrialCorrect() ? "Good job!" : "Try again.",
      "Press the spacebar to continue.",
    ]);
  },
  choices: [" "],
});
timeline.push({ timeline: trials, repetitions: 10 });
fetch("final-screen-text.txt")
  .then((p) => p.text())
  .then((text) => {
    jsPsychUtility.pushAnyKeyResponse(timeline, [
      text,
      "Press any key to close.",
    ]);
    jsPsych.init({
      timeline: timeline,
    });
  });