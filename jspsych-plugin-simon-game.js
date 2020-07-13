const pluginName = 'simon-game';
jsPsych.plugins[pluginName] = (function () {
    var plugin = {};
    plugin.info = {
        name: pluginName,
        description: '',
        parameters: {
        }
    }
    plugin.trial = function (display_element, trial) {
        class CognitionScreen {
            constructor(display_element) {
                this.greenButton = document.createElement('div');
                this.redButton = document.createElement('div');
                this.blueButton = document.createElement('div');
                this.yellowButton = document.createElement('div');
                this.doneButton = document.createElement('div');
                display_element.append(this.greenButton);
                display_element.append(this.redButton);
                display_element.append(this.blueButton);
                display_element.append(this.yellowButton);
                display_element.append(this.doneButton);
                this.greenButton.addEventListener('click', function (e) {
                    this.listener.notifyThatGreenWasClicked();
                });
                this.redButton.addEventListener('click', function (e) {
                    this.listener.notifyThatRedWasClicked();
                });
                this.blueButton.addEventListener('click', function (e) {
                    this.listener.notifyThatBlueWasClicked();
                });
                this.yellowButton.addEventListener('click', function (e) {
                    this.listener.notifyThatYellowWasClicked();
                });
                this.doneButton.addEventListener('click', function (e) {
                    this.listener.notifyThatDoneWasClicked();
                });
            }

            subscribe(e) { this.listener = e; }
        }
        let screen = new CognitionScreen(display_element);
        jsPsych.finishTrial();
    };
    return plugin;
})();
