import { Simon } from "../lib/Simon.js";
import { Color } from "../lib/Color.js";

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
    this.correctRedToneDurationSeconds_ = 0;
    this.incorrectRedToneDurationSeconds_ = 0;
    this.correctYellowToneDurationSeconds_ = 0;
    this.incorrectYellowToneDurationSeconds_ = 0;
    this.correctGreenToneDurationSeconds_ = 0;
    this.incorrectGreenToneDurationSeconds_ = 0;
    this.correctBlueToneDurationSeconds_ = 0;
    this.incorrectBlueToneDurationSeconds_ = 0;
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
    this.correctRedToneDurationSeconds_ = s;
    this.correctRedTonePlayed_ = true;
  }

  correctRedToneDurationSeconds() {
    return this.correctRedToneDurationSeconds_;
  }

  incorrectRedToneDurationSeconds() {
    return this.incorrectRedToneDurationSeconds_;
  }

  correctGreenToneDurationSeconds() {
    return this.correctGreenToneDurationSeconds_;
  }

  incorrectGreenToneDurationSeconds() {
    return this.incorrectGreenToneDurationSeconds_;
  }

  correctBlueToneDurationSeconds() {
    return this.correctBlueToneDurationSeconds_;
  }

  incorrectBlueToneDurationSeconds() {
    return this.incorrectBlueToneDurationSeconds_;
  }

  correctYellowToneDurationSeconds() {
    return this.correctYellowToneDurationSeconds_;
  }

  incorrectYellowToneDurationSeconds() {
    return this.incorrectYellowToneDurationSeconds_;
  }

  incorrectRedTonePlayed() {
    return this.incorrectRedTonePlayed_;
  }

  playIncorrectRedTone(s) {
    this.incorrectRedToneDurationSeconds_ = s;
    this.incorrectRedTonePlayed_ = true;
  }

  correctBlueTonePlayed() {
    return this.correctBlueTonePlayed_;
  }

  playCorrectBlueTone(s) {
    this.correctBlueToneDurationSeconds_ = s;
    this.correctBlueTonePlayed_ = true;
  }

  incorrectBlueTonePlayed() {
    return this.incorrectBlueTonePlayed_;
  }

  playIncorrectBlueTone(s) {
    this.incorrectBlueToneDurationSeconds_ = s;
    this.incorrectBlueTonePlayed_ = true;
  }

  correctGreenTonePlayed() {
    return this.correctGreenTonePlayed_;
  }

  playCorrectGreenTone(s) {
    this.correctGreenToneDurationSeconds_ = s;
    this.correctGreenTonePlayed_ = true;
  }

  incorrectGreenTonePlayed() {
    return this.incorrectGreenTonePlayed_;
  }

  playIncorrectGreenTone(s) {
    this.incorrectGreenToneDurationSeconds_ = s;
    this.incorrectGreenTonePlayed_ = true;
  }

  correctYellowTonePlayed() {
    return this.correctYellowTonePlayed_;
  }

  playCorrectYellowTone(s) {
    this.correctYellowToneDurationSeconds_ = s;
    this.correctYellowTonePlayed_ = true;
  }

  incorrectYellowTonePlayed() {
    return this.incorrectYellowTonePlayed_;
  }

  playIncorrectYellowTone(s) {
    this.incorrectYellowToneDurationSeconds_ = s;
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

describe("Simon", function () {
  beforeEach(function () {
    this.audioPlayer = new AudioPlayerStub();
    this.simon = new Simon(this.audioPlayer);
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
    expectEqual(this.audioPlayer.correctRedToneDurationSeconds(), 1);
  });

  it("should play correct when green entered and green is correct", function () {
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterGreen(this.simon);
    expectFalse(incorrectGreenTonePlayed(this.audioPlayer));
    expectTrue(correctGreenTonePlayed(this.audioPlayer));
  });

  it("should play correct when blue entered and blue is correct", function () {
    say(this.simon, [Color.blue, Color.green, Color.red, Color.yellow]);
    enterBlue(this.simon);
    expectFalse(incorrectBlueTonePlayed(this.audioPlayer));
    expectTrue(correctBlueTonePlayed(this.audioPlayer));
  });

  it("should play correct when yellow entered and yellow is correct", function () {
    say(this.simon, [Color.yellow, Color.green, Color.blue, Color.red]);
    enterYellow(this.simon);
    expectFalse(incorrectYellowTonePlayed(this.audioPlayer));
    expectTrue(correctYellowTonePlayed(this.audioPlayer));
  });

  it("should play incorrect when red entered and red is incorrect", function () {
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterRed(this.simon);
    expectFalse(correctRedTonePlayed(this.audioPlayer));
    expectTrue(incorrectRedTonePlayed(this.audioPlayer));
  });

  it("should play incorrect when blue entered and blue is incorrect", function () {
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterBlue(this.simon);
    expectFalse(correctBlueTonePlayed(this.audioPlayer));
    expectTrue(incorrectBlueTonePlayed(this.audioPlayer));
  });

  it("should play incorrect when green entered and green is incorrect", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterGreen(this.simon);
    expectFalse(correctGreenTonePlayed(this.audioPlayer));
    expectTrue(incorrectGreenTonePlayed(this.audioPlayer));
  });

  it("should play incorrect when yellow entered and yellow is incorrect", function () {
    say(this.simon, [Color.green, Color.red, Color.blue, Color.yellow]);
    enterYellow(this.simon);
    expectFalse(correctYellowTonePlayed(this.audioPlayer));
    expectTrue(incorrectYellowTonePlayed(this.audioPlayer));
  });
});
