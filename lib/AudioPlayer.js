import { Color } from "./Color.js";

function createToneGenerator(audioEnvironment) {
  return audioEnvironment.createToneGenerator();
}

function startPlayingAndStopAtSeconds(generator, start, stop) {
  generator.startPlayingAndStopAtSeconds(start, stop);
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
      switch (toneColors[i]) {
        case Color.red:
          startPlayingAndStopAtSeconds(
            this.redToneGenerator,
            this.playDelaySeconds +
              currentTimeSeconds +
              (i * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000,
            this.playDelaySeconds +
              currentTimeSeconds +
              ((i + 1) * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000
          );
          break;
        case Color.green:
          startPlayingAndStopAtSeconds(
            this.greenToneGenerator,
            this.playDelaySeconds +
              currentTimeSeconds +
              (i * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000,
            this.playDelaySeconds +
              currentTimeSeconds +
              ((i + 1) * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000
          );
          break;
        case Color.blue:
          startPlayingAndStopAtSeconds(
            this.blueToneGenerator,
            this.playDelaySeconds +
              currentTimeSeconds +
              (i * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000,
            this.playDelaySeconds +
              currentTimeSeconds +
              ((i + 1) * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000
          );
          break;
        case Color.yellow:
          startPlayingAndStopAtSeconds(
            this.yellowToneGenerator,
            this.playDelaySeconds +
              currentTimeSeconds +
              (i * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000,
            this.playDelaySeconds +
              currentTimeSeconds +
              ((i + 1) * toneDurationMilliseconds) / 1000 +
              (i * toneOffsetToNextOnsetDurationMilliseconds) / 1000
          );
          break;
      }
    }
  }

  setToneFrequenciesHz(frequenciesHz) {}

  setPlayDelaySeconds(x) {
    this.playDelaySeconds = x;
  }
}
