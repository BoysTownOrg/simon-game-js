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

  notifyCorrectEnd(listener) {
    listener.notifyThatCorrectRedToneEnded();
  }

  notifyIncorrectStart(listener) {
    listener.notifyThatIncorrectRedToneStarted();
  }

  notifyIncorrectEnd(listener) {
    listener.notifyThatIncorrectRedToneEnded();
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

  notifyCorrectEnd(listener) {
    listener.notifyThatCorrectBlueToneEnded();
  }

  notifyIncorrectStart(listener) {
    listener.notifyThatIncorrectBlueToneStarted();
  }

  notifyIncorrectEnd(listener) {
    listener.notifyThatIncorrectBlueToneEnded();
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

  notifyCorrectEnd(listener) {
    listener.notifyThatCorrectGreenToneEnded();
  }

  notifyIncorrectStart(listener) {
    listener.notifyThatIncorrectGreenToneStarted();
  }

  notifyIncorrectEnd(listener) {
    listener.notifyThatIncorrectGreenToneEnded();
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

  notifyCorrectEnd(listener) {
    listener.notifyThatCorrectYellowToneEnded();
  }

  notifyIncorrectStart(listener) {
    listener.notifyThatIncorrectYellowToneStarted();
  }

  notifyIncorrectEnd(listener) {
    listener.notifyThatIncorrectYellowToneEnded();
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
    onEnd
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
  currentTimeSeconds,
  playDelaySeconds,
  toneDurationMilliseconds,
  frequencyHz,
  onEnd
) {
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

function scheduleSilenceFollowedByToneFromNow(
  audioEnvironment,
  playDelaySeconds,
  toneDurationMilliseconds,
  frequenciesHz,
  toneColor,
  onEnd
) {
  scheduleSilenceFollowedByTone(
    audioEnvironment,
    audioEnvironment.currentTimeSeconds(),
    playDelaySeconds,
    toneDurationMilliseconds,
    frequenciesHz.get(toneColor),
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
    const toneDurationSeconds = seconds(toneDurationMilliseconds);
    const toneOffsetToNextOnsetDurationSeconds = seconds(
      toneOffsetToNextOnsetDurationMilliseconds
    );
    const currentTimeSeconds = this.audioEnvironment.currentTimeSeconds();
    const firstToneStartSeconds = this.playDelaySeconds + currentTimeSeconds;
    this.colorToneAboutToStart = true;
    scheduleTone(
      this.audioEnvironment,
      currentTimeSeconds,
      firstToneStartSeconds,
      0,
      this.onSequencedToneEnd.bind(this)
    );
    for (let i = 0; i < toneColors.length; ++i) {
      scheduleTone(
        this.audioEnvironment,
        firstToneStartSeconds +
          i * (toneDurationSeconds + toneOffsetToNextOnsetDurationSeconds),
        firstToneStartSeconds +
          (i + 1) * toneDurationSeconds +
          i * toneOffsetToNextOnsetDurationSeconds,
        this.frequenciesHz.get(toneColors[i]),
        this.onSequencedToneEnd.bind(this)
      );
      scheduleTone(
        this.audioEnvironment,
        firstToneStartSeconds +
          (i + 1) * toneDurationSeconds +
          i * toneOffsetToNextOnsetDurationSeconds,
        firstToneStartSeconds +
          (i + 1) *
            (toneDurationSeconds + toneOffsetToNextOnsetDurationSeconds),
        0,
        this.onSequencedToneEnd.bind(this)
      );
    }
    this.currentToneColor = this.toneColors.shift();
  }

  setPlayDelaySeconds(x) {
    this.playDelaySeconds = x;
  }

  playCorrectYellowTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.yellow;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onCorrectToneEnd.bind(this)
    );
  }

  playCorrectBlueTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.blue;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onCorrectToneEnd.bind(this)
    );
  }

  playCorrectGreenTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.green;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onCorrectToneEnd.bind(this)
    );
  }

  playCorrectRedTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.red;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onCorrectToneEnd.bind(this)
    );
  }

  onCorrectToneEnd() {
    if (this.colorToneAboutToStart) {
      callIfDefined(this.listener, (listener) => {
        toneNotifier(this.currentToneColor).notifyCorrectStart(listener);
      });
      this.colorToneAboutToStart = false;
    } else {
      callIfDefined(this.listener, (listener) => {
        toneNotifier(this.currentToneColor).notifyCorrectEnd(listener);
      });
    }
  }

  playIncorrectYellowTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.yellow;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onIncorrectToneEnd.bind(this)
    );
  }

  playIncorrectBlueTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.blue;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onIncorrectToneEnd.bind(this)
    );
  }

  playIncorrectGreenTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.green;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onIncorrectToneEnd.bind(this)
    );
  }

  playIncorrectRedTone(toneDurationMilliseconds) {
    this.currentToneColor = Color.red;
    this.colorToneAboutToStart = true;
    scheduleSilenceFollowedByToneFromNow(
      this.audioEnvironment,
      this.playDelaySeconds,
      toneDurationMilliseconds,
      this.frequenciesHz,
      this.currentToneColor,
      this.onIncorrectToneEnd.bind(this)
    );
  }

  onIncorrectToneEnd() {
    if (this.colorToneAboutToStart) {
      callIfDefined(this.listener, (listener) => {
        toneNotifier(this.currentToneColor).notifyIncorrectStart(listener);
      });
      this.colorToneAboutToStart = false;
    } else {
      callIfDefined(this.listener, (listener) => {
        toneNotifier(this.currentToneColor).notifyIncorrectEnd(listener);
      });
    }
  }

  onSequencedToneEnd() {
    if (this.colorToneAboutToStart) {
      callIfDefined(this.listener, (listener) => {
        toneNotifier(this.currentToneColor).notifyStart(listener);
      });
      this.colorToneAboutToStart = false;
    } else if (this.toneColors.length > 0) {
      notifyThatToneEndedIfDefined(this.listener, this.currentToneColor);
      this.currentToneColor = this.toneColors.shift();
      this.colorToneAboutToStart = true;
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
