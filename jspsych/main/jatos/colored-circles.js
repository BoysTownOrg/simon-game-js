import * as simonJsPsychPlugins from "../../plugin.js";
import * as jsPsychUtility from "../../utility.js";
import * as coloredCircles from "../../colored-circles.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.endStudy(jsPsych.data.get().json()),
  });

  jsPsychUtility.initTaskWithInstructions(
    jsPsych,
    simonJsPsychPlugins.coloredCircles(coloredCircles.orderMap(), jsPsychModule)
  );
});
