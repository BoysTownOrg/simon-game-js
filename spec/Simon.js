import { Simon } from "../lib/Simon.js";
import { Color } from "../lib/Color.js";

class ScreenStub {
  constructor() {
    this.redButtonLightTurnedOn_ = false;
    this.redButtonLightTurnedOff_ = false;
    this.blueButtonLightTurnedOn_ = false;
    this.blueButtonLightTurnedOff_ = false;
    this.greenButtonLightTurnedOn_ = false;
    this.greenButtonLightTurnedOff_ = false;
    this.yellowButtonLightTurnedOn_ = false;
    this.yellowButtonLightTurnedOff_ = false;
    this.blueButtonDarkened_ = false;
    this.blueButtonUndarkened_ = false;
    this.doneButtonShown_ = false;
    this.cleared_ = false;
  }

  clear() {
    this.cleared_ = true;
  }

  cleared() {
    return this.cleared_;
  }

  doneButtonShown() {
    return this.doneButtonShown_;
  }

  showDoneButton() {
    this.doneButtonShown_ = true;
  }

  blueButtonDarkened() {
    return this.blueButtonDarkened_;
  }

  darkenBlueButton() {
    this.blueButtonDarkened_ = true;
  }

  blueButtonUndarkened() {
    return this.blueButtonUndarkened_;
  }

  undarkenBlueButton() {
    this.blueButtonUndarkened_ = true;
  }

  redButtonLightTurnedOn() {
    return this.redButtonLightTurnedOn_;
  }

  turnOnRedButtonLight() {
    this.redButtonLightTurnedOn_ = true;
  }

  redButtonLightTurnedOff() {
    return this.redButtonLightTurnedOff_;
  }

  turnOffRedButtonLight() {
    this.redButtonLightTurnedOff_ = true;
  }

  greenButtonLightTurnedOn() {
    return this.greenButtonLightTurnedOn_;
  }

  turnOnGreenButtonLight() {
    this.greenButtonLightTurnedOn_ = true;
  }

  greenButtonLightTurnedOff() {
    return this.greenButtonLightTurnedOff_;
  }

  turnOffGreenButtonLight() {
    this.greenButtonLightTurnedOff_ = true;
  }

  blueButtonLightTurnedOn() {
    return this.blueButtonLightTurnedOn_;
  }

  turnOnBlueButtonLight() {
    this.blueButtonLightTurnedOn_ = true;
  }

  blueButtonLightTurnedOff() {
    return this.blueButtonLightTurnedOff_;
  }

  turnOffBlueButtonLight() {
    this.blueButtonLightTurnedOff_ = true;
  }

  yellowButtonLightTurnedOn() {
    return this.yellowButtonLightTurnedOn_;
  }

  turnOnYellowButtonLight() {
    this.yellowButtonLightTurnedOn_ = true;
  }

  yellowButtonLightTurnedOff() {
    return this.yellowButtonLightTurnedOff_;
  }

  turnOffYellowButtonLight() {
    this.yellowButtonLightTurnedOff_ = true;
  }
}

function expectRedButtonLightTurnedOn(screen) {
  expectTrue(screen.redButtonLightTurnedOn());
}

function expectGreenButtonLightTurnedOn(screen) {
  expectTrue(screen.greenButtonLightTurnedOn());
}

function expectBlueButtonLightTurnedOn(screen) {
  expectTrue(screen.blueButtonLightTurnedOn());
}

function expectYellowButtonLightTurnedOn(screen) {
  expectTrue(screen.yellowButtonLightTurnedOn());
}

class MonotonicTimerStub {
  setMilliseconds(ms) {
    this.milliseconds_ = ms;
  }

  milliseconds() {
    return this.milliseconds_;
  }
}

class TrialStub {
  constructor() {
    this.concluded_ = false;
    this.correct_ = false;
    this.userResponses_ = [];
  }

  userResponses() {
    return this.userResponses_;
  }

