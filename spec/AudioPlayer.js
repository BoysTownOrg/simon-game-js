import { AudioPlayer } from "../lib/AudioPlayer.js";
import { Color } from "../lib/Color.js";

function scheduledTone(startTimeSeconds, stopTimeSeconds, frequencyHz) {
  return {
    startTimeSeconds: startTimeSeconds,
    stopTimeSeconds: stopTimeSeconds,
    frequencyHz: frequencyHz,
  };
}

class AudioEnvironmentStub {
  constructor() {
    this.scheduledTones_ = [];
  }

  setCurrentTimeSeconds(x) {
    this.currentTimeSeconds_ = x;
  }

  currentTimeSeconds() {
    return this.currentTimeSeconds_;
  }

  setToneGenerators(g) {
    this.generators = g;
  }

  createToneGenerator() {
    return this.generators.shift();
  }

  scheduleTone(startTimeSeconds, stopTimeSeconds, frequencyHz) {
    this.scheduledTones_.push(
      scheduledTone(startTimeSeconds, stopTimeSeconds, frequencyHz)
    );
  }

  scheduledTones() {
    return this.scheduledTones_;
  }
}

class ToneGeneratorStub {
  startTimeSeconds() {
    return this.startTimeSeconds_;
  }

  stopTimeSeconds() {
    return this.stopTimeSeconds_;
  }

  startPlayingAndStopAtSeconds(start, stop) {
    this.startTimeSeconds_ = start;
    this.stopTimeSeconds_ = stop;
  }

  frequencyHz() {
    return this.frequencyHz_;
  }

  setFrequencyHz(f) {
    this.frequencyHz_ = f;
  }
}

function play(
  player,
  toneColors,
  toneDurationMilliseconds,
  toneOffsetToNextOnsetDurationMilliseconds
) {
  player.play(
    toneColors,
    toneDurationMilliseconds,
    toneOffsetToNextOnsetDurationMilliseconds
  );
}

function setPlayDelaySeconds(player, x) {
  player.setPlayDelaySeconds(x);
}

function setCurrentTimeSeconds(audioEnvironment, x) {
  audioEnvironment.setCurrentTimeSeconds(x);
}

function setToneGenerators(audioEnvironment, generators) {
  audioEnvironment.setToneGenerators(generators);
}

function expectEqual(a, b) {
  expect(a).toEqual(b);
}

function startTimeSeconds(generator) {
  return generator.startTimeSeconds();
}

function stopTimeSeconds(generator) {
  return generator.stopTimeSeconds();
}

function expectToneGeneratorStartAndStopTimesSeconds(generator, start, stop) {
  expectEqual(startTimeSeconds(generator), start);
  expectEqual(stopTimeSeconds(generator), stop);
}

function frequencyHz(generator) {
  return generator.frequencyHz();
}

function expectToneGeneratorFrequencyHz(generator, f) {
  expectEqual(frequencyHz(generator), f);
}

function scheduledTones(audioEnvironment) {
  return audioEnvironment.scheduledTones();
}

function expectScheduledTonesContains(
  audioEnvironment,
  startTimeSeconds,
  stopTimeSeconds,
  frequencyHz
) {
  expect(scheduledTones(audioEnvironment)).toContain(
    scheduledTone(startTimeSeconds, stopTimeSeconds, frequencyHz)
  );
}

describe("AudioPlayer", function () {
  beforeEach(function () {
    this.audioEnvironment = new AudioEnvironmentStub();
    this.yellowToneGenerator = new ToneGeneratorStub();
    this.greenToneGenerator = new ToneGeneratorStub();
    this.redToneGenerator = new ToneGeneratorStub();
    this.blueToneGenerator = new ToneGeneratorStub();
    this.silenceGenerator = new ToneGeneratorStub();
    setToneGenerators(this.audioEnvironment, [
      this.yellowToneGenerator,
      this.greenToneGenerator,
      this.redToneGenerator,
      this.blueToneGenerator,
      this.silenceGenerator,
    ]);
    this.player = new AudioPlayer(
      this.audioEnvironment,
      new Map([
        [Color.blue, 1],
        [Color.red, 2],
        [Color.yellow, 3],
        [Color.green, 4],
      ])
    );
  });

  it("should set tone generator frequencies", function () {
    expectToneGeneratorFrequencyHz(this.blueToneGenerator, 1);
    expectToneGeneratorFrequencyHz(this.redToneGenerator, 2);
    expectToneGeneratorFrequencyHz(this.yellowToneGenerator, 3);
    expectToneGeneratorFrequencyHz(this.greenToneGenerator, 4);
  });

  it("should schedule color tones to be played in succession", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      this.redToneGenerator,
      5 + 6,
      5 + 6 + 7
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      this.greenToneGenerator,
      5 + 6 + 7 + 8,
      5 + 6 + 7 + 8 + 7
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      this.blueToneGenerator,
      5 + 6 + 7 + 8 + 7 + 8,
      5 + 6 + 7 + 8 + 7 + 8 + 7
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      this.yellowToneGenerator,
      5 + 6 + 7 + 8 + 7 + 8 + 7 + 8,
      5 + 6 + 7 + 8 + 7 + 8 + 7 + 8 + 7
    );
  });

  it("should schedule silence generator to play before first tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    expectScheduledTonesContains(this.audioEnvironment, 6, 5 + 6, 0);
  });
});
