import { plugin } from "./jspsych-plugin-simon-game.js";
import { Color } from "./lib/Color.js";

const simon = "simon-game";

function pushKeyboardResponse(timeline, lines) {
  let html = "";
  for (const line of lines) {
    html += '<p style="font-size:32px">' + line + "</p>";
  }
  timeline.push({
    type: "html-keyboard-response",
    stimulus: html,
  });
}

function lastTrialCorrect() {
  // https://www.jspsych.org/overview/trial/
  return jsPsych.data.get().last(1).values()[0].correct;
}

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function colorOrder(orderedColors, n) {
  return [orderedColors.get(n), n];
}

function sequencedColors(orderedColors, sequence) {
  let colors = [];
  for (const order of sequence) {
    colors.push(orderedColors.get(order));
  }
  return colors;
}

// https://stackoverflow.com/a/10050831
const order = shuffle([...Array(4).keys()]);
const orderedColors = new Map([
  [order[0], Color.red],
  [order[1], Color.green],
  [order[2], Color.blue],
  [order[3], Color.yellow],
]);
jsPsych.plugins[simon] = plugin(
  new Map([
    colorOrder(orderedColors, order[0]),
    colorOrder(orderedColors, order[1]),
    colorOrder(orderedColors, order[2]),
    colorOrder(orderedColors, order[3]),
  ])
);
const timeline = [];
timeline.push({
  type: "fullscreen",
  fullscreen_mode: true,
});
pushKeyboardResponse(timeline, [
  "You will see patterns of colored circles shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place/color where you saw it.",
  'When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.',
  'For example, if you see the pattern BLUE-RED-GREEN, then you should press the colors blue, red, green in that order, and then press "Done" at the bottom.',
  "If you don't know or can't remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct colors.",
  "Watch me! Press spacebar to start.",
]);
const firstTrial = {
  type: simon,
  colors: sequencedColors(orderedColors, [0, 2, 2]),
};
timeline.push(firstTrial);
timeline.push({
  timeline: [firstTrial],
  conditional_function: function () {
    return !lastTrialCorrect();
  },
});
pushKeyboardResponse(timeline, [
  "Now it's your turn!",
  "Press the spacebar when you're ready to start",
]);
timeline.push({
  type: simon,
  colors: sequencedColors(orderedColors, [1, 3, 1]),
});
pushKeyboardResponse(timeline, [
  "Good job!",
  "Do you have any questions?",
  "Press the spacebar to begin.",
]);

let seriesLength = 3;
const trial = {
  type: simon,
  colors: function () {
    if (lastTrialCorrect()) ++seriesLength;
    else --seriesLength;
    return jsPsych.randomization.sampleWithReplacement(
      [Color.red, Color.green, Color.blue, Color.yellow],
      seriesLength
    );
  },
};

timeline.push({
  timeline: [trial],
  repetitions: 15,
});

function redcapUrl() {
  return "https://study.boystown.org/api/";
}

jsPsych.init({
  timeline: timeline,
  on_finish: function () {
    const token = prompt("Enter API Token");
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
    fetch(redcapUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: "token=" + token + "&content=generateNextRecordName",
    }).then(function (response) {
      response.text().then(function (text) {
        const id = text;
        fetch(redcapUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body:
            "token=" +
            token +
            "&content=record&format=json&type=flat&overwriteBehavior=normal&forceAutoNumber=false&data=[" +
            JSON.stringify({ record_id: id, scent: "horrifying" }) +
            "]&returnContent=count&returnFormat=json",
        });
      });
    });
  },
});
