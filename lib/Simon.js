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
  }

  enterBlue() {
    lightUpAndPlay(this.presenter, this.audioPlayer, Color.blue);
  }

  setLongToneDurationMilliseconds(x) {
    this.longToneDurationMilliseconds = x;
  }

  setToneOffsetToNextOnsetDurationMilliseconds(x) {
    this.toneOffsetToNextOnsetDurationMilliseconds = x;
  }
}
