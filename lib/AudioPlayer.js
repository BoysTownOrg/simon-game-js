import { Color } from "./Color.js";

class RedToneNotifier {
  notifyStart(listener) {
    listener.notifyThatRedToneStarted();
  }

  notifyEnd(listener) {
    listener.notifyThatRedToneEnded();
  }

  notifyCorrectStart(listener) {
    listener.notifyThatCorrectRedToneStarted();
  }
}

class BlueToneNotifier {
  notifyStart(listener) {
    listener.notifyThatBlueToneStarted();
  }

  notifyEnd(listener) {
    listener.notifyThatBlueToneEnded();
  }

  notifyCorrectStart(listener) {
    listener.notifyThatCorrectBlueToneStarted();
  }
}

class GreenToneNotifier {
  notifyStart(listener) {
    listener.notifyThatGreenToneStarted();
  }

  notifyEnd(listener) {
    listener.notifyThatGreenToneEnded();
  }

  notifyCorrectStart(listener) {
    listener.notifyThatCorrectGreenToneStarted();
  }
}

class YellowToneNotifier {
  notifyStart(listener) {
    listener.notifyThatYellowToneStarted();
  }

  notifyEnd(listener) {
    listener.notifyThatYellowToneEnded();
  }

  notifyCorrectStart(listener) {
    listener.notifyThatCorrectYellowToneStarted();
  }
}

function toneNotifier(color) {
  switch (color) {
    case Color.red:
      return new RedToneNotifier();
    case Color.green:
      return new GreenToneNotifier();
    case Color.yellow:
      return new YellowToneNotifier();
    case Color.blue:
      return new BlueToneNotifier();
  }
}

function scheduleTone(
  audioEnvironment,
  startTimeSeconds,
  stopTimeSeconds,
  frequencyHz,
  onEnd
) {
  audioEnvironment.scheduleTone(
    startTimeSeconds,
    stopTimeSeconds,
    frequencyHz,
    function () {
      onEnd(stopTimeSeconds);
    }
  );
}

function seconds(milliseconds) {
  return milliseconds / 1000;
}

function callIfDefined(listener, f) {
  if (listener != undefined) f(listener);
}

function notifyThatToneEndedIfDefined(listener, toneColor) {
  callIfDefined(listener, (listener) => {
    toneNotifier(toneColor).notifyEnd(listener);
  });
}

function scheduleSilenceFollowedByTone(
  audioEnvironment,
  playDelaySeconds,
  toneDurationMilliseconds,
  frequencyHz,
  onEnd
) {
  const currentTimeSeconds = audioEnvironment.currentTimeSeconds();
  const firstToneStartSeconds = playDelaySeconds + currentTimeSeconds;
  scheduleTone(
    audioEnvironment,
    currentTimeSeconds,
    firstToneStartSeconds,
    0,
    onEnd
  );
  scheduleTone(
    audioEnvironment,
    firstToneStartSeconds,
    firstToneStartSeconds + seconds(toneDurationMilliseconds),
    frequencyHz,
    onEnd
  );
}

export class AudioPlayer {
  constructor(audioEnvironment, frequenciesHz) {
    this.audioEnvironment = audioEnvironment;
    this.frequenciesHz = frequenciesHz;
  }

  play(
    toneColors,
    toneDurationMilliseconds,
    toneOffsetToNextOnsetDurationMilliseconds
  ) {
    this.toneColors = toneColors;
    this.toneDurationSeconds = seconds(toneDurationMilliseconds);
    this.toneOffsetToNextOnsetDurationSeconds = seconds(
      toneOffsetToNextOnsetDurationMilliseconds
    );
    const currentTimeSeconds = this.audioEnvironment.currentTimeSeconds();
    const firstToneStartSeconds = this.playDelaySeconds + currentTimeSeconds;
    this.currentToneColor = this.toneColors.shift();
    scheduleTone(
      this.audioEnvironment,
      currentTimeSeconds,
      firstToneStartSeconds,
      0,
      this.onToneEnd.bind(this)
    );
    scheduleTone(
      this.audioEnvironment,
      firstToneStartSeconds,
      firstToneStartSeconds + this.toneDurationSeconds,
      this.frequenciesHz.get(this.currentToneColor),
      this.onToneEnd.bind(this)
    );
    this.scheduleSilenceNext = true;
  }

  setPlayDelaySeconds(x) {
    this.playDelaySeconds = x;
  }

  playCorrectYellowTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.yellow;
    scheduleSilenceFollowedByTone(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz.get(Color.yellow),
      this.onCorrectToneEnd.bind(this)
    );
  }

  playCorrectBlueTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.blue;
    scheduleSilenceFollowedByTone(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz.get(Color.blue),
      this.onCorrectToneEnd.bind(this)
    );
  }

  playCorrectGreenTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.green;
    scheduleSilenceFollowedByTone(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz.get(Color.green),
      this.onCorrectToneEnd.bind(this)
    );
  }

  playCorrectRedTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.red;
    scheduleSilenceFollowedByTone(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz.get(Color.red),
      this.onCorrectToneEnd.bind(this)
    );
  }

  onCorrectToneEnd(endTimeSeconds) {
    callIfDefined(this.listener, (listener) => {
      toneNotifier(this.currentToneColor).notifyCorrectStart(listener);
    });
  }

  onToneEnd(endTimeSeconds) {
    if (this.scheduleSilenceNext) {
      callIfDefined(this.listener, (listener) => {
        toneNotifier(this.currentToneColor).notifyStart(listener);
      });
      const startTimeSeconds = endTimeSeconds + this.toneDurationSeconds;
      scheduleTone(
        this.audioEnvironment,
        startTimeSeconds,
        startTimeSeconds + this.toneOffsetToNextOnsetDurationSeconds,
        0,
        this.onToneEnd.bind(this)
      );
      this.scheduleSilenceNext = false;
    } else if (this.toneColors.length > 0) {
      notifyThatToneEndedIfDefined(this.listener, this.currentToneColor);
      this.currentToneColor = this.toneColors.shift();
      const startTimeSeconds =
        endTimeSeconds + this.toneOffsetToNextOnsetDurationSeconds;
      scheduleTone(
        this.audioEnvironment,
        startTimeSeconds,
        startTimeSeconds + this.toneDurationSeconds,
        this.frequenciesHz.get(this.currentToneColor),
        this.onToneEnd.bind(this)
      );
      this.scheduleSilenceNext = true;
    } else if (this.finalColorToneFinished) {
      callIfDefined(this.listener, (listener) => {
        listener.notifyThatToneSeriesEnded();
      });
      this.finalColorToneFinished = false;
    } else {
      notifyThatToneEndedIfDefined(this.listener, this.currentToneColor);
      this.finalColorToneFinished = true;
    }
  }

  subscribe(listener) {
    this.listener = listener;
  }
}
