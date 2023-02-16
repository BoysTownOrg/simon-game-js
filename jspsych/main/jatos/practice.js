import { coloredCircles } from "../../plugin.js";
import { initPracticeWithInstructions } from "../../utility.js";
import { orderMap } from "../../colored-circles.js";

import { initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css'

jatos.onLoad(() => {
    const jsPsych = initJsPsych({
        on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
    });
    const trials = 4;
    initPracticeWithInstructions(
        jsPsych,
        coloredCircles(orderMap()),
        trials,
        jatos.componentJsonInput.instructionsText,
        jatos.componentJsonInput.finalScreenText
    );
});
