import * as simonJsPsychPlugins from "../../plugin.js";
import initPracticeWithInstructions from "../../utility.js";
import * as coloredCircles from "../../colored-circles.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.endStudy(jsPsych.data.get().json()),
  });
  const trials = 5;
  initPracticeWithInstructions(
    jsPsych,
    simonJsPsychPlugins.coloredCircles(
      coloredCircles.orderMap(),
      jsPsychModule
    ),
    trials
  );
});
