import { coloredCircles } from "../../plugin.js";
import { initPracticeWithInstructions } from "../../utility.js";
import { orderMap } from "../../colored-circles.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.endStudy(jsPsych.data.get().json()),
  });
  const trials = 5;
  initPracticeWithInstructions(
    jsPsych,
    coloredCircles(orderMap(), jsPsychModule),
    trials,
    jatos.componentJsonInput.instructionsText,
    jatos.componentJsonInput.finalScreenText
  );
});
