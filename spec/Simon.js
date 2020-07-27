import { Simon } from "../lib/Simon.js";
import { Color } from "../lib/Color.js";

class TrialStub {
  constructor() {
    this.concluded_ = false;
    this.correct_ = false;
  }

  correct() {
    return this.correct_;
  }

  conclude(result) {
    this.concluded_ = true;
    this.correct_ = result.correct;
  }

  concluded() {
    return this.concluded_;
  }
}

class EventListenerStub {
  constructor() {
    this.notifiedThatTrialHasCompleted_ = false;
  }

  notifiedThatTrialHasCompleted() {
    return this.notifiedThatTrialHasCompleted_;
  }

  notifyThatTrialHasCompleted() {
    this.notifiedThatTrialHasCompleted_ = true;
  }
}

class AudioPlayerStub {
  constructor() {
    this.correctRedTonePlayed_ = false;
    this.incorrectRedTonePlayed_ = false;
    this.correctYellowTonePlayed_ = false;
    this.incorrectYellowTonePlayed_ = false;
    this.correctGreenTonePlayed_ = false;
    this.incorrectGreenTonePlayed_ = false;
    this.correctBlueTonePlayed_ = false;
    this.incorrectBlueTonePlayed_ = false;
    this.correctRedToneDurationMilliseconds_ = 0;
    this.incorrectRedToneDurationMilliseconds_ = 0;
    this.correctYellowToneDurationMilliseconds_ = 0;
    this.incorrectYellowToneDurationMilliseconds_ = 0;
    this.correctGreenToneDurationMilliseconds_ = 0;
    this.incorrectGreenToneDurationMilliseconds_ = 0;
    this.correctBlueToneDurationMilliseconds_ = 0;
    this.incorrectBlueToneDurationMilliseconds_ = 0;
    this.playing_ = false;
  }

  playing() {
    return this.playing_;
  }

  setPlaying() {
    this.playing_ = true;
  }

  play(
    toneColors,
    toneDurationMilliseconds,
    toneOffsetToNextOnsetDurationMilliseconds
  ) {
    this.toneColors_ = toneColors;
    this.toneDurationMilliseconds_ = toneDurationMilliseconds;
    this.toneOffsetToNextOnsetDurationMilliseconds_ = toneOffsetToNextOnsetDurationMilliseconds;
  }

  toneDurationMilliseconds() {
    return this.toneDurationMilliseconds_;
  }

  toneOffsetToNextOnsetDurationMilliseconds() {
    return this.toneOffsetToNextOnsetDurationMilliseconds_;
  }

  toneColors() {
    return this.toneColors_;
  }

  correctRedTonePlayed() {
    return this.correctRedTonePlayed_;
  }

  playCorrectRedTone(s) {
    this.correctRedToneDurationMilliseconds_ = s;
    this.correctRedTonePlayed_ = true;
  }

  correctRedToneDurationMilliseconds() {
    return this.correctRedToneDurationMilliseconds_;
  }

  incorrectRedToneDurationMilliseconds() {
    return this.incorrectRedToneDurationMilliseconds_;
  }

  correctGreenToneDurationMilliseconds() {
    return this.correctGreenToneDurationMilliseconds_;
  }

  incorrectGreenToneDurationMilliseconds() {
    return this.incorrectGreenToneDurationMilliseconds_;
  }

  correctBlueToneDurationMilliseconds() {
    return this.correctBlueToneDurationMilliseconds_;
  }

  incorrectBlueToneDurationMilliseconds() {
    return this.incorrectBlueToneDurationMilliseconds_;
  }

  correctYellowToneDurationMilliseconds() {
    return this.correctYellowToneDurationMilliseconds_;
  }

  incorrectYellowToneDurationMilliseconds() {
    return this.incorrectYellowToneDurationMilliseconds_;
  }

  incorrectRedTonePlayed() {
    return this.incorrectRedTonePlayed_;
  }

  playIncorrectRedTone(s) {
    this.incorrectRedToneDurationMilliseconds_ = s;
    this.incorrectRedTonePlayed_ = true;
  }

  correctBlueTonePlayed() {
    return this.correctBlueTonePlayed_;
  }

