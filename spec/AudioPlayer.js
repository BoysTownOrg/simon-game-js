import { AudioPlayer } from "../lib/AudioPlayer.js";
import { Color } from "../lib/Color.js";

class AudioEnvironmentStub {
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

function setToneFrequenciesHz(player, frequencies) {
  player.setToneFrequenciesHz(frequencies);
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

describe("AudioPlayer", function () {
  it("should schedule color tones to be played in succession", function () {
    let audioEnvironment = new AudioEnvironmentStub();
    let yellowToneGenerator = new ToneGeneratorStub();
    let greenToneGenerator = new ToneGeneratorStub();
    let redToneGenerator = new ToneGeneratorStub();
    let blueToneGenerator = new ToneGeneratorStub();
    setToneGenerators(audioEnvironment, [
      yellowToneGenerator,
      greenToneGenerator,
      redToneGenerator,
      blueToneGenerator,
    ]);
    let player = new AudioPlayer(audioEnvironment);
    setToneFrequenciesHz(
      player,
      new Map([
        [Color.blue, 1],
        [Color.red, 2],
        [Color.yellow, 3],
        [Color.green, 4],
      ])
    );
    setPlayDelaySeconds(player, 5);
    setCurrentTimeSeconds(audioEnvironment, 6);
    play(
      player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      redToneGenerator,
      5 + 6,
      5 + 6 + 7
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      greenToneGenerator,
      5 + 6 + 7 + 8,
      5 + 6 + 7 + 8 + 7
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      blueToneGenerator,
      5 + 6 + 7 + 8 + 7 + 8,
      5 + 6 + 7 + 8 + 7 + 8 + 7
    );
    expectToneGeneratorStartAndStopTimesSeconds(
      yellowToneGenerator,
      5 + 6 + 7 + 8 + 7 + 8 + 7 + 8,
      5 + 6 + 7 + 8 + 7 + 8 + 7 + 8 + 7
    );
  });
});
