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
    type: jsPsychHtmlButtonResponse,
    stimulus: arrayToHtml(lines),
    choices: [buttonText],
  });
}

export function pushContinueButtonResponse(timeline, lines) {
  pushButtonResponse(timeline, lines, "Continue");
}

function pushSingleInput(timeline, label, id) {
  timeline.push({
    type: jsPsychSurveyHtmlForm,
    html: `<p> ${label}<input name="${id}" type="text" /> </p>`,
  });
}

export function pushParticipantIdForm(timeline) {
  pushSingleInput(timeline, "Participant ID number: ", "participant_id");
}

export function lastTrialCorrect(jsPsych) {
  // https://www.jspsych.org/overview/trial/
  return jsPsych.data.getLastTrialData().values()[0].correct;
}

export function randomColorSequence(jsPsych, sequenceLength) {
  return jsPsych.randomization.sampleWithReplacement(
    [simon.Color.red, simon.Color.green, simon.Color.blue, simon.Color.yellow],
    sequenceLength
  );
}

class BlockTrials {
  constructor(jsPsych, fixedColorSequence) {
    this.jsPsych = jsPsych;
    this.fixedColorSequence = fixedColorSequence;
    this.colorSequenceLength = 3;
  }

  fixedColors() {
    return this.fixedColorSequence.slice(0, this.colorSequenceLength);
  }

  randomColors() {
    return randomColorSequence(this.jsPsych, this.colorSequenceLength);
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

function pushBlockTrials(jsPsych, timeline, id, fixedColorSequence) {
  timeline.push({
    timeline: [fixedTrial(new BlockTrials(jsPsych, fixedColorSequence), id)],
    repetitions: 15,
    data: { block: 1, isRandom: false },
  });
  timeline.push({
    timeline: [randomTrial(new BlockTrials(jsPsych, fixedColorSequence), id)],
    repetitions: 15,
    data: { block: 2, isRandom: true },
  });
  timeline.push({
    timeline: [fixedTrial(new BlockTrials(jsPsych, fixedColorSequence), id)],
    repetitions: 15,
    data: { block: 3, isRandom: false },
  });
}

function fetchAsText(filename, callback) {
  fetch(filename)
    .then((p) => p.text())
    .then(callback);
}

function pushFinalScreenAndRun(jsPsych, timeline) {
  fetchAsText("final-screen-text.txt", (text) => {
    pushContinueButtonResponse(timeline, [text]);
    jsPsych.run(timeline);
  });
}

export function initTaskWithInstructions(jsPsych, pluginId) {
  const fixedColorSequence = randomColorSequence(jsPsych, 32);
  const timeline = [];
  pushParticipantIdForm(timeline);
  fetchAsText("instructions.txt", (text) => {
    pushContinueButtonResponse(timeline, text.split("\n"));
    pushBlockTrials(jsPsych, timeline, pluginId, fixedColorSequence);
    pushFinalScreenAndRun(jsPsych, timeline);
  });
}
