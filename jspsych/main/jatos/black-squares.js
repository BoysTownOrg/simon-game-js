import * as simonJsPsychPlugins from "../../plugin.js";
import * as jsPsychUtility from "../../utility.js";
import * as blackSquares from "../../black-squares.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.endStudy(jsPsych.data.get().json()),
  });

  jsPsychUtility.initTaskWithInstructions(
    jsPsych,
    simonJsPsychPlugins.blackSquares(blackSquares.orderMap(), jsPsychModule)
  );
});
