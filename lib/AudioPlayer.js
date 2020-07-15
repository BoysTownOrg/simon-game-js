import { Color } from "./Color.js";

function createToneGenerator(audioEnvironment) {
  return audioEnvironment.createToneGenerator();
}

function startPlayingAndStopAtSeconds(generator, start, stop) {
  generator.startPlayingAndStopAtSeconds(start, stop);
}

function seconds(milliseconds) {
  return milliseconds / 1000;
}

export class AudioPlayer {
  constructor(audioEnvironment) {
    this.audioEnvironment = audioEnvironment;
    this.yellowToneGenerator = createToneGenerator(this.audioEnvironment);
    this.greenToneGenerator = createToneGenerator(this.audioEnvironment);
    this.redToneGenerator = createToneGenerator(this.audioEnvironment);
    this.blueToneGenerator = createToneGenerator(this.audioEnvironment);
  }

  play(
    toneColors,
    toneDurationMilliseconds,
    toneOffsetToNextOnsetDurationMilliseconds
  ) {
    let currentTimeSeconds = this.audioEnvironment.currentTimeSeconds();
    for (let i = 0; i < toneColors.length; ++i) {
      let startTimeSeconds =
        this.playDelaySeconds +
        currentTimeSeconds +
        seconds(i * toneDurationMilliseconds) +
        seconds(i * toneOffsetToNextOnsetDurationMilliseconds);
      startPlayingAndStopAtSeconds(
        this.generator(toneColors[i]),
        startTimeSeconds,
        startTimeSeconds + seconds(toneDurationMilliseconds)
      );
    }
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

  setToneFrequenciesHz(frequenciesHz) {}

  setPlayDelaySeconds(x) {
    this.playDelaySeconds = x;
  }
}
