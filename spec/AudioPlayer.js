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
    this.scheduledToneOnEnds = [];
  }

  setCurrentTimeSeconds(x) {
    this.currentTimeSeconds_ = x;
  }

  currentTimeSeconds() {
    return this.currentTimeSeconds_;
  }

  scheduleTone(startTimeSeconds, stopTimeSeconds, frequencyHz, onEnd) {
    this.scheduledTones_.push(
      scheduledTone(startTimeSeconds, stopTimeSeconds, frequencyHz)
    );
    this.scheduledToneOnEnds.push(onEnd);
  }

  scheduledTones() {
    return this.scheduledTones_;
  }

  endNextTone() {
    let onEnd = this.scheduledToneOnEnds.shift();
    onEnd();
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

function scheduledTones(audioEnvironment) {
  return audioEnvironment.scheduledTones();
}

function endNextTone(audioEnvironment) {
  audioEnvironment.endNextTone();
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

  it("should schedule first color tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    expectScheduledTonesContains(this.audioEnvironment, 5 + 6, 5 + 6 + 7, 2);
  });

  it("should schedule silence before first tone", function () {
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

  it("should schedule second silence after first completes", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    endNextTone(this.audioEnvironment);
    expectScheduledTonesContains(
      this.audioEnvironment,
      5 + 6 + 7,
      5 + 6 + 7 + 8,
      0
    );
  });

  it("should schedule second tone after first completes", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expectScheduledTonesContains(
      this.audioEnvironment,
      5 + 6 + 7 + 8,
      5 + 6 + 7 + 8 + 7,
      4
    );
  });
});
