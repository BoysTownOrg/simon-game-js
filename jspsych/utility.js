import * as simon from "../lib/index.js";

export function arrayToHtml(lines) {
  let html = "";
  for (const line of lines) {
    html += '<p style="line-height:normal">' + line + "</p>";
  }
  return html;
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
