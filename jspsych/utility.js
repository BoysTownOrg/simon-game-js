export function pushSpacebarResponse(timeline, lines) {
  let html = "";
  for (const line of lines) {
    html += '<p style="font-size:32px;line-height:normal">' + line + "</p>";
  }
  timeline.push({
    type: "html-keyboard-response",
    stimulus: html,
    choices: [" "],
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
