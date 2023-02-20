import * as simon from "../lib/index.js";

import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response'
import jsPsychSurveyHtmlForm from '@jspsych/plugin-survey-html-form'

function arrayToHtml(lines) {
    let html = "";
    for (const line of lines) {
        html += `<p style="line-height:normal">${line}</p>`;
    }
    return html;
}

function pushButtonResponse(timeline, lines, buttonText) {
    timeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: arrayToHtml(lines),
        choices: [buttonText],
    });
}

function pushContinueButtonResponse(timeline, lines) {
    pushButtonResponse(timeline, lines, "Continue");
}

function pushSingleInput(timeline, label, id) {
    timeline.push({
        type: jsPsychSurveyHtmlForm,
        html: `<p> ${label}<input name="${id}" type="text" /> </p>`,
    });
}

function pushParticipantIdForm(timeline) {
    pushSingleInput(timeline, "Participant ID number: ", "participant_id");
}

function lastTrialCorrect(jsPsych) {
    // https://www.jspsych.org/overview/trial/
    return jsPsych.data.getLastTrialData().values()[0].correct;
}

function randomColorSequence(jsPsych, sequenceLength) {
    return jsPsych.randomization.sampleWithReplacement(
        [simon.Color.red, simon.Color.green, simon.Color.blue, simon.Color.yellow],
        sequenceLength,
    );
}

class BlockTrials {
    constructor(jsPsych, fixedColorSequence) {
        this.jsPsych = jsPsych;
        this.fixedColorSequence = fixedColorSequence;
        this.colorSequenceLength = 3;
    }

    fixedColors() {
        return this.fixedColorSequence.slice(0, this.colorSequenceLength);
    }

    randomColors() {
        return randomColorSequence(this.jsPsych, this.colorSequenceLength);
    }

    update(data) {
        if (data.correct) {
            this.colorSequenceLength += 1;
        } else {
            this.colorSequenceLength -= 1;
        }
        if (this.colorSequenceLength === 0) {
            this.colorSequenceLength = 1;
        }
    }
}

function fixedColors(trials) {
    return trials.fixedColors();
}

function randomColors(trials) {
    return trials.randomColors();
}

function blockTrial(
    jsPsych,
    colorsFromBlockTrials,
    trials,
    id,
    progress,
    totalTrials,
) {
    return {
        type: id,
        colors() {
            return colorsFromBlockTrials(trials);
        },
        on_finish(data) {
            trials.update(data);
            progress.value += 1 / totalTrials;
            jsPsych.setProgressBar(progress.value);
        },
    };
}

function randomTrial(jsPsych, trials, id, progress, totalTrials) {
    return blockTrial(jsPsych, randomColors, trials, id, progress, totalTrials);
}

function fixedTrial(jsPsych, trials, id, progress, totalTrials) {
    return blockTrial(jsPsych, fixedColors, trials, id, progress, totalTrials);
}

function pushBlockTrials(jsPsych, timeline, id, fixedColorSequence, progress) {
    const totalTrials = 45;
    timeline.push({
        timeline: [
            fixedTrial(
                jsPsych,
                new BlockTrials(jsPsych, fixedColorSequence),
                id,
                progress,
                totalTrials,
            ),
        ],
        repetitions: totalTrials / 3,
        data: { block: 1, isRandom: false },
    });
    timeline.push({
        timeline: [
            randomTrial(
                jsPsych,
                new BlockTrials(jsPsych, fixedColorSequence),
                id,
                progress,
                totalTrials,
            ),
        ],
        repetitions: totalTrials / 3,
        data: { block: 2, isRandom: true },
    });
    timeline.push({
        timeline: [
            fixedTrial(
                jsPsych,
                new BlockTrials(jsPsych, fixedColorSequence),
                id,
                progress,
                totalTrials,
            ),
        ],
        repetitions: totalTrials / 3,
        data: { block: 3, isRandom: false },
    });
}

function pushFinalScreenAndRun(jsPsych, timeline, text) {
    pushContinueButtonResponse(timeline, [text]);
    jsPsych.run(timeline);
}

export function initTaskWithInstructions(
    jsPsych,
    pluginId,
    instructionsText,
    finalScreenText,
) {
    const fixedColorSequence = randomColorSequence(jsPsych, 32);
    const timeline = [];
    pushParticipantIdForm(timeline);
    pushContinueButtonResponse(timeline, instructionsText.split("\n"));
    const progress = { value: 0 };
    pushBlockTrials(jsPsych, timeline, pluginId, fixedColorSequence, progress);
    pushFinalScreenAndRun(jsPsych, timeline, finalScreenText);
}

export function initPracticeWithDemonstration(
    jsPsych,
    pluginId,
    repeats,
    instructionsText,
    testerPrompt,
    participantPrompt,
    finalScreenText,
) {
    const timeline = [];
    pushParticipantIdForm(timeline);
    pushContinueButtonResponse(timeline, instructionsText.split("\n"));
    const testerPromptTimeline = [];
    pushContinueButtonResponse(testerPromptTimeline, testerPrompt.split("\n"));
    const participantPromptTimeline = [];
    pushContinueButtonResponse(
        participantPromptTimeline,
        participantPrompt.split("\n"),
    );
    const trialWithFeedbackTimeline = [{
        type: pluginId,
        colors() {
            return randomColorSequence(jsPsych, 3);
        },
    }, {
        type: jsPsychHtmlButtonResponse,
        stimulus() {
            return arrayToHtml([
                lastTrialCorrect(jsPsych) ? "Good job!" : "Try again.",
            ]);
        },
        choices: ["Continue"],
    }];
    timeline.push({
        timeline: [
            ...testerPromptTimeline,
            ...trialWithFeedbackTimeline,
            ...participantPromptTimeline,
            ...trialWithFeedbackTimeline,
        ],
        repetitions: repeats,
    });
    pushFinalScreenAndRun(jsPsych, timeline, finalScreenText);
}

export function initPracticeWithInstructions(
    jsPsych,
    pluginId,
    trials,
    instructionsText,
    finalScreenText,
) {
    const timeline = [];
    pushParticipantIdForm(timeline);
    pushContinueButtonResponse(timeline, instructionsText.split("\n"));
    timeline.push({
        timeline: [
            {
                type: pluginId,
                colors() {
                    return randomColorSequence(jsPsych, 3);
                },
            },
            {
                type: jsPsychHtmlButtonResponse,
                stimulus() {
                    return arrayToHtml([
                        lastTrialCorrect(jsPsych) ? "Good job!" : "Try again.",
                    ]);
                },
                choices: ["Continue"],
            },
        ],
        repetitions: trials,
    });
    pushFinalScreenAndRun(jsPsych, timeline, finalScreenText);
}
