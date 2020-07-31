import * as simonGame from "../lib/index.js";

function audioGain() {
  return 0;
}

function addClickEventListener(button, f) {
  button.addEventListener("mousedown", f);
}

function element() {
  return document.createElement("div");
}

function pixelsString(a) {
  return a + "px";
}

function toneButtonWidthPixels() {
  return 200;
}

function borderedCircleButton() {
  const button = element();
  const diameterPixels = toneButtonWidthPixels();
  const borderWidthPixels = 4;
  button.style.height = pixelsString(diameterPixels);
  button.style.width = pixelsString(diameterPixels);
  button.style.borderRadius = pixelsString(
    diameterPixels / 2 + borderWidthPixels
  );
  button.style.border = pixelsString(borderWidthPixels) + " solid black";
  button.style.margin = "auto";
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

function clear(parent) {
  // https://stackoverflow.com/a/3955238
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

class JsPsychTrial {
  conclude(result) {
    jsPsych.finishTrial(result);
  }
}

class PerformanceTimer {
  milliseconds() {
    return performance.now();
  }
}

class CognitionScreenColoredCircles {
  constructor(parent, colorOrderMap) {
    this.parent = parent;
    const grid = element();
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gridTemplateRows = "repeat(3, 1fr)";
    this.greenButton = borderedCircleButton();
    this.redButton = borderedCircleButton();
    this.blueButton = borderedCircleButton();
    this.yellowButton = borderedCircleButton();
    this.doneButton = element();
    this.doneButton.style.border = "solid";
    this.doneButton.textContent = "Done";
    this.doneButton.style.visibility = "hidden";
    this.doneButton.style.margin = "auto";
    this.doneButton.style.fontSize = pixelsString(32);
    this.doneButton.style.alignSelf = "center";
    this.doneButton.style.cursor = "default";
    this.doneButton.style.padding = pixelsString(10);
    const colorButtons = new Array(4);
    colorButtons[colorOrderMap.get(simonGame.Color.red)] = this.redButton;
    colorButtons[colorOrderMap.get(simonGame.Color.green)] = this.greenButton;
    colorButtons[colorOrderMap.get(simonGame.Color.yellow)] = this.yellowButton;
    colorButtons[colorOrderMap.get(simonGame.Color.blue)] = this.blueButton;
    adopt(parent, grid);
    colorButtons[0].style.gridRow = 1;
    colorButtons[0].style.gridColumn = 2;
    adopt(grid, colorButtons[0]);
    colorButtons[1].style.gridRow = 2;
    colorButtons[1].style.gridColumn = 1;
    adopt(grid, colorButtons[1]);
    this.doneButton.style.gridRow = 2;
    this.doneButton.style.gridColumn = 2;
    adopt(grid, this.doneButton);
    colorButtons[2].style.gridRow = 2;
    colorButtons[2].style.gridColumn = 3;
    adopt(grid, colorButtons[2]);
    colorButtons[3].style.gridRow = 3;
    colorButtons[3].style.gridColumn = 2;
    adopt(grid, colorButtons[3]);
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

  showDoneButton() {
    this.doneButton.style.visibility = "visible";
  }

  clear() {
    clear(this.parent);
  }
}

function borderedSquareButton() {
  const button = element();
  const width = toneButtonWidthPixels();
  const borderWidthPixels = 4;
  button.style.height = pixelsString(width);
  button.style.width = pixelsString(width);
  button.style.border = pixelsString(borderWidthPixels) + " solid black";
  button.style.margin = "auto";
  return button;
}

class CognitionScreenBlackSquares {
  constructor(parent, colorOrderMap) {
    this.parent = parent;
    const grid = element();
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gridTemplateRows = "repeat(3, 1fr)";
    this.greenButton = borderedSquareButton();
    this.redButton = borderedSquareButton();
    this.blueButton = borderedSquareButton();
    this.yellowButton = borderedSquareButton();
    this.doneButton = element();
    this.doneButton.style.border = "solid";
    this.doneButton.textContent = "Done";
    this.doneButton.style.visibility = "hidden";
    this.doneButton.style.margin = "auto";
    this.doneButton.style.fontSize = pixelsString(32);
    this.doneButton.style.alignSelf = "center";
    this.doneButton.style.cursor = "default";
    this.doneButton.style.padding = pixelsString(10);
    const colorButtons = new Array(4);
    colorButtons[colorOrderMap.get(simonGame.Color.red)] = this.redButton;
    colorButtons[colorOrderMap.get(simonGame.Color.green)] = this.greenButton;
    colorButtons[colorOrderMap.get(simonGame.Color.yellow)] = this.yellowButton;
    colorButtons[colorOrderMap.get(simonGame.Color.blue)] = this.blueButton;
    adopt(parent, grid);
    colorButtons[0].style.gridRow = 1;
    colorButtons[0].style.gridColumn = 1;
    adopt(grid, colorButtons[0]);
    colorButtons[1].style.gridRow = 1;
    colorButtons[1].style.gridColumn = 3;
    adopt(grid, colorButtons[1]);
    this.doneButton.style.gridRow = 2;
    this.doneButton.style.gridColumn = 2;
    adopt(grid, this.doneButton);
    colorButtons[2].style.gridRow = 3;
    colorButtons[2].style.gridColumn = 1;
    adopt(grid, colorButtons[2]);
    colorButtons[3].style.gridRow = 3;
    colorButtons[3].style.gridColumn = 3;
    adopt(grid, colorButtons[3]);
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
    });
  }

  subscribe(e) {
    this.listener = e;
  }

  turnOnRedButtonLight() {
    darken(this.redButton);
  }

  turnOffRedButtonLight() {
    clearBackgroundColor(this.redButton);
  }

  turnOnGreenButtonLight() {
    darken(this.greenButton);
  }

  turnOffGreenButtonLight() {
    clearBackgroundColor(this.greenButton);
  }

  turnOnBlueButtonLight() {
    darken(this.blueButton);
  }

  turnOffBlueButtonLight() {
    clearBackgroundColor(this.blueButton);
  }

  turnOnYellowButtonLight() {
    darken(this.yellowButton);
  }

  turnOffYellowButtonLight() {
    clearBackgroundColor(this.yellowButton);
  }

  darkenBlueButton() {
    clearBackgroundColor(this.blueButton);
  }

  undarkenBlueButton() {
    darken(this.blueButton);
  }

  darkenRedButton() {
    clearBackgroundColor(this.redButton);
  }

  undarkenRedButton() {
    darken(this.redButton);
  }

  darkenGreenButton() {
    clearBackgroundColor(this.greenButton);
  }

  undarkenGreenButton() {
    darken(this.greenButton);
  }

  darkenYellowButton() {
    clearBackgroundColor(this.yellowButton);
  }

  undarkenYellowButton() {
    darken(this.yellowButton);
  }

  showDoneButton() {
    this.doneButton.style.visibility = "visible";
  }

  clear() {
    clear(this.parent);
  }
}

class WebAudioContext {
  constructor() {
    // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  }

  currentTimeSeconds() {
    return this.audioContext.currentTime;
  }

  scheduleTone(startTimeSeconds, stopTimeSeconds, frequencyHz, onEnd) {
    // https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.value = frequencyHz;
    oscillator.onended = onEnd;
    const gain = this.audioContext.createGain();
    gain.gain.value = audioGain();
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    oscillator.start(startTimeSeconds);
    oscillator.stop(stopTimeSeconds);
  }
}

function toneFrequenciesHz() {
  return new Map([
    [simonGame.Color.green, 391.995],
    [simonGame.Color.red, 329.628],
    [simonGame.Color.yellow, 261.626],
    [simonGame.Color.blue, 195.998],
  ]);
}

function incorrectToneFrequencyHz() {
  return 48.9994;
}

function plugin(colorOrderMap, Screen) {
  let plugin = {};
  plugin.info = {
    parameters: {
      colors: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined,
        array: true,
      },
    },
  };
  const audioPlayer = new simonGame.AudioPlayer(
    new WebAudioContext(),
    toneFrequenciesHz(),
    incorrectToneFrequencyHz()
  );
  audioPlayer.setPlayDelaySeconds(0.003);
  audioPlayer.setToneSeriesDelaySeconds(0.5);
  plugin.trial = function (display_element, trial) {
    clear(display_element);
    const screen = new Screen(display_element, colorOrderMap);
    const simon = new simonGame.Simon(
      audioPlayer,
      screen,
      new JsPsychTrial(),
      new PerformanceTimer()
    );
    simon.setLongToneDurationMilliseconds(700);
    simon.setShortToneDurationMilliseconds(100);
    simon.setToneOffsetToNextOnsetDurationMilliseconds(700);
    new simonGame.ScreenResponder(screen, simon);
    simon.say(trial.colors);
  };
  return plugin;
}

export function coloredCircles(colorOrderMap) {
  return plugin(colorOrderMap, CognitionScreenColoredCircles);
}

export function blackSquares(colorOrderMap) {
  return plugin(colorOrderMap, CognitionScreenBlackSquares);
}
