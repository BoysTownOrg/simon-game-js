import { plugin } from "./jspsych-plugin-simon-game.js";
import { Color } from "./lib/Color.js";

const simon = "simon-game";

function pushHtmlKeyboardResponse(timeline, stimulus) {
  timeline.push({
    type: "html-keyboard-response",
    stimulus: stimulus,
  });
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
pushHtmlKeyboardResponse(
  timeline,
  '<p>You will see patterns of colored circles shown on the screen in different places, one at a time. After watching each pattern, you must correctly copy it by pressing the place/color where you saw it.</p><p>When you finish copying each pattern, press the "Done" button and then the next pattern will be shown.</p><p>For example, if you see the pattern BLUE-RED-GREEN, then you should press the colors blue, red, green in that order, and then press "Done" at the bottom.</p><p>If you don\'t know or can\'t remember what a pattern was, just make your best guess. Once you make a response, you cannot go back and correct it, so take your time in choosing the correct colors.</p><p>Watch me! Press spacebar to start.</p>'
);
timeline.push({
  type: simon,
  colors: [orderedColors.get(0), orderedColors.get(2), orderedColors.get(2)],
});
pushHtmlKeyboardResponse(
  timeline,
  "<p>Now it's your turn!</p><p>Press the spacebar when you're ready to start</p>"
);
timeline.push({
  type: simon,
  colors: [orderedColors.get(1), orderedColors.get(3), orderedColors.get(1)],
});
pushHtmlKeyboardResponse(
  timeline,
  "<p>Good job!</p><p>Do you have any questions?</p><p>Press the spacebar to begin.</p>"
);

let seriesLength = 3;
const trial = {
  type: simon,
  colors: function () {
    // https://www.jspsych.org/overview/trial/
    const data = jsPsych.data.get().last(1).values()[0];
    if (data.correct) ++seriesLength;
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
