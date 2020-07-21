import { Simon } from "./lib/Simon.js";
import { AudioPlayer } from "./lib/AudioPlayer.js";
import { ScreenPresenter } from "./lib/ScreenPresenter.js";
import { ScreenResponder } from "./lib/ScreenResponder.js";
import { Color } from "./lib/Color.js";

function addClickEventListener(button, f) {
  button.addEventListener("click", f);
}

function createButton(color) {
  const button = document.createElement("div");
  button.style.height = "90px";
  button.style.width = "90px";
  button.style.borderRadius = "400px";
  button.style.border = "4px solid " + color;
  button.style.margin = "20px";
  return button;
}

function adopt(parent, child) {
  parent.append(child);
}

class CognitionScreen {
  constructor(display_element) {
    this.greenButton = createButton("green");
    this.redButton = createButton("red");
    this.blueButton = createButton("blue");
    this.yellowButton = createButton("yellow");
    this.doneButton = createButton();
    adopt(display_element, this.greenButton);
    adopt(display_element, this.redButton);
    adopt(display_element, this.blueButton);
    adopt(display_element, this.yellowButton);
    adopt(display_element, this.doneButton);
    addClickEventListener(this.greenButton, function (_e) {
      this.listener.notifyThatGreenWasClicked();
    });
    addClickEventListener(this.redButton, function (_e) {
      this.listener.notifyThatRedWasClicked();
    });
    addClickEventListener(this.blueButton, function (_e) {
      this.listener.notifyThatBlueWasClicked();
    });
    addClickEventListener(this.yellowButton, function (_e) {
      this.listener.notifyThatYellowWasClicked();
    });
    addClickEventListener(this.doneButton, function (_e) {
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

  darkenBlueButton() {}

  undarkenBlueButton() {}

  darkenRedButton() {}

  undarkenRedButton() {}

  darkenGreenButton() {}

  undarkenGreenButton() {}

  darkenYellowButton() {}

  undarkenYellowButton() {}
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
    audioPlayer.setPlayDelaySeconds(0.02);
    const presenter = new ScreenPresenter(screen);
    audioPlayer.subscribe(presenter);
    const simon = new Simon(audioPlayer);
    simon.setLongToneDurationMilliseconds(700);
    simon.setShortToneDurationMilliseconds(100);
    simon.setToneOffsetToNextOnsetDurationMilliseconds(700);
    const responder = new ScreenResponder(screen, simon);
    jsPsych.pluginAPI.setTimeout(function () {
      simon.say([Color.red, Color.green, Color.yellow, Color.blue]);
    }, 1000);
  };
  return plugin;
}