  playCorrectBlueTone(s) {
    this.correctBlueToneDurationMilliseconds_ = s;
    this.correctBlueTonePlayed_ = true;
  }

  incorrectBlueTonePlayed() {
    return this.incorrectBlueTonePlayed_;
  }

  playIncorrectBlueTone(s) {
    this.incorrectBlueToneDurationMilliseconds_ = s;
    this.incorrectBlueTonePlayed_ = true;
  }

  correctGreenTonePlayed() {
    return this.correctGreenTonePlayed_;
  }

  playCorrectGreenTone(s) {
    this.correctGreenToneDurationMilliseconds_ = s;
    this.correctGreenTonePlayed_ = true;
  }

  incorrectGreenTonePlayed() {
    return this.incorrectGreenTonePlayed_;
  }

  playIncorrectGreenTone(s) {
    this.incorrectGreenToneDurationMilliseconds_ = s;
    this.incorrectGreenTonePlayed_ = true;
  }

  correctYellowTonePlayed() {
    return this.correctYellowTonePlayed_;
  }

  playCorrectYellowTone(s) {
    this.correctYellowToneDurationMilliseconds_ = s;
    this.correctYellowTonePlayed_ = true;
  }

  incorrectYellowTonePlayed() {
    return this.incorrectYellowTonePlayed_;
  }

  playIncorrectYellowTone(s) {
    this.incorrectYellowToneDurationMilliseconds_ = s;
    this.incorrectYellowTonePlayed_ = true;
  }
}

function say(simon, colors) {
  simon.say(colors);
}

function expectTrue(b) {
  expect(b).toBeTrue();
}

function expectFalse(b) {
  expect(b).toBeFalse();
}

function enterYellow(simon) {
  simon.enterYellow();
}

function enterRed(simon) {
  simon.enterRed();
}

function enterGreen(simon) {
  simon.enterGreen();
}

function enterBlue(simon) {
  simon.enterBlue();
}

function setLongToneDurationMilliseconds(simon, x) {
  simon.setLongToneDurationMilliseconds(x);
}

function setToneOffsetToNextOnsetDurationMilliseconds(simon, x) {
  simon.setToneOffsetToNextOnsetDurationMilliseconds(x);
}

function expectEqual(a, b) {
  expect(a).toEqual(b);
}

function toneDurationMilliseconds(player) {
  return player.toneDurationMilliseconds();
}

function toneOffsetToNextOnsetDurationMilliseconds(player) {
  return player.toneOffsetToNextOnsetDurationMilliseconds();
}

function toneColors(player) {
  return player.toneColors();
}

function correctRedTonePlayed(player) {
  return player.correctRedTonePlayed();
}

function incorrectRedTonePlayed(player) {
  return player.incorrectRedTonePlayed();
}

function correctYellowTonePlayed(player) {
  return player.correctYellowTonePlayed();
}

function incorrectYellowTonePlayed(player) {
  return player.incorrectYellowTonePlayed();
}

function correctGreenTonePlayed(player) {
  return player.correctGreenTonePlayed();
}

function incorrectGreenTonePlayed(player) {
  return player.incorrectGreenTonePlayed();
}

function correctBlueTonePlayed(player) {
  return player.correctBlueTonePlayed();
}

function incorrectBlueTonePlayed(player) {
  return player.incorrectBlueTonePlayed();
}

function setShortToneDurationMilliseconds(simon, x) {
  simon.setShortToneDurationMilliseconds(x);
}

function setPlaying(player) {
  player.setPlaying();
}

function submit(simon) {
  simon.submit();
}

