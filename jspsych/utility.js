import * as simon from "../lib/index.js";

// https://stackoverflow.com/a/2450976
export function shuffle(array) {
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

export function arrayToHtml(lines) {
  let html = "";
  for (const line of lines) {
    html += '<p style="line-height:normal">' + line + "</p>";
  }
  return html;
}

export function pushButtonResponse(timeline, lines, buttonText) {
  timeline.push({
    type: "html-button-response",
    stimulus: arrayToHtml(lines),
    choices: [buttonText],
  });
}

export function pushContinueButtonResponse(timeline, lines) {
  pushButtonResponse(timeline, lines, "Continue");
}

export function pushSpacebarResponse(timeline, lines) {
  timeline.push({
    type: "html-keyboard-response",
    stimulus: arrayToHtml(lines),
    choices: [" "],
  });
}

export function pushAnyKeyResponse(timeline, lines) {
  timeline.push({
    type: "html-keyboard-response",
    stimulus: arrayToHtml(lines),
  });
}

export function pushSingleInput(timeline, label, id) {
  timeline.push({
    type: "survey-html-form",
    html: "<p> " + label + '<input name="' + id + '" type="text" /> </p>',
  });
}

export function pushParticipantIdForm(timeline) {
  pushSingleInput(timeline, "Participant ID number: ", "participant_id");
}

export function pushConditionalSubtimeline(timeline, subtimeline, condition) {
  timeline.push({
    timeline: subtimeline,
    conditional_function: condition,
  });
}

export function pushConditionalTrial(timeline, trial, condition) {
  pushConditionalSubtimeline(timeline, [trial], condition);
}

export function pushConditionalSpacebarResponse(timeline, lines, condition) {
  const response = [];
  pushSpacebarResponse(response, lines);
  pushConditionalSubtimeline(timeline, response, condition);
}

export function pushConditionalButtonResponse(
  timeline,
  lines,
  buttonText,
  condition
) {
  const response = [];
  pushButtonResponse(response, lines, buttonText);
  pushConditionalSubtimeline(timeline, response, condition);
}

export function pushConditionalContinueButtonResponse(
  timeline,
  lines,
  condition
) {
  pushConditionalButtonResponse(timeline, lines, "Continue", condition);
}

export function lastTrialCorrect() {
  // https://www.jspsych.org/overview/trial/
  return jsPsych.data.getLastTrialData().values()[0].correct;
}

export function lastTrialIncorrect() {
  return !lastTrialCorrect();
}

export function allEvaluatedTrialsCorrect() {
  return jsPsych.data.get().filter({ correct: false }).count() == 0;
}
const fixedColorSequence = jsPsych.randomization.sampleWithReplacement(
  [simon.Color.red, simon.Color.green, simon.Color.blue, simon.Color.yellow],
  32
);

export class BlockTrials {
  constructor() {
    this.colorSequenceLength = 1;
  }

  fixedColors() {
    return fixedColorSequence.slice(0, this.colorSequenceLength);
  }

  randomColors() {
    return jsPsych.randomization.sampleWithReplacement(
      [
        simon.Color.red,
        simon.Color.green,
        simon.Color.blue,
        simon.Color.yellow,
      ],
      this.colorSequenceLength
    );
  }

  update(data) {
    if (data.correct) ++this.colorSequenceLength;
    else --this.colorSequenceLength;
    if (this.colorSequenceLength == 0) this.colorSequenceLength = 1;
  }
}

export function randomTrial(trials, id) {
  return {
    type: id,
    colors: function () {
      return trials.randomColors();
    },
    on_finish: function (data) {
      trials.update(data);
    },
  };
}

export function fixedTrial(trials, id) {
  return {
    type: id,
    colors: function () {
      return trials.fixedColors();
    },
    on_finish: function (data) {
      trials.update(data);
    },
  };
}

export function pushBlockTrials(timeline, id) {
  const trials = new BlockTrials();
  timeline.push({
    timeline: [fixedTrial(trials, id)],
    repetitions: 15,
    data: { block: 1, isRandom: false },
  });
  timeline.push({
    timeline: [randomTrial(trials, id)],
    repetitions: 15,
    data: { block: 2, isRandom: true },
  });
  timeline.push({
    timeline: [fixedTrial(trials, id)],
    repetitions: 15,
    data: { block: 3, isRandom: false },
  });
}
