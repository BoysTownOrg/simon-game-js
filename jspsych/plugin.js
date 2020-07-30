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

function borderedCircleButton() {
  const button = element();
  const diameterPixels = 300;
  const borderWidthPixels = 4;
  button.style.height = pixelsString(diameterPixels);
  button.style.width = pixelsString(diameterPixels);
  button.style.borderRadius = pixelsString(
    diameterPixels / 2 + borderWidthPixels
  );
  button.style.border = pixelsString(borderWidthPixels) + " solid black";
  button.style.margin = pixelsString(20);
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

class CognitionScreen {
  constructor(parent, colorOrderMap) {
    this.parent = parent;
    this.greenButton = borderedCircleButton();
    this.redButton = borderedCircleButton();
    this.blueButton = borderedCircleButton();
    this.yellowButton = borderedCircleButton();
    this.doneButton = element();
    this.doneButton.style.border = "solid";
    this.doneButton.textContent = "Done";
    this.doneButton.style.visibility = "hidden";
    this.doneButton.style.lineHeight = pixelsString(50);
    this.doneButton.style.height = pixelsString(50);
    this.doneButton.style.width = pixelsString(100);
    this.doneButton.style.marginLeft = pixelsString(150);
    this.doneButton.style.marginRight = pixelsString(150);
    this.doneButton.style.fontSize = pixelsString(32);
    this.doneButton.style.alignSelf = "center";
    this.doneButton.style.cursor = "default";
    const colorButtons = new Array(4);
    colorButtons[colorOrderMap.get(simonGame.Color.red)] = this.redButton;
    colorButtons[colorOrderMap.get(simonGame.Color.green)] = this.greenButton;
    colorButtons[colorOrderMap.get(simonGame.Color.yellow)] = this.yellowButton;
    colorButtons[colorOrderMap.get(simonGame.Color.blue)] = this.blueButton;
    const topRow = element();
    topRow.style.display = "inline-flex";
    adopt(parent, topRow);
    adopt(topRow, colorButtons[0]);
    const middleRow = element();
    middleRow.style.display = "flex";
    adopt(parent, middleRow);
    adopt(middleRow, colorButtons[1]);
    adopt(middleRow, this.doneButton);
    adopt(middleRow, colorButtons[2]);
    const bottomRow = element();
    bottomRow.style.display = "inline-flex";
    adopt(parent, bottomRow);
    adopt(bottomRow, colorButtons[3]);
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
  const width = 300;
  const borderWidthPixels = 4;
  button.style.height = pixelsString(width);
  button.style.width = pixelsString(width);
  button.style.border = pixelsString(borderWidthPixels) + " solid black";
  button.style.margin = pixelsString(20);
  return button;
}

class CognitionScreenBlackSquares {
  constructor(parent, colorOrderMap) {
    this.parent = parent;
    this.greenButton = borderedSquareButton();
    this.redButton = borderedSquareButton();
    this.blueButton = borderedSquareButton();
    this.yellowButton = borderedSquareButton();
    this.doneButton = element();
    this.doneButton.style.border = "solid";
    this.doneButton.textContent = "Done";
    this.doneButton.style.visibility = "hidden";
    this.doneButton.style.lineHeight = pixelsString(50);
    this.doneButton.style.height = pixelsString(50);
    this.doneButton.style.width = pixelsString(100);
    this.doneButton.style.marginLeft = pixelsString(150);
    this.doneButton.style.marginRight = pixelsString(150);
    this.doneButton.style.fontSize = pixelsString(32);
    this.doneButton.style.alignSelf = "center";
    this.doneButton.style.cursor = "default";
    const colorButtons = new Array(4);
    colorButtons[colorOrderMap.get(simonGame.Color.red)] = this.redButton;
    colorButtons[colorOrderMap.get(simonGame.Color.green)] = this.greenButton;
    colorButtons[colorOrderMap.get(simonGame.Color.yellow)] = this.yellowButton;
    colorButtons[colorOrderMap.get(simonGame.Color.blue)] = this.blueButton;
    const topRow = element();
    topRow.style.display = "inline-flex";
    adopt(parent, topRow);
    adopt(topRow, colorButtons[0]);
    adopt(topRow, colorButtons[1]);
    const middleRow = element();
    middleRow.style.display = "flex";
    adopt(parent, middleRow);
    adopt(middleRow, this.doneButton);
    const bottomRow = element();
    bottomRow.style.display = "inline-flex";
    adopt(parent, bottomRow);
    adopt(middleRow, colorButtons[2]);
    adopt(middleRow, colorButtons[3]);
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
    darken(this.blueButton);
  }

  undarkenBlueButton() {
    darken(this.blueButton);
  }

  darkenRedButton() {
    darken(this.redButton);
  }

  undarkenRedButton() {
    darken(this.redButton);
  }

  darkenGreenButton() {
    darken(this.greenButton);
  }

  undarkenGreenButton() {
    darken(this.greenButton);
  }

  darkenYellowButton() {
    darken(this.yellowButton);
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

export function plugin(colorOrderMap) {
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
  const simon = new simonGame.Simon(audioPlayer, new JsPsychTrial());
  simon.setLongToneDurationMilliseconds(700);
  simon.setShortToneDurationMilliseconds(100);
  simon.setToneOffsetToNextOnsetDurationMilliseconds(700);
  plugin.trial = function (display_element, trial) {
    clear(display_element);
    const screen = new CognitionScreen(display_element, colorOrderMap);
    new simonGame.ScreenResponder(screen, simon);
    const presenter = new simonGame.ScreenPresenter(screen);
    audioPlayer.subscribe(presenter);
    simon.subscribe(presenter);
    simon.say(trial.colors);
  };
  return plugin;
}

export function blackSquares(colorOrderMap) {
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
  const simon = new simonGame.Simon(audioPlayer, new JsPsychTrial());
  simon.setLongToneDurationMilliseconds(700);
  simon.setShortToneDurationMilliseconds(100);
  simon.setToneOffsetToNextOnsetDurationMilliseconds(700);
  plugin.trial = function (display_element, trial) {
    clear(display_element);
    const screen = new CognitionScreenBlackSquares(
      display_element,
      colorOrderMap
    );
    new simonGame.ScreenResponder(screen, simon);
    const presenter = new simonGame.ScreenPresenter(screen);
    audioPlayer.subscribe(presenter);
    simon.subscribe(presenter);
    simon.say(trial.colors);
  };
  return plugin;
}
