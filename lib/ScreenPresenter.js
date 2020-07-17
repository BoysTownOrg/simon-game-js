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
  }
}
