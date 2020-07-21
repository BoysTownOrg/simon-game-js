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
    if (this.colors.shift() == Color.yellow) {
      this.audioPlayer.playCorrectYellowTone(
        this.shortToneDurationMilliseconds
      );
    } else {
      this.audioPlayer.playIncorrectYellowTone(
        this.shortToneDurationMilliseconds
      );
    }
  }

  enterRed() {
    if (this.colors[0] == Color.red) {
      this.audioPlayer.playCorrectRedTone(this.shortToneDurationMilliseconds);
    } else {
      this.audioPlayer.playIncorrectRedTone(this.shortToneDurationMilliseconds);
    }
  }

  enterGreen() {
    if (this.colors[0] == Color.green) {
      this.audioPlayer.playCorrectGreenTone(this.shortToneDurationMilliseconds);
    } else {
      this.audioPlayer.playIncorrectGreenTone(
        this.shortToneDurationMilliseconds
      );
    }
  }

  enterBlue() {
    if (this.colors[0] == Color.blue) {
      this.audioPlayer.playCorrectBlueTone(this.shortToneDurationMilliseconds);
    } else {
      this.audioPlayer.playIncorrectBlueTone(
        this.shortToneDurationMilliseconds
      );
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
