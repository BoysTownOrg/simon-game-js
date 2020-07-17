import { Simon } from "../lib/Simon.js";
import { Color } from "../lib/Color.js";

class PresenterStub {
  clearState() {
    this.redLitUp_ = false;
    this.yellowLitUp_ = false;
    this.greenLitUp_ = false;
    this.blueLitUp_ = false;
  }

  redLitUp() {
    return this.redLitUp_;
  }

  greenLitUp() {
    return this.greenLitUp_;
  }

  yellowLitUp() {
    return this.yellowLitUp_;
  }

  blueLitUp() {
    return this.blueLitUp_;
  }

  lightUpRed() {
    this.redLitUp_ = true;
  }

  lightUpGreen() {
    this.greenLitUp_ = true;
  }

  lightUpYellow() {
    this.yellowLitUp_ = true;
  }

  lightUpBlue() {
    this.blueLitUp_ = true;
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

  clearState() {
    this.redPlayed_ = false;
    this.yellowPlayed_ = false;
    this.greenPlayed_ = false;
    this.bluePlayed_ = false;
  }

  redPlayed() {
    return this.redPlayed_;
  }

  greenPlayed() {
    return this.greenPlayed_;
  }

  yellowPlayed() {
    return this.yellowPlayed_;
  }

  bluePlayed() {
    return this.bluePlayed_;
  }

  playRed() {
    this.redPlayed_ = true;
  }

  playGreen() {
    this.greenPlayed_ = true;
  }

  playYellow() {
    this.yellowPlayed_ = true;
  }

  playBlue() {
    this.bluePlayed_ = true;
  }

  correctRedTonePlayed() {
    return this.correctRedTonePlayed_;
  }

  playCorrectRedTone() {
    this.correctRedTonePlayed_ = true;
  }

  incorrectRedTonePlayed() {
    return this.incorrectRedTonePlayed_;
  }

  playIncorrectRedTone() {
    this.incorrectRedTonePlayed_ = true;
  }

  correctBlueTonePlayed() {
    return this.correctBlueTonePlayed_;
  }

  playCorrectBlueTone() {
    this.correctBlueTonePlayed_ = true;
  }

  incorrectBlueTonePlayed() {
    return this.incorrectBlueTonePlayed_;
  }

  playIncorrectBlueTone() {
    this.incorrectBlueTonePlayed_ = true;
  }

  correctGreenTonePlayed() {
    return this.correctGreenTonePlayed_;
  }

  playCorrectGreenTone() {
    this.correctGreenTonePlayed_ = true;
  }

  incorrectGreenTonePlayed() {
    return this.incorrectGreenTonePlayed_;
  }

  playIncorrectGreenTone() {
    this.incorrectGreenTonePlayed_ = true;
  }

  correctYellowTonePlayed() {
    return this.correctYellowTonePlayed_;
  }

  playCorrectYellowTone() {
    this.correctYellowTonePlayed_ = true;
  }

  incorrectYellowTonePlayed() {
    return this.incorrectYellowTonePlayed_;
  }

  playIncorrectYellowTone() {
    this.incorrectYellowTonePlayed_ = true;
  }
}

function say(simon, colors) {
  simon.say(colors);
}

function redLitUp(presenter) {
  return presenter.redLitUp();
}

function greenLitUp(presenter) {
  return presenter.greenLitUp();
}

function blueLitUp(presenter) {
  return presenter.blueLitUp();
}

function yellowLitUp(presenter) {
  return presenter.yellowLitUp();
}

function redPlayed(audioPlayer) {
  return audioPlayer.redPlayed();
}

function greenPlayed(audioPlayer) {
  return audioPlayer.greenPlayed();
}

function bluePlayed(audioPlayer) {
  return audioPlayer.bluePlayed();
}

function yellowPlayed(audioPlayer) {
  return audioPlayer.yellowPlayed();
}

function expectTrue(b) {
  expect(b).toBeTrue();
}

function expectFalse(b) {
  expect(b).toBeFalse();
}

function clearPresenterState(presenter) {
  presenter.clearState();
}

function clearAudioPlayerState(audioPlayer) {
  audioPlayer.clearState();
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

describe("Simon", function () {
  beforeEach(function () {
    this.presenter = new PresenterStub();
    this.audioPlayer = new AudioPlayerStub();
    this.simon = new Simon(this.presenter, this.audioPlayer);
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

  it("should light up and play entered colors that are correct", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    clearPresenterState(this.presenter);
    clearAudioPlayerState(this.audioPlayer);
    enterRed(this.simon);
    expectTrue(redLitUp(this.presenter));
    expectTrue(redPlayed(this.audioPlayer));
    enterGreen(this.simon);
    expectTrue(greenLitUp(this.presenter));
    expectTrue(greenPlayed(this.audioPlayer));
    enterBlue(this.simon);
    expectTrue(blueLitUp(this.presenter));
    expectTrue(bluePlayed(this.audioPlayer));
    enterYellow(this.simon);
    expectTrue(yellowLitUp(this.presenter));
    expectTrue(yellowPlayed(this.audioPlayer));
  });

  it("should play correct when red entered and red is correct", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterRed(this.simon);
    expectFalse(incorrectRedTonePlayed(this.audioPlayer));
    expectTrue(correctRedTonePlayed(this.audioPlayer));
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
