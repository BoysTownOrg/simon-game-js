import * as simon from "./plugin.js";
import * as simon from "../lib/Color.js";
import * as simon from "../lib/ParametersFileParser.js";

function readPromisedFileContents(filename) {
  return fetch(filename).then(function (response) {
    return response.text();
  });
}

function pushSpacebarResponse(timeline, lines) {
  let html = "";
  for (const line of lines) {
    html += '<p style="font-size:32px">' + line + "</p>";
  }
  timeline.push({
    type: "html-keyboard-response",
    stimulus: html,
    choices: [" "],
  });
}

function pushConditionalSubtimeline(timeline, subtimeline, condition) {
  timeline.push({
    timeline: subtimeline,
    conditional_function: condition,
  });
}

function pushConditionalTrial(timeline, trial, condition) {
  pushConditionalSubtimeline(timeline, [trial], condition);
}

function pushConditionalSpacebarResponse(timeline, lines, condition) {
  const response = [];
  pushSpacebarResponse(response, lines);
  pushConditionalSubtimeline(timeline, response, condition);
}

function lastTrialCorrect() {
  // https://www.jspsych.org/overview/trial/
  return jsPsych.data.getLastTrialData().values()[0].correct;
}

function lastTrialIncorrect() {
  return !lastTrialCorrect();
}

function allEvaluatedTrialsCorrect() {
  return jsPsych.data.get().filter({ correct: false }).count() == 0;
}

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

const promisedParametersFileContents = readPromisedFileContents(
  "parameters.txt"
);

// https://stackoverflow.com/a/10050831
const order = shuffle([...Array(4).keys()]);
const orderedColors = new Map([
  [order[0], simon.Color.red],
  [order[1], simon.Color.green],
  [order[2], simon.Color.blue],
  [order[3], simon.Color.yellow],
]);
const simonPluginId = "simon-game";
jsPsych.plugins[simonPluginId] = simon.plugin(
  new Map([
    colorOrder(orderedColors, order[0]),
    colorOrder(orderedColors, order[1]),
    colorOrder(orderedColors, order[2]),
    colorOrder(orderedColors, order[3]),
  ])
);
const timeline = [];
pushSpacebarResponse(timeline, [
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
pushConditionalTrial(timeline, firstTrial, lastTrialIncorrect);
pushConditionalSpacebarResponse(
  timeline,
  ["Now it's your turn!", "Press the spacebar when you're ready to start"],
  lastTrialCorrect
);
const secondTrial = {
  type: simonPluginId,
  colors: sequencedColors(orderedColors, [1, 3, 1]),
};
pushConditionalTrial(timeline, secondTrial, allEvaluatedTrialsCorrect);
pushConditionalSpacebarResponse(
  timeline,
  ["Good job!", "Do you have any questions?", "Press the spacebar to begin."],
  allEvaluatedTrialsCorrect
);
const fixedColorSequence = jsPsych.randomization.sampleWithReplacement(
  [Color.red, Color.green, Color.blue, Color.yellow],
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
    if (fixedColorSequence == 0) fixedColorSequence = 1;
  },
};
const randomTrial = {
  type: simonPluginId,
  colors: function () {
    return jsPsych.randomization.sampleWithReplacement(
      [Color.red, Color.green, Color.blue, Color.yellow],
      colorSequenceLength
    );
  },
  on_finish: function (data) {
    if (data.correct) ++colorSequenceLength;
    else --colorSequenceLength;
    if (fixedColorSequence == 0) fixedColorSequence = 1;
  },
};

promisedParametersFileContents.then(function (contents) {
  const trialRounds = simon.ParametersFileParser.parse(contents);
  for (let i = 2; i < trialRounds.length; ++i) {
    const trial =
      trialRounds[i].trialType == ParametersFileParser.TrialType.fixed
        ? fixedTrial
        : randomTrial;
    timeline.push({
      timeline: [trial],
      repetitions: trialRounds[i].trials,
    });
  }

  jsPsych.init({
    timeline: timeline,
  });
});
