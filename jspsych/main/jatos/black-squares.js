import { blackSquares } from "../../plugin.js";
import { initTaskWithInstructions } from "../../utility.js";
import { orderMap } from "../../black-squares.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.endStudy(jsPsych.data.get().json()),
  });

  initTaskWithInstructions(jsPsych, blackSquares(orderMap(), jsPsychModule));
});
