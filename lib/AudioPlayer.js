import { Color } from "./Color.js";

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

  onToneEnd(endTimeSeconds) {
    if (this.scheduleSilenceNext) {
      if (this.listener != undefined) {
        switch (this.currentToneColor) {
          case Color.red:
            this.listener.notifyThatRedToneStarted();
            break;
          case Color.green:
            break;
          case Color.yellow:
            break;
          case Color.blue:
            break;
        }
      }
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
      if (this.listener != undefined) {
        switch (this.currentToneColor) {
          case Color.red:
            this.listener.notifyThatRedToneEnded();
            break;
          case Color.green:
            break;
          case Color.yellow:
            break;
          case Color.blue:
            break;
        }
      }
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
    }
  }

  subscribe(listener) {
    this.listener = listener;
  }
}
