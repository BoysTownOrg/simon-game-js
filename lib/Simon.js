import { Color } from "./Color.js";

function lightUpAndPlay(presenter, audioPlayer, color) {
  switch (color) {
    case Color.red:
      presenter.lightUpRed();
      audioPlayer.playRed();
      break;
    case Color.green:
      presenter.lightUpGreen();
      audioPlayer.playGreen();
      break;
    case Color.yellow:
      presenter.lightUpYellow();
      audioPlayer.playYellow();
      break;
    default:
      presenter.lightUpBlue();
      audioPlayer.playBlue();
  }
}

export class Simon {
  constructor(presenter, audioPlayer) {
    this.presenter = presenter;
    this.audioPlayer = audioPlayer;
  }

  say(colors) {
    this.colors = colors;
    this.audioPlayer.play(
      this.colors.slice(),
      this.longToneDurationMilliseconds,
      this.toneOffsetToNextOnsetDurationMilliseconds
    );
  }

  enterYellow() {
    lightUpAndPlay(this.presenter, this.audioPlayer, Color.yellow);
    if (this.colors[0] == Color.yellow) {
      this.audioPlayer.playCorrectYellowTone();
    } else {
      this.audioPlayer.playIncorrectYellowTone();
    }
  }

  enterRed() {
    lightUpAndPlay(this.presenter, this.audioPlayer, Color.red);
    if (this.colors[0] == Color.red) {
      this.audioPlayer.playCorrectRedTone();
    } else {
      this.audioPlayer.playIncorrectRedTone();
    }
  }

  enterGreen() {
    lightUpAndPlay(this.presenter, this.audioPlayer, Color.green);
    if (this.colors[0] == Color.green) {
      this.audioPlayer.playCorrectGreenTone();
    } else {
      this.audioPlayer.playIncorrectGreenTone();
    }
  }

  enterBlue() {
    lightUpAndPlay(this.presenter, this.audioPlayer, Color.blue);
    if (this.colors[0] == Color.blue) {
      this.audioPlayer.playCorrectBlueTone();
    } else {
      this.audioPlayer.playIncorrectBlueTone();
    }
  }

  setLongToneDurationMilliseconds(x) {
    this.longToneDurationMilliseconds = x;
  }

  setToneOffsetToNextOnsetDurationMilliseconds(x) {
    this.toneOffsetToNextOnsetDurationMilliseconds = x;
  }
}
