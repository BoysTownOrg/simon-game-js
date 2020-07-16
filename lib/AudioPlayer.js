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
      this.frequenciesHz.get(toneColors[0]),
      this.onToneEnd.bind(this)
    );
    toneColors.shift();
    this.scheduleSilenceNext = true;
  }

  setPlayDelaySeconds(x) {
    this.playDelaySeconds = x;
  }

  onToneEnd(endTimeSeconds) {
    if (this.scheduleSilenceNext) {
      const startTimeSeconds = endTimeSeconds + this.toneDurationSeconds;
      scheduleTone(
        this.audioEnvironment,
        startTimeSeconds,
        startTimeSeconds + this.toneOffsetToNextOnsetDurationSeconds,
        0,
        this.onToneEnd.bind(this)
      );
    } else {
      const startTimeSeconds =
        endTimeSeconds + this.toneOffsetToNextOnsetDurationSeconds;
      scheduleTone(
        this.audioEnvironment,
        startTimeSeconds,
        startTimeSeconds + this.toneDurationSeconds,
        this.frequenciesHz.get(this.toneColors[0]),
        this.onToneEnd.bind(this)
      );
    }
    this.scheduleSilenceNext = !this.scheduleSilenceNext;
  }
}
