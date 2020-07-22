import { plugin } from "./jspsych-plugin-simon-game.js";
import { Color } from "./lib/Color.js";

const simon = "simon-game";

jsPsych.plugins[simon] = plugin();

/* create timeline */
const timeline = [];

/* define welcome message trial */
const welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment. Press any key to begin.",
};
timeline.push(welcome);

/* define instructions trial */
const instructions = {
  type: "html-keyboard-response",
  stimulus: "<p>Repeat after me.</p>",
  post_trial_gap: 500,
};
timeline.push(instructions);

/* test trials */

const test_stimuli = [
  {
    colors: [Color.red],
  },
  {
    colors: [Color.red, Color.green],
  },
];

const fixation = {
  type: "html-keyboard-response",
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};

const test = {
  type: simon,
  colors: jsPsych.timelineVariable("colors"),
};

const test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
};
timeline.push(test_procedure);

/* define debrief */

const debrief_block = {
  type: "html-keyboard-response",
  stimulus: function () {
    return "<p>Press any key to complete the experiment. Thank you!</p>";
  },
};
timeline.push(debrief_block);

/* start the experiment */
jsPsych.init({
  timeline: timeline,
});
