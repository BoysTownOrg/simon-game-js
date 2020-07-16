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

function createToneGeneratorWithFrequencyHz(audioEnvironment, f) {
  let generator = audioEnvironment.createToneGenerator();
  generator.setFrequencyHz(f);
  return generator;
}

function startPlayingAndStopAtSeconds(generator, start, stop) {
  generator.startPlayingAndStopAtSeconds(start, stop);
}

function seconds(milliseconds) {
  return milliseconds / 1000;
}

export class AudioPlayer {
  constructor(audioEnvironment, frequenciesHz) {
    this.audioEnvironment = audioEnvironment;
    this.yellowToneGenerator = createToneGeneratorWithFrequencyHz(
      this.audioEnvironment,
      frequenciesHz.get(Color.yellow)
    );
    this.greenToneGenerator = createToneGeneratorWithFrequencyHz(
      this.audioEnvironment,
      frequenciesHz.get(Color.green)
    );
    this.redToneGenerator = createToneGeneratorWithFrequencyHz(
      this.audioEnvironment,
      frequenciesHz.get(Color.red)
    );
    this.blueToneGenerator = createToneGeneratorWithFrequencyHz(
      this.audioEnvironment,
      frequenciesHz.get(Color.blue)
    );
    this.silenceGenerator = createToneGeneratorWithFrequencyHz(
      this.audioEnvironment,
      0
    );
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
      firstToneStartSeconds + seconds(toneDurationMilliseconds),
      this.frequenciesHz.get(toneColors[0]),
      this.onToneEnd.bind(this)
    );
    for (let i = 0; i < toneColors.length; ++i) {
      let startTimeSeconds =
        firstToneStartSeconds +
        seconds(i * toneDurationMilliseconds) +
        seconds(i * toneOffsetToNextOnsetDurationMilliseconds);
      startPlayingAndStopAtSeconds(
        this.generator(toneColors[i]),
        startTimeSeconds,
        startTimeSeconds + seconds(toneDurationMilliseconds)
      );
    }
    toneColors.shift();
    this.scheduleSilenceNext = true;
  }

  generator(color) {
    switch (color) {
      case Color.red:
        return this.redToneGenerator;
      case Color.green:
        return this.greenToneGenerator;
      case Color.blue:
        return this.blueToneGenerator;
      case Color.yellow:
        return this.yellowToneGenerator;
    }
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