describe("Simon", function () {
  beforeEach(function () {
    this.audioPlayer = new AudioPlayerStub();
    this.trial = new TrialStub();
    this.simon = new Simon(this.audioPlayer, this.trial);
  });

  it("should play the color tones on say", function () {
    setLongToneDurationMilliseconds(this.simon, 1);
    setToneOffsetToNextOnsetDurationMilliseconds(this.simon, 2);
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    expectEqual(toneDurationMilliseconds(this.audioPlayer), 1);
    expectEqual(toneOffsetToNextOnsetDurationMilliseconds(this.audioPlayer), 2);
    expectEqual(toneColors(this.audioPlayer), [
      Color.red,
      Color.green,
      Color.blue,
      Color.yellow,
    ]);
  });

  it("should play correct when red entered and red is correct", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterRed(this.simon);
    expectFalse(incorrectRedTonePlayed(this.audioPlayer));
    expectTrue(correctRedTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.correctRedToneDurationMilliseconds(), 1);
  });

  it("should play correct when green entered and green is correct", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterGreen(this.simon);
    expectFalse(incorrectGreenTonePlayed(this.audioPlayer));
    expectTrue(correctGreenTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.correctGreenToneDurationMilliseconds(), 1);
  });

  it("should play correct when blue entered and blue is correct", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.blue, Color.green, Color.red, Color.yellow]);
    enterBlue(this.simon);
    expectFalse(incorrectBlueTonePlayed(this.audioPlayer));
    expectTrue(correctBlueTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.correctBlueToneDurationMilliseconds(), 1);
  });

  it("should play correct when yellow entered and yellow is correct", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.yellow, Color.green, Color.blue, Color.red]);
    enterYellow(this.simon);
    expectFalse(incorrectYellowTonePlayed(this.audioPlayer));
    expectTrue(correctYellowTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.correctYellowToneDurationMilliseconds(), 1);
  });

  it("should play incorrect when red entered and red is incorrect", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterRed(this.simon);
    expectFalse(correctRedTonePlayed(this.audioPlayer));
    expectTrue(incorrectRedTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.incorrectRedToneDurationMilliseconds(), 1);
  });

  it("should play incorrect when blue entered and blue is incorrect", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterBlue(this.simon);
    expectFalse(correctBlueTonePlayed(this.audioPlayer));
    expectTrue(incorrectBlueTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.incorrectBlueToneDurationMilliseconds(), 1);
  });

  it("should play incorrect when green entered and green is incorrect", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterGreen(this.simon);
    expectFalse(correctGreenTonePlayed(this.audioPlayer));
    expectTrue(incorrectGreenTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.incorrectGreenToneDurationMilliseconds(), 1);
  });

  it("should play incorrect when yellow entered and yellow is incorrect", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterYellow(this.simon);
    expectFalse(correctYellowTonePlayed(this.audioPlayer));
    expectTrue(incorrectYellowTonePlayed(this.audioPlayer));
    expectEqual(this.audioPlayer.incorrectYellowToneDurationMilliseconds(), 1);
  });

  it("should play incorrect when second tone entered is incorrect", function () {
    setShortToneDurationMilliseconds(this.simon, 1);
    say(this.simon, [Color.yellow, Color.red, Color.blue, Color.green]);
    enterYellow(this.simon);
    expectFalse(incorrectYellowTonePlayed(this.audioPlayer));
    enterYellow(this.simon);
    expectTrue(incorrectYellowTonePlayed(this.audioPlayer));
  });

  it("should not play correct tone when entered while playing series", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    setPlaying(this.audioPlayer);
    enterRed(this.simon);
    expectFalse(incorrectRedTonePlayed(this.audioPlayer));
    expectFalse(correctRedTonePlayed(this.audioPlayer));
  });

  it("should notify that trial is complete on submit", function () {
    const listener = new EventListenerStub();
    this.simon.subscribe(listener);
    submit(this.simon);
    expectTrue(listener.notifiedThatTrialHasCompleted());
  });

  it("should conclude trial on submit", function () {
    submit(this.simon);
    expectTrue(this.trial.concluded());
  });

  it("should evaluate a correct trial", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterRed(this.simon);
    enterGreen(this.simon);
    enterBlue(this.simon);
    enterYellow(this.simon);
    submit(this.simon);
    expectTrue(this.trial.correct());
  });

  it("should evaluate an incorrect trial", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterRed(this.simon);
    enterGreen(this.simon);
    enterRed(this.simon);
    enterYellow(this.simon);
    submit(this.simon);
    expectFalse(this.trial.correct());
  });

  it("should evaluate a partially correct trial", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterRed(this.simon);
    enterGreen(this.simon);
    enterBlue(this.simon);
    submit(this.simon);
    expectFalse(this.trial.correct());
  });
});
