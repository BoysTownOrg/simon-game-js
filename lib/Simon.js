import { Color } from "./Color.js";

export class Simon {
  constructor(audioPlayer) {
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
    if (this.colors[0] == Color.yellow) {
      this.audioPlayer.playCorrectYellowTone();
    } else {
      this.audioPlayer.playIncorrectYellowTone();
    }
  }

  enterRed() {
    if (this.colors[0] == Color.red) {
      this.audioPlayer.playCorrectRedTone(this.shortToneDurationMilliseconds);
    } else {
      this.audioPlayer.playIncorrectRedTone();
    }
  }

  enterGreen() {
    if (this.colors[0] == Color.green) {
      this.audioPlayer.playCorrectGreenTone();
    } else {
      this.audioPlayer.playIncorrectGreenTone();
    }
  }

  enterBlue() {
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

  setShortToneDurationMilliseconds(x) {
    this.shortToneDurationMilliseconds = x;
  }
}
