import * as simon from "../../lib/index.js";
import * as simonJsPsych from "../plugin.js";

const jsPsych = initJsPsych();
const simonColoredCirclesPluginClass = simonJsPsych.coloredCircles(
  new Map([
    [simon.Color.red, 0],
    [simon.Color.green, 1],
    [simon.Color.blue, 2],
    [simon.Color.yellow, 3],
  ]),
  jsPsychModule
);

jsPsych.run([
  {
    type: simonColoredCirclesPluginClass,
    colors: [simon.Color.red, simon.Color.green, simon.Color.green],
  },
]);
