import * as simon from "../lib/index.js";
import * as simonJsPsych from "./plugin.js";

const simonPluginId = "simon-game";
jsPsych.plugins[simonPluginId] = simonJsPsych.plugin(
  new Map([
    [simon.Color.red, 0],
    [simon.Color.green, 1],
    [simon.Color.blue, 2],
    [simon.Color.yellow, 3],
  ])
);

jsPsych.init({
  timeline: [
    {
      type: simonPluginId,
      colors: [simon.Color.red, simon.Color.green, simon.Color.green],
    },
  ],
});
