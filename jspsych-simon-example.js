import { plugin } from "./jspsych-plugin-simon-game.js";

const pluginName = "simon-game";

jsPsych.plugins[pluginName] = plugin(pluginName);

var hello_trial = {
  type: pluginName,
};

jsPsych.init({
  timeline: [hello_trial],
});
