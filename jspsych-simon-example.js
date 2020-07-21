import { plugin } from "./jspsych-plugin-simon-game.js";
import { Color } from "./lib/Color.js";

const simon = "simon-game";

jsPsych.plugins[simon] = plugin();

var trial = {
  type: simon,
  colors: [Color.red, Color.green, Color.yellow, Color.blue],
};

jsPsych.init({
  timeline: [trial],
});
