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
  correctColor,
  assignFalseOnlyIfIncorrect
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
    assignFalseOnlyIfIncorrect.correct = false;
  }
}

export class Simon {
  constructor(audioPlayer, trial) {
    this.audioPlayer = audioPlayer;
    this.trial = trial;
    this.trialEvaluation = { correct: undefined };
  }

  say(colors) {
    this.colors = colors;
    this.trialEvaluation.correct = true;
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
      Color.yellow,
      this.trialEvaluation
    );
  }

  enterRed() {
    playNextEvaluatedTone(
      this.audioPlayer,
      this.shortToneDurationMilliseconds,
      this.colors,
      Color.red,
      this.trialEvaluation
    );
  }

  enterGreen() {
    playNextEvaluatedTone(
      this.audioPlayer,
      this.shortToneDurationMilliseconds,
      this.colors,
      Color.green,
      this.trialEvaluation
    );
  }

  enterBlue() {
    playNextEvaluatedTone(
      this.audioPlayer,
      this.shortToneDurationMilliseconds,
      this.colors,
      Color.blue,
      this.trialEvaluation
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
    if (this.listener != undefined) this.listener.notifyThatTrialHasCompleted();
    this.trial.conclude(this.trialEvaluation);
  }

  subscribe(listener) {
    this.listener = listener;
  }
}
