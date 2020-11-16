import * as simon from "../../lib/index.js";
import * as simonJsPsychPlugins from "../plugin.js";
import * as jsPsychUtility from "../utility.js";

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function colorOrder(orderedColors, n) {
  return [orderedColors.get(n), n];
}

function sequencedColors(orderedColors, sequence) {
  let colors = [];
  for (const order of sequence) {
    colors.push(orderedColors.get(order));
  }
  return colors;
}

// https://stackoverflow.com/a/10050831
const order = shuffle([...Array(4).keys()]);
const orderedColors = new Map([
  [order[0], simon.Color.red],
  [order[1], simon.Color.green],
  [order[2], simon.Color.blue],
  [order[3], simon.Color.yellow],
]);
const simonPluginId = "simon-game-colored-circles";
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
jsPsychUtility.pushContinueButtonResponse(timeline, [
  "You will see patterns of colored circles shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place/color where you saw it.",
  'When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.',
  'For example, if you see the pattern BLUE-RED-GREEN, then you should press the colors blue, red, green in that order, and then press "Done" at the bottom.',
  "If you don't know or can't remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct colors.",
  "Watch me!",
]);
const firstTrial = {
  type: simonPluginId,
  colors: sequencedColors(orderedColors, [0, 2, 2]),
};
timeline.push(firstTrial);
jsPsychUtility.pushConditionalTrial(
  timeline,
  firstTrial,
  jsPsychUtility.lastTrialIncorrect
);
jsPsychUtility.pushConditionalContinueButtonResponse(
  timeline,
  ["Now it's your turn!"],
  jsPsychUtility.lastTrialCorrect
);
const secondTrial = {
  type: simonPluginId,
  colors: sequencedColors(orderedColors, [1, 3, 1]),
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

const trials = new jsPsychUtility.BlockTrials();

timeline.push({
  timeline: [jsPsychUtility.fixedTrial(trials, simonPluginId)],
  repetitions: 15,
  data: { block: 1, isRandom: false },
});
timeline.push({
  timeline: [jsPsychUtility.randomTrial(trials, simonPluginId)],
  repetitions: 15,
  data: { block: 2, isRandom: true },
});
timeline.push({
  timeline: [jsPsychUtility.fixedTrial(trials, simonPluginId)],
  repetitions: 15,
  data: { block: 3, isRandom: false },
});
fetch("final-screen-text.txt")
  .then((p) => p.text())
  .then((text) => {
    jsPsychUtility.pushContinueButtonResponse(timeline, [text]);
    jsPsych.init({
      timeline: timeline,
    });
  });
