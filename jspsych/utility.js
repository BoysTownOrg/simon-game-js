import * as simon from "../lib/index.js";

export function arrayToHtml(lines) {
  let html = "";
  for (const line of lines) {
    html += `<p style="line-height:normal">${line}</p>`;
  }
  return html;
}

function pushButtonResponse(timeline, lines, buttonText) {
  timeline.push({
    type: "html-button-response",
    stimulus: arrayToHtml(lines),
    choices: [buttonText],
  });
}

export function pushContinueButtonResponse(timeline, lines) {
  pushButtonResponse(timeline, lines, "Continue");
}

function pushSingleInput(timeline, label, id) {
  timeline.push({
    type: "survey-html-form",
    html: `<p> ${label}<input name="${id}" type="text" /> </p>`,
  });
}

export function pushParticipantIdForm(timeline) {
  pushSingleInput(timeline, "Participant ID number: ", "participant_id");
}

export function lastTrialCorrect() {
  // https://www.jspsych.org/overview/trial/
  return jsPsych.data.getLastTrialData().values()[0].correct;
}

export function randomColorSequence(sequenceLength) {
  return jsPsych.randomization.sampleWithReplacement(
    [simon.Color.red, simon.Color.green, simon.Color.blue, simon.Color.yellow],
    sequenceLength
  );
}

const fixedColorSequence = randomColorSequence(32);

class BlockTrials {
  constructor() {
    this.colorSequenceLength = 1;
  }

  fixedColors() {
    return fixedColorSequence.slice(0, this.colorSequenceLength);
  }

  randomColors() {
    return randomColorSequence(this.colorSequenceLength);
  }

  update(data) {
    if (data.correct) {
      this.colorSequenceLength += 1;
    } else {
      this.colorSequenceLength -= 1;
    }
    if (this.colorSequenceLength === 0) {
      this.colorSequenceLength = 1;
    }
  }
}

function randomTrial(trials, id) {
  return {
    type: id,
    colors() {
      return trials.randomColors();
    },
    on_finish(data) {
      trials.update(data);
    },
  };
}

function fixedTrial(trials, id) {
  return {
    type: id,
    colors() {
      return trials.fixedColors();
    },
    on_finish(data) {
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

export function pushFinalScreenAndInit(timeline) {
  fetch("final-screen-text.txt")
    .then((p) => p.text())
    .then((text) => {
      pushContinueButtonResponse(timeline, [text]);
      jsPsych.init({
        timeline,
      });
    });
}

export function initTaskWithInstructions(pluginId) {
  const timeline = [];
  pushParticipantIdForm(timeline);
  fetch("instructions.txt")
    .then((p) => p.text())
    .then((text) => {
      pushContinueButtonResponse(timeline, text.split("\n"));
      pushBlockTrials(timeline, pluginId);
      pushFinalScreenAndInit(timeline);
    });
}
