export class ScreenPresenter {
  constructor(screen) {
    this.screen = screen;
  }

  notifyThatRedToneStarted() {
    this.screen.turnOnRedButtonLight();
  }

  notifyThatRedToneEnded() {
    this.screen.turnOffRedButtonLight();
  }

  notifyThatGreenToneStarted() {
    this.screen.turnOnGreenButtonLight();
  }

  notifyThatGreenToneEnded() {
    this.screen.turnOffGreenButtonLight();
  }

  notifyThatBlueToneStarted() {
    this.screen.turnOnBlueButtonLight();
  }

  notifyThatBlueToneEnded() {
    this.screen.turnOffBlueButtonLight();
  }

  notifyThatYellowToneStarted() {
    this.screen.turnOnYellowButtonLight();
  }

  notifyThatYellowToneEnded() {
    this.screen.turnOffYellowButtonLight();
  }

  notifyThatToneSeriesEnded() {
    this.screen.turnOnBlueButtonLight();
    this.screen.turnOnGreenButtonLight();
    this.screen.turnOnRedButtonLight();
    this.screen.turnOnYellowButtonLight();
  }
}
