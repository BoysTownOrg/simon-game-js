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
    }

    class WebAudioContext {
      constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
      }

      currentTimeSeconds() {
        return this.audioContext.currentTime;
      }

      createToneGenerator() {
        return new WebAudioOscillator(this.audioContext);
      }
    }

    class WebAudioOscillator {
      constructor(audioContext) {
        this.oscillator = audioContext.createOscillator();
      }

      startPlayingAndStopAtSeconds(start, stop) {
        this.oscillator.start(start);
        this.oscillator.stop(stop);
      }

      setFrequencyHz(f) {
        this.oscillator.frequency.value = f;
      }
    }

    let screen = new CognitionScreen(display_element);
    jsPsych.finishTrial();
  };
  return plugin;
})();
