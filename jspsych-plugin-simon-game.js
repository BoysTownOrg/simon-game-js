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

function setBackgroundColor(button, color) {
  button.style.backgroundColor = color;
}

function clearBackgroundColor(button) {
  setBackgroundColor(button, "");
}

function darken(button) {
  setBackgroundColor(button, "black");
}

function setBlueBackground(button) {
  setBackgroundColor(button, "blue");
}

function setGreenBackground(button) {
  setBackgroundColor(button, "green");
}

function setYellowBackground(button) {
  setBackgroundColor(button, "yellow");
}

function setRedBackground(button) {
  setBackgroundColor(button, "red");
}

const redColor = "red";
const yellowColor = "yellow";
const greenColor = "green";
const blueColor = "blue";

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
    const middleRow = document.createElement("div");
    middleRow.style.display = "flex";
    middleRow.style.justifyContent = "space-around";
    middleRow.style.alignItems = "center";
    middleRow.style.margin = "15px auto";
    adopt(display_element, middleRow);
    adopt(middleRow, this.redButton);
    const gap = document.createElement("div");
    gap.style.height = "200px";
    gap.style.width = "400px";
    adopt(middleRow, gap);
    adopt(middleRow, this.blueButton);
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
    setRedBackground(this.redButton);
  }

  turnOffRedButtonLight() {
    clearBackgroundColor(this.redButton);
  }

  turnOnGreenButtonLight() {
    setGreenBackground(this.greenButton);
  }

  turnOffGreenButtonLight() {
    clearBackgroundColor(this.greenButton);
  }

  turnOnBlueButtonLight() {
    setBlueBackground(this.blueButton);
  }

  turnOffBlueButtonLight() {
    clearBackgroundColor(this.blueButton);
  }

  turnOnYellowButtonLight() {
    setYellowBackground(this.yellowButton);
  }

  turnOffYellowButtonLight() {
    clearBackgroundColor(this.yellowButton);
  }

  darkenBlueButton() {
    darken(this.blueButton);
  }

  undarkenBlueButton() {
    setBlueBackground(this.blueButton);
  }

  darkenRedButton() {
    darken(this.redButton);
  }

  undarkenRedButton() {
    setRedBackground(this.redButton);
  }

  darkenGreenButton() {
    darken(this.greenButton);
  }

  undarkenGreenButton() {
    setGreenBackground(this.greenButton);
  }

  darkenYellowButton() {
    darken(this.yellowButton);
  }

  undarkenYellowButton() {
    setYellowBackground(this.yellowButton);
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
