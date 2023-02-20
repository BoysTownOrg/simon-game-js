import { coloredCircles } from "../../plugin.js";
import { initPracticeWithDemonstration } from "../../utility.js";
import { orderMap } from "../../colored-circles.js";

import { initJsPsych } from "jspsych";
import "jspsych/css/jspsych.css";

jatos.onLoad(() => {
  const jsPsych = initJsPsych({
    on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
  });
  initPracticeWithDemonstration(
    jsPsych,
    coloredCircles(orderMap()),
    jatos.componentJsonInput.instructionsText,
    jatos.componentJsonInput.testerPrompt,
    jatos.componentJsonInput.participantPrompt,
    jatos.componentJsonInput.finalScreenText
  );
});
