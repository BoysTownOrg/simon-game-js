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
        jsPsych.finishTrial();
    };
    return plugin;
})();
