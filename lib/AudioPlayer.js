import { Color } from "./Color.js";

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
  }

  play(
    toneColors,
    toneDurationMilliseconds,
    toneOffsetToNextOnsetDurationMilliseconds
  ) {
    let currentTimeSeconds = this.audioEnvironment.currentTimeSeconds();
    startPlayingAndStopAtSeconds(
      this.silenceGenerator,
      currentTimeSeconds,
      this.playDelaySeconds + currentTimeSeconds
    );
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

  setPlayDelaySeconds(x) {
    this.playDelaySeconds = x;
  }
}
