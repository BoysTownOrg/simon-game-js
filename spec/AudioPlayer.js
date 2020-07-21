import { AudioPlayer } from "../lib/AudioPlayer.js";
import { Color } from "../lib/Color.js";

class ColorToneEventListenerStub {
  constructor() {
    this.notifiedThatToneSeriesEnded_ = false;
    this.notifiedThatRedToneStarted_ = false;
    this.notifiedThatRedToneEnded_ = false;
    this.notifiedThatYellowToneStarted_ = false;
    this.notifiedThatYellowToneEnded_ = false;
    this.notifiedThatGreenToneStarted_ = false;
    this.notifiedThatGreenToneEnded_ = false;
    this.notifiedThatBlueToneStarted_ = false;
    this.notifiedThatBlueToneEnded_ = false;
    this.notifiedThatCorrectBlueToneStarted_ = false;
    this.notifiedThatCorrectBlueToneEnded_ = false;
    this.notifiedThatIncorrectBlueToneStarted_ = false;
    this.notifiedThatIncorrectBlueToneEnded_ = false;
  }

  notifiedThatIncorrectBlueToneEnded() {
    return this.notifiedThatIncorrectBlueToneEnded_;
  }

  notifyThatIncorrectBlueToneEnded() {
    this.notifiedThatIncorrectBlueToneEnded_ = true;
  }

  notifiedThatIncorrectBlueToneStarted() {
    return this.notifiedThatIncorrectBlueToneStarted_;
  }

  notifyThatIncorrectBlueToneStarted() {
    this.notifiedThatIncorrectBlueToneStarted_ = true;
  }

  notifiedThatCorrectBlueToneEnded() {
    return this.notifiedThatCorrectBlueToneEnded_;
  }

  notifyThatCorrectBlueToneEnded() {
    this.notifiedThatCorrectBlueToneEnded_ = true;
  }

  notifiedThatCorrectBlueToneStarted() {
    return this.notifiedThatCorrectBlueToneStarted_;
  }

  notifyThatCorrectBlueToneStarted() {
    this.notifiedThatCorrectBlueToneStarted_ = true;
  }

  notifiedThatRedToneStarted() {
    return this.notifiedThatRedToneStarted_;
  }

  notifyThatRedToneStarted() {
    this.notifiedThatRedToneStarted_ = true;
  }

  notifiedThatRedToneEnded() {
    return this.notifiedThatRedToneEnded_;
  }

  notifyThatRedToneEnded() {
    this.notifiedThatRedToneEnded_ = true;
  }

  notifiedThatBlueToneStarted() {
    return this.notifiedThatBlueToneStarted_;
  }

  notifyThatBlueToneStarted() {
    this.notifiedThatBlueToneStarted_ = true;
  }

  notifiedThatBlueToneEnded() {
    return this.notifiedThatBlueToneEnded_;
  }

  notifyThatBlueToneEnded() {
    this.notifiedThatBlueToneEnded_ = true;
  }

  notifiedThatGreenToneStarted() {
    return this.notifiedThatGreenToneStarted_;
  }

  notifyThatGreenToneStarted() {
    this.notifiedThatGreenToneStarted_ = true;
  }

  notifiedThatGreenToneEnded() {
    return this.notifiedThatGreenToneEnded_;
  }

  notifyThatGreenToneEnded() {
    this.notifiedThatGreenToneEnded_ = true;
  }

  notifiedThatYellowToneStarted() {
    return this.notifiedThatYellowToneStarted_;
  }

  notifyThatYellowToneStarted() {
    this.notifiedThatYellowToneStarted_ = true;
  }

  notifiedThatYellowToneEnded() {
    return this.notifiedThatYellowToneEnded_;
  }

  notifyThatYellowToneEnded() {
    this.notifiedThatYellowToneEnded_ = true;
  }

  notifiedThatToneSeriesEnded() {
    return this.notifiedThatToneSeriesEnded_;
  }

  notifyThatToneSeriesEnded() {
    this.notifiedThatToneSeriesEnded_ = true;
  }
}

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

function playCorrectRedTone(player, toneDurationMilliseconds) {
  player.playCorrectRedTone(toneDurationMilliseconds);
}

function playCorrectBlueTone(player, toneDurationMilliseconds) {
  player.playCorrectBlueTone(toneDurationMilliseconds);
}

function playCorrectGreenTone(player, toneDurationMilliseconds) {
  player.playCorrectGreenTone(toneDurationMilliseconds);
}

function playCorrectYellowTone(player, toneDurationMilliseconds) {
  player.playCorrectYellowTone(toneDurationMilliseconds);
}

