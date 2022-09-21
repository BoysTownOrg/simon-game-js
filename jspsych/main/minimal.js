import * as simon from "../../lib/index.js";
import { coloredCircles } from "../plugin.js";

const jsPsych = initJsPsych();
jsPsych.run([
  {
    type: coloredCircles(
      new Map([
        [simon.Color.red, 0],
        [simon.Color.green, 1],
        [simon.Color.blue, 2],
        [simon.Color.yellow, 3],
      ]),
      jsPsychModule
    ),
    colors: [simon.Color.red, simon.Color.green, simon.Color.green],
  },
]);
