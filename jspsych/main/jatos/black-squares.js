import { blackSquares } from "../../plugin.js";
import { initTaskWithInstructions } from "../../utility.js";
import { orderMap } from "../../black-squares.js";

import { initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css'

jatos.onLoad(() => {
    const jsPsych = initJsPsych({
        show_progress_bar: true,
        auto_update_progress_bar: false,
        on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
    });

    initTaskWithInstructions(
        jsPsych,
        blackSquares(orderMap()),
        jatos.componentJsonInput.instructionsText,
        jatos.componentJsonInput.finalScreenText
    );
});
