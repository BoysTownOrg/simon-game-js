function turnOnRedButtonLight(screen) {
  screen.turnOnRedButtonLight();
}

function turnOnGreenButtonLight(screen) {
  screen.turnOnGreenButtonLight();
}

function turnOnBlueButtonLight(screen) {
  screen.turnOnBlueButtonLight();
}

function turnOnYellowButtonLight(screen) {
  screen.turnOnYellowButtonLight();
}

function darkenBlueButton(screen) {
  screen.darkenBlueButton();
}

function darkenYellowButton(screen) {
  screen.darkenYellowButton();
}

function darkenGreenButton(screen) {
  screen.darkenGreenButton();
}

function darkenRedButton(screen) {
  screen.darkenRedButton();
}

function undarkenBlueButton(screen) {
  screen.undarkenBlueButton();
}

function undarkenYellowButton(screen) {
  screen.undarkenYellowButton();
}

function undarkenGreenButton(screen) {
  screen.undarkenGreenButton();
}

function undarkenRedButton(screen) {
  screen.undarkenRedButton();
}

export class ScreenPresenter {
  constructor(screen) {
    this.screen = screen;
  }

  notifyThatRedToneStarted() {
    turnOnRedButtonLight(this.screen);
  }

  notifyThatRedToneEnded() {
    this.screen.turnOffRedButtonLight();
  }

  notifyThatGreenToneStarted() {
    turnOnGreenButtonLight(this.screen);
  }

  notifyThatGreenToneEnded() {
    this.screen.turnOffGreenButtonLight();
  }

  notifyThatBlueToneStarted() {
    turnOnBlueButtonLight(this.screen);
  }

  notifyThatBlueToneEnded() {
    this.screen.turnOffBlueButtonLight();
  }

  notifyThatYellowToneStarted() {
    turnOnYellowButtonLight(this.screen);
  }

  notifyThatYellowToneEnded() {
    this.screen.turnOffYellowButtonLight();
  }

  notifyThatToneSeriesEnded() {
    turnOnBlueButtonLight(this.screen);
    turnOnGreenButtonLight(this.screen);
    turnOnRedButtonLight(this.screen);
    turnOnYellowButtonLight(this.screen);
    this.screen.showDoneButton();
  }

  notifyThatCorrectBlueToneStarted() {
    darkenBlueButton(this.screen);
  }

  notifyThatCorrectBlueToneEnded() {
    undarkenBlueButton(this.screen);
  }

  notifyThatCorrectRedToneStarted() {
    darkenRedButton(this.screen);
  }

  notifyThatCorrectRedToneEnded() {
    undarkenRedButton(this.screen);
  }

  notifyThatCorrectGreenToneStarted() {
    darkenGreenButton(this.screen);
  }

  notifyThatCorrectGreenToneEnded() {
    undarkenGreenButton(this.screen);
  }

  notifyThatCorrectYellowToneStarted() {
    darkenYellowButton(this.screen);
  }

  notifyThatCorrectYellowToneEnded() {
    undarkenYellowButton(this.screen);
  }

  notifyThatIncorrectBlueToneStarted() {
    darkenBlueButton(this.screen);
  }

  notifyThatIncorrectBlueToneEnded() {
    undarkenBlueButton(this.screen);
  }

  notifyThatIncorrectRedToneStarted() {
    darkenRedButton(this.screen);
  }

  notifyThatIncorrectRedToneEnded() {
    undarkenRedButton(this.screen);
  }

  notifyThatIncorrectGreenToneStarted() {
    darkenGreenButton(this.screen);
  }

  notifyThatIncorrectGreenToneEnded() {
    undarkenGreenButton(this.screen);
  }

  notifyThatIncorrectYellowToneStarted() {
    darkenYellowButton(this.screen);
  }

  notifyThatIncorrectYellowToneEnded() {
    undarkenYellowButton(this.screen);
  }
}
