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
jsPsychUtility.pushSingleInput(timeline, "Enter ID", "participant_id");
jsPsychUtility.pushSpacebarResponse(timeline, [
  "You will see patterns of colored circles shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place/color where you saw it.",
  'When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.',
  'For example, if you see the pattern BLUE-RED-GREEN, then you should press the colors blue, red, green in that order, and then press "Done" at the bottom.',
  "If you don't know or can't remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct colors.",
  "Watch me! Press spacebar to start.",
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
jsPsychUtility.pushConditionalSpacebarResponse(
  timeline,
  ["Now it's your turn!", "Press the spacebar when you're ready to start"],
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
jsPsychUtility.pushConditionalSpacebarResponse(
  timeline,
  ["Good job!", "Do you have any questions?", "Press the spacebar to begin."],
  jsPsychUtility.allEvaluatedTrialsCorrect
);
const fixedColorSequence = jsPsych.randomization.sampleWithReplacement(
  [simon.Color.red, simon.Color.green, simon.Color.blue, simon.Color.yellow],
  32
);
let colorSequenceLength = 1;
const fixedTrial = {
  type: simonPluginId,
  colors: function () {
    return fixedColorSequence.slice(0, colorSequenceLength);
  },
  on_finish: function (data) {
    if (data.correct) ++colorSequenceLength;
    else --colorSequenceLength;
    if (colorSequenceLength == 0) colorSequenceLength = 1;
  },
};
const randomTrial = {
  type: simonPluginId,
  colors: function () {
    return jsPsych.randomization.sampleWithReplacement(
      [
        simon.Color.red,
        simon.Color.green,
        simon.Color.blue,
        simon.Color.yellow,
      ],
      colorSequenceLength
    );
  },
  on_finish: function (data) {
    if (data.correct) ++colorSequenceLength;
    else --colorSequenceLength;
    if (colorSequenceLength == 0) colorSequenceLength = 1;
  },
};

timeline.push({
  timeline: [fixedTrial],
  repetitions: 15,
  data: { block: 1, isRandom: false },
});
timeline.push({
  timeline: [randomTrial],
  repetitions: 15,
  data: { block: 2, isRandom: true },
});
timeline.push({
  timeline: [fixedTrial],
  repetitions: 15,
  data: { block: 3, isRandom: false },
});
jsPsychUtility.pushAnyKeyResponse(timeline, [
  "Finished.",
  "Thank you for your participation. Press any key to close.",
]);
jsPsych.init({
  timeline: timeline,
});
