import { coloredCircles } from "../../plugin.js";
import { initTaskWithInstructions } from "../../utility.js";
import { orderMap } from "../../colored-circles.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.endStudy(jsPsych.data.get().json()),
  });

  initTaskWithInstructions(jsPsych, coloredCircles(orderMap(), jsPsychModule));
});
