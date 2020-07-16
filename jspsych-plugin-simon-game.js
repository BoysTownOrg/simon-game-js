import { AudioPlayer } from "./lib/AudioPlayer.js";
import { ScreenPresenter } from "./lib/ScreenPresenter.js";
import { Color } from "./lib/Color.js";

const pluginName = "simon-game";
jsPsych.plugins[pluginName] = (function () {
  var plugin = {};
  plugin.info = {
    name: pluginName,
    description: "",
    parameters: {},
  };
  plugin.trial = function (display_element, trial) {
    function addClickEventListener(button, f) {
      this.redButton.addEventListener("click", f);
    }

    function createButton() {
      return document.createElement("div");
    }

    function adopt(parent, child) {
      parent.append(child);
    }

    class CognitionScreen {
      constructor(display_element) {
        this.greenButton = createButton();
        this.redButton = createButton();
        this.blueButton = createButton();
        this.yellowButton = createButton();
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
        });
      }

      subscribe(e) {
        this.listener = e;
      }

      turnOnRedButtonLight() {}

      turnOffRedButtonLight() {}

      turnOnGreenButtonLight() {}

      turnOffGreenButtonLight() {}

      turnOnBlueButtonLight() {}

      turnOffBlueButtonLight() {}

      turnOnYellowButtonLight() {}

      turnOffYellowButtonLight() {}
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

    const screen = new CognitionScreen(display_element);
    const audioEnvironment = new WebAudioContext();
    const audioPlayer = new AudioPlayer(
      audioEnvironment,
      new Map([
        [Color.green, 391.995],
        [Color.red, 329.628],
        [Color.yellow, 261.626],
        [Color.blue, 195.998],
      ])
    );
    audioPlayer.setPlayDelaySeconds(0.02);
    const presenter = new ScreenPresenter(screen);
    audioPlayer.subscribe(presenter);
    jsPsych.finishTrial();
  };
  return plugin;
})();
