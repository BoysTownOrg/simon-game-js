import { Simon } from "./lib/Simon.js";
import { AudioPlayer } from "./lib/AudioPlayer.js";
import { ScreenPresenter } from "./lib/ScreenPresenter.js";
import { ScreenResponder } from "./lib/ScreenResponder.js";
import { Color } from "./lib/Color.js";

function addClickEventListener(button, f) {
  button.addEventListener("mousedown", f);
}

function createCircleBorderedButton() {
  const button = document.createElement("div");
  button.style.height = "200px";
  button.style.width = "200px";
  button.style.borderRadius = "100px";
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
    topRow.style.display = "inline-flex";
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
    gap.style.height = "200px";
    gap.style.width = "400px";
    adopt(row, gap);
    adopt(row, this.blueButton);
    const bottomRow = document.createElement("div");
    bottomRow.style.display = "inline-flex";
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
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.01;
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    oscillator.start(startTimeSeconds);
    oscillator.stop(stopTimeSeconds);
  }
}

export function plugin() {
  let plugin = {};
  plugin.info = {
    parameters: {},
  };
  plugin.trial = function (display_element, trial) {
    const audioPlayer = new AudioPlayer(
      new WebAudioContext(),
      new Map([
        [Color.green, 391.995],
        [Color.red, 329.628],
        [Color.yellow, 261.626],
        [Color.blue, 195.998],
      ]),
      48.9994
    );
    audioPlayer.setPlayDelaySeconds(0.003);
    const screen = new CognitionScreen(display_element);
    const presenter = new ScreenPresenter(screen);
    audioPlayer.subscribe(presenter);
    const simon = new Simon(audioPlayer);
    simon.setLongToneDurationMilliseconds(700);
    simon.setShortToneDurationMilliseconds(100);
    simon.setToneOffsetToNextOnsetDurationMilliseconds(700);
    new ScreenResponder(screen, simon);
    simon.say(trial.colors);
  };
  return plugin;
}
