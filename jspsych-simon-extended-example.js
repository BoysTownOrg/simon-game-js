import { plugin } from "./jspsych-plugin-simon-game.js";
import { Color } from "./lib/Color.js";

const simon = "simon-game";

jsPsych.plugins[simon] = plugin();

const timeline = [];

timeline.push({
  type: "fullscreen",
  fullscreen_mode: true,
});

const instructions = {
  type: "html-keyboard-response",
  stimulus:
    '<p>You will see patterns of colored circles shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place/color where you saw it.</p><p>When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.</p><p>For example, if you see the pattern BLUE-RED-GREEN, then you should press the colors blue, red, green in that order, and then press "Done" at the bottom.</p><p>If you don\'t know or can\'t remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct colors.</p><p>Watch me! Press spacebar to start.</p>',
};
timeline.push(instructions);

let seriesLength = 3;

const trial = {
  type: simon,
  colors: function () {
    // https://www.jspsych.org/overview/trial/
    const data = jsPsych.data.get().last(1).values()[0];
    if (data.correct) ++seriesLength;
    else --seriesLength;
    return jsPsych.randomization.sampleWithReplacement(
      [Color.red, Color.green, Color.blue, Color.yellow],
      seriesLength
    );
  },
};

const test_procedure = {
  timeline: [trial],
  repetitions: 5,
};
timeline.push(test_procedure);

jsPsych.init({
  timeline: timeline,
});
