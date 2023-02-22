import { coloredCircles } from "../../plugin.js";
import { initTaskWithInstructions } from "../../utility.js";
import { orderMap } from "../../colored-circles.js";

import { initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css'

jatos.onLoad(() => {
    const jsPsych = initJsPsych({
        show_progress_bar: true,
        auto_update_progress_bar: false,
        on_finish: () => jatos.startNextComponent(jsPsych.data.get().json()),
        on_data_update: function(data) {
            jatos.appendResultData(JSON.stringify(data));
        }
    });

    initTaskWithInstructions(
        jsPsych,
        coloredCircles(orderMap()),
        jatos.componentJsonInput.instructionsText,
        jatos.componentJsonInput.finalScreenText
    );
});