function playIncorrectBlueTone(player, toneDurationMilliseconds) {
  player.playIncorrectBlueTone(toneDurationMilliseconds);
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

function notifiedThatRedToneStarted(listener) {
  return listener.notifiedThatRedToneStarted();
}

function notifiedThatRedToneEnded(listener) {
  return listener.notifiedThatRedToneEnded();
}

function notifiedThatGreenToneStarted(listener) {
  return listener.notifiedThatGreenToneStarted();
}

function notifiedThatGreenToneEnded(listener) {
  return listener.notifiedThatGreenToneEnded();
}

function notifiedThatYellowToneStarted(listener) {
  return listener.notifiedThatYellowToneStarted();
}

function notifiedThatYellowToneEnded(listener) {
  return listener.notifiedThatYellowToneEnded();
}

function notifiedThatBlueToneStarted(listener) {
  return listener.notifiedThatBlueToneStarted();
}

function notifiedThatBlueToneEnded(listener) {
  return listener.notifiedThatBlueToneEnded();
}

function notifiedThatToneSeriesEnded(listener) {
  return listener.notifiedThatToneSeriesEnded();
}

function notifiedThatCorrectBlueToneStarted(listener) {
  return listener.notifiedThatCorrectBlueToneStarted();
}

function notifiedThatCorrectBlueToneEnded(listener) {
  return listener.notifiedThatCorrectBlueToneEnded();
}

function notifiedThatIncorrectBlueToneStarted(listener) {
  return listener.notifiedThatIncorrectBlueToneStarted();
}

function notifiedThatIncorrectBlueToneEnded(listener) {
  return listener.notifiedThatIncorrectBlueToneEnded();
}

function playing(player) {
  return player.playing();
}

function expectTrue(b) {
  expect(b).toBeTrue();
}

function expectFalse(b) {
  expect(b).toBeFalse();
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
      ]),
      9
    );
  });

  it("should schedule silent tone before playing correct red tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectRedTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 6, 5 + 6, 0);
  });

  it("should schedule correct red tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectRedTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 5 + 6, 5 + 6 + 7, 2);
  });

  it("should schedule silent tone before playing correct yellow tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectYellowTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 6, 5 + 6, 0);
  });

  it("should schedule correct yellow tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectYellowTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 5 + 6, 5 + 6 + 7, 3);
  });

  it("should schedule silent tone before playing correct green tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectGreenTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 6, 5 + 6, 0);
  });

  it("should schedule correct green tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectGreenTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 5 + 6, 5 + 6 + 7, 4);
  });

  it("should schedule silent tone before playing correct blue tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectBlueTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 6, 5 + 6, 0);
  });

  it("should schedule correct blue tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playCorrectBlueTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 5 + 6, 5 + 6 + 7, 1);
  });

  it("should schedule silent tone before playing incorrect blue tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playIncorrectBlueTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 6, 5 + 6, 0);
  });

  it("should schedule incorrect blue tone", function () {
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    playIncorrectBlueTone(this.player, 7000);
    expectScheduledTonesContains(this.audioEnvironment, 5 + 6, 5 + 6 + 7, 9);
  });

  it("should schedule silent tone before first color tone on play", function () {
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

  it("should schedule first color tone on play", function () {
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

  it("should schedule second silent tone after first completes", function () {
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

  it("should schedule second color tone after first completes", function () {
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

  it("should not schedule additional color tone after last completes", function () {
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
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expect(scheduledTones(this.audioEnvironment).length).toEqual(9);
  });

  it("should not schedule additional silent tone after last completes", function () {
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
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expect(scheduledTones(this.audioEnvironment).length).toEqual(9);
  });

  it("should notify when first color tone starts", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    expectFalse(notifiedThatRedToneStarted(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatRedToneStarted(listener));
  });

  it("should notify when second color tone starts", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
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
    expectFalse(notifiedThatGreenToneStarted(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatGreenToneStarted(listener));
  });

  it("should notify when third color tone starts", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
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
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatBlueToneStarted(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatBlueToneStarted(listener));
  });

  it("should notify when fourth color tone starts", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
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
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatYellowToneStarted(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatYellowToneStarted(listener));
  });

  it("should notify when first color tone ends", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
    setPlayDelaySeconds(this.player, 5);
    setCurrentTimeSeconds(this.audioEnvironment, 6);
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatRedToneEnded(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatRedToneEnded(listener));
  });

  it("should notify when second color tone ends", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
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
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatGreenToneEnded(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatGreenToneEnded(listener));
  });

  it("should notify when third color tone ends", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
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
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatBlueToneEnded(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatBlueToneEnded(listener));
  });

  it("should notify when fourth color tone ends", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
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
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatYellowToneEnded(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatYellowToneEnded(listener));
  });

  it("should notify when playing ends", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
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
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatToneSeriesEnded(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatToneSeriesEnded(listener));
  });

  it("is playing until playing ends", function () {
    expectFalse(playing(this.player));
    play(
      this.player,
      [Color.red, Color.green, Color.blue, Color.yellow],
      7000,
      8000
    );
    expectTrue(playing(this.player));
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    endNextTone(this.audioEnvironment);
    expectTrue(playing(this.player));
    endNextTone(this.audioEnvironment);
    expectFalse(playing(this.player));
  });

  it("should notify when correct color tone starts", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
    playCorrectBlueTone(this.player, 7000);
    expectFalse(notifiedThatCorrectBlueToneStarted(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatCorrectBlueToneStarted(listener));
  });

  it("should notify when correct color tone ends", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
    playCorrectBlueTone(this.player, 7000);
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatCorrectBlueToneEnded(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatCorrectBlueToneEnded(listener));
  });

  it("should notify when incorrect color tone starts", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
    playIncorrectBlueTone(this.player, 7000);
    expectFalse(notifiedThatIncorrectBlueToneStarted(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatIncorrectBlueToneStarted(listener));
  });

  it("should notify when incorrect color tone ends", function () {
    const listener = new ColorToneEventListenerStub();
    this.player.subscribe(listener);
    playIncorrectBlueTone(this.player, 7000);
    endNextTone(this.audioEnvironment);
    expectFalse(notifiedThatIncorrectBlueToneEnded(listener));
    endNextTone(this.audioEnvironment);
    expectTrue(notifiedThatIncorrectBlueToneEnded(listener));
  });
});
