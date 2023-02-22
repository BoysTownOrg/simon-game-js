import { blackSquares } from "../../plugin.js";
import { initPracticeWithInstructions } from "../../utility.js";
import { orderMap } from "../../black-squares.js";

import { initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css'

jatos.onLoad(() => {
    const jsPsych = initJsPsych({
        on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
        on_data_update: function(data) {
            jatos.appendResultData(JSON.stringify(data));
        }
    });
    const trials = 4;
    initPracticeWithInstructions(
        jsPsych,
        blackSquares(orderMap()),
        trials,
        jatos.componentJsonInput.instructionsText,
        jatos.componentJsonInput.finalScreenText
    );
});
