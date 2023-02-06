import { blackSquares } from "../../plugin.js";
import { initTaskWithInstructions } from "../../utility.js";
import { orderMap } from "../../black-squares.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
  });

  initTaskWithInstructions(
    jsPsych,
    blackSquares(orderMap(), jsPsychModule),
    jatos.componentJsonInput.instructionsText,
    jatos.componentJsonInput.finalScreenText
  );
});
