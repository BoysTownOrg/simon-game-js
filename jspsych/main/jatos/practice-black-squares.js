import { blackSquares } from "../../plugin.js";
import { initPracticeWithInstructions } from "../../utility.js";
import { orderMap } from "../../black-squares.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
  });
  const trials = 4;
  initPracticeWithInstructions(
    jsPsych,
    blackSquares(orderMap(), jsPsychModule),
    trials,
    jatos.componentJsonInput.instructionsText,
    jatos.componentJsonInput.finalScreenText
  );
});
