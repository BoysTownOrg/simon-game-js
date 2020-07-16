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

    let screen = new CognitionScreen(display_element);
    let audioEnvironment = new WebAudioContext();
    jsPsych.finishTrial();
  };
  return plugin;
})();
