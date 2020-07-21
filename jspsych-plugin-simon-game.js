import { Simon } from "./lib/Simon.js";
import { AudioPlayer } from "./lib/AudioPlayer.js";
import { ScreenPresenter } from "./lib/ScreenPresenter.js";
import { ScreenResponder } from "./lib/ScreenResponder.js";
import { Color } from "./lib/Color.js";

function addClickEventListener(button, f) {
  button.addEventListener("click", f);
}

function createCircleBorderedButton() {
  const button = document.createElement("div");
  button.style.height = "90px";
  button.style.width = "90px";
  button.style.borderRadius = "400px";
  button.style.border = "4px solid black";
  button.style.margin = "20px";
  return button;
}

function adopt(parent, child) {
  parent.append(child);
}

class CognitionScreen {
  constructor(display_element) {
    this.greenButton = createCircleBorderedButton();
    this.redButton = createCircleBorderedButton();
    this.blueButton = createCircleBorderedButton();
    this.yellowButton = createCircleBorderedButton();
    this.doneButton = document.createElement("div");
    this.doneButton.style.border = "solid";
    this.doneButton.textContent = "Done";
    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.alignItems = "center";
    adopt(display_element, topRow);
    adopt(topRow, this.greenButton);
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-around";
    row.style.alignItems = "center";
    row.style.margin = "15px auto";
    adopt(display_element, row);
    adopt(row, this.redButton);
    const gap = document.createElement("div");
    gap.style.height = "90px";
    gap.style.width = "90px";
    gap.style.borderRadius = "400px";
    gap.style.margin = "20px";
    adopt(row, gap);
    adopt(row, this.blueButton);
    const bottomRow = document.createElement("div");
    bottomRow.style.display = "flex";
    bottomRow.style.alignItems = "center";
    adopt(display_element, bottomRow);
    adopt(bottomRow, this.yellowButton);
    adopt(display_element, this.doneButton);
    addClickEventListener(this.greenButton, (_e) => {
      this.listener.notifyThatGreenWasClicked();
    });
    addClickEventListener(this.redButton, (_e) => {
      this.listener.notifyThatRedWasClicked();
    });
    addClickEventListener(this.blueButton, (_e) => {
      this.listener.notifyThatBlueWasClicked();
    });
    addClickEventListener(this.yellowButton, (_e) => {
      this.listener.notifyThatYellowWasClicked();
    });
    addClickEventListener(this.doneButton, (_e) => {
      this.listener.notifyThatDoneWasClicked();
      jsPsych.finishTrial();
    });
  }

  subscribe(e) {
    this.listener = e;
  }

  turnOnRedButtonLight() {
    this.redButton.style.backgroundColor = "red";
  }

  turnOffRedButtonLight() {
    this.redButton.style.backgroundColor = "";
  }

  turnOnGreenButtonLight() {
    this.greenButton.style.backgroundColor = "green";
  }

  turnOffGreenButtonLight() {
    this.greenButton.style.backgroundColor = "";
  }

  turnOnBlueButtonLight() {
    this.blueButton.style.backgroundColor = "blue";
  }

  turnOffBlueButtonLight() {
    this.blueButton.style.backgroundColor = "";
  }

  turnOnYellowButtonLight() {
    this.yellowButton.style.backgroundColor = "yellow";
  }

  turnOffYellowButtonLight() {
    this.yellowButton.style.backgroundColor = "";
  }

  darkenBlueButton() {
    this.blueButton.style.backgroundColor = "black";
  }

  undarkenBlueButton() {
    this.blueButton.style.backgroundColor = "blue";
  }

  darkenRedButton() {
    this.redButton.style.backgroundColor = "black";
  }

  undarkenRedButton() {
    this.redButton.style.backgroundColor = "red";
  }

  darkenGreenButton() {
    this.greenButton.style.backgroundColor = "black";
  }

  undarkenGreenButton() {
    this.greenButton.style.backgroundColor = "green";
  }

  darkenYellowButton() {
    this.yellowButton.style.backgroundColor = "black";
  }

  undarkenYellowButton() {
    this.yellowButton.style.backgroundColor = "yellow";
  }
}

class WebAudioContext {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  }

  currentTimeSeconds() {
    return this.audioContext.currentTime;
  }

  scheduleTone(startTimeSeconds, stopTimeSeconds, frequencyHz, onEnd) {
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.value = frequencyHz;
    oscillator.onended = onEnd;
    oscillator.connect(this.audioContext.destination);
    oscillator.start(startTimeSeconds);
    oscillator.stop(stopTimeSeconds);
  }
}

export function plugin(name) {
  var plugin = {};
  plugin.info = {
    name: name,
    description: "",
    parameters: {},
  };
  plugin.trial = function (display_element, trial) {
    const screen = new CognitionScreen(display_element);
    const audioEnvironment = new WebAudioContext();
    const audioPlayer = new AudioPlayer(
      audioEnvironment,
      new Map([
        [Color.green, 391.995],
        [Color.red, 329.628],
        [Color.yellow, 261.626],
        [Color.blue, 195.998],
      ]),
      48.9994
    );
    audioPlayer.setPlayDelaySeconds(0.003);
    const presenter = new ScreenPresenter(screen);
    audioPlayer.subscribe(presenter);
    const simon = new Simon(audioPlayer);
    simon.setLongToneDurationMilliseconds(700);
    simon.setShortToneDurationMilliseconds(100);
    simon.setToneOffsetToNextOnsetDurationMilliseconds(700);
    const responder = new ScreenResponder(screen, simon);
    jsPsych.pluginAPI.setTimeout(() => {
      simon.say([Color.red, Color.green, Color.yellow, Color.blue]);
    }, 500);
  };
  return plugin;
}
