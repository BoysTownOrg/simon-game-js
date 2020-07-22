import { Color } from "./Color.js";

class YellowToneResponder {
  playCorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playCorrectYellowTone(durationMilliseconds);
  }

  playIncorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playIncorrectYellowTone(durationMilliseconds);
  }
}

class GreenToneResponder {
  playCorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playCorrectGreenTone(durationMilliseconds);
  }

  playIncorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playIncorrectGreenTone(durationMilliseconds);
  }
}

class RedToneResponder {
  playCorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playCorrectRedTone(durationMilliseconds);
  }

  playIncorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playIncorrectRedTone(durationMilliseconds);
  }
}

class BlueToneResponder {
  playCorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playCorrectBlueTone(durationMilliseconds);
  }

  playIncorrectTone(audioPlayer, durationMilliseconds) {
    audioPlayer.playIncorrectBlueTone(durationMilliseconds);
  }
}

function toneResponder(color) {
  switch (color) {
    case Color.red:
      return new RedToneResponder();
    case Color.blue:
      return new BlueToneResponder();
    case Color.green:
      return new GreenToneResponder();
    case Color.yellow:
      return new YellowToneResponder();
  }
}

function playNextEvaluatedTone(
  audioPlayer,
  durationMilliseconds,
  colors,
  correctColor
) {
  if (audioPlayer.playing()) return;
  if (colors.shift() == correctColor) {
    toneResponder(correctColor).playCorrectTone(
      audioPlayer,
      durationMilliseconds
    );
  } else {
    toneResponder(correctColor).playIncorrectTone(
      audioPlayer,
      durationMilliseconds
    );
  }
}

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
    playNextEvaluatedTone(
      this.audioPlayer,
      this.shortToneDurationMilliseconds,
      this.colors,
      Color.yellow
    );
  }

  enterRed() {
    playNextEvaluatedTone(
      this.audioPlayer,
      this.shortToneDurationMilliseconds,
      this.colors,
      Color.red
    );
  }

  enterGreen() {
    playNextEvaluatedTone(
      this.audioPlayer,
      this.shortToneDurationMilliseconds,
      this.colors,
      Color.green
    );
  }

  enterBlue() {
    playNextEvaluatedTone(
      this.audioPlayer,
      this.shortToneDurationMilliseconds,
      this.colors,
      Color.blue
    );
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

  submit() {
    this.listener.notifyThatTrialHasCompleted();
  }

  subscribe(listener) {
    this.listener = listener;
  }
}
