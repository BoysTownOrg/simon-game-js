import { coloredCircles } from "../../plugin.js";
import { initPracticeWithDemonstration } from "../../utility.js";
import { orderMap } from "../../colored-circles.js";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
  });
  const trials = 4;
  initPracticeWithDemonstration(
    jsPsych,
    coloredCircles(orderMap(), jsPsychModule),
    trials,
    jatos.componentJsonInput.instructionsText,
    jatos.componentJsonInput.testerPrompt,
    jatos.componentJsonInput.participantPrompt,
    jatos.componentJsonInput.finalScreenText,
  );
});