  correct() {
    return this.correct_;
  }

  conclude(result) {
    this.concluded_ = true;
    this.correct_ = result.correct;
    this.userResponses_ = result.responses;
  }

  concluded() {
    return this.concluded_;
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

  subscribe(listener) {
    this.listener = listener;
  }

  notifyThatRedToneStarted() {
    this.listener.notifyThatRedToneStarted();
  }

  notifyThatRedToneEnded() {
    this.listener.notifyThatRedToneEnded();
  }

  notifyThatGreenToneStarted() {
    this.listener.notifyThatGreenToneStarted();
  }

  notifyThatGreenToneEnded() {
    this.listener.notifyThatGreenToneEnded();
  }

  notifyThatBlueToneStarted() {
    this.listener.notifyThatBlueToneStarted();
  }

  notifyThatBlueToneEnded() {
    this.listener.notifyThatBlueToneEnded();
  }

  notifyThatYellowToneStarted() {
    this.listener.notifyThatYellowToneStarted();
  }

  notifyThatYellowToneEnded() {
    this.listener.notifyThatYellowToneEnded();
  }

  notifyThatToneSeriesEnded() {
    this.listener.notifyThatToneSeriesEnded();
  }

  notifyThatCorrectBlueToneStarted() {
    this.listener.notifyThatCorrectBlueToneStarted();
  }

  notifyThatCorrectBlueToneEnded() {
    this.listener.notifyThatCorrectBlueToneEnded();
  }

  notifyThatCorrectRedToneStarted() {
    this.listener.notifyThatCorrectRedToneStarted();
  }

  notifyThatCorrectRedToneEnded() {
    this.listener.notifyThatCorrectRedToneEnded();
  }

  notifyThatCorrectGreenToneStarted() {
    this.listener.notifyThatCorrectGreenToneStarted();
  }

  notifyThatCorrectGreenToneEnded() {
    this.listener.notifyThatCorrectGreenToneEnded();
  }

  notifyThatCorrectYellowToneStarted() {
    this.listener.notifyThatCorrectYellowToneStarted();
  }

  notifyThatCorrectYellowToneEnded() {
    this.listener.notifyThatCorrectYellowToneEnded();
  }

  notifyThatIncorrectBlueToneStarted() {
    this.listener.notifyThatIncorrectBlueToneStarted();
  }

  notifyThatIncorrectBlueToneEnded() {
    this.listener.notifyThatIncorrectBlueToneEnded();
  }

  notifyThatIncorrectRedToneStarted() {
    this.listener.notifyThatIncorrectRedToneStarted();
  }

  notifyThatIncorrectRedToneEnded() {
    this.listener.notifyThatIncorrectRedToneEnded();
  }

  notifyThatIncorrectGreenToneStarted() {
    this.listener.notifyThatIncorrectGreenToneStarted();
  }

  notifyThatIncorrectGreenToneEnded() {
    this.listener.notifyThatIncorrectGreenToneEnded();
  }

  notifyThatIncorrectYellowToneStarted() {
    this.listener.notifyThatIncorrectYellowToneStarted();
  }

  notifyThatIncorrectYellowToneEnded() {
    this.listener.notifyThatIncorrectYellowToneEnded();
  }

  notifyThatTrialHasCompleted() {
    this.listener.notifyThatTrialHasCompleted();
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

function correct(trial) {
  return trial.correct();
}

function expectIncorrectTrial(trial) {
  expectFalse(correct(trial));
}

function setTimerMilliseconds(timer, milliseconds) {
  timer.setMilliseconds(milliseconds);
}

function userResponses(trial) {
  return trial.userResponses();
}

function expectUserResponses(trial, n) {
  expectEqual(n, userResponses(trial).length);
}

function expectNthUserResponseTimeMilliseconds(trial, n, ms) {
  expectEqual(ms, userResponses(trial)[n].milliseconds);
}

function expectNthUserResponseId(trial, n, id) {
  expectEqual(id, userResponses(trial)[n].id);
}

function notifyThatRedToneStarted(audioPlayer) {
  audioPlayer.notifyThatRedToneStarted();
}

function notifyThatRedToneEnded(audioPlayer) {
  audioPlayer.notifyThatRedToneEnded();
}

function notifyThatGreenToneStarted(audioPlayer) {
  audioPlayer.notifyThatGreenToneStarted();
}

function notifyThatGreenToneEnded(audioPlayer) {
  audioPlayer.notifyThatGreenToneEnded();
}

function notifyThatBlueToneStarted(audioPlayer) {
  audioPlayer.notifyThatBlueToneStarted();
}

function notifyThatBlueToneEnded(audioPlayer) {
  audioPlayer.notifyThatBlueToneEnded();
}

function notifyThatYellowToneStarted(audioPlayer) {
  audioPlayer.notifyThatYellowToneStarted();
}

function notifyThatYellowToneEnded(audioPlayer) {
  audioPlayer.notifyThatYellowToneEnded();
}

function notifyThatToneSeriesEnded(audioPlayer) {
  audioPlayer.notifyThatToneSeriesEnded();
}

function notifyThatCorrectBlueToneStarted(audioPlayer) {
  audioPlayer.notifyThatCorrectBlueToneStarted();
}

function notifyThatCorrectBlueToneEnded(audioPlayer) {
  audioPlayer.notifyThatCorrectBlueToneEnded();
}

function notifyThatIncorrectBlueToneStarted(audioPlayer) {
  audioPlayer.notifyThatIncorrectBlueToneStarted();
}

function notifyThatIncorrectBlueToneEnded(audioPlayer) {
  audioPlayer.notifyThatIncorrectBlueToneEnded();
}

describe("Simon", function () {
  beforeEach(function () {
    this.audioPlayer = new AudioPlayerStub();
    this.screen = new ScreenStub();
    this.trial = new TrialStub();
    this.timer = new MonotonicTimerStub();
    this.simon = new Simon(
      this.audioPlayer,
      this.screen,
      this.trial,
      this.timer
    );
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
    expectTrue(correct(this.trial));
  });

  it("should evaluate an incorrect trial", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterRed(this.simon);
    enterGreen(this.simon);
    enterRed(this.simon);
    enterYellow(this.simon);
    submit(this.simon);
    expectIncorrectTrial(this.trial);
  });

  it("should evaluate a partially correct trial", function () {
    say(this.simon, [Color.red, Color.green, Color.blue, Color.yellow]);
    enterRed(this.simon);
    enterGreen(this.simon);
    enterBlue(this.simon);
    submit(this.simon);
    expectIncorrectTrial(this.trial);
  });

  it("should mark the time and ID of each response that occurs when the audio player is not playing", function () {
    setTimerMilliseconds(this.timer, 1);
    enterRed(this.simon);
    setTimerMilliseconds(this.timer, 3);
    enterGreen(this.simon);
    setTimerMilliseconds(this.timer, 7);
    enterBlue(this.simon);
    setTimerMilliseconds(this.timer, 16);
    enterYellow(this.simon);
    submit(this.simon);
    expectUserResponses(this.trial, 4);
    expectNthUserResponseTimeMilliseconds(this.trial, 0, 1);
    expectNthUserResponseId(this.trial, 0, Color.red);
    expectNthUserResponseTimeMilliseconds(this.trial, 1, 3);
    expectNthUserResponseId(this.trial, 1, Color.green);
    expectNthUserResponseTimeMilliseconds(this.trial, 2, 7);
    expectNthUserResponseId(this.trial, 2, Color.blue);
    expectNthUserResponseTimeMilliseconds(this.trial, 3, 16);
    expectNthUserResponseId(this.trial, 3, Color.yellow);
  });

  it("should mark the time and ID of each response per trial", function () {
    setTimerMilliseconds(this.timer, 1);
    enterRed(this.simon);
    submit(this.simon);
    setTimerMilliseconds(this.timer, 3);
    enterGreen(this.simon);
    setTimerMilliseconds(this.timer, 7);
    enterBlue(this.simon);
    setTimerMilliseconds(this.timer, 16);
    enterYellow(this.simon);
    submit(this.simon);
    expectUserResponses(this.trial, 3);
    expectNthUserResponseTimeMilliseconds(this.trial, 0, 3);
    expectNthUserResponseId(this.trial, 0, Color.green);
    expectNthUserResponseTimeMilliseconds(this.trial, 1, 7);
    expectNthUserResponseId(this.trial, 1, Color.blue);
    expectNthUserResponseTimeMilliseconds(this.trial, 2, 16);
    expectNthUserResponseId(this.trial, 2, Color.yellow);
  });

  it("should light red button when red tone starts", function () {
    notifyThatRedToneStarted(this.audioPlayer);
    expectRedButtonLightTurnedOn(this.screen);
  });

  it("should turn off red button light when red tone ends", function () {
    notifyThatRedToneEnded(this.audioPlayer);
    expectTrue(this.screen.redButtonLightTurnedOff());
  });

  it("should light green button when green tone starts", function () {
    notifyThatGreenToneStarted(this.audioPlayer);
    expectGreenButtonLightTurnedOn(this.screen);
  });

  it("should turn off green button light when green tone ends", function () {
    notifyThatGreenToneEnded(this.audioPlayer);
    expectTrue(this.screen.greenButtonLightTurnedOff());
  });

  it("should light blue button when blue tone starts", function () {
    notifyThatBlueToneStarted(this.audioPlayer);
    expectBlueButtonLightTurnedOn(this.screen);
  });

  it("should turn off blue button light when blue tone ends", function () {
    notifyThatBlueToneEnded(this.audioPlayer);
    expectTrue(this.screen.blueButtonLightTurnedOff());
  });

  it("should light yellow button when yellow tone starts", function () {
    notifyThatYellowToneStarted(this.audioPlayer);
    expectYellowButtonLightTurnedOn(this.screen);
  });

  it("should turn off yellow button light when yellow tone ends", function () {
    notifyThatYellowToneEnded(this.audioPlayer);
    expectTrue(this.screen.yellowButtonLightTurnedOff());
  });

  it("should turn on all button lights when tone series ends", function () {
    notifyThatToneSeriesEnded(this.audioPlayer);
    expectYellowButtonLightTurnedOn(this.screen);
    expectRedButtonLightTurnedOn(this.screen);
    expectGreenButtonLightTurnedOn(this.screen);
    expectBlueButtonLightTurnedOn(this.screen);
  });

  it("should show done button when tone series ends", function () {
    notifyThatToneSeriesEnded(this.audioPlayer);
    expectTrue(this.screen.doneButtonShown());
  });

  it("should darken blue button when correct blue tone starts", function () {
    notifyThatCorrectBlueToneStarted(this.audioPlayer);
    expectTrue(this.screen.blueButtonDarkened());
  });

  it("should undarken blue button when correct blue tone ends", function () {
    notifyThatCorrectBlueToneEnded(this.audioPlayer);
    expectTrue(this.screen.blueButtonUndarkened());
  });

  it("should darken blue button when incorrect blue tone starts", function () {
    notifyThatIncorrectBlueToneStarted(this.audioPlayer);
    expectTrue(this.screen.blueButtonDarkened());
  });

  it("should undarken blue button when incorrect blue tone ends", function () {
    notifyThatIncorrectBlueToneEnded(this.audioPlayer);
    expectTrue(this.screen.blueButtonUndarkened());
  });

  it("should clear screen when trial completes", function () {
    submit(this.simon);
    expectTrue(this.screen.cleared());
  });
});
